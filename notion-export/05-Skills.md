# 🤖 Skills Claude Code

9 skills instaladas en `.claude/skills/` del repo. Activas en cualquier sesión de Claude Code abierta en el directorio del proyecto.

## Skills disponibles

| Skill | Trigger | Función |
|---|---|---|
| **repo-conventions** | (auto-carga) | Tokens, fuentes, utilities, gotchas |
| **design-system-guardian** | "audita el diseño" | Audit visual con score 0-100. Bloquea PRs si <70. |
| **stitch-sync** | "compara contra Stitch" | Diff entre Stitch ZIP y código actual. No toca archivos, solo propone. |
| **mock-data-validator** | "valida el mock" | Invariantes de `src/data/mock.ts`. Bloquea torneos con equipos no potencia de 2 en formato eliminación, fechas inconsistentes, etc. |
| **code-review** | "revisa este PR" | Review general de PRs con confidence filtering. |
| **ux-review** | "revisa la UX de X" | A11y, estados loading/empty, microcopy, motion. |
| **deploy-sentinel** | "puedo pushear?" | Pre-push check: build, bundle size, tsc, console.log. Bloquea si falla. |
| **pr-description** | "genera la descripción del PR" | Body en formato conventional commits. |
| **improve-skill** | "mejora design-system-guardian con..." | Outer loop. Edita la propia skill basándose en feedback. |

## Workflow automático

`.github/workflows/improve-skills-weekly.yml` corre cada lunes 09:00 UTC:
- Lee PRs mergeados últimos 7 días
- Recopila comentarios de review
- Crea/actualiza issue con label `outer-loop` con resumen
- El humano (Pedro) procesa el feedback con `improve-skill` cuando lo cree conveniente

## Cómo usar (ejemplos)

```
Tu prompt → Skill que carga

"audita el diseño de BracketView.tsx"      → design-system-guardian
"valida el mock tras añadir Copa de Verano" → mock-data-validator
"puedo pushear esto?"                       → deploy-sentinel
"genera la descripción del PR actual"       → pr-description
"compara contra Stitch v3.2"                → stitch-sync
"revisa la UX de la página /portal"         → ux-review
"mejora design-system-guardian para que..." → improve-skill
```

## Output esperado (resumido)

Cada skill devuelve un reporte estructurado con:
- 🚨 **Críticas** que bloquean merge
- ⚠️ **Warnings** que solo advierten
- 💡 **Sugerencias** opcionales
- ✅ **Lo que está bien**
- **Veredicto** (bloquear / advertir / luz verde)

Ver `docs/skills/COMO-USAR.md` en el repo para todos los flujos completos con prompts ejemplo.

## Si vienes nuevo al proyecto

1. Clona el repo
2. Abre Claude Code en el directorio
3. Las skills están auto-disponibles
4. Empieza con: *"resume el estado del proyecto y dime qué piensas hacer primero"*
