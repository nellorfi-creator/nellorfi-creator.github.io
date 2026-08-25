import { CONTACT_EMAIL } from "../lib/legal";
import { SITE_ORIGIN } from "../lib/site";

interface Env {
  DB: D1Database;
  COUNTER_SALT: string;
  RESEND_API_KEY: string;
  STATS_PASSWORD?: string;
}

const STATS_PASSWORD_SHA256 = "70afe8772142c0a0b773a50f3aed28e60473a6d585d060c563807e4fe3358e18";

const ALLOWED_ORIGINS = new Set([
  SITE_ORIGIN,
  "https://www.revengegymboxe.it",
  "https://revenge-gym.github.io",
  "https://revenge-gym.it",
  "https://www.revenge-gym.it",
  "http://localhost:3000",
  "http://localhost:5173",
]);

const RATE_LIMIT_MS = 10_000;
const CONTACT_RATE_LIMIT_MS = 60_000;
const STATS_RATE_LIMIT_MS = 2_000;
const recentHits = new Map<string, number>();
const recentContacts = new Map<string, number>();
const recentStats = new Map<string, number>();

async function sha256Hex(value: string) {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

async function statsPasswordOk(password: string, env: Env) {
  if (env.STATS_PASSWORD) return passwordsMatch(password, env.STATS_PASSWORD);
  return passwordsMatch(await sha256Hex(password), STATS_PASSWORD_SHA256);
}

function passwordsMatch(given: string, expected: string) {
  const encoder = new TextEncoder();
  const a = encoder.encode(given);
  const b = encoder.encode(expected);
  const length = Math.max(a.byteLength, b.byteLength);
  let diff = a.byteLength ^ b.byteLength;
  for (let i = 0; i < length; i++) {
    diff |= (a[i] ?? 0) ^ (b[i] ?? 0);
  }
  return diff === 0;
}

function corsHeaders(origin: string | null) {
  const allowedOrigin = origin && ALLOWED_ORIGINS.has(origin)
    ? origin
    : SITE_ORIGIN;

  return {
    "Access-Control-Allow-Origin": allowedOrigin,
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Cache-Control": "no-store",
    "Content-Type": "application/json; charset=utf-8",
    Vary: "Origin",
  };
}

async function hmac(value: string, secret: string) {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(value));
  return Array.from(new Uint8Array(signature), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

function allowOnce(store: Map<string, number>, key: string, windowMs: number) {
  const now = Date.now();
  const last = store.get(key) ?? 0;
  if (now - last < windowMs) return false;
  store.set(key, now);
  if (store.size > 8000) {
    const cutoff = now - windowMs;
    for (const [entry, time] of store) {
      if (time < cutoff) store.delete(entry);
    }
  }
  return true;
}

function currentRomeDate() {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Rome",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());
  const values = Object.fromEntries(parts.map(({ type, value }) => [type, value]));
  return `${values.year}-${values.month}-${values.day}`;
}

function asText(value: unknown, max: number) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

async function sendContactEmail(env: Env, fields: {
  name: string;
  email: string;
  phone: string;
  course: string;
  message: string;
}) {
  const rows = [
    ["Nome", fields.name],
    ["Email", fields.email],
    ["Telefono", fields.phone],
    ["Area", fields.course],
    ["Messaggio", fields.message || "(nessun messaggio)"],
  ];
  const html = `
    <p>Nuova richiesta dal sito Revenge Gym.</p>
    <table>${rows.map(([label, value]) =>
      `<tr><th align="left">${label}</th><td>${escapeHtml(value).replaceAll("\n", "<br/>")}</td></tr>`
    ).join("")}</table>
  `;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Revenge Gym <info@revengegymboxe.it>",
      to: [CONTACT_EMAIL],
      reply_to: fields.email,
      subject: `Revenge Gym — ${fields.course} — ${fields.name}`,
      html,
    }),
  });
  if (!response.ok) {
    throw new Error(`resend-${response.status}`);
  }
  const result = await response.json().catch(() => null) as { id?: unknown } | null;
  return typeof result?.id === "string" ? result.id : null;
}

