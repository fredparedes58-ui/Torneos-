# Reglas de edits mínimos

Filosofía: cambios chirúrgicos, no rediseños.

## Reglas

### 1. Una idea, un edit

Si el feedback contiene una observación, aplicar UN edit. No aprovechar para "limpiar de paso".

### 2. NUNCA reescribir un archivo completo

- ✅ `str_replace` con el chunk relevante.
- ✅ Añadir una sección al final con `str_replace` usando como ancla la última línea existente.
- ❌ Escribir el archivo entero con `create_file` (sobrescribiendo).

### 3. Mantener estructura existente

Si el detail usa títulos `## A`, `## B`, `## C` y se añade un nuevo concepto, encajarlo bajo el título que lógicamente le toca, NO inventar una nueva sección al inicio.

### 4. Mantener el tono y la voz

Las skills tienen un tono consistente:
- Bullets cortos.
- Tablas para comparaciones.
- Code blocks con sintaxis correcta.
- Frases cortas, verbo activo.

NO introducir prosa florida ni formal donde antes era directo.

### 5. NO tocar lo no relacionado

Si el feedback es sobre las reglas de tokens, NO retocar las reglas de typography "porque también podrían mejorarse". Eso es scope creep.

### 6. Preservar links y referencias internas

Si un archivo dice "Ver `details/X.md`" y se renombra X, actualizar la referencia. Si se mantiene X, no tocar la línea.

### 7. NO eliminar contenido salvo justificación

Si el feedback es "añade Y", añadir Y. No eliminar X "porque ya no aporta" salvo que el usuario lo pida explícitamente.

### 8. Diff debe ser legible

Si los cambios son >20 líneas en total, considerar dividir en múltiples `str_replace` calls separados (uno por sección lógica) para que el usuario pueda ver claramente qué cambió dónde.

## Anti-patterns

### ❌ Anti-pattern 1: Aprovechar para limpiar

```
Usuario: "design-system-guardian debería detectar también style inline con fontFamily."
Claude: [edita typography-violations.md para añadir la regla + reescribe la introducción + reorganiza las severidades + cambia formato de los ejemplos]
```

Eso es scope creep. Solo añadir la regla.

### ❌ Anti-pattern 2: Edit que rompe formato

```diff
- ### Crítica: cambio del mapping de fonts
+ ###Critical change in font mapping (Critical):
```

Cambia el idioma, la severidad y el nivel del título. Confusión total.

### ❌ Anti-pattern 3: Eliminar contexto

```diff
- ## 8. Forms labels
- ### 🚨 Blocker: input sin label
- [explicación + ejemplos + reglas]
+ ## 8. Forms labels: inputs deben tener label.
```

Comprimir demasiado pierde la utilidad de la skill.

## Patterns deseados

### ✅ Pattern 1: Añadir un caso al final de una sección

```diff
  ## Variantes derivadas: cuándo son aceptables

  Estas NO son violaciones:

  ```tsx
  className="hover:bg-[#C8FF00]/90"
  className="active:bg-[#434933]"
  className="border-[#C8FF00]/30"
  className="shadow-[0_0_20px_#C8FF00]"
+ className="from-[#C8FF00]/20 to-[#111508]"  // gradients con paleta
  ```
```

Una línea, no rompe nada.

### ✅ Pattern 2: Ajustar una tabla

```diff
  | Tipo | Resta del score |
  |---|---|
  | Cambio a la paleta core | -100 (bloqueante automático) |
  | Hex nuevo fuera de paleta en JSX | -5 por ocurrencia |
+ | Hex nuevo en variante alpha justificada | 0 (no penalizar) |
  | Estilo inline para color | -3 por ocurrencia |
```

Una fila nueva en la tabla.

### ✅ Pattern 3: Precisar la description del SKILL.md

```diff
- description: Revisa código del proyecto Torneos aplicando las reglas del repo. Usa cuando el usuario diga "revisa este PR".
+ description: Revisa código del proyecto Torneos aplicando las reglas del repo (lógica, types, errores, patrones). Usa cuando el usuario diga "revisa este PR". Para audits visuales prefiere design-system-guardian. Para mock data, mock-data-validator. Para pre-push, deploy-sentinel.
```

Más precisión sin cambiar el comportamiento general.
