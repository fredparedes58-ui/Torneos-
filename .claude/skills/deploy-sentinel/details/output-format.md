# Formato del output

## Template

```markdown
## Deploy Sentinel — pre-push check

**Branch:** [branch actual]
**Último commit:** [hash + mensaje]
**Tiempo total:** [duración del check]

### Checklist

| Check | Resultado |
|---|---|
| (a) Build pasa | ✅ / ❌ |
| (b) Bundle ≤ 500 KB | ✅ / ⚠️ / ❌ |
| (c) Sin console.log | ✅ / ⚠️ |
| (d) tsc -b sin errores | ✅ / ❌ |
| (extra) postcss.config.js presente | ✅ / ⚠️ |
| (extra) .env no trackeado | ✅ / ❌ |
| (extra) puerto 5300 intacto | ✅ / ❌ |

---

### Detalles

[Por cada check fallido o warning, sección con:]
- Comando ejecutado.
- Output relevante.
- Fix sugerido.

---

### Métricas

- Build time: NN s
- Bundle size (minified): NNN KB
  - Detalle: `dist/assets/*.js`
- console.log statements: N

---

### Veredicto

[Uno de:]
- 🚫 **BLOQUEAR push** — N checks críticos fallaron. Resolver antes de pushear.
- ⚠️ **Push con advertencias** — Build pasa pero hay warnings. Considera limpiar.
- ✅ **LISTO para push** — Todos los checks pasan.

[Si listo:]
```bash
git push origin main
```
```

## Output cuando todo está bien

```markdown
## Deploy Sentinel — pre-push check

✅ **LISTO para push**

| Check | Resultado |
|---|---|
| (a) Build | ✅ |
| (b) Bundle | ✅ 387 KB |
| (c) console.log | ✅ |
| (d) tsc -b | ✅ |

Build time: 8.2 s.

```bash
git push origin main
```
```

## Output cuando hay fallo crítico

```markdown
## Deploy Sentinel — pre-push check

🚫 **BLOQUEAR push**

### Falla crítica: TS6133 en build

```
src/pages/DashboardPage.tsx:14:1 - error TS6133: 'Calendar' is declared but never used.

14 import { Trophy, Calendar, Users } from 'lucide-react';
   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

### Fix:
Remover `Calendar` del import (no se usa en este archivo):

```diff
- import { Trophy, Calendar, Users } from 'lucide-react';
+ import { Trophy, Users } from 'lucide-react';
```

### Otros checks
- (b) Bundle: no aplicable (build falló).
- (c) console.log: 0 detectados.
- (d) tsc: igual que build (mismo error).

---

**No se puede pushear hasta que `npm run build` pase verde.**
```

## Output cuando hay warnings pero no bloquea

```markdown
## Deploy Sentinel — pre-push check

⚠️ **Push con advertencias**

### Checks principales: ✅

Build y tsc pasan. Bundle: 432 KB (✅ bajo 500).

### Warnings

#### console.log statements (4)

- src/pages/DashboardPage.tsx:42
- src/components/BracketView.tsx:78
- src/hooks/useTorneos.ts:15
- src/utils/format.ts:8

Recomendado: limpiar antes de push.

Si necesitas algunos para dev:
```ts
if (import.meta.env.DEV) console.log(...);
```

### Veredicto

Puedes pushear (no bloqueante), pero considera limpiar primero.

```bash
git push origin main  # OK pero...
```

¿Quieres que limpie los console.log antes?
```

## Reglas para el output

- **Mostrar comando exacto** para que el humano pueda re-ejecutarlo.
- **Output bruto cuando hay error**: copy-paste el mensaje original de TS/Vite.
- **Fix accionable**: diff específico, no descripción vaga.
- **Tiempos**: útiles para detectar regresiones (build que pasó de 5s a 20s indica algo).
- **Sin paja**: si todo OK, breve. Reservar detalle para los failures.
