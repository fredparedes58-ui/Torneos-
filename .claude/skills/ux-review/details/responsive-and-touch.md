# Responsive y touch — Torneos

Torneos es **web puro** (NO Capacitor, NO nativo). Pero los usuarios acceden desde dispositivos diversos: clubs en escritorio, scouts en tablet/móvil. Checks específicos para que la UI funcione bien en todos.

## 1. Tap targets ≥ 44×44px en interactivos

### 🚨 Blocker: target táctil demasiado pequeño

Aunque Torneos sea web, en móvil/tablet se usa con el dedo. Apple HIG y Material Design recomiendan **44×44 px mínimo**.

```tsx
// ❌ Icono de 16px sin padding suficiente
<button onClick={share}>
  <Share2 className="w-4 h-4" />  // 16px, target inutilizable en táctil
</button>

// ✅ Padding suficiente o contenedor explícito
<button onClick={share} className="w-11 h-11 flex items-center justify-center">
  <Share2 className="w-4 h-4" />  // contenedor 44x44, icono 16
</button>
```

### Aplica especialmente a:
- Iconos en headers de cards (compartir, expand, eliminar).
- Botones de navegación entre rondas del bracket.
- Items de tabla clickables (cuando hay paginación o filtros).
- Toggles de estado del torneo (en_curso / finalizado).

### Excepción aceptable:
Densidad alta en tabla de stats. Para mucha info en poco espacio, OK reducir target SI hay alternativa accesible (botón "ver detalle" más grande, expand-collapse).

## 2. Viewport meta tag

### 🚨 Blocker: viewport mal configurado

En `index.html`:

```html
<!-- ✅ Correcto -->
<meta name="viewport" content="width=device-width, initial-scale=1" />

<!-- ❌ Bloquea zoom (mala accesibilidad) -->
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
```

`maximum-scale=1` y `user-scalable=no` impiden hacer zoom y violan WCAG. Mantener zoom permitido.

## 3. Inputs con teclado correcto en móvil

### ⚠️ Warning: type genérico cuando hay específico

El `type` del input determina qué teclado se muestra en móvil/tablet.

```tsx
// ❌ Teclado completo para email
<input type="text" placeholder="contacto@club.com" />

// ✅ Teclado con @ y .com
<input type="email" autoComplete="email" />

// ✅ Para teléfono del responsable de equipo
<input type="tel" autoComplete="tel" />

// ✅ Para número de equipos en formulario "Crear torneo"
<input type="number" inputMode="numeric" min="2" max="64" />

// ✅ Para búsqueda de torneo
<input type="search" />

// ✅ Para fechas de fixture
<input type="date" />
```

### `autoComplete` para forms comunes

- `email`, `tel`, `name`, `given-name`, `family-name`, `organization` (nombre del club).

## 4. NO depender de hover

### 🚨 Blocker: funcionalidad solo accesible vía hover

En táctil no hay hover.

```tsx
// ❌ El botón eliminar solo aparece al hacer hover
<div className="group">
  <TournamentCard tournament={t} />
  <button className="opacity-0 group-hover:opacity-100">Eliminar</button>
</div>
```

### Soluciones:
- Botón siempre visible.
- Menú contextual (3 puntos verticales que abre dropdown).
- Tap toggle: mostrar al tocar, ocultar al tocar fuera.

```tsx
// ✅ Menú contextual con icono visible
<div className="relative">
  <TournamentCard tournament={t} />
  <button 
    className="absolute top-2 right-2 w-11 h-11"
    aria-label="Acciones del torneo"
  >
    <MoreVertical className="w-4 h-4" />
  </button>
  {/* dropdown con Editar / Eliminar / Duplicar */}
</div>
```

### Excepción justificada
Tooltips informativos (mostrar tooltip on hover en desktop) — está bien que sean solo hover **si la información también está disponible de otra forma** (ej. en una vista de detalle accesible vía tap).

## 5. Texto legible sin zoom

### ⚠️ Warning: tamaños de fuente demasiado pequeños

