# Accesibilidad — Torneos

Checks técnicos de a11y aplicables a la plataforma web. WCAG 2.1 AA como referencia.

## 1. Imágenes con `alt`

### 🚨 Blocker: imagen sin `alt`

```tsx
// ❌
<img src={escudoEquipo} className="..." />

// ✅ Texto descriptivo si la imagen aporta info
<img src={escudoEquipo} alt={`Escudo de ${equipo.nombre}`} />

// ✅ alt="" si la imagen es puramente decorativa
<img src="/icons/star.svg" alt="" />
```

- **Escudos de equipo:** SIEMPRE alt descriptivo.
- **Fotos de jugadores:** SIEMPRE alt descriptivo (identificación).
- **Iconografía decorativa:** `alt=""` para que screen readers la salten.

## 2. Iconos clickables sin texto (Lucide Icons)

### 🚨 Blocker: botón con icono Lucide sin label accesible

```tsx
// ❌ Screen reader anuncia "botón" sin contexto
<button onClick={share}>
  <Share2 />
</button>

// ✅
<button onClick={share} aria-label="Compartir torneo">
  <Share2 />
</button>
```

Aplica también a `<motion.button>`, `<a>` con icono, etc.

Como `lucide-react` es la librería estándar del proyecto, esto es ESPECIALMENTE común. Cada vez que veas un botón con un solo `<Icon />` dentro → verificar `aria-label`.

## 3. Semántica HTML

### ⚠️ Warning: `<div onClick>` en lugar de `<button>`

```tsx
// ❌ No es focusable con teclado
<div onClick={handleClick} className="...">
  Crear torneo
</div>

// ✅
<button onClick={handleClick} className="...">
  Crear torneo
</button>
```

### ⚠️ Warning: páginas sin landmarks

Páginas de Torneos deben tener:
- Un `<header>` o `<h1>` claro.
- `<main>` envolviendo el contenido principal.
- `<nav>` para la navegación entre secciones.

Si una página es solo `<div>`s anidados, los screen readers no pueden saltar a secciones.

## 4. Contraste de color

La paleta core del Digital Stadium tiene ratios excelentes en general:
- `#C8FF00` lime sobre `#111508` fondo → ratio ~16:1 ✅
- Texto blanco sobre `#111508` → ratio ~19:1 ✅

### ⚠️ Warning: texto secundario con poco contraste

Atención a derivados (cream `#C4CAAC` sobre fondos oscuros pero menos contrastados):

```tsx
// ⚠️ Verificar ratio si el fondo no es #111508 puro
<p className="text-[#C4CAAC]">Subtítulo</p>
```

Ratio mínimo:
- Texto normal: 4.5:1
- Texto grande (≥18px o ≥14px bold): 3:1

### ⚠️ Warning: olive `#434933` para texto

`#434933` sobre fondo `#111508` da ratio ~2:1, **insuficiente para texto**. Solo usar para bordes, separadores, fondos elevados.

## 5. Foco visible (crítico para tabular)

### 🚨 Blocker: `outline: none` sin alternativa

```css
/* ❌ Mata la accesibilidad para usuarios de teclado */
button:focus { outline: none; }

/* ✅ Quita outline default pero añade visible alternativo */
button:focus { outline: none; }
button:focus-visible {
  outline: 2px solid #C8FF00;
  outline-offset: 2px;
}
```

En Tailwind: `focus-visible:ring-2 focus-visible:ring-[#C8FF00]`.

Para una plataforma de gestión donde usuarios usan **mucho teclado** (TAB entre celdas de tabla, ENTER para editar), el foco visible es crítico.

## 6. Navegación por teclado

### ⚠️ Warning: orden de tab confuso

Para componentes complejos (modales, dropdowns, brackets clickables), verificar:
- Tab avanza en orden visual lógico.
- Shift+Tab retrocede.
- Esc cierra modales/menús.
- Enter activa botones; Space también.

### 🚨 Blocker: modal sin focus trap

Cuando se abre un modal (ej. "Crear torneo", "Detalles del partido"), el foco debe quedar atrapado dentro hasta que se cierre.

