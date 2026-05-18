# Casos especiales de PR description

## 1. Hotfix urgente

Cuando hay que arreglar algo en main rápido (build roto en producción, regresión visible):

```markdown
## fix: restore postcss.config.js (hotfix)

### Qué cambia
- Restaura postcss.config.js eliminado por error en #N.

### Por qué
Sin este archivo, el build local usa el postcss.config global de 
Windows y genera output inconsistente. Detectado por Pedro en local.

### Áreas afectadas
- [x] Config

### Checks
- [x] Build local verde.
- [x] Vercel deploy verde.

### Hotfix
🔥 Restaurar inmediatamente. Mergear sin esperar review extendido.
```

## 2. Sync con Stitch (proviene de stitch-sync)

Ver ejemplo en `structure.md`. Reglas adicionales:

- Title prefijo `chore(stitch): ` o `style(stitch): ` según el alcance.
- Mencionar la versión del ZIP procesado.
- Confirmar que el ZIP se movió a `archive/`.
- Confirmar que NO se cambió paleta core ni fonts.

## 3. PR solo de mock data

```markdown
## chore(mock): add 3 new torneos for grupos_eliminacion testing

### Qué cambia
- Añade 3 torneos formato `grupos_eliminacion` al mock.
- Actualiza statsGlobales: totalTorneos 5 → 8.

### Por qué
Necesarios para validar el rendering del componente GroupsView 
en el próximo PR.

### Áreas afectadas
- [x] Mock Data / Types

### Checks
- [x] `tsc -b` verde.
- [x] mock-data-validator: todos los invariantes cumplidos.
  - Cada torneo: 8 equipos / 2 grupos / 4 clasificados (potencia de 2).
  - statsGlobales.totalTorneos cuadra con torneos.length.

### Notas
Datos placeholder con nombres genéricos. Pueden actualizarse cuando 
llegue input real de Pedro.
```

## 4. PR de actualización de dependencias

```markdown
## chore: bump framer-motion 10.x → 11.x

### Qué cambia
- Actualiza framer-motion en package.json.
- Sin cambios en el código consumer (API compatible).

### Por qué
Patch de seguridad reportado por Dependabot. Sin breaking changes 
según el changelog.

### Áreas afectadas
- [x] Config

### Checks
- [x] `npm install --legacy-peer-deps` OK.
- [x] Build verde.
- [x] Bundle: 405 KB (sin regresión).
- [x] Animaciones existentes verificadas en local.

### Notas
Si aparecen errores visuales en preview de Vercel, revertir y 
quedarse en 10.x.
```

## 5. PR de cambio en config / Vite

```markdown
## chore: enable source maps for production debug

### Qué cambia
- Añade `build.sourcemap: 'hidden'` en vite.config.ts.

### Por qué
Necesario para debugging del bundle sin exponer source maps al cliente.

### Áreas afectadas
- [x] Config
- [x] Deploy / Vercel

### Checks
- [x] Build verde.
- [x] Bundle JS NO cambia (sourcemaps son archivos separados).
- [x] Puerto 5300 intacto.
- [x] postcss.config.js intacto.

### Notas
Source maps se generan pero no se sirven al cliente. Tamaño 
deployado idéntico.
```

## 6. PR grande / refactor

Cuando inevitablemente toca muchos archivos:

```markdown
## refactor: extract shared layout components

### Contexto del scope grande
Este PR toca 14 archivos porque extrae 3 componentes compartidos 
(StadiumHeader, StadiumFooter, PageWrapper) que estaban duplicados 
en 12 páginas. Es preferible hacerlo en un solo PR atómico para 
evitar inconsistencias intermedias.

### Qué cambia
- Crea `src/components/layout/` con StadiumHeader, StadiumFooter, PageWrapper.
- Reemplaza el HTML duplicado en 12 páginas.
- Centraliza la animación fadeUp en PageWrapper.

### Por qué
Reduce ~400 líneas duplicadas. Habilita cambios consistentes futuros 
(ej. añadir breadcrumbs requeriría tocar 1 archivo, no 12).

### Áreas afectadas
- [x] UI / Components
- [x] Lógica compartida

### Checks
- [x] Build verde.
- [x] Bundle: 389 KB (-23 KB respecto a main).
- [x] Cada página renderiza igual visualmente (verificado en local).
- [x] design-system-guardian: score 95/100.

### Notas
- 14 archivos pero la lógica es repetitiva. Recomiendo revisar 
  `PageWrapper.tsx` (el componente nuevo) y 1-2 páginas como muestra.
- Sin cambios funcionales: zero cambios en mock data ni en hooks.
```

## 7. PR de prueba / WIP

Si Pedro pushea un WIP a una branch (no main):

```markdown
## wip: experimenting with vertical bracket layout

⚠️ NO MERGEAR — experimento visual.

### Qué cambia
- Prototipo de BracketView con orientación vertical.

### Áreas afectadas
- [x] UI / Components

### Notas
- Para revisión visual solamente.
- Si se decide adoptar, abriré PR limpio.
```

## 8. PR de revert

```markdown
## revert: "feat: add tournament dashboard with stats overview" (#42)

### Qué cambia
- Revierte #42.

### Por qué
Bug detectado en producción: división por cero cuando statsGlobales 
tiene torneos: 0. Revertimos mientras se aplica el fix.

### Áreas afectadas
- [x] UI / Components
- [x] Mock Data / Types

### Checks
- [x] Build verde.
- [x] Tests manuales OK con mock vacío.

### Follow-up
- Issue #X para tracking del fix.
- PR #X+1 con la corrección.
```
