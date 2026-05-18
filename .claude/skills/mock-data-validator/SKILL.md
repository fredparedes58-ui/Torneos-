---
name: mock-data-validator
description: Valida cambios en src/data/mock.ts contra invariantes estructurales: número de equipos coherente con el formato, brackets con rondas potencias de 2, totales que cuadran con statsGlobales, fechas coherentes. Bloquea si los datos rompen el UI (división por cero, bracket impar, etc.). Usa cuando el usuario diga "valida la mock data", "verifica mock.ts", "agregué un torneo".
---

# Mock Data Validator — Torneos

Valida la coherencia estructural de `src/data/mock.ts`. Implementa el agente #3 del briefing.

## Cómo trabajar

1. **Cargar contexto:**
   - `.claude/skills/repo-conventions/SKILL.md` + `details/code-patterns.md` (mock-first).
   - El propio `src/data/mock.ts` (o el cambio propuesto si es un diff).

2. **Identificar qué cambió:**
   - Diff específico (preferible).
   - O el archivo entero si es validación full.

3. **Aplicar los checks** según `details/invariants.md`:
   - Formato del torneo vs número de equipos.
   - Bracket: rondas y matches coherentes.
   - Tablas: puntos suman correctamente.
   - Fixture: fechas en orden, sin solapamientos imposibles.
   - statsGlobales: totales que cuadran con la suma de torneos.

4. **Reportar** según `details/output-format.md`:
   - Errores estructurales (🚨) → bloquean.
   - Inconsistencias menores (⚠️) → advierten.
   - Luz verde si todo cuadra.

## Principios

- **Foco en lo que rompe el UI.** Si un dato inconsistente NO va a generar bug visible, es warning, no blocker.
- **Verificable matemáticamente.** Si la suma no cuadra, números concretos en el reporte.
- **Sin opinión.** Esta skill no juzga si el "Copa de Cantera" es un buen nombre, solo si los datos son coherentes.

## Qué NO hacer

- No modificar `mock.ts`. Solo validar.
- No proponer datos nuevos. Si el dato es inválido, el humano decide cómo arreglarlo.
- No flagear datos "raros pero válidos" (un torneo con 64 equipos es raro pero matemáticamente OK).

## Output esperado

```markdown
## Mock Data Validation

**Archivo:** src/data/mock.ts
**Alcance:** [diff específico | archivo completo]

### 🚨 Errores estructurales
[lista o "Ninguno"]

### ⚠️ Inconsistencias
[lista o "Ninguno"]

### ✅ Checks pasados
[lista, ej: "Brackets potencias de 2", "Stats globales cuadran"]

### Veredicto
[🚫 bloquear | ⚠️ advertir | ✅ luz verde]
```
