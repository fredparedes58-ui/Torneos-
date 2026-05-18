# Cómo usar las skills — Casos reales

Guía práctica con prompts ejemplo y flujos completos.

## Instalación (una sola vez)

```bash
cd /ruta/a/Torneos-          # tu repo Torneos
cp -r /ruta/al/paquete/2-skills-claude-code/.claude .
```

Verifica:

```bash
ls .claude/skills/
# Debe listar: code-review deploy-sentinel design-system-guardian
#              improve-skill mock-data-validator pr-description
#              repo-conventions stitch-sync
```

A partir de aquí, abre Claude Code en el directorio del repo. Las skills están activas.

## Casos de uso

### Caso 1: auditar diseño tras cambios visuales

**Tu prompt:**
> "Audita el diseño de BracketView.tsx. Acabo de hacer cambios al spacing y los marcadores."

**Qué hace Claude Code:**
1. Detecta trigger → carga `design-system-guardian`.
2. Esa skill carga `repo-conventions/details/design-tokens.md` + `typography.md` + `utilities.md`.
3. Aplica los checks:
   - ¿Hex fuera de paleta? (token-violations.md)
   - ¿Fonts con quotes en JSX? (typography-violations.md)
   - ¿Replicación inline de glow-green/glass-card/pitch-bg? (utility-violations.md)
4. Calcula score 0-100.
5. Devuelve reporte con violaciones por severidad + veredicto.

**Output esperado:**
```
## Design System Audit — BracketView.tsx
### Score: 87/100
### ⚠️ Warnings
- BracketView.tsx:42 — replicación inline de glow-green. Reemplazar por la utility.
### Veredicto: ⚠️ Advertir, no bloquear (score ≥70).
```

### Caso 2: validar mock.ts tras añadir torneo

**Tu prompt:**
> "Acabo de añadir 'Copa de Verano' con 12 equipos formato eliminación. Valida el mock."

**Qué hace:**
1. Carga `mock-data-validator`.
2. Esa skill carga `details/invariants.md`.
3. Aplica todos los invariantes al torneo nuevo.
4. Detecta que `12` no es potencia de 2 con formato `eliminacion`.

**Output esperado:**
```
🚫 BLOCKER — Bracket impar: torneos[N] "Copa de Verano"

equipos: 12, formato: 'eliminacion'.
12 NO es potencia de 2. Bracket no se puede dibujar correctamente.

Fix: cambiar a 8 o 16 equipos. O cambiar formato a 'grupos_eliminacion'.
```

### Caso 3: sync con Stitch nuevo

**Tu prompt:**
> "Recibí Stitch v3.2 en `.design/stitch_screens/inbox/`. Compara contra el proyecto."

**Qué hace:**
1. Carga `stitch-sync`.
2. Descomprime el ZIP en `.design/stitch_screens/v3.2/`.
3. Por cada pantalla, busca su `.tsx` correspondiente en `src/pages/`.
4. Extrae diffs (paleta, layout, spacing, tipografía).
5. Genera reporte agregado con secciones por pantalla.
6. **NO toca código.** Solo propone.

**Output esperado:**
```
## Stitch Sync — v3.2

| Pantalla | Estado | Cambios |
|---|---|---|
| Dashboard | 🟢 alineado | 1 minor |
| Bracket | 🔴 cambios mayores | 7 |
| Fixture | 🆕 nueva en Stitch | — |

🔴 Bracket: Stitch propone cambio de paleta. REQUIERE DISCUSIÓN.

[Detalle por pantalla...]
```

Tras revisar, aplicas los diffs aceptados manualmente (con Edit puntual).

### Caso 4: pre-push antes de mergear

**Tu prompt:**
> "Puedo pushear?"

**Qué hace:**
1. Carga `deploy-sentinel`.
2. Corre `tsc -b` → si falla, bloquea.
3. Corre `vite build` → si falla, bloquea.
4. Mide bundle size → bloquea si >500 KB.
5. Busca `console.log` en src/ → warning si encuentra.
6. Verifica `postcss.config.js`, puerto 5300, `.env` no trackeado.

**Output esperado:**
```
## Deploy Sentinel — pre-push check

✅ LISTO para push

| Check | Resultado |
|---|---|
| (a) Build | ✅ |
| (b) Bundle | ✅ 387 KB |
| (c) console.log | ✅ |
| (d) tsc -b | ✅ |

Build time: 8.2s

git push origin main
```

### Caso 5: review completo del PR

**Tu prompt:**
> "Revisa este PR antes de mergear: [pega diff o referencia branch]"

**Qué hace:**
1. Carga `code-review` (general purpose).
2. Detecta el tipo de cambio:
   - Si es solo visual → sugiere correr `design-system-guardian` específicamente.
   - Si toca mock → delega a `mock-data-validator`.
   - Si está pre-push → recuerda correr `deploy-sentinel`.
3. Aplica los bloqueantes críticos (API keys, paleta core, fonts, puerto).
4. Aplica bloqueantes (tildes corruptas, font arbitrary, TS6133, console.log, sin animación, sin empty state).
5. Aplica warnings.
6. Devuelve comentarios + resumen con veredicto.

**Output esperado:**
```
## Code Review — Resumen

Veredicto: request changes

### Top issues
1. 🚨 TS6133 en DashboardPage.tsx (import Calendar no usado).
2. 🚨 Lista sin fallback empty en TorneosList.tsx.
3. ⚠️ console.log en useTorneos.ts:15.

[Comentarios inline con cada uno]
```

### Caso 6: revisar la UX técnica de un componente

**Tu prompt:**
> "Revisa la UX de BracketView.tsx. Especialmente accesibilidad y estados."

