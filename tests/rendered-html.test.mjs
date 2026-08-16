import assert from "node:assert/strict";
import test from "node:test";

async function render(path = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${path}`, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the Revenge Gym home page", async () => {
  const response = await render("/");
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<html\b[^>]*\blang="it"/i);
  assert.match(html, /<title>Revenge Gym/i);
  assert.match(html, /<meta[^>]+name="description"/i);
  assert.match(html, /<h1[^>]*>[\s\S]*RIVINCITA/i);
  assert.match(html, /id="contatti"/i);
  assert.match(html, /Visite uniche giornaliere/i);
  assert.match(html, /Visualizzazioni/i);
  assert.doesNotMatch(html, /Your site is taking shape|Building your site|codex-preview/i);
});

test("renders core public routes", async () => {
  for (const path of ["/boxe", "/nuove-macchine", "/macchine/gambe"]) {
    const response = await render(path);
    assert.equal(response.status, 200, path);
    const html = await response.text();
    assert.match(html, /<title>[^<]*Revenge Gym/i, path);
    assert.match(html, /<h1\b/i, path);
  }
});
