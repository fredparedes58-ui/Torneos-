# Estructura del PR description

## Title

Convencional commits en inglés:

- `feat: add bracket view with elimination format`
- `fix: handle empty teams in eliminacion mode`
- `chore: bump framer-motion to 11.x`
- `refactor: extract TournamentCard sub-components`
- `docs: update README with stitch-sync workflow`
- `style: align labels with label-caps utility`

### Reglas

- Verbo en presente imperativo (`add` no `added`).
- Sin punto final.
- Scope opcional entre paréntesis si ayuda: `feat(bracket): add elimination view`.
- Máximo ~60 chars.

## Body — secciones canónicas

### Qué cambia (obligatorio)

Bullets de máximo 1 línea cada uno, verbo al inicio:

```
- Añade BracketView con soporte eliminación 8/16/32.
- Conecta mock data al hook useTorneos.
- Aplica utility glow-green a marcadores destacados.
```

### Por qué (obligatorio salvo trivial)

1-2 frases. Conecta con el roadmap o un issue:

```
Necesario para validar el flujo de visualización antes de conectar 
datos PHV en Fase 2. Cierra parcialmente #34.
```

### Áreas afectadas (obligatorio)

Lista de checkboxes marcando solo las relevantes:

```
- [x] UI / Components
- [ ] Mock Data / Types
- [ ] Config
- [ ] Stitch Sync
- [ ] Deploy / Vercel
- [ ] Lógica compartida
- [ ] CI / Workflows
```

Esto permite a Pedro escanear de un vistazo el alcance.

### Checks (obligatorio)

Bloque que confirma los pre-push checks corridos:

```
- [x] `tsc -b && vite build` verde
- [x] Sin console.log nuevos en src/
- [x] Bundle: 412 KB (✅ bajo 500)
- [x] postcss.config.js intacto
- [x] Puerto 5300 sin cambios
```

Si algún check no aplica (ej. PR de docs), marcarlo `n/a`.

### Notas (opcional)

Solo si hay algo que el reviewer DEBE saber y no es obvio del diff:

```
- BracketView usa una recursión que asume 8/16/32. Para 64 equipos 
  hay TODO marcado #45.
- Animación fadeUp aplicada a la página completa, no a cada card 
  (decisión consciente para no saturar al cargar).
```

### Screenshots (cuando aplica)

Si el cambio es visual:

```
### Screenshots
[Adjuntar antes/después en la UI de GitHub al crear el PR]
```

No incluir markdown de imagen con URLs falsas; dejar instrucción para Pedro.

## Tamaño esperado del body

- **PR pequeño** (1-3 archivos): 5-10 líneas. Solo "Qué cambia" + "Checks".
- **PR mediano** (4-8 archivos): 15-25 líneas. Todas las secciones obligatorias.
- **PR grande** (>8 archivos): 30+ líneas. Detalle por área afectada, justificación del scope grande.

## Ejemplo completo: PR mediano

```markdown
## feat: add tournament dashboard with stats overview

### Qué cambia
- Añade DashboardPage como ruta `/`.
- Conecta statsGlobales del mock al header del dashboard.
- Añade 3 stat blocks reutilizables (Torneos, Equipos, Goles).
- Aplica animación fadeUp al wrapper de la página.

### Por qué
Primer paso del flujo de scouting. Necesario para validar la 
estética Digital Stadium con datos reales antes de conectar PHV.

### Áreas afectadas
- [x] UI / Components
- [x] Mock Data / Types
- [ ] Config
- [ ] Stitch Sync
- [ ] Deploy / Vercel
- [ ] Lógica compartida
- [ ] CI / Workflows

### Checks
- [x] `tsc -b && vite build` verde
- [x] Sin console.log nuevos
- [x] Bundle: 398 KB
- [x] mock-data-validator pasa (statsGlobales cuadra)
- [x] design-system-guardian: score 92/100

### Notas
- StatBlock se reutilizará en `/torneos/:id` (siguiente PR).
- mock.ts no cambió, solo nuevos consumers.

### Screenshots
[Adjuntar al subir]
```

## Ejemplo: PR pequeño

```markdown
## fix: remove unused Calendar import from DashboardPage

### Qué cambia
- Elimina import de `Calendar` no usado en DashboardPage.tsx (TS6133).

### Checks
- [x] Build verde.
```

## Ejemplo: PR de Stitch sync

```markdown
## chore(stitch): apply v3.2 diffs to bracket and fixture screens

### Qué cambia
- Border bottom del header: `#434933` → `#C8FF00/20` (más prominente).
- Gap del grid de bracket: 16px → 24px (alineado con Stitch).
- Label "EQUIPOS" usa `label-caps` (era inline uppercase).

### Por qué
Aplica los cambios visuales aprobados de Stitch v3.2 reportados por 
stitch-sync. Sin cambios estructurales ni a paleta core.

### Áreas afectadas
- [x] UI / Components
- [x] Stitch Sync

### Checks
- [x] Build verde.
- [x] design-system-guardian: score 98/100.
- [x] Stitch v3.2 ZIP movido a `archive/`.
```
