# 📐 Decisions Log (ADR)

> Decisiones arquitectónicas tomadas en el proyecto. Formato ADR (Architecture Decision Record).

## ADR-001 · Vite + React + Tailwind v4

**Fecha:** mayo 2026 · **Estado:** Aceptada

Decisión: Stack moderno con menor overhead que Next.js para una SPA front-only en esta fase.

**Pros**: HMR rapidísimo, Tailwind v4 CSS-first, Framer Motion compatible
**Cons**: SSR no out-of-the-box (no necesario pre-MVP)

## ADR-002 · Mock data primero, backend después

**Fecha:** mayo 2026 · **Estado:** Aceptada

Decisión: Toda la UI funciona con 16 torneos mockeados en `src/data/mock.ts`. Sin Supabase ni backend hasta que cliente real lo pague.

**Razón**: Validar visión completa antes de invertir en infra. Permite deploy continuo a Vercel sin coordinación backend.

## ADR-003 · Acento visual cyan en lugar de dorado

**Fecha:** mayo 2026 · **Estado:** Aceptada (sustituye ADR previo de "dorado")

Decisión: Migrar de paleta "Twilight Gold" (`#F2C53D`) a "Neon Stadium" (`#22D3EE` + lime + purple).

**Razón**: Feedback del usuario tras ver refs de cyber-football. La paleta dorada se sentía opaca; cyan-lime-purple aporta multi-acento por contexto (stats coloreados semánticamente, no monocromos).

## ADR-004 · `+ Nuevo Torneo` → `+ Soy Scout`

**Fecha:** mayo 2026 · **Estado:** Aceptada

Decisión: El CTA principal del sidebar deja de ser "crear torneo" y pasa a ser **"registro de scout/empresa"**.

**Razón aclarada por el usuario**: El cliente que paga *no es el organizador del torneo* (eso se gestiona internamente, o vía dashboard de organizador en una fase posterior). El producto **scouting-first** tiene como activador al scout/empresa que se registra y desbloquea acceso al Portal con videos IA, informes y publicación de su propio contenido.

**Implicación arquitectónica**: La fase comercial inicial vende suscripciones de scout (€49/mes Pro o €499/mes Enterprise), no SaaS de organizador. Esto cambia el modelo de revenue y el LTV calculado.

## ADR-005 · Imágenes vía Unsplash CDN

**Fecha:** mayo 2026 · **Estado:** Aceptada

Decisión: No bundlear imágenes. Usar Unsplash photo IDs estables + pravatar.cc para avatares.

**Pros**: Bundle más pequeño · imágenes hiperrealistas sin proceso
**Cons**: Dependencia de servicio externo (mitigado con `onError` fallback al `pitch-bg` CSS gradient)

## ADR-006 · No usar tildes en strings nuevos

**Fecha:** mayo 2026 · **Estado:** Aceptada (descubierto por las malas)

Decisión: Los strings nuevos en código usan ASCII sin tildes (`español` → `espanol`). Strings ya existentes con tildes correctas se respetan.

**Razón**: Migraciones por PowerShell con replace masivo corrompen UTF-8 al releer/reescribir si los archivos tienen tildes/emojis. Aprendido tras varios incidentes. Mitigado con scripts que usan `[System.Text.Encoding]::UTF8.GetString()` + `WriteAllBytes` sin BOM, pero por seguridad evitamos tildes en código nuevo.

## ADR-007 · Routing flat con alias legacy

**Fecha:** mayo 2026 · **Estado:** Aceptada

Decisión: `/nuevo` redirige automáticamente a `/registro` con `<Navigate replace />`. URLs antiguas no rompen.

**Estructura final de rutas:**
- `/` → Dashboard
- `/torneos` `/torneos/:id` → Lista y detalle
- `/equipos` → Cantera
- `/jugador/:seed` → Perfil de jugador
- `/registro` → Wizard scout
- `/portal` → Portal scout autenticado (mock)
- `/nuevo` → redirige a /registro (legacy)

## ADR-008 · 9 skills Claude Code instaladas

**Fecha:** mayo 2026 · **Estado:** Aceptada

Decisión: Instalar skills genéricas + específicas en `.claude/skills/` para automatizar review y deploy.

**Skills**: design-system-guardian, code-review, ux-review, mock-data-validator, deploy-sentinel, pr-description, stitch-sync, repo-conventions, improve-skill.

## ADR-009 · Bundle warning aceptado temporalmente

**Fecha:** mayo 2026 · **Estado:** Aceptada (revisar en sprint 6)

Decisión: Bundle JS llegó a 533 KB (gzip 154 KB) tras añadir PortalScout y JugadorDetail. Vite avisa pero seguimos sin code-split.

**Plan futuro**: split por ruta con `React.lazy` + `Suspense` cuando empecemos integración backend (sprint 6).

## ADR-010 · Compliance RGPD/LO 8/2021 como moat

**Fecha:** mayo 2026 · **Estado:** Aceptada estratégicamente

Decisión: Convertir el compliance regulatorio europeo (RGPD + Ley 8/2021 protección menores) en moat estructural frente a competidores USA (OTTO, GotSport, SportsEngine).

**Inversión planeada**: €30-50k en arquitectura legal + DPA antes de cobrar al primer cliente.
**Resultado esperado**: ventaja defensiva de 12-18 meses frente a entrada USA en Europa.

---

## Cómo añadir un ADR nuevo

1. Numerar consecutivamente (ADR-011, etc.)
2. Fecha + Estado (Propuesta · Aceptada · Rechazada · Reemplazada)
3. Decisión (1 frase)
4. Razón (por qué, no qué)
5. Implicaciones (qué cambia hacia adelante)
