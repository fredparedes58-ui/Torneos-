---
name: code-review
description: Revisa cambios de código del proyecto Torneos (Cantera Hub) aplicando las reglas específicas del repo. Usa cuando el usuario diga "revisa este PR", "review", "git diff review". Carga SIEMPRE repo-conventions primero. Para audits de diseño visual, prefiere design-system-guardian. Para validación de mock.ts, mock-data-validator. Para pre-push, deploy-sentinel.
---

# Code Review — Torneos

Review general del código de Torneos aplicando los bloqueantes y warnings específicos de Pedro.

## Cómo trabajar

1. **Carga SIEMPRE primero:**
   - `.claude/skills/repo-conventions/SKILL.md`
   - Details relevantes según los archivos tocados.

2. **Detecta el alcance** del cambio:
   - Visual/UI → considerar DELEGAR a `design-system-guardian`.
   - Mock data → DELEGAR a `mock-data-validator`.
   - Pre-push → DELEGAR a `deploy-sentinel`.
   - Lógica general / refactor → esta skill.

3. **Aplica los checks**:
   - Bloqueantes críticos → `details/critical-blockers.md`
   - Bloqueantes → `details/blockers.md`
   - Warnings → `details/warnings.md`

4. **Formato de comentarios** → `details/comment-format.md`.

5. **Resumen final** → `details/summary-format.md`.

## Principios de Pedro

- **"Una pasada que funciona" > "tres preguntas".** Sé decisivo. Si tienes 80% de seguridad sobre un fix, propónlo en vez de preguntar 3 cosas para llegar al 95%.
- **Edit puntual, no reescrituras.** Si un fix es 2 líneas, no propongas reescribir el componente.
- **Specific & actionable.** Cita archivo + línea + fix.

## Delegación a skills especializadas

Esta skill es la "general purpose". Para problemas específicos:

| Problema | Skill mejor especializada |
|---|---|
| Hex hardcoded, fonts inline, replicación de utilities | `design-system-guardian` |
| Bracket impar, stats no cuadran, formato torneo | `mock-data-validator` |
| Build verification, console.log, TS6133 | `deploy-sentinel` |
| Diferencias respecto al diseño Stitch | `stitch-sync` |

`code-review` cubre:
- Lógica de React (estados, effects, props).
- Estructura de componentes.
- TypeScript types.
- Manejo de errores.
- Patrones del repo (mock-first, animaciones, fallbacks).

## Output esperado

Comentarios estructurados por severidad + comentario resumen con veredicto.

```markdown
## Code Review — <PR/diff>

### 🚨🚨 Critical (N)
[lista]

### 🚨 Blockers (N)
[lista]

### ⚠️ Warnings (N)
[lista]

### 💡 Suggestions (N)
[lista]

### ✅ Lo que está bien
[items]

### Veredicto
[approve | request changes | comment]
```

## Qué NO hacer

- No comentar sobre estilo que ESLint o Prettier ya manejan.
- No proponer refactorings grandes en PRs pequeños.
- No duplicar el trabajo de `design-system-guardian` (mejor delegar y mencionarlo).
- No bloquear por preferencias personales.
