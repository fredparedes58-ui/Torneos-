# Guía de conceptos — Skills, inner loop, outer loop

5 minutos para entender la idea de fondo del paquete.

## ¿Qué es una skill?

Una skill es una carpeta con:
- Un `SKILL.md` (~50 líneas) que describe **cuándo activarse** y **cómo trabajar**.
- Una carpeta `details/` con archivos `.md` atómicos que se cargan **bajo demanda**.

Claude Code lee el `SKILL.md` cuando detecta que el contexto coincide con la `description:`. Solo entra en los `details/` que necesita para esa tarea concreta.

Esto es distinto de un prompt enorme:

| Prompt enorme | Skill modular |
|---|---|
| Se carga entero siempre | Se carga lo justo |
| Caro en tokens | Eficiente |
| Difícil de mantener | Cada concepto en su archivo |
| Reglas mezcladas | Reglas separadas y trazables |

## Inner loop vs outer loop

Pedro lo formuló bien: **construyes agentes que mejoran agentes**.

### Inner loop = las skills funcionando

Cuando Pedro pide a Claude Code:

> "audita el diseño del último PR"

Claude Code:
1. Detecta el trigger (`design-system-guardian`).
2. Carga `design-system-guardian/SKILL.md`.
3. Carga `repo-conventions/details/design-tokens.md` (delegación declarada).
4. Aplica las reglas y devuelve un reporte.

Esto es el **inner loop**: la skill ejecutándose para resolver una tarea concreta.

### Outer loop = mejorar las skills con feedback

Tras usar `design-system-guardian` en varios PRs, Pedro descubre que la skill:
- Marca como violación `[#C8FF00]/30` (es una variante alpha legítima del lime).
- No detecta cambios en utilities replicados inline.
- El reporte no es claro cuando hay >10 violaciones.

Pedro abre Claude Code y dice:

> "mejora design-system-guardian con estos 3 feedbacks: [...]"

Y Claude Code carga la skill `improve-skill`, que:
1. Lee la skill objetivo (`design-system-guardian/`).
2. Clasifica cada feedback (falso positivo / output mejorable / etc.).
3. Aplica edits mínimos en los archivos correctos.
4. Reporta los diffs.

Esto es el **outer loop**: skills que mejoran otras skills.

### Frecuencia recomendada

- **Inner loop:** cada vez que pides ayuda a Claude Code. Muchas veces al día.
- **Outer loop:** una vez por semana o tras un sprint. Recoges los 3-5 feedbacks acumulados y los aplicas en batch.

El workflow de GitHub (`4-workflows-github/`) automatiza el outer loop semanal opcional.

## Cómo se relacionan tus 4 agentes con las 8 skills

Pediste 4 agentes en el briefing. Los convertí en 4 skills + añadí 4 skills de soporte.

| Tu agente | Skill |
|---|---|
| 1. design-system-guardian | `design-system-guardian` |
| 2. stitch-sync | `stitch-sync` |
| 3. mock-data-curator | `mock-data-validator` (renombrada) |
| 4. deploy-sentinel | `deploy-sentinel` |

Skills extra de soporte:

| Skill | Por qué |
|---|---|
| `repo-conventions` | Hardcoded de TUS convenciones. Las otras 7 la cargan automáticamente. Sin esto, las reglas se duplicarían en cada skill y serían difíciles de mantener. |
| `code-review` | Review general que delega a las 4 anteriores según el contexto. Cubre lógica/types/errores no cubiertos por las especializadas. |
| `pr-description` | Para que tu workflow termine bien: review → fix → pr-description → push. |
| `improve-skill` | El outer loop. Sin esta, las otras 7 se quedan obsoletas. |

## ¿Por qué SKILL.md modular y no un mega-archivo?

Pedro ya intuyó que es el patrón correcto en el webinar Anthropic+Warp. Razones técnicas:

### 1. Carga progresiva de contexto

Un `SKILL.md` de 50 líneas se lee SIEMPRE que la skill se activa. Los `details/` solo se cargan cuando hacen falta.

Ejemplo: `design-system-guardian/SKILL.md` se carga, pero solo carga `token-violations.md` si encuentra hex en el diff. Si el diff es solo cambios de spacing, ni mira ese archivo.

### 2. Menos alucinación

Cuanto menos contexto cargado a la vez, menos probabilidad de que Claude mezcle reglas o invente. Skills modulares mantienen el modelo enfocado.

### 3. Mantenibilidad

Si Pedro cambia la paleta core (caso hipotético), solo edita `repo-conventions/details/design-tokens.md`. Esa fuente de verdad la consumen `design-system-guardian`, `code-review`, etc. Sin duplicación.

### 4. Trazabilidad

Si una skill falla, es fácil identificar qué archivo de `details/` tiene la regla mal y arreglarlo puntual.

## Ejemplos de prompts que disparan skills

| Prompt | Skill activada |
|---|---|
| "audita el diseño de este PR" | `design-system-guardian` |
| "revisa coherencia visual de BracketView.tsx" | `design-system-guardian` |
| "compara DashboardPage contra Stitch v3.2" | `stitch-sync` |
| "llegó un ZIP nuevo de Stitch en inbox/" | `stitch-sync` |
| "valida el mock.ts tras añadir el torneo de verano" | `mock-data-validator` |
| "agregué un torneo, verifica que no rompa nada" | `mock-data-validator` |
| "puedo pushear esto?" | `deploy-sentinel` |
| "corre el pre-deploy check" | `deploy-sentinel` |
| "revisa este diff" / "review" | `code-review` |
| "genera el body del PR" / "descripción del PR" | `pr-description` |
| "mejora design-system-guardian con esto: [feedback]" | `improve-skill` |

Si el prompt es ambiguo (ej. "revisa el último commit"), Claude Code puede cargar `code-review` por defecto y delegar a las especializadas si detecta que aplican.

## Qué NO esperar de las skills

- ❌ **No diseñan tu UX.** Detectan violaciones técnicas y de convenciones, no juzgan si el diseño "se siente bien".
- ❌ **No deciden cambios de negocio.** Si Pedro quiere cambiar la paleta, las skills lo bloquean para que sea una decisión humana consciente.
- ❌ **No reemplazan tests.** Un test E2E sabe si la app funciona; las skills saben si el código sigue las convenciones.
- ❌ **No se actualizan solas.** Por eso existe `improve-skill`. Hay que alimentarles feedback.

## Siguiente lectura

Pasa a `2-skills-claude-code/COMO-USAR.md` para los casos de uso concretos.
