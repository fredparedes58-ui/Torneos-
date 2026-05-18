# 🚨🚨 Bloqueantes críticos de Torneos

Sin discusión. Si detectas, bloqueas el merge.

## 1. API keys en código o .env commiteado

### Qué buscar

```bash
# Archivos .env trackeados:
git ls-files | grep -E "^\.env"

# API keys hardcoded en código:
grep -rE "(sk-ant-|API_KEY=|SECRET=|TOKEN=)[a-zA-Z0-9]+" src/ api/ 2>/dev/null
```

### Cómo reportar

```
🚨🚨 CRITICAL — API key exposure: <archivo>:<línea>

[Cita exacta del código]

Para Torneos, TODAS las claves van en Vercel env vars (dashboard).
NUNCA en código, NUNCA en .env commiteado.

Acción requerida:
1. Eliminar la línea o archivo.
2. Si está commiteado: ROTAR la clave en el dashboard del servicio (Anthropic, Vercel, etc.).
3. Configurar en Vercel dashboard → Settings → Environment Variables.

NO se mergea hasta resolver.
```

## 2. Push a main sin build verificado

### Qué buscar

Pista: si el PR está sobre `main` directamente y el último commit local no tiene evidencia de `npm run build` exitoso.

### Cómo verificar

```bash
git log -1 --format="%H %s"
# El usuario debe haber corrido deploy-sentinel antes
```

### Cómo reportar

```
🚨🚨 CRITICAL — Push directo a main sin build verificado

Política del proyecto: TODO push a main requiere `tsc -b && vite build` verde.

Acción requerida:
Antes de pushear, ejecuta deploy-sentinel:
"Corre deploy-sentinel"

Si pasa verde, push autorizado.

NO se autoriza push hasta verificar.
```

## 3. Cambio de la paleta core

### Qué buscar

En archivos de @theme / globals / configuración de Tailwind v4, modificaciones a:
- `#111508`
- `#C8FF00`
- `#C4CAAC`
- `#434933`

### Cómo reportar

```
🚨🚨 CRITICAL — Cambio a paleta core del Digital Stadium

Color modificado: <color> de <hex_original> a <hex_nuevo>.

La paleta core del Digital Stadium (#111508 / #C8FF00 / #C4CAAC / #434933) 
es INMUTABLE sin discusión explícita.

Si se requiere cambio:
1. Discusión explícita con Pedro.
2. Razón documentada (idealmente: nuevo ZIP Stitch que lo justifique).
3. Update simultáneo en design-system-guardian y este archivo de bloqueantes.

NO se mergea hasta confirmación.
```

## 4. Cambio del sistema de fonts

### Qué buscar

Modificación de los mappings de:
- `font-display` (Barlow Condensed)
- `font-mono` (JetBrains Mono)
- `font-body` (DM Sans)

### Cómo reportar

```
🚨🚨 CRITICAL — Cambio del sistema de fonts

Font modificado: <utility> de <font_original> a <font_nueva>.

Las fonts inamovibles de Torneos son:
- font-display → Barlow Condensed
- font-mono → JetBrains Mono
- font-body → DM Sans

Cambiar implica:
- Re-evaluación completa del diseño visual.
- Posible inconsistencia con Stitch.

NO se mergea sin decisión explícita del propietario.
```

## 5. Cambio del puerto 5300

### Qué buscar

En `vite.config.ts` o `vite.config.js`:

```ts
server: {
  port: 5300,  // ← este valor
}
```

### Cómo reportar

```
🚨🚨 CRITICAL — Cambio del puerto 5300

Puerto modificado: 5300 → <nuevo>.

El puerto 5300 está RESERVADO para Torneos. El puerto 5200 está reservado 
para futuro-club.

Cambiar el puerto causa conflictos con otros proyectos en desarrollo 
local. Restaurar a 5300.
```
