# Formato del output

## Template

```markdown
## Mock Data Validation

**Archivo:** src/data/mock.ts
**Alcance:** [diff específico | archivo completo]
**Torneos validados:** N

---

### 🚨 Errores estructurales (bloqueantes)

[Por cada error:]

#### 1. <Tipo de error>: torneos[idx] "<nombre>"

[Detalle según invariants.md]

[Fix sugerido]

---

### ⚠️ Inconsistencias (warnings)

[Mismo formato, más conciso]

---

### ✅ Checks pasados

- [Lista de checks que sí cumplió]
  - Eliminación: 3 torneos verificados, todos con equipos potencia de 2.
  - Brackets: rondas y partidos coherentes en los 3 torneos de eliminación.
  - Liga: 2 torneos verificados, sumas de tabla cuadran.
  - Fixture: fechas en formato ISO, orden cronológico.
  - statsGlobales: totales cuadran con la suma de los torneos.

---

### Veredicto

[Uno de:]
- 🚫 **BLOQUEAR** — N errores estructurales detectados. Estos rompen el UI 
  (división por cero / bracket impar / stats inconsistentes). Corregir antes de mergear.
- ⚠️ **Advertir** — N warnings. El mock funciona pero hay inconsistencias menores.
- ✅ **Luz verde** — Todos los invariantes cumplidos.
```

## Cuando es trivialmente correcto

Si el diff es minimal y todo está bien:

```markdown
## Mock Data Validation

**Diff:** torneos[1].fixture añadió 1 partido finalizado.

✅ Todos los checks pasan:
- Partido tiene goles (consistente con estado 'finalizado').
- Fecha ISO válida (2026-05-12).
- Fecha posterior a la del partido anterior del mismo torneo.
- statsGlobales.totalGoles actualizado correctamente.

Veredicto: ✅ Luz verde.
```

## Cuando es un error grande

Si detectas algo grave, llamar la atención al inicio:

```markdown
## Mock Data Validation — 🚨 ERROR CRÍTICO

**Archivo:** src/data/mock.ts

### Cambio detectado:
Se añadió torneo "Copa Verano 2026" con 12 equipos, formato eliminacion.

### 🚨 Crítico:

**Bracket impar:**
- equipos: 12
- formato: 'eliminacion'
- 12 NO es potencia de 2 → bracket no balanceable.

Esto rompe el UI: el componente BracketView.tsx asume `rondas = log2(equipos)` 
y genera NaN.

### Fix necesario:

Opción A: 8 equipos (potencia de 2 cercana, eliminar 4).
Opción B: 16 equipos (eliminar 4 → completar a 16 con play-ins).
Opción C: cambiar formato a 'grupos_eliminacion' con grupos de 4 → 4 clasificados → bracket de 4.

### Veredicto: 🚫 BLOQUEAR merge.
```

## Reglas para el reporte

- **Cita siempre el path del dato**: `torneos[2].bracket.partidos[5]` no solo "un partido".
- **Da números concretos**: "12 equipos, esperado 8 o 16" no "número incorrecto".
- **Fix accionable**: no solo describir, sugerir cómo arreglar.
- **Si todo OK, sé breve.** No infles reportes verdes.
