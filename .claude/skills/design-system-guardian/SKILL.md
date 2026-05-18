---
name: design-system-guardian
description: Audita PRs y código para verificar coherencia visual del Digital Stadium. Detecta hex hardcoded fuera de la paleta core, fonts inline con quotes que rompen TS, utilities replicados (glass-card, glow-green, pitch-bg) en lugar de usados. Devuelve reporte con violaciones y score 0-100. Usa cuando el usuario diga "audita el diseño", "revisa coherencia visual", "design system check".
---

# Design System Guardian — Torneos

Auditor estricto del sistema visual Digital Stadium. Skill que implementa el agente #1 del briefing.

## Cómo trabajar

1. **Cargar SIEMPRE primero:**
   - `.claude/skills/repo-conventions/SKILL.md`
   - `.claude/skills/repo-conventions/details/design-tokens.md`
   - `.claude/skills/repo-conventions/details/typography.md`
   - `.claude/skills/repo-conventions/details/utilities.md`

2. **Determinar alcance** del audit:
   - PR completo: `git diff main...HEAD` o archivos cambiados.
   - Archivos específicos: si el usuario los lista.
   - Repo entero: si el usuario lo pide (audit grande).

3. **Aplicar los checks** por categoría:
   - Violaciones de tokens (hex no-paleta) → `details/token-violations.md`
   - Violaciones de tipografía → `details/typography-violations.md`
   - Utilities replicados inline → `details/utility-violations.md`

4. **Calcular score 0-100** según `details/scoring.md`.

5. **Decidir veredicto:**
   - Score < 70 → 🚨 bloquear merge.
   - Score 70-89 → ⚠️ advertir, no bloquear.
   - Score ≥ 90 → ✅ luz verde.

6. **Generar reporte** según `details/output-format.md`.

## Principios

- **Estricto pero útil.** Cada violación tiene fix concreto, no solo crítica.
- **Reemplazo sugerido siempre.** Mostrar el diff esperado.
- **Score numérico, no impresionista.** Sigue las reglas de scoring.
- **Solo audit visual.** No comentar lógica, performance, accesibilidad (eso es de `code-review` o `ux-review` si existe).

## Qué NO hacer

- No flag colores derivados justificados (variantes de hover, sombras con alpha).
- No proponer cambios en `@theme`/`globals.css` salvo que sean para añadir un utility nuevo claramente repetido.
- No bloquear por arbitrary spacing salvo que sea masivo (>5 ocurrencias raras en el PR).

## Output esperado

```markdown
## Design System Audit — <scope>

### Score: NN/100

### 🚨 Críticas
[violaciones que rompen build o paleta core]

### ⚠️ Warnings
[violaciones de coherencia menor]

### 💡 Sugerencias
[mejoras opcionales]

### ✅ Lo que está bien
[items destacables]

### Veredicto
[🚫 bloquear merge | ⚠️ advertir, no bloquear | ✅ luz verde]
```
