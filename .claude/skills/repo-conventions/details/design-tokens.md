# Design tokens — Digital Stadium

## Paleta core (INMUTABLE)

| Nombre semántico | HEX | Uso típico |
|---|---|---|
| Stadium black | `#111508` | Fondo principal de toda la app |
| Lime accent | `#C8FF00` | CTAs primarios, highlights, glow effects, números destacados |
| Cream foreground | `#C4CAAC` | Texto secundario, separadores suaves, labels |
| Olive deep | `#434933` | Bordes, fondos de tarjetas elevadas, hover sutiles |

Cambiar cualquiera de estos = 🚨🚨 bloqueante crítico.

## Sintaxis correcta (Tailwind v4 + hex inline)

Tailwind v4 permite `[#hex]` como arbitrary values y tu @theme define los tokens base.

### ✅ Correcto

```tsx
// CTA primario
<button className="bg-[#C8FF00] text-[#111508]">
  Crear torneo
</button>

// Fondo y borde
<div className="bg-[#111508] border border-[#434933]">
  ...
</div>

// Texto secundario
<p className="text-[#C4CAAC]">Subtítulo</p>
```

### ✅ También correcto: tokens semánticos desde @theme

Si `@theme` define `--color-accent: #C8FF00`, usar la clase derivada:

```tsx
<button className="bg-accent text-background">
  Crear torneo
</button>
```

Tailwind v4 expone automáticamente las CSS variables como utility classes.

### ❌ Incorrecto: hex fuera de la paleta

```tsx
// 🚨 hex que NO está en la paleta core
<button className="bg-[#00FF88]">  // ← lima distinto, no es #C8FF00
```

→ design-system-guardian flag esto como violación.

### ❌ Incorrecto: estilos inline

```tsx
<button style={{ backgroundColor: '#C8FF00' }}>  // 🚨 mal
```

Salvo casos muy específicos (animaciones inline con motion), siempre Tailwind classes.

## Cuándo usar hex inline vs token semántico

| Caso | Recomendación |
|---|---|
| Color de la paleta core | Cualquiera de los dos. Hex `[#C8FF00]` es más explícito visualmente. |
| Variante de hover/active | Tailwind opacity modifier: `hover:bg-[#C8FF00]/90` |
| Color derivado (sombra del lime) | Token semántico si existe; si no, hex con opacidad |
| Glow / shadow | Hex con alpha: `shadow-[0_0_20px_#C8FF00]` |

## Glow effects (utility `glow-green`)

El utility `glow-green` envuelve la lógica del glow lime:

```tsx
<div className="glow-green">
  Texto con resplandor lime
</div>
```

Implementación esperada en @theme o globals.css (no la dupliques inline):

```css
.glow-green {
  filter: drop-shadow(0 0 12px rgba(200, 255, 0, 0.4));
}
```

Si ves `filter: drop-shadow(0 0 ...)` inline en un componente, sugerir mover al utility.

## Espaciado y tamaños

Tailwind v4 mantiene la escala estándar. Usar tokens, no arbitrary values salvo justificación.

### ✅ Correcto

```tsx
<div className="p-4 gap-3 rounded-lg">  // tokens estándar
```

### ⚠️ Warning: arbitrary values cuando no hace falta

```tsx
<div className="p-[17px] gap-[11px]">  // valores raros sin razón
```

Excepción: si el diseño Stitch usa medidas específicas que no encajan en la escala, está OK pero documentar en comentario.

## Si detectas violación

| Patrón | Severidad |
|---|---|
| Hex fuera de la paleta core | ⚠️ Warning (a no ser que sea un derivado justificado) |
| Estilo inline para color base | ⚠️ Warning |
| Cambio a la paleta core | 🚨🚨 Bloqueante crítico |
| `filter: drop-shadow` inline repetido | 💡 Sugerencia (mover a utility) |
| Arbitrary spacing sin razón | ⚠️ Warning |