**Qué hace Claude Code:**
1. Detecta trigger → carga `ux-review`.
2. Carga `repo-conventions/details/design-tokens.md` + `code-patterns.md` como contexto.
3. Identifica el tipo (componente complejo con estados) → foco en a11y + ui-states.
4. Aplica checks: alt en imágenes (escudos), aria-label en iconos Lucide, tap targets, tablas con `<th scope>`, estados loading/empty del bracket.
5. Devuelve reporte con blockers/warnings y propone fixes con código.

**Output esperado:**
```
## UX Review — BracketView.tsx
### 🚨 Blockers
- BracketView.tsx:42 — botón con icono ChevronRight sin aria-label.
- BracketView.tsx:78 — bracket sin manejo de "<8 equipos" (rompería visual).
### ⚠️ Warnings  
- Sin scroll horizontal en móvil, el bracket desborda.
```

**Lo que NO hará:** decir si "el bracket se ve bien estéticamente" o si "los marcadores destacan lo correcto". Eso es juicio humano.

### Caso 7: generar PR description

**Tu prompt:**
> "Genera la descripción del PR para esta branch."

**Qué hace:**
1. Carga `pr-description`.
2. Lee el diff de `git diff main...HEAD`.
3. Clasifica archivos por área afectada.
4. Genera body con:
   - Title en inglés (conventional commit).
   - Bullets de "qué cambia".
   - "Por qué" en 1-2 frases.
   - Checklist de checks corridos.
   - Áreas afectadas marcadas.

**Output esperado:** ver `pr-description/details/structure.md` para ejemplo completo.

### Caso 8: outer loop — mejorar una skill

**Tu prompt:**
> "Mejora design-system-guardian: ha marcado `[#C8FF00]/30` como violación, pero es una variante alpha legítima del lime accent."

**Qué hace:**
1. Carga `improve-skill`.
2. Identifica target = `design-system-guardian`.
3. Carga la skill objetivo completa.
4. Clasifica el feedback (falso positivo, tipo A).
5. Aplica edit puntual en `design-system-guardian/details/token-violations.md` añadiendo la excepción.
6. Reporta el diff con razón y verificación sugerida.

**Output esperado:**
```
## Improve Skill — design-system-guardian

### Feedback procesado
"[#C8FF00]/30 marcado como violación cuando es variante alpha válida."

### Análisis
Tipo A (falso positivo). Regla no excluía alpha del lime accent.

### Archivos modificados
- design-system-guardian/details/token-violations.md

### Diff
[diff específico]

### Verificación
Próxima auditoría con [#C8FF00]/N debería pasar sin restar puntos.
```

## Flujos completos (combinando skills)

### Flujo: feature visual completa

```
1. Mockup en Stitch llega → "compara contra Stitch" → stitch-sync
2. Aplicas diffs aceptados manualmente
3. "Audita el diseño" → design-system-guardian
4. Corriges violaciones
5. "Revisa el código" → code-review
6. Corriges issues
7. "Puedo pushear?" → deploy-sentinel
8. "Genera PR description" → pr-description
9. git push
```

### Flujo: añadir torneo al mock

```
1. Editas src/data/mock.ts
2. "Valida el mock" → mock-data-validator
3. Si pasa: "Genera PR description" → pr-description
4. Push
```

### Flujo: outer loop semanal

```
1. Recopilas 3-5 feedbacks de la semana
2. "Mejora <skill> con estos feedbacks: [...]" → improve-skill
3. Revisas diffs propuestos
4. Aceptas/rechazas
5. Repites para cada skill afectada
```

## Resumen mental

| Quieres | Usa |
|---|---|
| Auditar coherencia visual (paleta, fonts, utilities) | `design-system-guardian` |
| Comparar contra Stitch | `stitch-sync` |
| Validar mock.ts | `mock-data-validator` |
| Pre-push check (build, bundle, console.log) | `deploy-sentinel` |
| Review general (lógica, types, errores) | `code-review` |
| Revisar UX técnica (a11y, estados, microcopy, motion) | `ux-review` |
| PR body | `pr-description` |
| Mejorar una skill | `improve-skill` |
| Recordar convenciones | `repo-conventions` (auto) |

## Troubleshooting

### La skill no se activa cuando debería

Causas posibles:

1. **Falta el `.claude/`** en el repo. Verificar: `ls -la .claude/skills/`.
2. **Prompt ambiguo**. Sé explícito: "audita el diseño" mejor que "revisa esto".
3. **Description de la skill mal afinada**. Usa `improve-skill` para precisarla.

### Se activa la skill equivocada

Ejemplo: pides "audita el diseño" y carga `code-review` en lugar de `design-system-guardian`.

Fix:
- Sé más específico en el prompt: "audita el diseño visual con design-system-guardian".
- O usa `improve-skill` para precisar las descriptions:
  > "Mejora code-review para que NO se active con prompts que mencionen 'diseño visual'."

### El reporte es demasiado largo / corto

- Si demasiado largo: Pedro prefiere "una pasada que funciona". Pide explícitamente "resumen corto".
- Si demasiado corto: pide "incluye detalle por archivo" o "explica cada violación con fix".
- Si el problema persiste, usa `improve-skill` para ajustar el output-format del detail.

### Las skills se contradicen

Si `design-system-guardian` marca algo como warning y `code-review` lo marca como blocker, una de las dos tiene la regla mal.

Fix:
1. Identifica cuál es la fuente de verdad. Normalmente es `repo-conventions/details/` (los demás delegan ahí).
2. Usa `improve-skill` para alinear la skill desviada.

## Próximo paso

Si quieres automatizar el outer loop semanal, ve a `4-workflows-github/LEEME.md`.
