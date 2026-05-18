# Utilities personalizados — Torneos

Estos utilities encapsulan la identidad Digital Stadium. Usar SIEMPRE el utility, no replicar su CSS inline.

## `glass-card`

Tarjeta con efecto glass / blur. Uso típico: cards de torneo, módulos del dashboard, tarjetas de equipo.

```tsx
<div className="glass-card p-6 rounded-2xl">
  <h3 className="font-display text-2xl">Copa de Cantera 2026</h3>
  <p className="font-body text-sm text-[#C4CAAC]">12 equipos · Eliminacion</p>
</div>
```

### ❌ Anti-pattern: replicar el efecto inline

```tsx
<div className="bg-[#111508]/70 backdrop-blur-md border border-[#434933]/50 ...">
  ...
</div>
```

Si esto aparece en código, → ⚠️ sugerir reemplazar por `glass-card`.

## `pitch-bg`

Fondo con patrón tipo cancha (líneas, gradientes, texturas). Uso típico: hero del dashboard, fondos de scoreboard.

```tsx
<section className="pitch-bg min-h-screen">
  ...
</section>
```

### ❌ Anti-pattern: replicar gradiente o pattern

```tsx
<section style={{ 
  backgroundImage: 'radial-gradient(...)',
  backgroundSize: '...' 
}}>
```

→ ⚠️ Sugerir `pitch-bg` si encaja.

## `glow-green`

Drop shadow / glow del lime accent. Uso típico: números destacados, CTAs principales, badges de "EN VIVO".

```tsx
<p className="font-display text-6xl text-[#C8FF00] glow-green">
  3
</p>

<button className="bg-[#C8FF00] text-[#111508] glow-green">
  Crear torneo
</button>
```

### ❌ Anti-pattern: glow inline

```tsx
<div className="drop-shadow-[0_0_20px_#C8FF00]">  // duplicación de utility
```

## `label-caps`

Texto en mayúsculas con letterspacing. (Ver también `typography.md`.)

```tsx
<span className="label-caps text-xs">Goles</span>
```

## Reglas de creación de utilities nuevos

Si Pedro o tú detectáis un patrón que se repite (3+ ocurrencias), CANDIDATO a utility:

1. Definirlo en el archivo de styles globales o `@theme`.
2. Nombre semántico, no descriptivo:
   - ✅ `bracket-line` (semántico)
   - ❌ `dashed-yellow-border` (descriptivo, frágil ante cambios)
3. Documentarlo en este archivo.

## Qué NO convertir en utility

- Composiciones de 1-2 clases Tailwind triviales: `flex items-center gap-2` no necesita ser `flex-row-gap`.
- Estilos que solo aparecen en 1 lugar.
- Variantes específicas (ej: card de equipo) → usa componente React, no utility CSS.

## Lista actualizable

Lista de utilities canónicos a la fecha actual:

- `glass-card`
- `pitch-bg`
- `glow-green`
- `label-caps`
- `font-display`, `font-mono`, `font-body`

Cuando se añadan nuevos, actualizar este archivo. La skill `design-system-guardian` lee esta lista para sus audits.

## Si detectas violación

| Patrón | Severidad |
|---|---|
| Replicación inline de efecto que `glass-card` cubre | ⚠️ Warning |
| Replicación inline de glow del lime | ⚠️ Warning |
| Patrón repetido 3+ veces sin utility | 💡 Sugerencia (proponer utility nuevo) |
| Componente con >5 classes que podría ser 1 utility | 💡 Sugerencia |
