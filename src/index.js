// ============================================================
// sgc-citas (LEGACY, single-tenant) — reemplazado por sgc-saas.
//
// Capa de seguridad delante del worker original (legacy/index.js):
//  - /api/whatsapp/webhook exige WEBHOOK_SECRET (?k= o header X-Webhook-Secret)
//  - endpoints de administración exigen "Authorization: Bearer <ADMIN_TOKEN>"
//  - /api/migrate queda deshabilitado (el esquema se gestiona con migraciones D1)
// Ambos secrets fallan cerrado: sin configurar, las rutas protegidas responden 503.
// ============================================================

import legacy from "../legacy/index.js";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Webhook-Secret"
};

const ADMIN_ROUTES = [/^\/api\/admin\//, /^\/api\/citas-admin(\/|$)/, /^\/api\/citas\/(stats|rango)$/, /^\/api\/consultar-(citas|vehiculo)$/];

function json(data, status) {
  return new Response(JSON.stringify(data), { status, headers: { ...CORS, "Content-Type": "application/json" } });
}

export function timingSafeEqual(a, b) {
  if (typeof a !== "string" || typeof b !== "string" || a.length !== b.length || !a.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

function bearer(request) {
  const m = (request.headers.get("Authorization") || "").match(/^Bearer\s+(.+)$/i);
  return m ? m[1].trim() : "";
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname;
    if (request.method === "OPTIONS") return new Response(null, { headers: CORS });

    if (path === "/api/migrate") {
      return json({ success: false, error: "Deshabilitado: usar las migraciones D1 de sgc-saas" }, 410);
    }
    if (path === "/api/whatsapp/webhook" && request.method === "POST") {
      if (!env.WEBHOOK_SECRET) return json({ success: false, error: "Webhook deshabilitado: falta WEBHOOK_SECRET" }, 503);
      const provided = url.searchParams.get("k") || request.headers.get("X-Webhook-Secret") || "";
      if (!timingSafeEqual(provided, env.WEBHOOK_SECRET)) return json({ success: false, error: "No autorizado" }, 401);
    }
    if (ADMIN_ROUTES.some((re) => re.test(path))) {
      if (!env.ADMIN_TOKEN) return json({ success: false, error: "Admin deshabilitado: falta ADMIN_TOKEN" }, 503);
      if (!timingSafeEqual(bearer(request), env.ADMIN_TOKEN)) return json({ success: false, error: "No autorizado" }, 401);
    }

    const res = await legacy.fetch(request, env, ctx);
    // Sin detalles internos en errores 500
    if (res.status === 500 && (res.headers.get("Content-Type") || "").includes("application/json")) {
      return json({ error: "Error interno" }, 500);
    }
    return res;
  }
};
