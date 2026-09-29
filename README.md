# SGC Citas Worker

Bot de WhatsApp con IA para agendamiento de citas. Multi-nicho: sirve para talleres mecánicos, clínicas dentales, barberías, salones de belleza, cualquier negocio basado en citas.

## 🏗️ Arquitectura

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│  WhatsApp       │ ←→ │  Evolution API  │ ←→ │  Worker         │
│  (cliente)      │     │  (Railway $0)   │     │  (Cloudflare)   │
└─────────────────┘     └─────────────────┘     └────────┬────────┘
                                                          │
                                                          ▼
                                                ┌─────────────────┐
                                                │  Workers AI     │
                                                │  Llama 3.2 3B   │
                                                └─────────────────┘
                                                          │
                                                          ▼
                                                ┌─────────────────┐
                                                │  D1 SQLite      │
                                                │  (tablas pref.) │
                                                └─────────────────┘
```

## ✨ Funcionalidades

### Chat WhatsApp con IA
- Recibe mensajes vía webhook de Evolution API
- IA Llama 3.2 3B (gratis hasta 10k neuronas/día)
- Respuestas en español natural, tono cálido y profesional
- Tono configurable (nombre del bot, personalidad, saludos)
- Historial persistente por número de teléfono (últimos 6 mensajes)

### Function calling nativo
- `agendar_cita` — Crea cita en D1 con estado `pendiente`
- `verificar_disponibilidad` — Comprueba horario libre
- `consultar_citas_cliente` — Lista citas futuras del cliente
- `cancelar_cita` — Cancela cita existente (valida propietario)

### Estrategia híbrida de agendamiento
1. La IA intenta function calling natural
2. Si el usuario confirma pero la IA no llama al tool → 2da llamada forzada con `tool_choice`
3. Parser manual de respaldo que extrae fecha/hora/servicio del historial

### Validaciones automáticas
- Horario de atención (Lun-Vie 8-18, Sáb 9-14, Dom cerrado)
- Sin doble booking (no permite 2 citas mismo horario)
- Detección de confirmaciones: "si/sí/confirmo/dale/ok/claro"
- Reconocimiento de fechas: "hoy", "mañana", "pasado mañana", DD/MM, YYYY-MM-DD
- Reconocimiento de horas: "10am", "3pm", "15:00", "10 de la tarde"
- Patentes chilenas (4 letras + 2 números, etc.)
- Marcas de vehículos más comunes

### Chat web embebido
- HTML servido desde `assets/` (vía binding `ASSETS`)
- 3 páginas: `/` (chat), `/ordenes` (vista órdenes), `/admin` (admin servicios)
- Mismo backend, misma IA

## 📋 Endpoints

| Método | Path | Descripción |
|---|---|---|
| `POST` | `/api/whatsapp/webhook` | Webhook Evolution API (messages.upsert) |
| `GET` | `/api/whatsapp/test` | Health check |
| `POST` | `/api/chat` | Chat web (streaming SSE) |
| `GET` | `/api/servicios` | Lista servicios activos |
| `GET` | `/api/disponibilidad?fecha=YYYY-MM-DD` | Horarios disponibles |
| `POST` | `/api/agendar` | Agendar cita (API pública) |
| `GET` | `/api/consultar-citas` | Consultar citas por teléfono/patente |
| `POST` | `/api/consultar-vehiculo` | Consultar vehículo por patente |
| `GET` | `/api/citas/stats` | Estadísticas |
| `GET` | `/api/citas/rango?inicio=&fin=` | Citas por rango de fechas |
| `GET` | `/api/citas-admin` | Lista citas (admin) |
| `POST` | `/api/citas-admin/:id/aprobar` | Aprobar cita + crear orden |
| `POST` | `/api/citas-admin/:id/rechazar` | Rechazar cita |
| `GET` | `/api/admin/servicios` | CRUD servicios |
| `POST` | `/api/admin/servicios` | Crear servicio |
| `PUT` | `/api/admin/servicios/:id` | Actualizar servicio |
| `DELETE` | `/api/admin/servicios/:id` | Eliminar servicio |
| `GET` | `/api/migrate` | Aplicar migraciones schema |

## 🔧 Configuración

### Variables de entorno (wrangler.toml)
| Variable | Descripción | Default |
|---|---|---|
| `BUSINESS_NAME` | Nombre del negocio | `SGC` |
| `BUSINESS_PHONE` | Teléfono de contacto | `56939026185` |
| `SGCORDENES_URL` | URL del Pages sgc-ordenes | - |
| `EVOLUTION_API_URL` | URL base Evolution API | - |
| `EVOLUTION_INSTANCE_NAME` | Nombre instancia en Evolution | - |

### Secrets (configurar con `wrangler secret put`)
| Secret | Descripción |
|---|---|
| `EVOLUTION_API_KEY` | API key de Evolution API |

### Bindings
- `DB` — D1 database (citas, tabla `sgc_cit_*`)
- `TALLER_DB` — D1 database (mismo, tablas `sgc_ord_*`)
- `AI` — Cloudflare Workers AI
- `ASSETS` — HTML del chat web

## 📊 Tablas D1 utilizadas

### Tablas de citas (prefijo `sgc_cit_`)
- `sgc_cit_Citas` — Citas agendadas
- `sgc_cit_Clientes` — Clientes
- `sgc_cit_servicios_unificados` — Catálogo de servicios
- `sgc_cit_horarios` — Horarios por día
- `sgc_cit_bloqueos` — Días bloqueados
- `sgc_cit_config` — Configuración key-value
- `sgc_cit_AdminUsers` — Usuarios admin
- `sgc_cit_WhatsApp_conversations` — Conversaciones WhatsApp
- `sgc_cit_WhatsApp_messages` — Mensajes WhatsApp

### Tablas de órdenes (prefijo `sgc_ord_`)
- `sgc_ord_OrdenesTrabajo`
- `sgc_ord_Vehiculos`
- `sgc_ord_Tecnicos`
- (etc — ver repo sgc-ordenes-pages)

## 🚀 Deploy

```bash
# 1. Clonar repo
git clone https://github.com/bboymak3/sgc-citas-worker.git
cd sgc-citas-worker

