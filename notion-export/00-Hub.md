# 🏠 Torneos · Hub Krujens

**Plataforma de gestión de torneos juveniles de fútbol con scouting integrado.**

## Identidad del producto

- **Cliente que paga:** organizadores de torneos (clubes, ayuntamientos, federaciones, organizadores privados)
- **Usuarios:** organizadores, árbitros, equipos, familias, **scouts** (Pro/Enterprise)
- **Diferenciador único:** catálogo nacional de cantera + scouting overlay con corrección PHV, integrado con Vitas y Ludus
- **Stage actual:** Pre-MVP (UI completa con 16 torneos reales mockeados, sin backend ni pagos)

## URLs vivas

| Recurso | URL |
|---|---|
| 🚀 Producción | https://torneos-p1s4dtabo-fred-paredes-projects.vercel.app |
| 📦 GitHub | https://github.com/fredparedes58-ui/Torneos- |
| 🏠 Local dev | http://localhost:5300 |

## Stack técnico

- React 18.3 + TypeScript + Vite 8
- Tailwind CSS v4 (CSS-first con `@theme`)
- Framer Motion · React Router v6 · Lucide Icons
- Unsplash CDN para imágenes hero
- pravatar.cc para avatares
- Deploy: Vercel
- 9 skills Claude Code instaladas en `.claude/skills/`

## Pantallas (8 rutas)

| Ruta | Pantalla | Función |
|---|---|---|
| `/` | Dashboard | Panel de Cantera con stats + marquee + torneos top + scouting feed |
| `/torneos` | Lista Torneos | 16 torneos reales con filtros multi-dim + vista calendario |
| `/torneos/:id` | Detalle Torneo | Hero cinemático + bracket/tabla/fixture/cantera/media + estadísticas clave |
| `/equipos` | Cantera | Directorio scouting con jugador estrella por equipo |
| `/jugador/:seed` | Perfil Jugador | Stats + highlights + **heatmap PHV** + informes IA |
| `/registro` | Registro Scout | Wizard 5 pasos: tipo / datos / especialización / plan / confirm |
| `/portal` | Portal Scout | Dashboard del scout autenticado + uploads + informes IA |
| `/nuevo` → `/registro` | (alias legacy) | |

## Stack ecosistémico Krujens

- **TORNEOS** ← este proyecto (funnel de captación de jugadores al catálogo)
- **VITAS** ← scouting profesional con corrección PHV (futuro-club)
- **LUDUS** ← academy ops + training programs

LTV combinado defendible: **€8.154 por organizador** (vs €1.350 sin ecosistema) = multiplicador **6.0×**.

Ver `04-Competitors-DB` y `06-Decisions-Log` para el detalle.
