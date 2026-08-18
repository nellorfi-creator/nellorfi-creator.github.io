import { CONTACT_EMAIL } from "../lib/legal";
import { SITE_ORIGIN } from "../lib/site";

interface Env {
  DB: D1Database;
  COUNTER_SALT: string;
}

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
const recentHits = new Map<string, number>();
const recentContacts = new Map<string, number>();

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

  if (asText(payload.honey, 80)) {
    return Response.json({ success: true }, { headers });
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

  const body = new FormData();
  body.set("name", name);
  body.set("email", email);
  body.set("phone", phone);
  body.set("course", course);
  body.set("message", message);
  body.set("_subject", "Revenge Gym — richiesta informazioni");
  body.set("_template", "table");
  body.set("_captcha", "false");
  body.set("_replyto", email);
  body.set("_url", SITE_ORIGIN);

  const response = await fetch(`https://formsubmit.co/ajax/${CONTACT_EMAIL}`, {
    method: "POST",
    body,
    headers: { Accept: "application/json", Referer: SITE_ORIGIN },
  });
  const result = await response.json().catch(() => null) as { success?: string | boolean } | null;
  const ok = response.ok && result?.success !== false && result?.success !== "false";
  if (!ok) {
    return Response.json({ error: "Delivery failed" }, { status: 502, headers });
  }

  return Response.json({ success: true }, { headers });
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
      if (url.pathname !== "/visits" || !["GET", "POST"].includes(request.method)) {
        return Response.json({ error: "Not found" }, { status: 404, headers });
      }

      if (request.method === "POST") {
        const ip = request.headers.get("CF-Connecting-IP");
        if (!ip || !env.COUNTER_SALT) {
          return Response.json({ error: "Counter unavailable" }, { status: 503, headers });
        }

        const visitorKey = await hmac(ip, env.COUNTER_SALT);
        if (allowOnce(recentHits, visitorKey, RATE_LIMIT_MS)) {
          await env.DB.batch([
            env.DB.prepare(
              "INSERT OR IGNORE INTO daily_visits (visitor_key, visit_date) VALUES (?, ?)",
            ).bind(visitorKey, currentRomeDate()),
            env.DB.prepare(
              "UPDATE counter_totals SET page_views = page_views + 1 WHERE id = 1",
            ),
          ]);
        }
      }

      const [visitors, views] = await env.DB.batch<{
        total?: number;
        page_views?: number;
      }>([
        env.DB.prepare("SELECT COUNT(*) AS total FROM daily_visits"),
        env.DB.prepare("SELECT page_views FROM counter_totals WHERE id = 1"),
      ]);

      return Response.json({
        uniqueVisitors: Number(visitors.results[0]?.total ?? 0),
        pageViews: Number(views.results[0]?.page_views ?? 0),
      }, { headers });
    } catch {
      return Response.json({ error: "Counter unavailable" }, { status: 503, headers });
    }
  },
};

export default counterWorker;
