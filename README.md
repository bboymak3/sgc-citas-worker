# SGC Citas Worker

Bot de WhatsApp con IA para agendamiento de citas del taller mecánico SGC.

## 🏗️ Arquitectura

- **Runtime**: Cloudflare Workers
- **IA**: Cloudflare Workers AI (`@cf/meta/llama-3.2-3b-instruct`)
- **DB**: Cloudflare D1 (tabla `sgc_cit_*` en database `citas`)
- **WhatsApp**: Evolution API v2 (Railway)
- **Assets**: HTML estático para chat web en `/assets/`

## 📋 Endpoints

| Método | Path | Descripción |
|---|---|---|
| `POST` | `/api/whatsapp/webhook` | Recibe webhooks de Evolution API |
| `GET` | `/api/whatsapp/test` | Test del webhook |
| `POST` | `/api/chat` | Chat web (streaming) |
| `GET` | `/api/servicios` | Lista servicios activos |
| `GET` | `/api/disponibilidad?fecha=YYYY-MM-DD` | Horarios disponibles |
| `POST` | `/api/agendar` | Agenda una cita |
| `GET` | `/api/citas-admin` | Lista citas (admin) |
| `POST` | `/api/citas-admin/:id/aprobar` | Aprueba cita + crea orden |
| `POST` | `/api/citas-admin/:id/rechazar` | Rechaza cita |
| `GET` | `/api/migrate` | Aplica migraciones de schema |

## 🔧 Configuración

### Variables de entorno (en wrangler.toml)
- `BUSINESS_NAME`: Nombre del negocio
- `BUSINESS_PHONE`: Teléfono de contacto
- `SGCORDENES_URL`: URL del Pages sgc-ordenes
- `EVOLUTION_API_URL`: URL base de Evolution API
- `EVOLUTION_INSTANCE_NAME`: Nombre de la instancia en Evolution API

### Secrets (configurar con `wrangler secret put`)
- `EVOLUTION_API_KEY`: API key de Evolution API

### Bindings
- `DB`: D1 database `citas`
- `TALLER_DB`: D1 database `citas` (mismo, para queries de órdenes)
- `AI`: Cloudflare Workers AI
- `ASSETS`: Archivos estáticos HTML

## 🚀 Deploy

```bash
# Instalar wrangler
npm install -g wrangler

# Login
wrangler login

# Configurar secret
echo "tu-api-key" | wrangler secret put EVOLUTION_API_KEY

# Deploy
wrangler deploy
```

## 📊 Tablas D1 utilizadas

- `sgc_cit_Citas` - Citas agendadas
- `sgc_cit_Clientes` - Clientes
- `sgc_cit_servicios_unificados` - Catálogo de servicios
- `sgc_cit_horarios` - Horarios de atención por día
- `sgc_cit_bloqueos` - Días bloqueados
- `sgc_cit_config` - Configuración key-value
- `sgc_cit_AdminUsers` - Usuarios admin
- `sgc_cit_WhatsApp_conversations` - Conversaciones de WhatsApp
- `sgc_cit_WhatsApp_messages` - Mensajes de WhatsApp
- `sgc_ord_OrdenesTrabajo` - Órdenes (de sgc-ordenes)
- `sgc_ord_Vehiculos` - Vehículos (de sgc-ordenes)

## 💰 Costo mensual: $0

Usa free tiers de Cloudflare + Railway.
