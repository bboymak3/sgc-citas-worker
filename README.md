# SGC Citas Worker — Bot WhatsApp con IA (legacy single-tenant, mantenido por compatibilidad)

![Cloudflare Workers](https://img.shields.io/badge/Cloudflare-Workers-F38020?logo=cloudflare&logoColor=white)
![Cloudflare D1](https://img.shields.io/badge/Cloudflare-D1%20(SQLite)-F38020?logo=cloudflare&logoColor=white)
![Workers AI](https://img.shields.io/badge/Workers%20AI-Llama%203.2%203B-F38020?logo=cloudflare&logoColor=white)
![Evolution API](https://img.shields.io/badge/Evolution%20API-v2.3.7-25D366?logo=whatsapp&logoColor=white)
![Llama 3.2 3B](https://img.shields.io/badge/Modelo-Llama%203.2%203B-7B68EE)
![JavaScript](https://img.shields.io/badge/Lenguaje-JavaScript%20(vanilla)-F7DF1E?logo=javascript&logoColor=black)

> **⚠️ Nota importante**
>
> Este worker es la versión **legacy single-tenant**. Se mantiene por compatibilidad y sigue corriendo como `tenant_id = 1` (negocio **SGC**) en paralelo con la nueva plataforma.
>
> Para **nuevos despliegues multi-tenant** usar [`sgc-saas`](https://github.com/bboymak3/sgc-saas), que es la evolución multi-tenant de este mismo código (mismas tablas, mismos prompts, misma estrategia híbrida) pero con aislamiento por inquilino.
>
> | | `sgc-citas-worker` (este repo) | `sgc-saas` |
> |---|---|---|
> | Tenant | Único (`tenant_id = 1`) | Múltiples |
> | Estado | Legacy / mantenido | Activo / nuevos despliegues |
> | Deploy | https://sgc-citas.activo.workers.dev | Ver repo |

---

## 🏗️ Arquitectura

```
  ┌───────────────┐      ┌─────────────────────┐      ┌─────────────────────────────┐
  │   WhatsApp     │ ───▶ │   Evolution API     │ ───▶ │   SGC Citas Worker          │
  │   (cliente)    │ ◀─── │   v2.3.7 (Railway)  │ ◀─── │   (Cloudflare Workers)      │
  │   +56 9 ...    │  SMS │   instancia         │  HTTP│   https://sgc-citas.        │
  └───────────────┘      │   "make peueba"     │      │        activo.workers.dev   │
                         └─────────────────────┘      └──────────────┬──────────────┘
                                                                       │
                                          ┌────────────────────────────┼────────────────────────────┐
                                          ▼                            ▼                            ▼
                              ┌────────────────────┐      ┌────────────────────┐      ┌────────────────────┐
                              │   Workers AI       │      │   D1 "citas"       │      │   ASSETS binding   │
                              │   @cf/meta/        │      │   (SQLite)         │      │   ./assets/*.html  │
                              │   llama-3.2-3b-    │      │   sgc_cit_*        │      │   chat web embebido│
                              │   instruct         │      │   sgc_ord_*        │      │   /, /ordenes, /admin │
                              └────────────────────┘      └────────────────────┘      └────────────────────┘
```

Flujo de un mensaje WhatsApp entrante:

1. El cliente escribe al número conectado a la instancia **"make peueba"** de Evolution API.
2. Evolution API dispara el webhook `POST /api/whatsapp/webhook` (`event: messages.upsert`).
3. El Worker recupera/crea la conversación, carga los **últimos 6 mensajes** y arma el system prompt.
4. Llama a **Workers AI (Llama 3.2 3B)** con estrategia híbrida (IA + parser manual).
5. Si corresponde, ejecuta un tool (`agendar_cita`, `verificar_disponibilidad`, `consultar_citas_cliente`, `cancelar_cita`) y persiste en **D1**.
6. Formatea la respuesta a sintaxis WhatsApp (`*negrita*`) y la envía por **Evolution API** (`sendText`).
7. Guarda ambos mensajes (inbound + outbound) en `sgc_cit_WhatsApp_messages`.

---

## 🧰 Tech Stack

| Capa | Tecnología |
|---|---|
| Runtime | Cloudflare Workers |
| IA | Cloudflare Workers AI — `@cf/meta/llama-3.2-3b-instruct` |
| Base de datos | Cloudflare D1 (SQLite) |
| WhatsApp bridge | Evolution API v2.3.7 (hosteado en Railway) |
| Lenguaje | JavaScript vanilla (ES modules) |
| Build / deploy | Wrangler 4.x |
| Assets estáticos | Cloudflare Workers Static Assets (binding `ASSETS`) |
| Compat | `nodejs_compat` |

---

## 🔌 APIs y Connectors

### Endpoints públicos

| Método | Path | Descripción |
|---|---|---|
| `POST` | `/api/chat` | Chat web con streaming SSE (mismo backend que WhatsApp) |
| `GET` | `/api/servicios` | Lista servicios activos (`sgc_cit_servicios_unificados`) |
| `GET` | `/api/disponibilidad?fecha=YYYY-MM-DD` | Horarios disponibles para una fecha |
| `POST` | `/api/agendar` | Agendar cita desde la API pública |
| `POST` | `/api/consultar-vehiculo` | Consultar vehículo por patente (busca en `TALLER_DB`) |
| `GET` | `/api/consultar-citas` | Consultar citas por teléfono o patente |
| `POST` | `/api/whatsapp/webhook` | Webhook de Evolution API (`messages.upsert`) |
| `GET` | `/api/whatsapp/test` | Health check del webhook |
| `GET` | `/api/migrate` | Aplica migraciones de schema D1 |

### Endpoints admin

| Método | Path | Descripción |
|---|---|---|
| `GET` | `/api/admin/servicios` | Listar servicios (admin) |
| `POST` | `/api/admin/servicios` | Crear servicio |
| `PUT` | `/api/admin/servicios/:id` | Actualizar servicio |
| `DELETE` | `/api/admin/servicios/:id` | Eliminar servicio |
| `GET` | `/api/citas-admin` | Listar todas las citas (panel admin) |
| `GET` | `/api/citas/stats` | Estadísticas agregadas de citas |
| `GET` | `/api/citas/rango?inicio=&fin=` | Citas por rango de fechas |
| `POST` | `/api/citas-admin/:id/aprobar` | Aprobar cita (crea orden de trabajo asociada) |
| `POST` | `/api/citas-admin/:id/rechazar` | Rechazar cita |

### Connectors

| Connector | Uso | Detalle |
|---|---|---|
| **Evolution API v2.3.7** (Railway) | WhatsApp bridge | Recibe webhook `messages.upsert` y envía respuestas vía `POST /message/sendText/{instance}` (y `sendMedia` para multimedia). Instancia: `make peueba`. |
| **Cloudflare Workers AI** | Razonamiento del bot | Modelo `@cf/meta/llama-3.2-3b-instruct` con function calling nativo y `tool_choice` forzado como respaldo. |
| **Cloudflare D1** | Persistencia | Tablas con prefijo `sgc_cit_*` (citas) y `sgc_ord_*` (órdenes/vehículos). Binding `DB` y `TALLER_DB` apuntan a la misma DB `citas`. |
| **Cloudflare ASSETS binding** | Chat web | Sirve `assets/index.html`, `assets/ordenes.html` y `assets/admin.html` desde el mismo Worker. |

---

## ⚙️ Funciones principales del Worker

| Función | Rol |
|---|---|
| `handleWhatsAppWebhook` | Entry point del webhook Evolution API: parsea `messages.upsert`, filtra grupos/mensajes propios y orquesta la conversación. |
| `buildWhatsAppSystemPrompt` | Construye el system prompt multi-nicho del bot (tono **"Sofi"**), inyectando fecha/hora de Chile, horario de atención, catálogo de servicios y contexto del cliente. |
| `executeWhatsAppTool` | Ejecuta los 4 tools del bot: `agendar_cita`, `verificar_disponibilidad`, `consultar_citas_cliente`, `cancelar_cita`. |
| `parseCitaFromHistory` | Parser manual de respaldo: extrae fecha/hora/servicio del historial cuando la IA no invoca el tool. |
| `getOrCreateWhatsAppConversation` | Gestiona la conversación por número de teléfono (crea o reutiliza registro en `sgc_cit_WhatsApp_conversations`). |
| `getWhatsAppHistory` | Carga el historial de la conversación (**6 mensajes** — recortado para ahorrar neuronas). |
| `saveWhatsAppMessages` | Persiste el mensaje inbound y el outbound en `sgc_cit_WhatsApp_messages` y actualiza la conversación. |
| `enviarWhatsAppEvolution` | Envía el mensaje de vuelta vía `POST /message/sendText/{instance}` de Evolution API. Divide mensajes > 3500 chars. |
| `formatForWhatsApp` | Convierte markdown a sintaxis WhatsApp (`**bold**` → `*bold*`, limpia `[]()`, headers `##` y bloques de código). |
| `formatDateSpanish` | Formatea fechas en español (`día de mes de año`, nombres de día/mes en es-CL, tz `America/Santiago`). |
| `getSystemPrompt` | System prompt del **chat web** (reglas estrictas de agendamiento, lista de servicios, validación de horario). |
| `getDisponibilidad` | Calcula horarios disponibles para una fecha respetando `sgc_cit_horarios`, `sgc_cit_bloqueos` y citas ya tomadas (sin doble booking). |
| `consultarVehiculoEnTaller` | Busca vehículo por patente en `TALLER_DB` (`sgc_ord_Vehiculos`) para enriquecer el contexto del cliente. |

---

## 🧠 Function calling híbrido

El bot usa una **estrategia híbrida** para maximizar la tasa de agendamiento correcto sin gastar neuronas de más:

1. **1ª llamada — IA con tools.** Se envía el historial + system prompt + tools a Llama 3.2 3B (soporta function calling nativo). La IA puede responder al usuario o invocar un tool.
2. **Detección de confirmación.** Si el usuario responde con palabras de confirmación (`si` / `sí` / `confirmo` / `dale` / `ok` / `claro` / `perfecto` / `genial`) **pero la IA no invocó el tool**, se pasa al paso 3.
3. **2ª llamada forzada.** Se re-invoca la IA con `tool_choice` forzado (la IA **debe** llamar al tool de agendar), garantizando que la confirmación del usuario se materialice en una cita.
4. **Parser manual de respaldo.** `parseCitaFromHistory` extrae fecha/hora/servicio directamente del historial si la IA aún no produce una invocación válida.
5. **Validaciones finales** (ejecutadas dentro del tool, antes de persistir):
   - Horario de atención: Lun–Vie 08–18, Sáb 09–14, Dom cerrado.
   - Sin doble booking (no se permiten 2 citas en el mismo bloque).
   - Fecha futura válida (si pide "hoy" y ya cerró el local, se sugiere el próximo día hábil).

> Beneficio: combina la naturalidez conversacional de la IA con la **determinismo** de un parser, evitando perder agendamientos por ambigüedad del modelo.

---

## 🗄️ Tablas D1 utilizadas

Todas las tablas viven en la DB `citas` (uuid `678b4adc-232d-43db-86ec-230828268161`) y operan con **`tenant_id = 1`** (default).

### Citas (prefijo `sgc_cit_`)

| Tabla | Contenido |
|---|---|
| `sgc_cit_Citas` | Citas agendadas (estado `pendiente` / `aprobada` / `rechazada` / `cancelada`) |
| `sgc_cit_Clientes` | Maestro de clientes |
| `sgc_cit_servicios_unificados` | Catálogo de servicios (nombre, descripción, duración, precio, categoría, `activo`) |
| `sgc_cit_horarios` | Horarios de atención por día de la semana |
| `sgc_cit_bloqueos` | Días/bloques bloqueados (feriados, vacaciones) |
| `sgc_cit_config` | Configuración key-value del negocio |
| `sgc_cit_AdminUsers` | Usuarios del panel admin |
| `sgc_cit_WhatsApp_conversations` | Conversaciones WhatsApp por teléfono (`client_context`, `last_message_at`, `total_messages`) |
| `sgc_cit_WhatsApp_messages` | Mensajes inbound/outbound de cada conversación |

### Órdenes y taller (prefijo `sgc_ord_`)

| Tabla | Contenido |
|---|---|
| `sgc_ord_OrdenesTrabajo` | Órdenes de trabajo (creadas al aprobar una cita) |
| `sgc_ord_Vehiculos` | Vehículos por patente (consultados por `consultarVehiculoEnTaller`) |
| `sgc_ord_Tecnicos` | Técnicos del taller |

> Las tablas `sgc_ord_*` se comparten con [`sgc-ordenes-pages`](https://github.com/bboymak3/sgc-ordenes-pages).

---

## 🔧 Configuración

### Variables (`[vars]` en `wrangler.toml`)

| Variable | Valor actual | Descripción |
|---|---|---|
| `BUSINESS_NAME` | `SGC` | Nombre del negocio (inyectado en prompts y UI) |
| `BUSINESS_PHONE` | `56939026185` | Teléfono de contacto |
| `SGCORDENES_URL` | `https://sgc-ordenes-di7.pages.dev` | URL del Pages de órdenes (para crear OT al aprobar cita) |
| `EVOLUTION_API_URL` | `https://evolution-api-production-91a07.up.railway.app` | URL base de Evolution API |
| `EVOLUTION_INSTANCE_NAME` | `make peueba` | Nombre de la instancia en Evolution API |

### Secrets

| Secret | Descripción |
|---|---|
| `EVOLUTION_API_KEY` | API key de Evolution API (setear con `wrangler secret put`) |

### Bindings

| Binding | Tipo | Destino |
|---|---|---|
| `DB` | D1 | DB `citas` (tablas `sgc_cit_*`) |
| `TALLER_DB` | D1 | DB `citas` (tablas `sgc_ord_*`) — mismo uuid |
| `AI` | Workers AI | `@cf/meta/llama-3.2-3b-instruct` |
| `ASSETS` | Static Assets | `./assets` (HTML del chat web) |

> ⚠️ `DB` y `TALLER_DB` apuntan a la **misma** D1 (`678b4adc-232d-43db-86ec-230828268161`). La separación es lógica (citas vs. taller), no física.

---

## 🚀 Deploy

```bash
# 1. Clonar
git clone https://github.com/bboymak3/sgc-citas-worker.git
cd sgc-citas-worker

# 2. Configurar API key de Evolution API como secret
echo "tu-api-key" | wrangler secret put EVOLUTION_API_KEY

# 3. (Opcional) Editar variables en wrangler.toml
#    BUSINESS_NAME, BUSINESS_PHONE, EVOLUTION_API_URL, EVOLUTION_INSTANCE_NAME, SGCORDENES_URL

# 4. Deploy
wrangler deploy
```

Requisitos previos: cuenta Cloudflare con Wrangler autenticado (`wrangler login`) y la D1 `citas` ya creada en la misma cuenta.

---

## 🪙 Optimización de neuronas

El plan free de Workers AI entrega **10.000 neuronas/día**. Este worker está afinado para gastar lo mínimo por mensaje:

| Palanca | Antes | Ahora | Ganancia |
|---|---|---|---|
| Modelo | Llama 3.1 8B | **Llama 3.2 3B** | ~60% menos neuronas/token |
| Historial por mensaje | 20 mensajes | **6 mensajes** | ~70% menos tokens de entrada |
| `max_tokens` (salida) | 1024 | **512** | ~50% menos tokens de salida |
| System prompt | Completo | **Comprimido** | menos tokens de entrada |

**Resultado:** ~**85% menos neuronas** por mensaje → **~5× más mensajes gratis/día** con la misma cuota free.

> El modelo Llama 3.2 3B soporta function calling nativo, por lo que la baja de tamaño **no** afecta la capacidad de invocar tools.

---

## 🔗 Repos relacionados

| Repo | Rol |
|---|---|
| [`sgc-saas`](https://github.com/bboymak3/sgc-saas) | **Versión multi-tenant nueva** — usar para nuevos despliegues |
| [`sgc-admin-pages`](https://github.com/bboymak3/sgc-admin-pages) | Panel admin (gestión de citas, aprobación/rechazo, calendario) |
| [`sgc-ordenes-pages`](https://github.com/bboymak3/sgc-ordenes-pages) | Sistema de órdenes de trabajo (comparte tablas `sgc_ord_*`) |
| [`sgc-recordatorios-worker`](https://github.com/bboymak3/sgc-recordatorios-worker) | Worker de recordatorios automáticos de citas |

---

## 📄 Licencia

Propietario — **SGC**. Todos los derechos reservados.
