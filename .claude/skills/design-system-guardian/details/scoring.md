# Cálculo del score 0-100

## Cómo funciona

1. **Score inicial: 100.**
2. Por cada violación detectada, restar puntos según su tipo (ver tablas en token-violations.md, typography-violations.md, utility-violations.md).
3. Score mínimo: 0 (no negativo).
4. **Veredicto automático según rango:**

| Rango | Veredicto |
|---|---|
| 90-100 | ✅ Luz verde — aprobar |
| 70-89 | ⚠️ Advertir, no bloquear — refinar antes de merge |
| < 70 | 🚫 Bloquear merge — corregir antes de re-review |

## Tabla consolidada

### Críticas (cualquiera → score capped at 0)

- Cambio a la paleta core
- Cambio del mapping de fonts (`font-display` → otra font)

### Resta -25

- `font-['Nombre']` con quotes en JSX (rompe build)

### Resta -10

- Multiple instancias de hex nuevos en el mismo PR

### Resta -5

- Hex nuevo fuera de paleta en JSX (por ocurrencia)
- Style inline de `fontFamily` (por ocurrencia)
- Patrón repetido 3+ veces sin utility

### Resta -3

- Style inline de color (por ocurrencia)
- Replicación inline de utility existente (por ocurrencia)
- `style` con propiedad CSS que tiene utility equivalente (por ocurrencia)

### Resta -2

- Componente nuevo sin font utility (por ocurrencia)

### Resta -1

- Opacidad ad hoc cuando hay alternativa
- Tamaño arbitrary innecesario
- TH/badge sin `label-caps`

## Ejemplos

### Ejemplo 1: PR con score 95

Cambios:
- Añade 1 componente bien hecho.
- 1 hex nuevo (-5).

Score: 100 - 5 = 95 → ✅ Luz verde.

### Ejemplo 2: PR con score 73

Cambios:
- 2 hex nuevos fuera de paleta (-10).
- 1 style inline de color (-3).
- 3 componentes sin font utility (-6).
- 1 replicación de glow-green inline (-3).
- 1 opacidad ad hoc (-1).
- 4 cosas más menores (-4).

Score: 100 - 27 = 73 → ⚠️ Advertir, no bloquear.

### Ejemplo 3: PR con score 60

Cambios:
- `font-['Barlow_Condensed']` en JSX (-25).
- 2 hex nuevos (-10).
- 1 style inline color (-3).
- 2 replicaciones de glass-card inline (-6).

Score: 100 - 44 = 56 → 🚫 BLOQUEAR.

### Ejemplo 4: PR con score 0

Cambios:
- Cambio de la paleta core: `#C8FF00` → `#00FF88` (-100, capped).

Score: 0 → 🚫 BLOQUEAR CRÍTICO + escalación al humano.

## Cómo comunicar el score

En el output, mostrar el desglose:

```
### Score: 73/100

Desglose:
- 100 base
- -10  Hex fuera de paleta (2 ocurrencias)
- -6   Componentes nuevos sin font utility (3 ocurrencias)
- -3   Style inline color (1)
- -3   Replicación inline de glow-green (1)
- -5   Otras menores
= 73
```

Esto hace transparente el juicio y permite al humano discutir items específicos si discrepa.
