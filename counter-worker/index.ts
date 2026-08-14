interface Env {
  DB: D1Database;
  COUNTER_SALT: string;
}

const ALLOWED_ORIGINS = new Set([
  "https://revenge-gym.github.io",
  "http://localhost:3000",
  "http://localhost:5173",
]);

const RATE_LIMIT_MS = 10_000;
const recentHits = new Map<string, number>();

function corsHeaders(origin: string | null) {
  const allowedOrigin = origin && ALLOWED_ORIGINS.has(origin)
    ? origin
    : "https://revenge-gym.github.io";

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

function shouldCount(visitorKey: string) {
  const now = Date.now();
  const last = recentHits.get(visitorKey) ?? 0;
  if (now - last < RATE_LIMIT_MS) return false;
  recentHits.set(visitorKey, now);
  if (recentHits.size > 8000) {
    const cutoff = now - RATE_LIMIT_MS;
    for (const [key, time] of recentHits) {
      if (time < cutoff) recentHits.delete(key);
    }
  }
  return true;
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
      if (url.pathname !== "/visits" || !["GET", "POST"].includes(request.method)) {
        return Response.json({ error: "Not found" }, { status: 404, headers });
      }

      if (request.method === "POST") {
        const ip = request.headers.get("CF-Connecting-IP");
        if (!ip || !env.COUNTER_SALT) {
          return Response.json({ error: "Counter unavailable" }, { status: 503, headers });
        }

        const visitorKey = await hmac(ip, env.COUNTER_SALT);
        if (shouldCount(visitorKey)) {
          await env.DB.batch([
            env.DB.prepare(
              "INSERT OR IGNORE INTO unique_visitors (visitor_key) VALUES (?)",
            ).bind(visitorKey),
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
        env.DB.prepare("SELECT COUNT(*) AS total FROM unique_visitors"),
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
