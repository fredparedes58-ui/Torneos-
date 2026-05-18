---
name: stitch-sync
description: Compara pantallas del proyecto contra las pantallas Stitch en .design/stitch_screens/. Extrae diffs visuales relevantes (paleta, layout, spacing) y propone cambios concretos sin tocar código. Usa cuando el usuario diga "compara contra Stitch", "sync con el diseño", "qué cambia respecto a Stitch", o cuando llegue un ZIP nuevo de Stitch.
---

# Stitch Sync — Torneos

Compara la implementación actual contra las pantallas Stitch (referencias de diseño). Propone cambios. **NO toca código** — solo reporta.

## Cómo trabajar

1. **Cargar contexto:**
   - `.claude/skills/repo-conventions/SKILL.md`
   - `.claude/skills/repo-conventions/details/design-tokens.md`
   - `.claude/skills/repo-conventions/details/typography.md`

2. **Identificar la pantalla a comparar:**
   - El usuario indica nombre de pantalla y/o ruta del ZIP de Stitch.
   - Localizar el archivo Stitch correspondiente en `.design/stitch_screens/`.
   - Localizar el archivo `.tsx` actual del proyecto que la implementa.

3. **Extraer diffs** según `details/diff-extraction.md`:
   - Paleta usada.
   - Layout (estructura, posicionamiento).
   - Spacing (paddings, gaps, margins).
   - Tipografía (tamaños, pesos, fonts).
   - Estados visibles (si Stitch tiene varios estados).

4. **Generar propuesta** según `details/output-format.md`.

5. **NUNCA aplicar el cambio.** Solo reportar.

## Workflow cuando llega un ZIP nuevo de Stitch

1. Usuario coloca el ZIP en `.design/stitch_screens/inbox/`.
2. Skill descomprime (vía bash).
3. Por cada pantalla nueva o modificada, comparar contra el `.tsx` correspondiente del proyecto.
4. Generar reporte agregado con diffs por pantalla.

Ver `details/workflow.md` para los pasos detallados.

## Principios

- **Solo propones, no aplicas.** El humano decide qué cambios aceptar.
- **Cambios concretos, no impresionistas.** "El padding pasa de 16 a 24" mejor que "más aire".
- **Cita siempre el archivo Stitch.** Para que el humano pueda verificar.
- **Respeta lo que ya existe.** Si la pantalla implementada se desvía levemente del Stitch por razón técnica, no insistir.

## Qué NO hacer

- ❌ Editar `.tsx` o cualquier archivo del proyecto. Solo reportar.
- ❌ Proponer cambios a la paleta core del Digital Stadium (incluso si Stitch los sugiere). Eso es un override mayor, requiere discusión.
- ❌ Reportar diffs sub-pixel o microscopic. Foco en cambios significativos.

## Output esperado

Reporte estructurado con secciones por área (paleta, layout, spacing, tipo, otros), citando archivo Stitch y archivo del proyecto, con snippets propuestos.
