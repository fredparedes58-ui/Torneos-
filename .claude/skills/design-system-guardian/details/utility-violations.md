# Utility violations

Detectar cuando se replica inline algo que ya tiene utility (`glass-card`, `pitch-bg`, `glow-green`, `label-caps`).

## Replicación de `glass-card`

### Patrón a detectar

```tsx
// 💡 Esto es la implementación del glass-card replicada inline
<div className="bg-[#111508]/70 backdrop-blur-md border border-[#434933]/50 rounded-2xl ...">
```

Heurística: combinación de `backdrop-blur` + `bg-[#...]/N` + `border-[#...]/N`.

### Reporte

```
💡 Inline replication of `glass-card`: <archivo>:<línea>

<div className="bg-[#111508]/70 backdrop-blur-md border border-[#434933]/50 rounded-2xl">

Esta combinación ya está encapsulada en el utility `glass-card`.

Fix:
<div className="glass-card rounded-2xl">  // las clases específicas extras quedan
```

## Replicación de `glow-green`

### Patrón a detectar

```tsx
<div className="drop-shadow-[0_0_20px_#C8FF00]">  // 💡
<div className="shadow-[0_0_15px_rgba(200,255,0,0.5)]">  // 💡
<div style={{ filter: 'drop-shadow(0 0 12px #C8FF00)' }}>  // ⚠️
```

### Reporte

```
💡 Inline replication of `glow-green`: <archivo>:<línea>

[línea]

Esta es la implementación de `glow-green` replicada.

Fix:
<div className="glow-green">
```

## Replicación de `pitch-bg`

### Patrón a detectar

Gradients o backgrounds complejos que parecen replicar el patrón de cancha:

```tsx
<section style={{ 
  backgroundImage: 'radial-gradient(...)',
  backgroundSize: '...' 
}}>
```

### Reporte

```
💡 Possible replication of `pitch-bg`: <archivo>:<línea>

[línea con el background custom]

Si esto es el fondo de cancha del Digital Stadium, usar el utility:

<section className="pitch-bg">
```

Si NO es relacionado al pitch (es otro pattern), está OK. Verificar el contexto.

## ⚠️ Patrón repetido sin utility (3+ ocurrencias)

Si en el PR aparece 3+ veces la misma composición de clases (no triviales):

```tsx
// Componente A:
<div className="bg-[#111508] border border-[#434933] rounded-xl p-4 hover:border-[#C8FF00]/50">

// Componente B:
<div className="bg-[#111508] border border-[#434933] rounded-xl p-4 hover:border-[#C8FF00]/50">

// Componente C:
<div className="bg-[#111508] border border-[#434933] rounded-xl p-4 hover:border-[#C8FF00]/50">
```

→ 💡 Sugerencia: extraer como nuevo utility (ej. `stadium-tile`).

### Reporte

```
💡 Repeated pattern detected (3+ occurrences):

Pattern: "bg-[#111508] border border-[#434933] rounded-xl p-4 hover:border-[#C8FF00]/50"

Locations:
- <archivo>:<línea>
- <archivo>:<línea>
- <archivo>:<línea>

Considerar añadir como utility nuevo en @theme (ej. `stadium-tile`):

@layer components {
  .stadium-tile {
    @apply bg-[#111508] border border-[#434933] rounded-xl p-4 hover:border-[#C8FF00]/50;
  }
}

Y reemplazar las 3 ocurrencias por <div className="stadium-tile">.
```

Esto no es un edit que la skill aplique sola, es propuesta para el humano.

## Cómo identificar la replicación

Cargar la lista actual de utilities desde `repo-conventions/details/utilities.md`. Por cada utility, conocer su implementación CSS (lo que hace el class). Buscar en el diff esa implementación replicada inline.

Si no tienes la implementación exacta (porque está en globals.css y no la tienes a mano), heurística por palabras clave:

- `glass-card` → `backdrop-blur` + `bg-` con alpha + posible `border`
- `glow-green` → `drop-shadow` o `shadow` con `#C8FF00` o similar
- `pitch-bg` → backgrounds con gradient/pattern complejos en secciones grandes
- `label-caps` → `uppercase` + `tracking-` + típicamente texto corto

## Contribución al score

| Tipo | Resta del score |
|---|---|
| Replicación inline de utility existente | -3 por ocurrencia |
| Patrón repetido sin utility (3+ veces) | -5 (oportunidad de mejora, no error) |
| Estilo inline cuando había utility | -3 por ocurrencia |
