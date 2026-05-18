# Reglas de validación: cómo aplicar los invariantes

## Cómo correr la validación

### Opción A: validación programática (recomendada)

Generar y ejecutar un script TS temporal con los checks:

```ts
// /tmp/validate-mock.ts
import { torneos, statsGlobales } from '../src/data/mock';

const errors: string[] = [];
const warnings: string[] = [];

function isPowerOfTwo(n: number) {
  return n > 0 && (n & (n - 1)) === 0;
}

// Check 1: cada torneo
for (const t of torneos) {
  if (t.formato === 'eliminacion' && !isPowerOfTwo(t.equipos)) {
    errors.push(`Torneo ${t.id}: equipos=${t.equipos} no es potencia de 2 (formato eliminacion)`);
  }
  
  // ... más checks
}

// Check 2: statsGlobales
if (statsGlobales.totalTorneos !== torneos.length) {
  errors.push(`statsGlobales.totalTorneos=${statsGlobales.totalTorneos}, esperado ${torneos.length}`);
}

console.log('Errors:', errors);
console.log('Warnings:', warnings);
```

Ejecutar:
```bash
npx tsx /tmp/validate-mock.ts
```

### Opción B: inspección manual del diff

Si el cambio es pequeño (1-2 torneos añadidos), leer el diff y aplicar los checks de invariants.md manualmente.

## Prioridades de los checks

Aplicar en este orden (más críticos primero):

1. **División por cero potencial** → 🚨 BLOQUEANTE.
2. **Bracket impar / no potencia de 2** → 🚨 BLOQUEANTE.
3. **Referencias rotas** (equipo no existe) → 🚨 BLOQUEANTE.
4. **statsGlobales no cuadran** → 🚨 BLOQUEANTE (afecta directamente al dashboard).
5. **Tabla con sumas inconsistentes** → 🚨 BLOQUEANTE.
6. **Fechas formato inválido** → 🚨 BLOQUEANTE.
7. **Estado finalizado sin goles** o **pendiente con goles** → 🚨 BLOQUEANTE.
8. **Duplicados** → 🚨 BLOQUEANTE.
9. **Fechas decrecientes** → ⚠️ WARNING.
10. **Fechas en el pasado para pendientes** → ⚠️ WARNING.
11. **Stats sub-óptimas** (ej. PJ=0 en torneo "en curso") → ⚠️ WARNING.

## Cómo reportar un error

```
🚨 BLOCKER — Bracket impar: torneos[2] "Copa de Verano"

equipos: 12
formato: 'eliminacion'

Problema: 12 NO es potencia de 2. El bracket no se puede dibujar 
correctamente (algunos equipos quedarían con bye y el árbol no balancea).

Fix sugerido:
- Cambiar a 8 equipos (eliminar 4) o 16 equipos (añadir 4).
- O cambiar formato a 'grupos_eliminacion' con grupos que generen 8 o 16 clasificados.
```

## Cómo reportar un warning

```
⚠️ Warning — Fecha en el pasado para partido pendiente

torneos[1].fixture[5]: { fecha: '2026-01-10', estado: 'pendiente' }

Hoy es 2026-05-15. El partido está marcado como pendiente pero la fecha 
ya pasó. Probablemente:
- Falta actualizar el estado a 'finalizado'.
- O la fecha estaba mal y debería ser futura.
```

## Cuándo NO flagear

- Torneos con números "raros pero válidos" (ej. liga con 47 equipos): si las matemáticas cuadran, OK.
- Stats sin uso aparente en el UI: si un campo del mock NO se usa en ningún componente, su valor no importa.
- Fechas muy lejanas (futuro o pasado lejano): no afectan validez.

## Casos especiales

### Torneo "demo" o "ejemplo"

Si un torneo del mock tiene name "Demo" o similar y datos claramente placeholder, aplicar los mismos checks. Los datos placeholder también pueden romper el UI.

### Torneo con datos parciales

Si un torneo tiene `fixture: []` (todavía sin partidos), está OK siempre que el `estado` del torneo sea 'pendiente'. Si es 'en_curso' o 'finalizado' sin partidos → 🚨.
