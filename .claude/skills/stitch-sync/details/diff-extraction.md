# Extracción de diffs visuales

Qué atributos comparar entre Stitch y la implementación actual.

## 1. Paleta

Para cada elemento visible:
- Color de texto.
- Color de fondo.
- Color de bordes.
- Acentos / highlights.

### Cómo extraer

**Desde Stitch HTML/CSS:** parsear `style` attributes y CSS asociado.
**Desde Figma export JSON:** leer `fills`, `strokes`.
**Desde PNG + specs:** confiar en los specs (no inferir hex de un PNG).

### Comparar con la implementación

Si el componente actual usa:
```tsx
<div className="bg-[#111508]">
```

Y Stitch tiene:
```html
<div style="background: #1A1A0F;">
```

→ Diff: bg `#111508` → `#1A1A0F`.

### ⚠️ Si Stitch propone color fuera de la paleta core

Reportar pero NO recomendar aplicar:

```
⚠️ Stitch propone color #1A1A0F que NO está en la paleta core (#111508).

Posibles interpretaciones:
1. Stitch tiene su propia versión de la paleta (diseñador no respetó).
2. Cambio intencional de paleta (requiere discusión).

Recomendación: discutir con Pedro antes de aplicar.
```

## 2. Layout

Estructura de elementos: grid, flex, posicionamiento.

### Qué comparar

- ¿Es row o column?
- ¿Cuántas columnas/filas?
- ¿Alignment de items?
- ¿Justify content?
- ¿Cómo se distribuye el espacio?

### Ejemplo

Stitch:
```html
<div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 24px;">
  <Card /> <Card /> <Card />
</div>
```

Actual:
```tsx
<div className="flex flex-col gap-4">
  <Card /> <Card /> <Card />
</div>
```

→ Diff: layout flex column → grid 3 columnas.

```
Propuesta:
<div className="grid grid-cols-3 gap-6">
  <Card /> <Card /> <Card />
</div>
```

## 3. Spacing

Padding, margin, gap.

### Qué comparar

Cada elemento con su Stitch equivalente:
- `padding` → traducir a `p-N` de Tailwind.
- `gap` → `gap-N`.
- `margin` → `m-N` (o ajustar layout para no necesitarlo).

### Tabla de conversión típica

| Pixels Stitch | Tailwind |
|---|---|
| 4px | `1` (p-1) |
| 8px | `2` |
| 12px | `3` |
| 16px | `4` |
| 24px | `6` |
| 32px | `8` |
| 48px | `12` |

Si Stitch usa un valor no estándar (17px), arbitrary value justificado: `p-[17px]`.

## 4. Tipografía

Por cada texto:
- Font family → mapear a `font-display` / `font-mono` / `font-body` o `label-caps`.
- Font size → `text-N`.
- Font weight → `font-medium`, `font-semibold`, `font-bold`.
- Line height → `leading-N`.
- Letter spacing → `tracking-N`.
- Color → ver paleta arriba.
- Casing (uppercase / lowercase / capitalize).

### Mapping Stitch → utility

| Font usado en Stitch | Utility |
|---|---|
| Barlow Condensed | `font-display` |
| JetBrains Mono | `font-mono` |
| DM Sans | `font-body` |
| Uppercase + tracking-wide | probablemente `label-caps` |

## 5. Estados (si Stitch los incluye)

Si la pantalla Stitch muestra hover/active/focus, comparar:
- ¿La implementación actual tiene esos estados?
- ¿Los colores y efectos coinciden?

## 6. Iconografía

- ¿Qué iconos usa Stitch?
- ¿Tamaño?
- ¿Color?

Mapear a Lucide Icons (la librería del proyecto). Si Stitch usa un icono que no está en Lucide, sugerir alternativa más cercana.

## 7. Animaciones (si Stitch las describe)

Difícil de extraer si Stitch es estático. Si el Stitch incluye notas sobre animaciones o estados intermedios, capturarlas.

## 8. Responsive (si Stitch tiene variantes)

Si Stitch incluye versión móvil y desktop, comparar:
- Breakpoint donde cambia.
- Cómo cambia el layout (stack vs row, sizes, etc.).

Mapear a Tailwind responsive prefixes (`md:`, `lg:`).

## Qué NO comparar

- Microscopic differences (1-2 px de spacing) — ruido.
- Texto de placeholder o lorem ipsum — el copy real va en otro lugar.
- Detalles que dependen del navegador (font rendering exacto).