async function handleContact(request: Request, env: Env, headers: Record<string, string>) {
  if (request.method !== "POST") {
    return Response.json({ error: "Method not allowed" }, { status: 405, headers });
  }

  const origin = request.headers.get("Origin");
  if (origin && !ALLOWED_ORIGINS.has(origin)) {
    return Response.json({ error: "Forbidden" }, { status: 403, headers });
  }

  const ip = request.headers.get("CF-Connecting-IP") ?? "unknown";
  const salt = env.COUNTER_SALT || "contact";
  const visitorKey = await hmac(ip, salt);
  if (!allowOnce(recentContacts, visitorKey, CONTACT_RATE_LIMIT_MS)) {
    return Response.json({ error: "Too many requests" }, { status: 429, headers });
  }

  const payload = await request.json().catch(() => null) as Record<string, unknown> | null;
  if (!payload || typeof payload !== "object") {
    return Response.json({ error: "Invalid payload" }, { status: 400, headers });
  }

  const name = asText(payload.name, 100);
  const email = asText(payload.email, 254);
  const phone = asText(payload.phone, 30);
  const course = asText(payload.course, 80);
  const message = asText(payload.message, 2000);
  const privacy = asText(payload.privacy, 20);

  if (!name || !email || !phone || !course || privacy !== "accepted") {
    return Response.json({ error: "Missing fields" }, { status: 400, headers });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ error: "Invalid email" }, { status: 400, headers });
  }
  if (!env.RESEND_API_KEY) {
    return Response.json({ error: "Delivery failed" }, { status: 503, headers });
  }

  let requestId: number;
  try {
    const stored = await env.DB.prepare(
      `INSERT INTO contact_requests (name, email, phone, course, message, delivery_status)
       VALUES (?, ?, ?, ?, ?, 'pending')`,
    ).bind(name, email, phone, course, message).run();
    requestId = Number(stored.meta.last_row_id);
  } catch {
    return Response.json({ error: "Delivery unavailable" }, { status: 503, headers });
  }

  try {
    const resendId = await sendContactEmail(env, { name, email, phone, course, message });
    await env.DB.prepare(
      "UPDATE contact_requests SET delivery_status = 'accepted', resend_id = ?, delivered_at = CURRENT_TIMESTAMP WHERE id = ?",
    ).bind(resendId, requestId).run();
  } catch {
    await env.DB.prepare(
      "UPDATE contact_requests SET delivery_status = 'failed' WHERE id = ?",
    ).bind(requestId).run().catch(() => undefined);
    return Response.json({ error: "Delivery failed" }, { status: 502, headers });
  }

  return Response.json({ success: true }, { headers });
}

async function handleStats(request: Request, env: Env, headers: Record<string, string>) {
  if (request.method !== "POST") {
    return Response.json({ error: "Method not allowed" }, { status: 405, headers });
  }

  const origin = request.headers.get("Origin");
  if (origin && !ALLOWED_ORIGINS.has(origin)) {
    return Response.json({ error: "Forbidden" }, { status: 403, headers });
  }

  const ip = request.headers.get("CF-Connecting-IP") ?? "unknown";
  if (!allowOnce(recentStats, ip, STATS_RATE_LIMIT_MS)) {
    return Response.json({ error: "Too many requests" }, { status: 429, headers });
  }

  const payload = await request.json().catch(() => null) as { password?: unknown } | null;
  const password = typeof payload?.password === "string" ? payload.password : "";
  if (!(await statsPasswordOk(password, env))) {
    return Response.json({ error: "Unauthorized" }, { status: 401, headers });
  }

  const today = currentRomeDate();
  const [todayViews, historicalVisits, views] = await env.DB.batch<{
    total?: number;
    views?: number;
    page_views?: number;
  }>([
    env.DB.prepare("SELECT views FROM daily_page_views WHERE visit_date = ?").bind(today),
    env.DB.prepare("SELECT COUNT(*) AS total FROM daily_visits"),
    env.DB.prepare("SELECT page_views FROM counter_totals WHERE id = 1"),
  ]);

  return Response.json({
    uniqueToday: Number(todayViews.results[0]?.views ?? 0),
    uniqueHistorical: Number(historicalVisits.results[0]?.total ?? 0),
    pageViews: Number(views.results[0]?.page_views ?? 0),
  }, { headers });
}

const counterWorker = {
  async fetch(request: Request, env: Env): Promise<Response> {
    const origin = request.headers.get("Origin");
    const headers = corsHeaders(origin);

    try {
      if (request.method === "OPTIONS") {
        return new Response(null, { status: 204, headers });
      }

      const url = new URL(request.url);
      if (url.pathname === "/contact") {
        return handleContact(request, env, headers);
      }
      if (url.pathname === "/stats") {
        return handleStats(request, env, headers);
      }
      if (url.pathname !== "/visits" || request.method !== "POST") {
        return Response.json({ error: "Not found" }, { status: 404, headers });
      }

      const ip = request.headers.get("CF-Connecting-IP");
      if (!ip || !env.COUNTER_SALT) {
        return Response.json({ error: "Counter unavailable" }, { status: 503, headers });
      }

      const visitorKey = await hmac(ip, env.COUNTER_SALT);
      if (allowOnce(recentHits, visitorKey, RATE_LIMIT_MS)) {
        const today = currentRomeDate();
        await env.DB.batch([
          env.DB.prepare(
            "INSERT OR IGNORE INTO daily_visits (visitor_key, visit_date) VALUES (?, ?)",
          ).bind(visitorKey, today),
          env.DB.prepare(
            `INSERT INTO daily_page_views (visit_date, views) VALUES (?, 1)
             ON CONFLICT(visit_date) DO UPDATE SET views = views + 1`,
          ).bind(today),
          env.DB.prepare(
            "UPDATE counter_totals SET page_views = page_views + 1 WHERE id = 1",
          ),
        ]);
      }

      return Response.json({ ok: true }, { headers });
    } catch {
      return Response.json({ error: "Counter unavailable" }, { status: 503, headers });
    }
  },
};

export default counterWorker;