# 2. Editar wrangler.toml con tus valores
nano wrangler.toml

# 3. Configurar API key como secret
echo "tu-api-key-evolution" | wrangler secret put EVOLUTION_API_KEY

# 4. Deploy
wrangler deploy
```

## 💰 Costo mensual: $0

| Servicio | Costo | Límite free |
|---|---|---|
| Cloudflare Workers | $0 | 100k requests/día |
| Cloudflare Workers AI | $0 | 10k neuronas/día |
| Cloudflare D1 | $0 | 5M reads + 100k writes/día |
| Railway Evolution API | $0 | 500h/mes always-on |
| **Total** | **$0** | |

A partir de ~50-100 mensajes/día puede haber costos de $3-6/mes (Workers AI extra).

## 🔀 Multi-nicho: reutilizar para otros rubros

Este worker es **genérico**. Para adaptarlo a otro nicho (clínica dental, barbería, etc.) solo necesitas:

1. **Cambiar `BUSINESS_NAME`** en wrangler.toml
2. **Cambiar `BUSINESS_PHONE`** en wrangler.toml
3. **Cargar servicios propios** en `sgc_cit_servicios_unificados`
4. **Ajustar horarios** en `sgc_cit_horarios`
5. **(Opcional) Personalizar tono** en la función `buildWhatsAppSystemPrompt`

No necesitas tocar el código. Ver sección "Multi-tenant" abajo.

## 📚 Repos relacionados

- [sgc-admin-pages](https://github.com/bboymak3/sgc-admin-pages) — Panel admin (gestión de citas)
- [sgc-ordenes-pages](https://github.com/bboymak3/sgc-ordenes-pages) — Sistema de órdenes de trabajo
- [sgc-recordatorios-worker](https://github.com/bboymak3/sgc-recordatorios-worker) — Recordatorios automáticos

## 🔄 Multi-tenant (vender como SaaS)

Para vender este bot a múltiples negocios sin clonar el código cada vez:

### Opción 1: Una cuenta Cloudflare por cliente (simple)
- Cada cliente tiene su propia cuenta Cloudflare (free tier)
- Deployas 1 worker + 1 D1 + 1 Pages por cliente
- Costo por cliente: $0
- Tiempo de onboarding: 30 min

### Opción 2: Multi-tenant en tu cuenta (escalar)
- 1 sola cuenta Cloudflare tuya
- 1 worker compartido que detecta el tenant por URL/instancia
- D1 con tabla `tenants` que mapea `instance_name → business_config`
- Cada cliente tiene su propia Evolution API instance
- Costo: $0 hasta límites de free tier
- Tiempo de onboarding: 5 min (solo INSERT en tabla tenants)

Ver documentación completa en: [MULTI-TENANT.md](MULTI-TENANT.md)

## 📄 Licencia

Propietario — Seguros Líder / SGC
