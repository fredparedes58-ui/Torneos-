---
name: repo-conventions
description: Convenciones específicas del proyecto Torneos (Cantera Hub). Skill de soporte que otras skills cargan automáticamente. Stack React 18.3 + TypeScript + Vite 8 + Tailwind v4 + Framer Motion. Plataforma de gestión de torneos juveniles con estética Digital Stadium.
---

# Repo Conventions — Torneos (Cantera Hub)

Convenciones del proyecto. **Fuente de verdad**, no detección automática.

## Stack

- **React 18.3 + TypeScript estricto** + Vite 8.
- **Tailwind v4** (sintaxis nueva, ojo con cambios desde v3).
- **Framer Motion** para animaciones de entrada.
- **React Router v6**.
- **Lucide Icons** (CUIDADO con TS6133: imports no usados rompen build).
- **Deploy: Vercel** (env vars solo via dashboard, NUNCA en `.env` commiteados).
- **Sin backend propio todavía**: mock data first. Integración con datos PHV en Fase 2.

## Identidad visual: Digital Stadium

Paleta CORE (no cambiar sin discusión):

| Token | HEX | Uso |
|---|---|---|
| Fondo base | `#111508` | Background principal |
| Accent verde lima | `#C8FF00` | CTAs, highlights, glow-green |
| Acento crema | `#C4CAAC` | Texto secundario, líneas suaves |
| Verde oliva | `#434933` | Bordes, separadores |

Fonts INAMOVIBLES:
- `font-display` → **Barlow Condensed** (titulares, números grandes)
- `font-mono` → **JetBrains Mono** (datos, stats, IDs)
- `font-body` → **DM Sans** (texto general)
- `label-caps` → utility para labels en mayúsculas con letterspacing

Utilities propios:
- `glass-card` → contenedores con efecto glass
- `pitch-bg` → fondos tipo cancha
- `glow-green` → glow del verde lima accent

## Carga progresiva de detalles

- Tokens visuales y paleta → `details/design-tokens.md`
- Tipografía y reglas de fonts → `details/typography.md`
- Utilities personalizados → `details/utilities.md`
- Patrones de código (mock-first, animations, español sin tildes) → `details/code-patterns.md`
- Reglas anti-PowerShell con encoding → `details/powershell-safety.md`
- Setup Vercel y env vars → `details/vercel-setup.md`
- postcss.config.js local override (gotcha conocido) → `details/postcss-gotcha.md`

## 🚨 Bloqueantes (NUNCA, sin excepción)

1. **NO commitear API keys** (Anthropic, Vercel, Supabase) ni archivos `.env`.
2. **NO push a `main` sin build verificado**: `tsc -b && vite build` debe pasar verde.
3. **NO cambiar la paleta core** (`#111508`, `#C8FF00`, `#C4CAAC`, `#434933`) sin discusión explícita. Rediseño solo viene de Stitch ZIP nuevo.
4. **NO romper el sistema de fonts**: Barlow Condensed / JetBrains Mono / DM Sans son inamovibles.
5. **NO modificar el puerto 5300** (reservado, futuro-club usa 5200).

## ⚠️ Warnings (avisar, no bloquear)

1. Bundle JS > 400 KB minified (target ideal; 500 KB es el límite duro de deploy-sentinel).
2. PR que toque > 8 archivos sin descripción clara del scope.
3. Componente nuevo sin animación de entrada (`fadeUp` con Framer Motion).
4. Página nueva sin fallback para data vacía (`No se encontraron…`).
5. Strings con emojis o tildes editados via PowerShell pipeline → riesgo de corrupción.
6. `TODO` / `FIXME` nuevos sin issue de GitHub asociado.
7. Imports de `lucide-react` no usados → genera TS6133, rompe build.

## Filosofía del proyecto

Pedro prefiere **"una pasada que funciona" > "tres preguntas de clarificación"**. Skills deben ser decisivas:
- Si el contexto basta, ejecutar y reportar.
- Solo preguntar cuando NO se puede continuar sin la decisión.
- Asumir defaults razonables y declararlos explícitamente en el reporte.
