# 🗺 Roadmap · Torneos

## ✅ Completado (release v4.4)

### Sprint 1 · Bootstrap UI (mayo 2026, semana 1)
- [x] Setup Vite + React + TS + Tailwind v4 + Framer Motion
- [x] Routing con 5 rutas iniciales
- [x] Sistema de mock data: 4 torneos + 8 equipos × 3 torneos
- [x] Dashboard / TorneosList / TorneoDetail / Equipos / NuevoTorneo

### Sprint 2 · Diseño Stitch (mayo, semana 2)
- [x] Migración a paleta "Twilight Stadium" gold + olive
- [x] FloatingOrbs · Sparkles · CounterUp · Marquee · Avatar
- [x] Headlines 9xl con gradient text + glow
- [x] Cards con hover scan-line + tilt 3D
- [x] BracketView con SVG bracket lines animadas

### Sprint 3 · Mercado Espana (mayo, semana 3)
- [x] 16 torneos reales (MIC, Donosti, Yellow Cup, LaLiga Promises, etc.)
- [x] Region/provincia/ciudad/estación/organizador/precio/nivel
- [x] Filtros multi-dim 8 regiones × 4 estaciones × 4 organizadores × 5 niveles
- [x] Vista calendario por meses con drill-down
- [x] Schedule por días + hover schedule preview

### Sprint 4 · Refresh visual (mayo, semana 4)
- [x] Migración a paleta "Neon Stadium" cyan + lime + purple
- [x] Multi-acento cromático (no monocromo dorado)
- [x] Light beam + grid pattern + grain noise
- [x] Stat cards con icon-ring colored semánticamente

### Sprint 5 · Scout Portal (mayo, semana 5)
- [x] Repositioning: `/nuevo` torneo → `/registro` scout
- [x] RegistroScout wizard 5 pasos (tipo · datos · especialización · plan · confirm)
- [x] `/portal` standalone con sesión simulada
- [x] `/jugador/:seed` con tabs Stats / Highlights / Heatmap PHV / Informes
- [x] SVG heatmap PHV animado por posición
- [x] UploadDropzone real con drag-drop + filename + progress

### Documentación
- [x] showcase.html con 6 iframes embebidos del deploy
- [x] competitive-analysis-torneos.html (86 KB, 12 secciones, 11 competidores)
- [x] executive-summary 3 páginas
- [x] 9 skills Claude Code instaladas
- [x] GitHub Action improve-skills-weekly.yml

---

## 🚧 En espera (priorizado)

### P0 · Salir del pre-MVP comercial (Q3 2026)
- [ ] **Backend persistente** — Supabase con RLS multi-tenant + RGPD/LO 8/2021 menores
- [ ] **Pasarela de pago** — Stripe + Redsys para mercado ES
- [ ] **Auth real** — magic link / OAuth (no mock scout)
- [ ] **Generador automático de calendarios** — eliminación / liga RR / suizo
- [ ] **API integración Vitas** — pasar 1 jugador real end-to-end demostrable

### P1 · Diferenciación operativa
- [ ] **Módulo árbitros** — designaciones + disponibilidad + pagos
- [ ] **Comité disciplinario** — sanciones + histórico + apelaciones
- [ ] **Live scoring móvil** — app para árbitros con offline-first
- [ ] **App equipos/familias** — push, calendario, alertas, asistencia
- [ ] **Tiebreakers configurables** — pts / GD / GF / h2h / fair play

### P2 · Diferenciación ecosistémica
- [ ] **Conversión real Torneo → Vitas** medible y reporteable
- [ ] **Beta integración Ludus** — training programs sugeridos
- [ ] **Streaming integration** — Hudl / Veo / Pixellot para los torneos premium
- [ ] **Federación territorial firmada** — FCF Catalunya o FFCV Valencia
- [ ] **Compliance dossier completo** — RGPD + LO 8/2021 cerrado

### P3 · Polish UX
- [ ] **Light theme toggle** — alterno al Neon Stadium
- [ ] **Mapa de torneos** — vista geográfica con pins por ciudad
- [ ] **Páginas admin** — back-office tabla "Gestión de Eventos"
- [ ] **Trading cards equipos** — coleccionables tipo álbum
- [ ] **i18n** — ES / EN / CA / EU
- [ ] **PWA installable** — manifest + service worker
- [ ] **Code split por ruta** — reducir bundle inicial (actualmente 533 KB)

---

## 🎯 Hitos para ronda Seed (€1.5-3M, target Q1 2027)

| Mes | Hito | Estado |
|---|---|---|
| Jun 2026 | 10 organizadores piloto pagando · ARR €4.500 | ⏳ |
| Sep 2026 | 1 federación territorial firmada | ⏳ |
| Dic 2026 | 50 organizadores · ARR €22k · 5 conv. Vitas medibles | ⏳ |
| Ene 2027 | Ronda Seed cerrada (OTTO benchmark $16.5M referencia) | ⏳ |
| Mar 2027 | 2ª federación + piloto Italia o México | ⏳ |
| Jun 2027 | 150-250 organizadores · ARR €100-150k | ⏳ |
| Q4 2027 | Conversación Series A "single EU OS for youth football" | ⏳ |

---

## ⚠️ Riesgos activos

| Riesgo | Severidad | Mitigación en curso |
|---|---|---|
| Hudl/Wyscout lanza Tournament module en EU en 12-24 meses | 🚨 Existencial | Capturar federaciones territoriales antes |
| OTTO SPORT AI levanta Series A y entra Europa | 🚨 Alto | Compliance RGPD como moat regulatorio |
| Vitas/Ludus sin huella online afecta credibilidad VC | ⚠ Medio | Demostrar 1 conversión real Q3 2026 |
| Faltan 10 módulos "boring but critical" antes de cobrar | ⚠ Medio | Sprint 6 = backend + pagos + calendarios |
