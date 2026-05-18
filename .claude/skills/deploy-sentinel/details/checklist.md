# Checklist deploy-sentinel

## (a) Build pasa sin errores

### Comando

```bash
npm run build
# Equivale a: tsc -b && vite build
```

### Qué buscar en el output

**Errores que bloquean:**
- `error TS....`: cualquier error de TypeScript.
- `[plugin:vite:react-babel]` errores.
- `Error: ...` durante `vite build`.

**Warnings específicos que SE TRATAN como errores (-w en este proyecto):**
- `error TS6133: 'X' is declared but never used.` → Imports no usados de `lucide-react` típicamente. BLOQUEA.

### Cómo parsear

```bash
npm run build 2>&1 | tee /tmp/build.log

# Buscar errores TS
grep -E "error TS[0-9]+" /tmp/build.log
# o más específico:
grep "TS6133" /tmp/build.log  # imports no usados
```

### Si falla

```
🚫 BLOCKER — Build failed

Errores detectados:
- src/pages/BracketView.tsx:14: error TS6133: 'Calendar' is declared but never used.
- src/components/TournamentCard.tsx:42: error TS2322: Type 'string' is not assignable to type 'number'.

Fix:
1. Remover imports no usados de lucide-react (TS6133).
2. Corregir tipos según los errores TS específicos.

NO se puede pushear hasta que `npm run build` pase verde.
```

## (b) Bundle size ≤ 500 KB minified

### Comando

Tras `npm run build` exitoso, inspeccionar `dist/`:

```bash
ls -lh dist/assets/*.js
# Output esperado:
# -rw-r--r-- 1 user user 380K may 15 18:30 index-abc123.js
```

Para suma total de todos los `.js` minified:

```bash
du -sh dist/assets/*.js | tail -1
# o sumar manualmente:
ls -l dist/assets/*.js | awk '{sum += $5} END {print sum/1024 " KB"}'
```

### Umbrales

| Tamaño | Severidad |
|---|---|
| ≤ 400 KB | ✅ óptimo |
| 400-500 KB | ⚠️ warning (sigue siendo aceptable) |
| > 500 KB | 🚫 BLOQUEAR |

### Si excede

```
🚫 BLOCKER — Bundle excede 500 KB minified

Bundle actual: 587 KB
Límite: 500 KB

Posibles causas:
1. Dependencia nueva pesada en el último commit. Revisar:
   git diff HEAD~1 -- package.json

2. Import no tree-shakeable. Verificar:
   - Imports de lucide-react: SOLO importar iconos específicos.
   - Imports de framer-motion: usar imports nombrados.

3. Asset grande accidentalmente incluido. Verificar:
   ls -lh dist/assets/

Análisis sugerido:
   npx vite-bundle-visualizer
```

### Si está entre 400-500 KB

```
⚠️ Warning — Bundle 442 KB (cerca del límite de 500 KB)

No bloquea, pero está alto. Considerar optimizar antes de añadir más features.
```

## (c) Sin console.log en src/

### Comando

```bash
grep -rn "console\.log" src/
```

### Excepciones aceptables

- `console.error`: OK (errores de verdad).
- `console.warn`: OK con moderación.
- `console.log` dentro de archivo `*.test.ts` o `*.spec.ts`: OK.
- `console.log` envuelto en `if (import.meta.env.DEV)`: OK (solo en dev).

### Si encuentra console.log

```
⚠️ Warning — N console.log statements found in src/

- src/pages/DashboardPage.tsx:42: console.log('torneos', torneos);
- src/components/BracketView.tsx:78: console.log(matches);
- src/hooks/useTorneos.ts:15: console.log('fetching');

Recomendado: limpiar antes de push.

Si necesitas alguno para dev:
  if (import.meta.env.DEV) console.log(...)
```

NO bloquea automáticamente, pero si hay >5, escalar a bloqueo.

## (d) tsc -b sin errores

### Comando

```bash
npx tsc -b
# o
tsc --build
```

### Por qué hacerlo aparte de (a)

A veces `vite build` pasa (porque Vite es más permisivo) pero `tsc -b` falla. Especialmente con:
- Errores en archivos que Vite no incluye en el bundle (utils internos).
- Conflictos de tipos en proyecto referenciado.
- Strict mode flags que Vite no aplica.

Mejor descubrirlo localmente que en deploy.

### Si falla

```
🚫 BLOCKER — tsc -b failed

Errores detectados que `vite build` no atrapó:

[lista de errores]

Fix los errores antes de pushear. tsc es la fuente de verdad de la tipificación.
```

## Checks adicionales opcionales

### postcss.config.js existe

```bash
test -f postcss.config.js || echo "❌ postcss.config.js MISSING from root"
```

Si falta → ⚠️ warning (recordar el gotcha del global).

### Secrets en .env

```bash
test -f .env && grep -E "(API_KEY|SECRET|TOKEN)=.*[a-zA-Z0-9]" .env
# Si match → BLOCK
```

→ 🚫 Bloqueante si `.env` está siendo trackeado.

```bash
git ls-files | grep -E "^\.env"
# Si match → BLOCK
```

### Puerto 5300 sigue en vite.config

```bash
grep "port" vite.config.ts vite.config.js 2>/dev/null
# Debe mostrar 5300, no otro valor
```

→ 🚫 Bloqueante si el puerto cambió.

## Orden de ejecución recomendado

1. Check (d) primero: `tsc -b` (rápido, falla rápido si hay error grave).
2. Check (c): `grep console.log` (rápido).
3. Check (a) + (b): `npm run build` (más lento, pero ahora sabes que tsc pasa).
4. Cheques adicionales tras build.

Esto da feedback rápido en errores comunes antes de gastar tiempo en el build completo.
