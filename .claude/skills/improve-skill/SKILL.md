---
name: improve-skill
description: Mejora una skill existente del proyecto Torneos basándose en feedback humano. Implementa el outer loop. Carga la skill objetivo, analiza el feedback, decide qué archivos modificar (SKILL.md o un detail/), aplica edits mínimos. Usa cuando el usuario diga "mejora la skill X con este feedback", "actualiza design-system-guardian para que…", "la skill Y se equivocó al…".
---

# Improve Skill — Torneos

Outer loop. Modifica skills existentes basándose en feedback real de Pedro tras usarlas.

## Cómo trabajar

1. **Identificar la skill objetivo** en el mensaje del usuario.
   - "mejora design-system-guardian" → target = `design-system-guardian/`
   - Si el usuario no lo dice claramente, preguntar UNA vez.

2. **Cargar la skill objetivo:**
   - `.claude/skills/<target>/SKILL.md`
   - Todos los archivos de `.claude/skills/<target>/details/`

3. **Recoger el feedback:**
   - Mensaje directo del usuario en este chat.
   - Si el usuario referencia un PR de github.com/fredparedes58-ui/Torneos-, pedirle que pegue el contenido relevante (no asumir acceso a GitHub).
   - Si el usuario dice "como en X conversación", pedirle resumen.

4. **Analizar el patrón** según `details/pattern-analysis.md`:
   - ¿La skill se confundió en categorización?
   - ¿No detectó algo que debió detectar?
   - ¿Detectó falso positivo?
   - ¿El output no era útil?

5. **Decidir qué cambiar** según `details/decision-rules.md`:
   - Cambio en triggering / scope → SKILL.md (description).
   - Cambio en regla de detección → un detail específico.
   - Cambio en formato de output → details/output-format.md.
   - Nueva categoría detectada → nuevo detail/ o sección.

6. **Aplicar edits mínimos** según `details/minimal-edit-rules.md`:
   - Solo lo necesario para el cambio.
   - NO reescribir archivos completos.
   - NO cambiar partes no relacionadas con el feedback.

7. **Reportar** según `details/output-format.md`:
   - Qué archivos se modificaron.
   - Diff de los cambios.
   - Razón de cada edit.
   - Sugerencia opcional de cómo verificar.

## Principios

- **Edits mínimos.** Una observación de Pedro = uno o dos cambios puntuales, no rediseño.
- **Trazabilidad.** Cada cambio debe poder asociarse al feedback que lo originó.
- **Sin scope creep.** Si Pedro pide algo de design-system-guardian, no toques code-review aunque también podrían mejorarse.
- **Verifica que tiene sentido.** Si el feedback contradice un principio explícito del repo, preguntar antes de aplicar.

## Qué NO hacer

- No reescribir SKILL.md completo. Edit puntual.
- No añadir nuevas reglas sin que el feedback lo justifique.
- No tocar otras skills "de paso".
- No firmar como "Updated by Claude".

## Output esperado

```markdown
## Improve Skill — <target>

### Feedback procesado
[1-2 frases citando el feedback]

### Análisis
[1-2 frases: qué tipo de problema es]

### Archivos modificados
- `<archivo>` — <resumen del cambio>

### Diff
```diff
[diff específico, solo las líneas tocadas]
```

### Razón
[Por qué este cambio resuelve el feedback]

### Verificación sugerida
[Cómo probar que el cambio funciona]
```
