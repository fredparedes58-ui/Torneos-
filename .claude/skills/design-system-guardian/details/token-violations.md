# Token violations

Violaciones del uso de tokens de color del Digital Stadium.

## Paleta core (whitelist)

Solo estos hex son válidos directamente sin justificación:

- `#111508` — stadium black
- `#C8FF00` — lime accent
- `#C4CAAC` — cream foreground
- `#434933` — olive deep

Variantes con opacidad (Tailwind: `[#C8FF00]/80`) son aceptables.

## Detección de violaciones

### Patrón regex para encontrar hex en archivos

```bash
# Buscar hex en archivos .tsx/.ts:
grep -rEn "#[0-9A-Fa-f]{6,8}" src/ \
  | grep -vE "#111508|#C8FF00|#C4CAAC|#434933"
```

Cada match es candidato a violación. Verificar contexto antes de flag:
- ¿Es una variante derivada justificada (hover, alpha)?
- ¿Está en un archivo de styles globales (@theme)? → OK, ahí es donde se definen.
- ¿Está en un archivo de Stitch (`.design/stitch_screens/`)? → OK, son de referencia.

## Tipos de violación

### 🚨 Crítica: cambio a la paleta core

Si el diff modifica un valor de la paleta core en globals/`@theme`:

```diff
- --color-accent: #C8FF00;
+ --color-accent: #00FF88;
```

→ 🚨🚨 Bloqueante crítico. Cambio de paleta requiere discusión explícita.

### 🚨 Crítica: variable que ya no apunta a la paleta

```diff
- background: #C8FF00;
+ background: #00FF88;
```

En cualquier archivo de componente, si la línea original usaba un color de la paleta y se cambió → bloqueante.

### ⚠️ Warning: hex nuevo fuera de la paleta

```tsx
<button className="bg-[#FFAA00]">Nuevo</button>
```

`#FFAA00` no está en la paleta. Reportar:

```
⚠️ Color fuera de la paleta: <archivo>:<línea>

  <button className="bg-[#FFAA00]">

Color usado: #FFAA00 (no pertenece a la paleta Digital Stadium).

Paleta core: #111508 / #C8FF00 / #C4CAAC / #434933.

Fix sugerido:
- Si era para destacar: usar #C8FF00 con glow-green.
- Si era para alerta: ¿añadir #FFAA00 a @theme como token "warn"?
  En ese caso, proponer la adición primero, no usarlo ad hoc.
```

### ⚠️ Warning: estilo inline para color base

```tsx
<div style={{ backgroundColor: '#111508' }}>  // ⚠️
```

```
⚠️ Color inline en lugar de Tailwind class: <archivo>:<línea>

Fix:
<div className="bg-[#111508]">
```

### 💡 Sugerencia: opacidad ad hoc cuando hay alternativa

```tsx
<div className="bg-[rgba(200,255,0,0.2)]">  // 💡
```

```
💡 Opacity ad hoc detectada: <archivo>:<línea>

Alternativa más limpia:
<div className="bg-[#C8FF00]/20">
```

## Variantes derivadas: cuándo son aceptables

Estas NO son violaciones:

```tsx
// Hover/active de la paleta
className="hover:bg-[#C8FF00]/90"
className="active:bg-[#434933]"

// Alpha del lime
className="border-[#C8FF00]/30"

// Glow / shadow del lime
className="shadow-[0_0_20px_#C8FF00]"

// Gradients que usan colores de la paleta
className="bg-gradient-to-b from-[#111508] to-[#434933]"
```

## Cómo reportar (template)

Por cada violación:

```
[icono] [severidad] — Token violation: <archivo>:<línea>

[Línea del código tal cual]

Color encontrado: <hex>
Paleta core: #111508 / #C8FF00 / #C4CAAC / #434933

Fix sugerido:
<código corregido>
```

## Contribución al score

| Tipo | Resta del score |
|---|---|
| Cambio a la paleta core | -100 (bloqueante automático) |
| Hex nuevo fuera de paleta en JSX | -5 por ocurrencia |
| Estilo inline para color | -3 por ocurrencia |
| Opacidad ad hoc | -1 por ocurrencia |
