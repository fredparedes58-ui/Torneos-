# Tipografía — Torneos (Cantera Hub)

## Fonts INAMOVIBLES

| Utility class | Font | Uso típico |
|---|---|---|
| `font-display` | **Barlow Condensed** | Titulares, números grandes, scoreboards |
| `font-mono` | **JetBrains Mono** | Stats, IDs, datos tabulares |
| `font-body` | **DM Sans** | Texto general, párrafos, descripciones |
| `label-caps` | (basada en una de las anteriores con uppercase + letterspacing) | Labels, badges, headers de tabla |

Cambiar cualquiera = 🚨🚨 bloqueante crítico.

## Regla absoluta: SIEMPRE utility, NUNCA arbitrary con quotes

### 🚨 BLOQUEANTE: arbitrary class de font con quotes en JSX

```tsx
// 🚨 Rompe el parser de TypeScript
<h1 className="font-['Barlow_Condensed']">Final</h1>

// 🚨 También rompe
<p className={`font-["DM Sans"]`}>Texto</p>
```

Las quotes anidadas dentro de className en JSX rompen el parser y el build se cae con errores crípticos.

### ✅ Correcto: utility del @theme

```tsx
<h1 className="font-display">Final</h1>
<p className="font-body">Texto</p>
<span className="font-mono">{playerId}</span>
<span className="label-caps">Equipos</span>
```

Si el utility que necesitas no existe en `@theme`, añadirlo ahí, NO usar arbitrary class en el componente.

## label-caps: uso típico

```tsx
// Headers de tablas y secciones
<th className="label-caps text-[#C4CAAC]">Equipo</th>

// Badges de estado
<span className="label-caps text-xs text-[#C8FF00]">EN VIVO</span>

// Labels de stats
<p className="label-caps">Goles</p>
```

## Jerarquía tipográfica esperada

| Tamaño | Class | Uso |
|---|---|---|
| Display XL | `text-6xl font-display` | Score grande de scoreboard |
| Display L | `text-4xl font-display` | Título de página |
| Display M | `text-2xl font-display` | Título de sección |
| Body L | `text-lg font-body` | Párrafo destacado |
| Body | `text-base font-body` | Párrafo estándar |
| Body S | `text-sm font-body` | Texto secundario |
| Caption | `text-xs font-mono` | Metadatos, fechas |

## Combinaciones canónicas

```tsx
// Card de torneo
<div className="glass-card">
  <h3 className="font-display text-2xl">Copa de Cantera</h3>
  <p className="font-body text-sm text-[#C4CAAC]">12 equipos · Eliminacion</p>
  <span className="label-caps text-xs text-[#C8FF00]">EN VIVO</span>
</div>

// Stat block
<div>
  <p className="label-caps text-xs">Goles</p>
  <p className="font-display text-4xl text-[#C8FF00]">24</p>
</div>

// Tabla
<table>
  <thead>
    <tr>
      <th className="label-caps text-[#C4CAAC]">Equipo</th>
      <th className="label-caps text-[#C4CAAC]">PJ</th>
      <th className="label-caps text-[#C4CAAC]">G</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td className="font-body">Cantera FC</td>
      <td className="font-mono">8</td>
      <td className="font-mono">5</td>
    </tr>
  </tbody>
</table>
```

## Si detectas violación

| Patrón | Severidad |
|---|---|
| `font-['Nombre_Fuente']` en JSX | 🚨 Bloqueante (rompe build) |
| `style={{ fontFamily: '...' }}` | 🚨 Bloqueante |
| Texto sin utility de font | ⚠️ Warning (probablemente está heredando, pero mejor explícito) |
| Cambiar Barlow / JetBrains / DM Sans | 🚨🚨 Bloqueante crítico |
| Tamaños arbitrary sin razón (`text-[19px]`) | ⚠️ Warning |
