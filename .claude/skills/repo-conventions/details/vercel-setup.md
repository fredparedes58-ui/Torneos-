# Setup Vercel — Torneos

## Comandos correctos

### Deploy

```bash
# ✅ Correcto
vercel deploy --prod

# ❌ Incorrecto (deprecated)
npx vercel --name X
```

El flag `--name` está deprecated desde 2023. El nombre del proyecto se configura via dashboard.

### Preview

```bash
vercel
# o
vercel deploy
# sin --prod genera preview URL
```

## Env vars: SOLO en dashboard

### 🚨🚨 Bloqueante crítico

**NUNCA** commitear:
- `.env`
- `.env.local`
- `.env.production`

Aunque sean para development local. Riesgo de que se pushee a remote.

### Cómo configurar env vars

1. Dashboard de Vercel → Project → Settings → Environment Variables.
2. Añadir variable con:
   - Name: `ANTHROPIC_API_KEY` (o lo que sea)
   - Value: el secret.
   - Environment: Production / Preview / Development.

### Acceso desde el código

```ts
// En Edge Functions, API routes, server-side:
const key = process.env.ANTHROPIC_API_KEY;

// En cliente (Vite):
const publicKey = import.meta.env.VITE_PUBLIC_THING;
// Solo si la variable empieza por VITE_ se expone al cliente.
```

### 🚨 Bloqueante: VITE_ANTHROPIC_API_KEY u otra clave secreta con prefijo VITE_

Eso la expone al bundle del cliente.

## Detección automática

`deploy-sentinel` busca:
```bash
grep -rE "(API_KEY|SECRET|TOKEN)" .env* 2>/dev/null
# Si encuentra archivo .env con secrets → BLOCK push
```

## Build local antes de push

```bash
npm run build
# o
tsc -b && vite build
```

Si el build local falla, el deploy de Vercel también fallará. Mejor descubrirlo localmente.

`deploy-sentinel` automatiza este check.

## Tamaño de bundle

Target: <400 KB minified (warning si supera).
Límite duro: 500 KB minified (deploy-sentinel bloquea si supera).

Vercel acepta builds más grandes, pero perjudica performance percibida.