- Tamaño mínimo para texto legible: **14px** (mejor 16px).
- Tamaño mínimo para labels y captions: **12px**.

```tsx
// ❌ 10px es demasiado pequeño
<p className="text-[10px]">Fecha del partido</p>

// ✅
<p className="text-xs">Fecha del partido</p>  // text-xs = 12px en Tailwind
```

Para tablas densas en escritorio (clasificación con muchas columnas), 12-13px es aceptable; en móvil ya es justo.

## 6. Inputs no deben hacer zoom en iOS

### ⚠️ Warning: iOS hace zoom si input tiene font-size < 16px

iOS hace zoom automático al input enfocado si su `font-size` es menor a 16px. Rompe el layout.

```tsx
// ❌ Hará zoom al focus en iOS
<input className="text-sm" />  // 14px

// ✅
<input className="text-base" />  // 16px
```

Aplica especialmente a campos de búsqueda y forms de "Crear torneo" / "Añadir equipo".

## 7. Tap delay

### ⚠️ Warning: tap delay de 300ms en links

Algunos navegadores móviles tienen 300ms de delay tras tap (legacy de double-tap-to-zoom).

```css
/* Global */
* {
  touch-action: manipulation;
}
```

O por componente: `<button className="touch-manipulation">`.

## 8. Scroll en contenedores

### ⚠️ Warning: scroll dentro de modal/drawer que arrastra el fondo

Cuando un usuario hace scroll en un modal/dropdown lleno (lista de equipos, selector de torneo), al llegar al final el scroll del body se activa.

```css
.scrollable-container {
  overflow-y: auto;
  overscroll-behavior: contain;
}
```

## 9. Brackets responsive

El bracket es el componente más complejo visualmente. En móvil:
- Scroll horizontal si no cabe → con `overflow-x: auto`.
- Alternativa: vista vertical compacta en breakpoints pequeños.

### ⚠️ Warning: bracket que rompe el layout en móvil

```tsx
// ❌ Sin manejo responsive, el bracket desborda
<div className="grid grid-cols-3 gap-4">
  {rondas.map(r => <BracketRonda {...r} />)}
</div>

// ✅ Con scroll horizontal en móvil
<div className="overflow-x-auto -mx-4 px-4">
  <div className="grid grid-cols-3 gap-4 min-w-[800px]">
    {rondas.map(r => <BracketRonda {...r} />)}
  </div>
</div>
```

## 10. Tablas responsive (clasificación, fixture)

En móvil, las tablas con muchas columnas no caben. Opciones:

### Opción A: scroll horizontal

```tsx
<div className="overflow-x-auto">
  <table className="min-w-full">...</table>
</div>
```

### Opción B: priorizar columnas y ocultar las menos importantes

```tsx
<th className="hidden md:table-cell">PJ</th>  // solo visible en md+
<th>Pts</th>  // siempre visible
```

### Opción C: vista alternativa en móvil (cards)

```tsx
{/* Móvil: cards apiladas */}
<div className="md:hidden space-y-2">
  {clasificacion.map(e => <EquipoCard equipo={e} />)}
</div>

{/* Desktop: tabla */}
<table className="hidden md:table">...</table>
```

Cualquiera de las 3 es aceptable. Elegir según densidad de datos.

## Checklist rápido

- [ ] Tap targets ≥ 44×44px en interactivos clickables.
- [ ] `meta viewport` permite zoom.
- [ ] Inputs usan `type` específico (email, tel, number, search, date).
- [ ] `autoComplete` en forms comunes (contactos, nombres).
- [ ] Ninguna funcionalidad solo accesible vía hover (sin alternativa táctil).
- [ ] Inputs con `font-size` ≥16px (`text-base` en Tailwind) para evitar zoom iOS.
- [ ] `touch-action: manipulation` para evitar tap delay.
- [ ] Bracket tiene scroll horizontal o vista alternativa en móvil.
- [ ] Tablas anchas tienen estrategia responsive (scroll / ocultar columnas / cards).
- [ ] Modales con scroll usan `overscroll-behavior: contain`.
