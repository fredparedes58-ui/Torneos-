# EMPIEZA AQUÍ — Skills de Torneos (Cantera Hub)

Hola Pedro. Este paquete contiene **9 skills personalizadas** para Claude Code, adaptadas específicamente al proyecto Torneos (Cantera Hub) — no genéricas.

Es el segundo paquete tras GRADA. Este se enfoca en lo que necesita Torneos: plataforma de gestión de torneos juveniles con stack web puro (React 18.3 + TS + Vite 8 + Tailwind v4 + Framer Motion), UI-only con mock data, deploy en Vercel, sin Capacitor ni Supabase todavía.

## Las 9 skills de un vistazo

| # | Skill | Cuándo se dispara | Qué hace |
|---|---|---|---|
| 1 | `repo-conventions` | (carga automática como soporte) | Hardcoded: paleta Digital Stadium, fonts inamovibles, `--legacy-peer-deps`, puerto 5300, postcss gotcha |
| 2 | `design-system-guardian` | "audita el diseño", "revisa coherencia visual" | TU agente #1: detecta hex fuera de paleta, fonts inline con quotes, utilities replicados. Score 0-100. |
| 3 | `stitch-sync` | "compara contra Stitch", "sync con el diseño" | TU agente #2: compara contra ZIPs Stitch, propone diffs concretos. NO toca código. |
| 4 | `mock-data-validator` | "valida mock.ts", "verifica los torneos" | TU agente #3: invariantes (bracket potencias de 2, totales que cuadran, fechas, división por cero). |
| 5 | `deploy-sentinel` | "puedo pushear?", "pre-deploy check" | TU agente #4: build + tsc-b + bundle ≤500KB + sin console.log + sin TS6133. |
| 6 | `code-review` | "revisa este PR/diff" | Review general aplicando tus bloqueantes (API keys, paleta core, fonts, puerto 5300). |
| 7 | `ux-review` | "revisa la UX", "valida accesibilidad", "check de estados" | Calidad técnica de UX: accesibilidad, responsive/touch, 5 estados UI, microcopy scouting, motion. NO juzga estética. |
| 8 | `pr-description` | "PR description", "body del PR" | Genera descripción con scope claro y áreas afectadas. |
| 9 | `improve-skill` | "mejora design-system-guardian con este feedback" | Outer loop: actualiza una skill basándose en feedback real. |

## Mapa de carpetas

```
torneos-skills/
├── EMPIEZA-AQUI.md                     ← este archivo
├── 1-empezar-aqui/
│   └── GUIA-CONCEPTOS.md               ← qué son las skills, inner/outer loop con ejemplos de Torneos
├── 2-skills-claude-code/
│   ├── COMO-USAR.md                    ← cómo activarlas y casos de uso reales
│   └── .claude/
│       └── skills/                      ← 9 skills modulares (SKILL.md + details/)
│           ├── repo-conventions/
│           ├── design-system-guardian/
│           ├── stitch-sync/
│           ├── mock-data-validator/
│           ├── deploy-sentinel/
│           ├── code-review/
│           ├── ux-review/
│           ├── pr-description/
│           └── improve-skill/
└── 4-workflows-github/
    ├── LEEME.md                         ← cómo activar el outer loop semanal
    └── .github/
        └── workflows/
            └── improve-skills-weekly.yml
```

## Cómo usarlo (en 3 pasos)

### 1. Léete primero los conceptos

Abre `1-empezar-aqui/GUIA-CONCEPTOS.md` (5 min). Te explica:
- Qué es una skill (vs. un prompt).
- Diferencia entre inner loop (skills) y outer loop (improve-skill).
- Cómo se relacionan tus 4 agentes con las skills.

### 2. Copia el `.claude/` al repo de Torneos

```bash
cd /ruta/a/Torneos-
cp -r /ruta/a/torneos-skills/2-skills-claude-code/.claude .
```

Verifica:

```bash
ls .claude/skills/
# Debe listar las 8 skills
```

A partir de aquí, cuando abras Claude Code en el repo de Torneos, las skills están activas. Se cargan automáticamente cuando el contexto lo justifique (según las `description:` de cada SKILL.md).

### 3. Prueba con un caso real

Abre Claude Code en el repo de Torneos y prueba:

```
"audita el diseño del último commit"
→ debería cargar design-system-guardian

"valida el mock.ts después de los cambios"
→ debería cargar mock-data-validator

"puedo pushear esto?"
→ debería cargar deploy-sentinel
```

Si NO se carga la skill esperada, mira la sección "Troubleshooting" en `COMO-USAR.md`.

## Outer loop semanal (opcional, recomendado)

`4-workflows-github/` contiene un GitHub Actions workflow que, una vez a la semana, mira los PRs recientes del repo y propone mejoras a las skills basadas en patrones detectados. Es 100% opcional, pero es lo que cierra el ciclo a largo plazo.

Ver `4-workflows-github/LEEME.md` para activarlo.

## Filosofía del paquete

Las skills NO son genéricas. Cada una conoce tu stack, tu paleta, tus convenciones, tus errores típicos. Por ejemplo:

- `code-review` sabe que el puerto 5300 está reservado y bloquea si lo cambian.
- `design-system-guardian` conoce exactamente tu paleta `#111508 / #C8FF00 / #C4CAAC / #434933` y la trata como inmutable.
- `repo-conventions` documenta el gotcha del `postcss.config.js` global de Windows.
- `mock-data-validator` conoce que `formato === 'eliminacion'` requiere `equipos` potencia de 2.

Si Torneos evoluciona (Fase 2 con datos PHV, nuevas pantallas Stitch, cambios en la paleta justificados), usa `improve-skill` para actualizar las skills al ritmo del proyecto.

## Próximo paso

Lee `1-empezar-aqui/GUIA-CONCEPTOS.md` y después `2-skills-claude-code/COMO-USAR.md`.