Si usas un componente custom de modal, verificar focus trap. Librerías como `@radix-ui/react-dialog` lo manejan por defecto. Si Torneos no usa una así todavía, considerar añadirla.

## 7. `prefers-reduced-motion`

### ⚠️ Warning: animaciones sin respetar la preferencia del usuario

Convención del proyecto: cada componente de página usa `motion.div` con `fadeUp`. Estas animaciones deben respetar `prefers-reduced-motion`.

```tsx
// ❌ Animación incondicional
<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>

// ✅ Respeta la preferencia
import { useReducedMotion } from 'framer-motion';

const reduce = useReducedMotion();

<motion.div
  initial={reduce ? false : { opacity: 0, y: 20 }}
  animate={reduce ? {} : { opacity: 1, y: 0 }}
>
```

Para animaciones estructurales sutiles (transición de páginas), aceptable mantener con reduce-motion si son breves. Para entradas decorativas (stagger de cards), desactivar.

## 8. Forms labels (registro de equipo, crear torneo)

### 🚨 Blocker: input sin label

```tsx
// ❌
<input type="text" placeholder="Nombre del torneo" />

// ✅ Label visible
<label>
  Nombre del torneo
  <input type="text" placeholder="Copa de Verano" />
</label>

// ✅ O label oculto visualmente pero accesible
<input 
  type="text" 
  aria-label="Nombre del torneo" 
  placeholder="Copa de Verano" 
/>
```

Placeholder NO sustituye al label. Desaparece al escribir y los screen readers no siempre lo anuncian.

## 9. Errores de form con `aria-invalid`

### ⚠️ Warning: error visible visualmente pero no para a11y

```tsx
// ❌ Solo color rojo, screen reader no lo anuncia
{error && <p className="text-red-400">{error}</p>}
<input type="number" />

// ✅
<input 
  type="number"
  aria-invalid={!!error}
  aria-describedby={error ? 'equipos-error' : undefined}
/>
{error && <p id="equipos-error" className="text-red-400">{error}</p>}
```

## 10. Tablas accesibles (clasificación, fixture)

Las tablas son centrales en Torneos. Importante hacerlas accesibles:

### ✅ Buena tabla

```tsx
<table>
  <caption className="sr-only">Tabla de clasificacion del torneo</caption>
  <thead>
    <tr>
      <th scope="col" className="label-caps">Pos</th>
      <th scope="col" className="label-caps">Equipo</th>
      <th scope="col" className="label-caps">PJ</th>
      <th scope="col" className="label-caps">Pts</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <th scope="row">Cantera FC</th>
      <td>8</td>
      <td>21</td>
    </tr>
  </tbody>
</table>
```

Reglas:
- `<caption>` (puede ser `sr-only` si visual no la necesita).
- `<th scope="col">` para cabeceras de columna.
- `<th scope="row">` para la primera celda de cada fila (el nombre del equipo).

### ⚠️ Warning: tabla con solo `<td>`s

```tsx
// ⚠️ Sin scope, screen readers se pierden
<table>
  <tbody>
    <tr><td>Pos</td><td>Equipo</td></tr>  // ← debería ser <th>
```

## Checklist rápido por componente

- [ ] Toda imagen significativa tiene `alt`.
- [ ] Toda imagen decorativa tiene `alt=""`.
- [ ] Todo botón con solo icono Lucide tiene `aria-label`.
- [ ] Todo clickable es `<button>` o `<a>`, no `<div>`.
- [ ] Foco visible (`focus-visible:ring-2 focus-visible:ring-[#C8FF00]` o equivalente).
- [ ] Si hay modal: focus trap + Esc cierra.
- [ ] Inputs tienen label (visible u `aria-label`).
- [ ] Errores de form usan `aria-invalid` + `aria-describedby`.
- [ ] Animaciones Framer Motion respetan `useReducedMotion()` cuando son decorativas.
- [ ] Tablas usan `<th scope="col|row">` apropiadamente.
- [ ] Color `#434933` NO se usa para texto sobre fondo oscuro.
