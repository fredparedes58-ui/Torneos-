# Checklist final del PR

Antes de generar el body, verificar mentalmente que el PR cumple con los requisitos del repo Torneos.

## Checks que debe cumplir el PR

### Build y tipos

- [ ] `tsc -b && vite build` pasa verde en local.
- [ ] Sin imports de `lucide-react` no usados (TS6133).
- [ ] Sin errores TS de ningún tipo.

### Código

- [ ] Sin `console.log` nuevos en src/ (excepto envueltos en `if (import.meta.env.DEV)`).
- [ ] Sin tildes corruptas (`Ã©`, `Ã±`) en strings hardcoded.
- [ ] Sin `font-['...']` arbitrary classes con quotes en JSX.

### Convenciones visuales

- [ ] Paleta core sin cambios (`#111508`, `#C8FF00`, `#C4CAAC`, `#434933`).
- [ ] Fonts sin cambios (Barlow Condensed / JetBrains Mono / DM Sans).
- [ ] Componentes/páginas nuevas tienen animación de entrada (fadeUp).
- [ ] Listas tienen fallback empty ("No se encontraron …").

### Config / infraestructura

- [ ] `postcss.config.js` presente en root.
- [ ] Puerto 5300 sin cambios en `vite.config.ts`.
- [ ] Sin `.env*` trackeado.
- [ ] Sin API keys hardcoded en código.

### Bundle

- [ ] Bundle minified ≤ 500 KB (límite duro).
- [ ] Ideal ≤ 400 KB.

### Mock data (si aplica)

- [ ] mock-data-validator pasa (invariantes cumplidos).
- [ ] statsGlobales cuadra con la suma de torneos.
- [ ] Brackets con equipos potencia de 2 (si formato eliminación).

### Diseño (si aplica)

- [ ] design-system-guardian pasa con score ≥ 70.
- [ ] Si stitch-sync se corrió, los diffs aplicados están listados.

### Documentación

- [ ] README actualizado si la feature lo requiere.
- [ ] Comentarios en código solo donde sea necesario (no obvios).
- [ ] TODO/FIXME nuevos referenciados a issue de GitHub.

## Cómo incluir el checklist en el body

Solo marcar los items relevantes al PR. No incluir el checklist completo si el PR no toca esas áreas (sería ruido).

### Ejemplo: PR solo de UI

```
### Checks
- [x] `tsc -b && vite build` verde
- [x] Sin console.log
- [x] Bundle: 412 KB
- [x] Animación fadeUp aplicada
- [x] Fallback empty en lista nueva
```

### Ejemplo: PR de mock data

```
### Checks
- [x] `tsc -b` verde
- [x] mock-data-validator: invariantes OK
- [x] statsGlobales cuadra
```

### Ejemplo: PR de config

```
### Checks
- [x] Build verde
- [x] Bundle sin regresión (412 → 411 KB)
- [x] Puerto 5300 intacto
- [x] postcss.config.js intacto
```

## Si algún check NO pasa

NO escribir PR description. Antes:
1. Corregir el problema localmente.
2. Re-correr `deploy-sentinel` para verificar.
3. Generar el body cuando todo pase.

PR descriptions que dicen "build no pasa pero pls revisen" son ruido.
