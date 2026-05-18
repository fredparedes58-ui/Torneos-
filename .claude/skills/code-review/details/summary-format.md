# Formato del resumen final

Comentario top-level al cerrar la review.

## Template

```markdown
## Code Review — Resumen

**Veredicto:** approve | request changes | comment

### Top issues
1. [Bloqueantes críticos primero, luego bloqueantes]
2. [...]

### Lo que está bien
- [Items destacables, 2-4 puntos]

### Total
- 🚨🚨 Critical: N
- 🚨 Blocker: N
- ⚠️ Warning: N
- 💡 Suggestion: N

### Áreas tocadas
- [Frontend / Mock data / Config / etc. — orientación para futuras reviews]

### Skills relacionadas a considerar
- [Si aplica: "Para validar visuales, correr design-system-guardian"]
- [Si aplica: "Antes de pushear, correr deploy-sentinel"]
```

## Reglas para el veredicto

### `approve`
- 0 critical, 0 blocker, ≤2 warnings menores.
- Cambio cumple su propósito.

### `request changes`
- ≥1 critical o ≥1 blocker.
- ≥3 warnings que degradan calidad significativamente.

### `comment`
- Solo suggestions.
- Cambio trivial donde no aplica review profunda.

## Ejemplos

### Cambio limpio

```markdown
## Code Review — Resumen

**Veredicto:** approve

### Lo que está bien
- Animación fadeUp aplicada a la página nueva.
- Fallback empty correcto.
- Imports de lucide-react limpios.
- Mock data tipado correctamente.

### Total
- 💡 Suggestion: 1 (extracción opcional de sub-componente)

### Áreas tocadas
- Frontend (1 página nueva, 1 componente).
```

### PR con problemas

```markdown
## Code Review — Resumen

**Veredicto:** request changes

### Top issues
1. 🚨🚨 API key expuesta en src/api/claude.ts (rotar key antes de seguir).
2. 🚨 TS6133 en 3 archivos: imports lucide no usados.
3. 🚨 Tildes corruptas en src/pages/DashboardPage.tsx (re-editar via Claude Code).

### Total
- 🚨🚨 Critical: 1
- 🚨 Blocker: 4
- ⚠️ Warning: 2
- 💡 Suggestion: 0

### Áreas tocadas
- Config (env vars, vite)
- Frontend (3 páginas)

### Skills relacionadas
- Ejecutar deploy-sentinel antes de push tras resolver bloqueantes.

⚠️ La API key debe rotarse aunque se revierta: el commit queda en historia.
```

### Cambio en visuales (delegar)

```markdown
## Code Review — Resumen

**Veredicto:** comment

Este PR es principalmente visual (paleta, layout). 

Recomiendo correr `design-system-guardian` específicamente para evaluar 
coherencia visual con el Digital Stadium. Esa skill es más adecuada que 
code-review para este tipo de cambio.

### Total (solo desde perspectiva code-review)
- ✅ Lógica de React: correcta.
- ✅ TypeScript: limpio.
- ✅ Mock data: sin tocar.

Sin issues desde el ángulo lógico. Validación visual pendiente.
```

## Cuándo NO escribir resumen largo

PR de typo, 1 línea, fix trivial: un solo comentario approve breve sirve.

```markdown
## Code Review — Resumen

**Veredicto:** approve.

Cambio trivial (typo en copy). Sin issues.
```
