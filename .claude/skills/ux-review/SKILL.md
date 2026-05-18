---
name: ux-review
description: Revisa la calidad técnica de UX en componentes y páginas de Torneos (Cantera Hub). Cubre accesibilidad, responsive/touch en web, los 5 estados de UI (loading/success/empty/error/idle), microcopy con vocabulario scouting, y feedback visual con animaciones Framer Motion. Usa cuando el usuario diga "revisa la UX", "valida accesibilidad", "check de estados", "revisa el componente <X>". NO juzga estética ni flujos.
---

# UX Review — Torneos (Cantera Hub)

Revisa la calidad **técnica** de la UX. No la estética.

## Qué cubre esta skill

- **Accesibilidad técnica:** alt, aria, contraste, navegación por teclado, semántica HTML.
- **Responsive / touch:** tap targets, viewport, inputs con teclados correctos, no hover-only.
- **Estados de UI:** ¿cubre idle / loading / success / empty / error?
- **Microcopy:** español sin tildes (convención Torneos), vocabulario scouting, CTAs accionables.
- **Feedback y motion:** feedback visual <100ms, animaciones Framer Motion 150-350ms, `prefers-reduced-motion`.

## Qué NO cubre

- ❌ Estética / "se ve bonito" / "se siente Digital Stadium".
- ❌ Si el flujo del usuario tiene sentido.
- ❌ Si la jerarquía visual destaca lo correcto.
- ❌ Patrones móviles nativos (Capacitor) — Torneos es web puro.
- ❌ Performance percibida real (eso requiere medir en dispositivo).

Si la pregunta es de las anteriores, dile al usuario que esta skill no aplica y que esas son decisiones de juicio humano o user testing.

## Cómo trabajar

1. **Carga siempre primero:**
   - `.claude/skills/repo-conventions/SKILL.md`
   - `.claude/skills/repo-conventions/details/design-tokens.md`
   - `.claude/skills/repo-conventions/details/code-patterns.md`

2. **Identifica el tipo de UI revisada:**
   - Componente UI reutilizable (`src/components/`) → foco en accesibilidad + estados.
   - Página completa (`src/pages/`) → foco en estados + microcopy + motion.
   - Formulario (registro de equipo, crear torneo) → foco en accesibilidad + responsive + feedback.
   - Tabla / bracket / fixture → foco en accesibilidad de tabla + estados empty.

3. **Aplica los checks por categoría:**
   - Accesibilidad → `details/accessibility.md`
   - Responsive y touch → `details/responsive-and-touch.md`
   - Estados UI → `details/ui-states.md`
   - Microcopy → `details/microcopy.md`
   - Feedback y motion → `details/feedback-and-motion.md`

4. **Output:** reporte con findings por severidad. Misma escala que `code-review`:
   - 🚨 Blocker: bloquea merge (a11y crítico, sin estados, tap target inutilizable).
   - ⚠️ Warning: avisar (microcopy mejorable, animación demasiado larga).
   - 💡 Suggestion: opcional.

## Principios

- **Cita la regla concreta**, no opinión personal.
- **Da el fix con código**, no solo describas el problema.
- **Sé proporcional**: 8 warnings → pasada de pulido; 1 blocker → no mergeable.
- **No comentes sobre estética.** Si te pica decir "esto se ve raro", muérdete la lengua o pide screenshot y deja juzgar al humano.

## Delegación con otras skills

| Quieres revisar | Mejor skill |
|---|---|
| Coherencia visual (paleta, fonts, utilities) | `design-system-guardian` |
| Lógica React, types, errores | `code-review` |
| Mock data inconsistente | `mock-data-validator` |
| Build / TS6133 / bundle | `deploy-sentinel` |

Esta skill (`ux-review`) cubre LO TÉCNICO de la experiencia de uso: a11y, estados, microcopy, motion. No solapa con las demás.

## Qué NO hacer

- No dupliques reglas que ya están en `repo-conventions`. Solo refiéncialas si están violadas.
- No comentes sobre seguridad o claves (eso es `code-review` con critical-blockers).
- No propongas cambios de framework. Trabaja con React + Tailwind v4 + Framer Motion + Lucide.

## Output esperado

```markdown
## UX Review — <componente / página>

### Tipo de UI
[componente UI / página / formulario / tabla]

### 🚨 Blockers
[lista o "Ninguno"]

### ⚠️ Warnings
[lista o "Ninguno"]

### 💡 Sugerencias
[lista o "Ninguno"]

### ✅ Lo que está bien
[items destacables]

### Fuera del alcance de esta skill
[Si has detectado posibles problemas de flujo/estética, menciónalos 
brevemente para que el humano los considere, sin convertirlos en findings.]
```
