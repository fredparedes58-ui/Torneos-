# 🚀 Backlog · Próximos pasos

## 🔥 Sprint 6 · Backend foundations (target: junio 2026)

- [ ] **Supabase project + RLS multi-tenant** (organizadores, scouts, jugadores, torneos)
- [ ] **Auth con magic link** (sin password) usando Supabase Auth
- [ ] **Schema migrate** desde `src/types/index.ts` a Postgres
- [ ] **Migrar 16 torneos mockeados** a Supabase como seed
- [ ] **API integración Vitas** — 1 endpoint que reciba `playerId` y devuelva perfil scouting
- [ ] **Stripe + Redsys** para suscripción scout (Pro €49/mes, Enterprise €499/mes)
- [ ] **DPA + Privacy Policy + Terms** redactados con abogado especializado en RGPD/LO 8/2021

## 🎨 Sprint 7 · UX polish (target: julio 2026)

- [ ] **Code split por ruta** con `React.lazy` para bajar bundle inicial
- [ ] **Light theme toggle** alterno al Neon Stadium (los mockups Stitch lo sugieren)
- [ ] **Mapa interactivo** de torneos con pins por ciudad (Leaflet o Mapbox)
- [ ] **PWA installable** con manifest + service worker
- [ ] **i18n** ES / EN / CA / EU (next-i18next o similar)
- [ ] **Skeleton loaders** para todas las pantallas mientras carga datos reales
- [ ] **Error boundaries** con fallback amigable
- [ ] **Empty states** ricos en todas las listas (no solo "no se encontraron")

## 🏗 Sprint 8 · Módulos operativos (target: agosto 2026)

- [ ] **Generador automático de calendarios** (eliminación, liga RR, suizo)
- [ ] **Módulo árbitros** con designaciones y disponibilidad
- [ ] **Comité disciplinario** con sanciones y apelaciones
- [ ] **Live scoring** desde móvil (PWA offline-first)
- [ ] **App equipos/familias** con push notifications
- [ ] **Tiebreakers configurables** (puntos / GD / GF / h2h / fair play)
- [ ] **Sistema de inscripciones** con pago integrado

## 📡 Sprint 9 · Ecosistema Krujens (target: sep 2026)

- [ ] **Conversión real Torneo → Vitas** medible y reporteable
- [ ] **Beta integración Ludus** — training programs sugeridos por IA basado en perfil scouting
- [ ] **Streaming integration** — Hudl / Veo / Pixellot vía iframe
- [ ] **API pública** para terceros (federaciones, agencias)
- [ ] **Webhook events** (torneo creado, jugador inscrito, partido finalizado)

## 🤝 Sprint 10 · Comercial (target: oct 2026)

- [ ] **Cerrar 1 federación territorial firmada** (FCF Catalunya o FFCV Valencia)
- [ ] **10 organizadores piloto pagando** · ARR €4.500
- [ ] **Página landing comercial** separada del producto
- [ ] **Pricing page pública** con calculadora ROI
- [ ] **Onboarding flow comercial** para organizadores (no scouts)
- [ ] **Casos de éxito + testimonials**

## 🎯 Para conversación Seed (Q1 2027)

- [ ] **50 organizadores · ARR €22k**
- [ ] **5 conversiones Vitas documentadas con LTV real medido**
- [ ] **Compliance dossier completo cerrado**
- [ ] **OTTO Pilot equivalente** con Claude + RAG funcional
- [ ] **2ª federación firmada** + piloto LATAM (México) o EU (Italia)

---

## 💡 Ideas no priorizadas (parking lot)

- 🎴 **Trading cards equipos coleccionables** estilo álbum
- 📺 **Hub de streaming** propio (white-label de Hudl o Pixellot)
- 🏟 **Reserva de campos** integrada con ayuntamientos
- 🎓 **Marketplace de cursos** para entrenadores juveniles (cross-sell con Ludus)
- 🤝 **Marketplace transferencias** sub-19 (revenue share con clubes)
- 📊 **Benchmarks anónimos** entre clubes (peer comparison)
- 🎤 **Voice notes scout** transcritas y categorizadas por IA
- 🥇 **Liga propia Krujens** virtual con torneos exclusivos
- 🌍 **App móvil nativa** (React Native, no PWA)
- 🎨 **Customización white-label** para federaciones (logos, colores)

## 🚧 Tech debt conocido

- [ ] Tildes inconsistentes en código (algunos archivos las tienen, otros no por incidentes PowerShell)
- [ ] Pravatar URLs son externas, podríamos servir desde nuestro CDN
- [ ] Unsplash URLs también externas → cachear con next-image equivalente cuando migremos a Next.js (si lo hacemos)
- [ ] BracketView solo soporta brackets de 8 equipos potencia de 2 — falta soporte 16, 32
- [ ] FixtureList no agrupa por fechas, solo por jornada
- [ ] No hay tests (Vitest pendiente)
- [ ] No hay storybook (opcional si crece el equipo)
