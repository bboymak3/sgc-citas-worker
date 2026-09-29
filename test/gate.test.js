import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { FakeD1 } from "./d1.js";
import worker from "../src/index.js";

function makeEnv(overrides = {}) {
  const db = new FakeD1();
  db.exec_(readFileSync(new URL("./schema.sql", import.meta.url), "utf8"));
  db.exec_("INSERT INTO sgc_cit_servicios_unificados (nombre, activo, tenant_id) VALUES ('Frenos', 1, 1)");
  return {
    DB: db, TALLER_DB: db, AI: { run: async () => ({ response: "hola" }) },
    ASSETS: { fetch: async () => new Response("asset") },
    ADMIN_TOKEN: "admin-tok", WEBHOOK_SECRET: "wh-secret", EVOLUTION_API_URL: "https://evo.test", EVOLUTION_API_KEY: "k",
    ...overrides
  };
}

const call = async (env, method, path, { token, headers = {}, body } = {}) => {
  const res = await worker.fetch(new Request(`https://citas.test${path}`, {
    method,
    headers: { ...(token ? { Authorization: `Bearer ${token}` } : {}), ...(body ? { "Content-Type": "application/json" } : {}), ...headers },
    body: body ? JSON.stringify(body) : undefined
  }), env, { waitUntil() {} });
  return { status: res.status, text: await res.text() };
};

test("webhook exige WEBHOOK_SECRET", async (t) => {
  const sent = [];
  const orig = globalThis.fetch;
  globalThis.fetch = async (url) => { sent.push(url); return Response.json({}); };
  t.after(() => { globalThis.fetch = orig; });
  const env = makeEnv();
  const body = { event: "messages.upsert", data: { key: { remoteJid: "56911111111@s.whatsapp.net" }, message: { conversation: "hola" } } };
  assert.equal((await call(env, "POST", "/api/whatsapp/webhook", { body })).status, 401);
  assert.equal((await call(env, "POST", "/api/whatsapp/webhook?k=malo", { body })).status, 401);
  assert.equal((await call(makeEnv({ WEBHOOK_SECRET: undefined }), "POST", "/api/whatsapp/webhook?k=", { body })).status, 503);
  assert.equal(sent.length, 0);
  assert.equal((await call(env, "POST", "/api/whatsapp/webhook?k=wh-secret", { body })).status, 200);
});

test("rutas admin exigen ADMIN_TOKEN; públicas siguen abiertas", async () => {
  const env = makeEnv();
  for (const p of ["/api/admin/servicios", "/api/citas-admin", "/api/citas/stats", "/api/citas/rango?inicio=2026-01-01&fin=2026-01-02", "/api/consultar-citas?patente=X"]) {
    assert.equal((await call(env, "GET", p)).status, 401, p);
  }
  assert.equal((await call(env, "GET", "/api/admin/servicios", { token: "admin-tok" })).status, 200);
  assert.equal((await call(makeEnv({ ADMIN_TOKEN: undefined }), "GET", "/api/admin/servicios")).status, 503);
  assert.equal((await call(env, "GET", "/api/migrate", { token: "admin-tok" })).status, 410);
  const pub = await call(env, "GET", "/api/servicios");
  assert.equal(pub.status, 200);
  assert.match(pub.text, /Frenos/);
});
