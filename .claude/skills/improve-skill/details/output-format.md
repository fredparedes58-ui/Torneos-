# Formato del output de improve-skill

## Template

```markdown
## Improve Skill — <target>

### Feedback procesado
[Cita o resumen del feedback en 1-2 frases.]

### Análisis
[1-2 frases identificando el tipo de feedback (A/B/C/D/E/F/G) y el problema concreto.]

### Archivos modificados
- `<archivo>` — <resumen breve del cambio>

### Diffs

#### `<archivo>`
```diff
[diff específico, solo las líneas tocadas]
```

[Repetir por cada archivo si hay varios.]

### Razón
[Por qué este cambio resuelve el feedback. 1-2 frases.]

### Verificación sugerida
[Cómo probar que el cambio funciona. Por ejemplo:
"Próxima vez que corras design-system-guardian sobre un PR con `[#C8FF00]/30`, 
debería marcarlo como variante válida en lugar de violación."]
```

## Ejemplo: edit simple

```markdown
## Improve Skill — design-system-guardian

### Feedback procesado
"design-system-guardian marcó `[#C8FF00]/30` como violación. Eso es 
variante alpha del lime accent, debería ser válido."

### Análisis
Tipo A (falso positivo). La regla de detección de hex fuera de paleta 
no excluía variantes con alpha del propio lime.

### Archivos modificados
- `design-system-guardian/details/token-violations.md` — añade variante 
  alpha del lime a la lista de derivadas aceptables.

### Diffs

#### `design-system-guardian/details/token-violations.md`

```diff
  ## Variantes derivadas: cuándo son aceptables

  Estas NO son violaciones:

  ```tsx
  // Hover/active de la paleta
  className="hover:bg-[#C8FF00]/90"
  className="active:bg-[#434933]"
  
  // Alpha del lime
  className="border-[#C8FF00]/30"
+ className="bg-[#C8FF00]/20"
+ className="text-[#C8FF00]/50"
```

### Razón
La regla original cubría `border-[#C8FF00]/N` pero no las variantes con 
`bg-` o `text-`. Ahora cualquier alpha del lime queda explícitamente 
permitida.

### Verificación
Próxima auditoría con `[#C8FF00]/20` o `[#C8FF00]/50` debería pasar 
sin restar puntos.
```

## Ejemplo: edit más complejo

```markdown
## Improve Skill — deploy-sentinel

### Feedback procesado
"deploy-sentinel cuando bundle es 510 KB dice 'demasiado grande' pero 
no especifica cuánto pasa. Y debería bloquear, no advertir."

### Análisis
Tipo D (output incompleto) + Tipo C (severidad). El umbral 500 KB era 
warning cuando debería ser bloqueante; y el reporte no incluía el número 
exacto.

### Archivos modificados
- `deploy-sentinel/details/checklist.md` — sube severidad a bloqueante 
  cuando bundle > 500 KB.
- `deploy-sentinel/details/output-format.md` — incluye el tamaño exacto 
  en el reporte.

### Diffs

#### `deploy-sentinel/details/checklist.md`

```diff
  ### Umbrales

  | Tamaño | Severidad |
  |---|---|
  | ≤ 400 KB | ✅ óptimo |
  | 400-500 KB | ⚠️ warning (sigue siendo aceptable) |
- | > 500 KB | ⚠️ warning (límite, considerar análisis) |
+ | > 500 KB | 🚫 BLOQUEAR |
```

#### `deploy-sentinel/details/output-format.md`

```diff
  ### Output cuando hay fallo crítico
  
  ```markdown
  ## Deploy Sentinel — pre-push check
  
  🚫 **BLOQUEAR push**
  
- ### Falla crítica: Bundle demasiado grande
+ ### Falla crítica: Bundle excede 500 KB
+ 
+ Bundle actual: NNN KB
+ Límite: 500 KB
+ Exceso: NN KB
```

### Razón
Pedro necesita poder decidir rápido si el exceso es marginal (510 KB) o 
significativo (700 KB). Sin el número exacto, el reporte es ambiguo.

Además, según las convenciones del repo (`repo-conventions/SKILL.md`), 
bundle > 500 KB es bloqueante duro, no warning.

### Verificación
Forzar un bundle > 500 KB y correr deploy-sentinel:
- El reporte debe decir el tamaño exacto.
- El veredicto debe ser 🚫 BLOQUEAR, no ⚠️.
```

## Reglas para el output

- **Diffs en formato git diff.** Con `-` y `+` claros.
- **Citar líneas concretas, no descripciones vagas.**
- **Verificación accionable.** Pedro debe poder probar el cambio.
- **Sin paja al final.** No "Espero que esto ayude" ni "Avísame si necesitas más".

## Cuando hay nada que cambiar

Si tras analizar el feedback se concluye que la skill ya estaba bien (el problema era del consumer o del prompt):

```markdown
## Improve Skill — <target>

### Feedback procesado
"...".

### Análisis
Tras revisar `<archivo>.md`, la regla ya cubría este caso (línea NN).

Posibles causas del comportamiento observado:
- La skill no se cargó correctamente.
- El consumer (Claude Code) ignoró la regla.
- El input al que se aplicó no contenía lo que el usuario cree.

### Recomendación
Sin cambios en la skill. Antes de mergear el feedback como mejora, 
verificar:
1. Que la skill se cargó (ver inicio del thread).
2. Que el input incluía el caso reportado.

Si el problema persiste tras verificar, volver con detalle más concreto 
(qué input, qué output, qué se esperaba).
```
