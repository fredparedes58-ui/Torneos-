# Análisis del patrón del feedback

Clasificar qué tipo de problema es antes de decidir el fix.

## Tipos de feedback

### A. Falso positivo

La skill marcó algo como problema cuando no lo era.

**Ejemplo:** "design-system-guardian marcó `[#C8FF00]/30` como hex fuera de paleta. Es una variante con alpha del lime, debería ser válido."

**Causa probable:** Regla de detección demasiado estricta o sin excepción documentada.

**Fix típico:** Añadir excepción en el archivo de reglas pertinente.

### B. Falso negativo

La skill NO marcó algo que debía marcar.

**Ejemplo:** "code-review no detectó que añadí `console.log` en src/utils/format.ts."

**Causa probable:** El patrón de detección no cubre ese path o ese caso.

**Fix típico:** Ampliar el patrón de detección o añadir nueva regla.

### C. Categorización incorrecta

La skill marcó algo con severidad equivocada (warning cuando era bloqueante, o viceversa).

**Ejemplo:** "marcaste como suggestion el cambio de la paleta core. Eso es bloqueante crítico."

**Causa probable:** Tabla de scoring o de severidades incompleta.

**Fix típico:** Cambiar la severidad en la tabla del detail correspondiente.

### D. Output poco útil

El reporte se entiende, pero no es accionable o tiene formato confuso.

**Ejemplo:** "el reporte de deploy-sentinel dice 'bundle grande' pero no da el número exacto."

**Causa probable:** Template de output incompleto.

**Fix típico:** Actualizar `details/output-format.md` para incluir el dato faltante.

### E. Triggering incorrecto

La skill se cargó cuando no debía, o no se cargó cuando debía.

**Ejemplo:** "le pedí 'revisa la UX' y se activó code-review en lugar de ux-review."

**Causa probable:** Descripción de la skill (en el frontmatter) no clarifica bien sus límites.

**Fix típico:** Actualizar `description:` en SKILL.md.

### F. Convenciones desactualizadas

El proyecto cambió y la skill no.

**Ejemplo:** "hemos pasado a Tailwind v4 oficialmente, pero la skill sigue mostrando sintaxis de v3."

**Causa probable:** Detail con info técnica obsoleta.

**Fix típico:** Actualizar el detail con la nueva info.

### G. Falta cubrir un caso nuevo

Algo del proyecto cambió/creció y la skill no lo prevé.

**Ejemplo:** "ahora tenemos formato `liguilla` además de `eliminacion` y `liga`. mock-data-validator debería validar también ese."

**Causa probable:** Nueva categoría no contemplada.

**Fix típico:** Añadir sección en el detail correspondiente o crear nuevo detail.

## Cómo identificar el tipo

Hacer estas preguntas en orden:

1. ¿La skill detectó algo? → Si sí, ¿era correcto detectarlo? (A si no)
2. ¿La skill NO detectó algo? → (B)
3. ¿El nivel de severidad fue el esperado? → Si no, (C)
4. ¿El output da toda la info que el humano necesita? → Si no, (D)
5. ¿Se cargó la skill correcta? → Si no, (E)
6. ¿La regla aplicada está al día con el proyecto? → Si no, (F)
7. ¿Apareció un caso nuevo no contemplado? → (G)

## Combinaciones frecuentes

A veces el feedback combina varios tipos. Ejemplo:

> "design-system-guardian marcó `[#C8FF00]/30` como problema (eso está bien) pero el reporte no explica que es una variante de la paleta core. Y debería ser warning, no critical."

Aquí hay:
- (D) Output mejorable: añadir explicación al reporte.
- (C) Categorización: bajar de critical a warning.

Aplicar AMBOS fixes, listándolos separados en el output.
