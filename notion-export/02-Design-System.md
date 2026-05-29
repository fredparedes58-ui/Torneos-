# 🎨 Design System · Neon Stadium v4

> Paleta cyan + lime + purple sobre azul nocturno profundo. Sucesor de "Twilight Stadium" (dorado-olive).

## Paleta core

### Fondos y cards

| Token | Hex | Uso |
|---|---|---|
| `--color-bg` | `#0A1628` | Fondo base página |
| `--color-bg2` | `#0F1F3A` | Fondo nivel 2 |
| `--color-card` | `#152849` | Cards principales |
| `--color-card2` | `#1E3560` | Cards anidados |
| `--color-card3` | `#2A4570` | Cards elevados |
| `--color-border` | `#2A4570` | Borde default |
| `--color-border2` | `#496588` | Borde resaltado |

### Acentos multi-color

| Token | Hex | Uso |
|---|---|---|
| `--color-accent` | `#22D3EE` | **Cyan primario** — CTAs, links, status activo |
| `--color-lime` | `#84FF6E` | **Lime fluo** — success, métricas positivas |
| `--color-purple` | `#A855F7` | **Purple vibrante** — premium, próximo, métricas neutras |
| `--color-pink` | `#F472B6` | Rosa — alertas suaves, MVP |
| `--color-gold` | `#FCD34D` | Dorado — campeones, trofeos, warnings |

### Texto

| Token | Hex | Uso |
|---|---|---|
| `--color-text` | `#FFFFFF` | Texto base |
| `--color-text-cream` | `#F5F9FF` | Texto cálido |
| `--color-muted` | `#CBDDF0` | Texto secundario |
| `--color-muted2` | `#8FA3C0` | Texto terciario |
| `--color-muted3` | `#5B7299` | Texto deshabilitado |

### Sistema

| Token | Hex | Uso |
|---|---|---|
| `--color-success` | `#84FF6E` | Confirmaciones |
| `--color-danger` | `#FF5577` | Errores, rojas, descenso |
| `--color-warning` | `#FCD34D` | Warnings |
| `--color-blue` | `#60A5FA` | Info |

## Tipografía (3 tiers)

| Tier | Fuente | Uso |
|---|---|---|
| **Display** | Barlow Condensed ExtraBold (800) | Headlines, números grandes, labels UPPERCASE |
| **Mono** | JetBrains Mono | Datos, scores, label-caps, IDs |
| **Body** | DM Sans | Descripciones, párrafos largos |

### Escala de display
- `headline-mega` — 9xl (8rem) con `letter-spacing: -0.035em; line-height: 0.82`
- `headline-cream` — UPPERCASE con gradient cream→cyan
- `italic-accent` — italic cyan con `text-glow-cyan`
- `italic-lime` — italic lime
- `italic-purple` — italic purple
- `gradient-text-neon` — gradient cyan→lime→purple

### Label caps
```css
.label-caps {
  font-family: "JetBrains Mono";
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}
```

## Fondos ambiente (siempre presentes en body)

- **4 radial-gradients fixed** simulando luz cenital: cyan arriba, purple izquierda, gold derecha, cyan abajo
- **Grid pattern** cyan sutil 80×80 px
- **Light beam** que cruza en diagonal cada 12s (`beam-sweep` animation)
- **Noise grain** SVG fractalNoise 6% opacity con `mix-blend-mode: screen`

## Pitch backgrounds (para cards de torneos)

- `.pitch-bg` — cyan + rayas verticales sobre verde futbol
- `.pitch-bg-blue` — blue tonos
- `.pitch-bg-purple` — purple noche
- `.pitch-bg-lime` — lime vibrante
- `.pitch-bg-gold` — dorado warm

## Efectos / glows

| Clase | Efecto |
|---|---|
| `.glow-cyan` `.glow-cyan-lg` `.glow-cyan-xl` | Shadows cyan progresivos |
| `.glow-lime` `.glow-lime-lg` | Shadows lime |
| `.glow-purple` | Shadows purple |
| `.glow-pink` `.glow-gold` `.glow-red` | Otros |
| `.text-glow-cyan` `.text-glow-lime` `.text-glow-purple` `.text-glow-white` | Text-shadow glow |

## Animaciones

| Animation | Duración | Uso |
|---|---|---|
| `fadeUp` | 0.5s ease | Entrada de página con blur |
| `beam-sweep` | 12s | Luz que cruza body |
| `float-orb-1/2/3` | 13-22s | FloatingOrbs ambientes |
| `pulse-glow` | 2.2s | Live indicators |
| `pulse-dot` | 1.6s | Dots con box-shadow |
| `shimmer` | 4s linear | Gradient text móvil |
| `btn-shimmer` | 2.4s | Luz pasando sobre CTAs |
| `sparkle-twinkle` | 2.4s | Partículas en CTAs |
| `draw-line` | 0.7s | Bracket SVG lines |
| `marquee` | 30s linear | Ticker horizontal |
| `scan-line` | 5s | Línea horizontal en cards (hover) |
| `float-y` | 3s | Elementos flotando vertical |

## Componentes UI shared

- `FloatingOrbs` — 3 orbes blurred ambientes
- `Sparkles` — partículas twinkling alrededor de CTAs
- `CounterUp` — animación de números con easing
- `Marquee` — ticker infinito horizontal
- `Avatar` — pravatar con ring colored
- `UploadDropzone` — drag-drop real con progress bar

## CTA gradients

```css
.cta-neon         /* cyan → lime gradient */
.cta-neon-purple  /* purple → cyan gradient */
.play-btn         /* circular cyan con doble glow */
.stat-ring        /* icon container con border colored */
```

## Spacing & radius

- Card radius: **16px** (xl)
- Buttons: **12px** (lg)
- Pills: **999px** (full)
- Padding cards: **20px / 24px**
- Gap entre secciones: **32-48px**

## Reglas duras

1. ❌ **Nunca** mezclar font arbitrary `font-['Barlow_Condensed']` en JSX → usar `font-display`
2. ❌ **Nunca** valores hardcoded fuera de la paleta (excepto en mock data colores de equipo)
3. ✅ **Siempre** texto data en JetBrains Mono
4. ✅ **Siempre** headlines en Barlow Condensed UPPERCASE con tight tracking
5. ✅ **Selección de texto** en cyan (`::selection`)
6. ✅ **Scrollbar** custom de 8px con thumb cyan-medium

## Inspiración

- "El futuro del fútbol base" (balón holográfico con circuitos cyan)
- Pantalla "32 Goles / 15 Asistencias / 5 MVP" con icon-rings colored
- Stadium night photography (Camp Nou, San Mamés, Anoeta)
- Cyberpunk/synthwave moderado — sin caer en cliché
