# Formato del output

Reporte estructurado tras completar el audit.

## Template

```markdown
## Design System Audit — <scope>

**Archivos analizados:** N
**Tiempo de análisis:** [aprox]

### Score: NN/100

[Desglose breve si score < 90]

---

### 🚨 Críticas

[Por cada crítica, una sección]

#### 1. <Tipo de violación>
**Archivo:** `<archivo>:<línea>`

```tsx
[código tal cual]
```

**Problema:** [una frase]

**Fix:**
```tsx
[código corregido]
```

---

### ⚠️ Warnings

[Mismo formato, más conciso]

---

### 💡 Sugerencias

[Mismo formato, más conciso]

---

### ✅ Lo que está bien

[Items destacables, 2-4 bullets]
- Uso correcto de `glass-card` en TournamentCard.tsx.
- Tipografía consistente en BracketView.tsx.
- ...

---

### Veredicto

[Uno de:]
- 🚫 **Bloquear merge** — Score NN/100 < 70. Corregir las críticas y warnings principales antes de re-review.
- ⚠️ **Advertir, no bloquear** — Score NN/100. Considerar refinar antes de mergear, pero el cambio es aceptable.
- ✅ **Luz verde** — Score NN/100 ≥ 90. Aprobado.
```

## Reglas para el reporte

### Compacto cuando hay pocas violaciones

Si solo hay 1-2 issues, no es necesario el reporte completo. Una versión corta:

```markdown
## Design System Audit — feat/new-bracket-view

**Score: 92/100** ✅

Una sola sugerencia:
- 💡 `BracketView.tsx:42` — replicación inline de `glow-green`. Reemplazar por la utility.

Veredicto: ✅ Luz verde.
```

### Detallado cuando hay muchas violaciones

Si hay 5+ violaciones, agruparlas por tipo (todas las violaciones de tokens juntas, todas las de typography juntas) para que el humano las arregle en bloques.

### Para PRs grandes (>15 archivos)

Si el alcance es grande, generar tabla resumen primero:

```markdown
### Resumen por archivo

| Archivo | Críticas | Warnings | Sugerencias |
|---|---|---|---|
| TournamentCard.tsx | 0 | 2 | 1 |
| BracketView.tsx | 1 | 3 | 0 |
| FixtureList.tsx | 0 | 0 | 1 |
| Total | 1 | 5 | 2 |
```

Luego el detalle por archivo más crítico (los que tienen críticas o más warnings).

## Cuándo NO escribir reporte largo

Si el PR es trivial (cambio de 1 línea de copy, fix de typo) y el audit no encuentra nada, basta:

```
## Design System Audit — fix/typo-in-header

Score: 100/100 ✅. No design system issues detected.
```

## Cuándo escalar al humano más allá del reporte

Cuando detectes:
- Cambio a la paleta core o fonts (🚨🚨).
- Score < 50.
- Patrón repetido sistemático que indica problema mayor (no del PR puntual sino del proyecto).

En esos casos, terminar el reporte con:

```
### ⚠️ Escalación

[Razón específica de la escalación.]

Recomendación: discutir con Pedro antes de aplicar cualquier cambio en esta dirección.
```
