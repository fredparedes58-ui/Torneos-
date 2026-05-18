# Reglas de decisión: qué archivo modificar

Una vez clasificado el feedback (ver `pattern-analysis.md`), decidir QUÉ archivo de la skill objetivo se edita.

## Mapping tipo → archivo

| Tipo de feedback | Archivo a editar |
|---|---|
| (A) Falso positivo en regla específica | `details/<categoría>.md` con la regla |
| (B) Falso negativo: patrón nuevo | `details/<categoría>.md` o nuevo detail |
| (C) Severidad equivocada | Tabla de severidades en el detail relevante |
| (D) Output incompleto | `details/output-format.md` |
| (E) Triggering | `description:` en frontmatter del SKILL.md |
| (F) Convención desactualizada | El detail con la info obsoleta |
| (G) Caso nuevo no contemplado | Sección nueva en detail existente o crear detail nuevo |

## Cuándo editar SKILL.md vs detail

### Editar SKILL.md cuando:

- Cambia la `description:` (triggering).
- Cambia el flujo de trabajo principal de la skill.
- Cambia qué detail se carga primero.
- Se añade o elimina una categoría entera de checks.

### Editar un detail cuando:

- Cambia una regla específica de detección.
- Cambia el formato de un reporte.
- Se ajusta la severidad de una violación.
- Se añade un ejemplo o excepción.

### Crear un detail nuevo cuando:

- Aparece una categoría de checks NO existente que es independiente de las existentes.
- Una sección dentro de un detail crece tanto que merece extracción.

### NO editar nada cuando:

- El feedback no se entiende → preguntar.
- El feedback contradice un principio explícito sin justificar el cambio → preguntar.
- El feedback es sobre cómo Claude Code interpretó la skill, no sobre la skill misma → puede ser problema de prompt, no de skill.

## Cuántos archivos tocar

Regla: **el menor número posible**.

| Feedback | Archivos típicos |
|---|---|
| 1 regla mal | 1 archivo |
| Output mejorable | 1 archivo (output-format.md) |
| Triggering | 1 archivo (SKILL.md) |
| Caso nuevo independiente | 1-2 archivos |
| Rediseño parcial | Pedir confirmación antes de proceder |

Si vas a tocar >3 archivos, **PARAR** y verificar con el humano:

```
Para aplicar este feedback completo, necesitaría editar:
- SKILL.md
- details/X.md
- details/Y.md
- details/Z.md

Eso es más de lo habitual para un feedback puntual. ¿Confirmas el scope, 
o prefieres priorizar primero uno y dejar los demás para después?
```

## Ejemplos

### Ejemplo 1: Falso positivo simple

Feedback: "design-system-guardian marca `[#C8FF00]/30` como violación. Es alpha de la paleta core, debería ser válido."

Decisión:
- Tipo: A (falso positivo).
- Archivo: `design-system-guardian/details/token-violations.md`.
- Fix: añadir excepción en la sección "Variantes derivadas: cuándo son aceptables".

Edit: 1 archivo, 1 línea añadida.

### Ejemplo 2: Caso nuevo

Feedback: "ahora tenemos formato `liguilla`. mock-data-validator debería validarlo."

Decisión:
- Tipo: G (caso nuevo).
- Archivo: `mock-data-validator/details/invariants.md`.
- Fix: añadir sección "Liguilla" con sus invariantes.

Edit: 1 archivo, sección añadida.

### Ejemplo 3: Cambio de triggering

Feedback: "code-review se está activando cuando le pido 'revisa el diseño'. Debería ser design-system-guardian."

Decisión:
- Tipo: E (triggering).
- Archivos: `code-review/SKILL.md` (description) + `design-system-guardian/SKILL.md` (description).
- Fix: precisar en ambas descriptions cuándo se aplica cada una.

Edit: 2 archivos, frontmatter ajustado.

### Ejemplo 4: Output mejorable + severidad

Feedback: "deploy-sentinel cuando bundle es 510 KB dice 'demasiado grande' pero no especifica cuánto pasa. Y además debería bloquear, no advertir."

Decisión:
- Tipo: D (output) + C (severidad).
- Archivos: `deploy-sentinel/details/checklist.md` (severidad) + `deploy-sentinel/details/output-format.md` (template).
- Fix: en checklist actualizar tabla de umbrales; en output-format incluir el número exacto.

Edit: 2 archivos.
