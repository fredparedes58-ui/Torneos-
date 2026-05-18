# Invariantes del mock.ts

Reglas matemáticas que SIEMPRE deben cumplirse. Si una falla, el UI se rompe.

## 1. Formato de torneo vs número de equipos

### Eliminación directa

```ts
{
  formato: 'eliminacion',
  equipos: N  // N debe ser potencia de 2: 2, 4, 8, 16, 32, 64
}
```

Sin esto, el bracket no se puede dibujar (alguien queda con bye o el árbol no balancea).

### ✅ Válido

```ts
{ formato: 'eliminacion', equipos: 8 }   // OK
{ formato: 'eliminacion', equipos: 16 }  // OK
```

### 🚨 Inválido

```ts
{ formato: 'eliminacion', equipos: 12 }  // 🚨 12 no es potencia de 2
{ formato: 'eliminacion', equipos: 7 }   // 🚨
{ formato: 'eliminacion', equipos: 0 }   // 🚨
```

### Verificación

```ts
function isPowerOfTwo(n: number): boolean {
  return n > 0 && (n & (n - 1)) === 0;
}
```

### Liga (todos contra todos)

```ts
{
  formato: 'liga',
  equipos: N  // N >= 2, sin más constraint
}
```

Cálculos derivados:
- Total de partidos en ida y vuelta: `N * (N - 1)`.
- Total de partidos solo ida: `N * (N - 1) / 2`.

### Grupos + eliminación

```ts
{
  formato: 'grupos_eliminacion',
  equipos: N,
  numGrupos: G,
  clasificadosPorGrupo: C
}
```

Constraints:
- `N % G === 0` (equipos repartidos igual entre grupos).
- `C * G` debe ser potencia de 2 (para que la fase de eliminación funcione).

## 2. Bracket: estructura del árbol

Para torneos de eliminación:

```ts
{
  formato: 'eliminacion',
  equipos: 8,
  bracket: {
    rondas: 3,         // log2(8) = 3
    partidos: [...]    // total: 4 + 2 + 1 = 7
  }
}
```

### Reglas

- `rondas === log2(equipos)`.
- Partidos por ronda: equipos/2, equipos/4, ..., 1.
- Total partidos: `equipos - 1`.

### Verificación

```ts
function validateBracket(equipos: number, bracket: any): string[] {
  const errors = [];
  const expectedRondas = Math.log2(equipos);
  if (!Number.isInteger(expectedRondas)) {
    errors.push(`equipos=${equipos} no es potencia de 2`);
  }
  if (bracket.rondas !== expectedRondas) {
    errors.push(`rondas=${bracket.rondas}, esperado ${expectedRondas}`);
  }
  const expectedPartidos = equipos - 1;
  if (bracket.partidos.length !== expectedPartidos) {
    errors.push(`partidos=${bracket.partidos.length}, esperado ${expectedPartidos}`);
  }
  return errors;
}
```

## 3. Tabla / standings

Para torneos de liga o fase de grupos:

```ts
{
  tabla: [
    { equipo: 'A', pj: 3, g: 2, e: 1, p: 0, gf: 6, gc: 2, dif: 4, pts: 7 },
    ...
  ]
}
```

### Reglas

Por cada equipo:
- `pj === g + e + p` (partidos jugados = suma de resultados).
- `dif === gf - gc` (diferencia = goles a favor - goles en contra).
- `pts === g * 3 + e * 1` (3 puntos por victoria, 1 por empate).

### ⚠️ Inconsistencias menores

Si los números cuadran pero algo es raro (ej. PJ = 0 en torneo "en curso"), → ⚠️ pero no blocker.

## 4. Fixture / calendario

```ts
{
  fixture: [
    { id: 1, fecha: '2026-03-15', local: 'A', visitante: 'B', estado: 'finalizado', goles_local: 2, goles_visitante: 1 },
    ...
  ]
}
```

### Reglas

- Fechas en formato ISO `YYYY-MM-DD`.
- Si `estado === 'finalizado'`, deben existir `goles_local` y `goles_visitante`.
- Si `estado === 'pendiente'`, NO debe haber goles (deben ser undefined o null).
- Mismo equipo no puede jugar dos partidos en la misma fecha (raro pero posible en torneos cortos).
- Fechas no decrecientes (orden cronológico).

### ⚠️ Warning: fechas en el pasado para partidos pendientes

Si `estado === 'pendiente'` y la fecha es anterior a hoy → ⚠️ (probablemente alguien se olvidó de actualizar el estado).

## 5. statsGlobales

```ts
export const statsGlobales = {
  totalTorneos: N,
  totalEquipos: M,
  totalPartidos: P,
  totalGoles: G,
  ...
};
```

### Reglas (cross-validation con `torneos`)

- `totalTorneos === torneos.length`.
- `totalEquipos === sum(torneos[i].equipos)` (o con dedupe si los equipos se repiten entre torneos).
- `totalPartidos === sum(todos los partidos de todos los torneos)`.
- `totalGoles === sum(goles_local + goles_visitante para cada partido finalizado)`.

### 🚨 Bloqueante: stats no cuadran

Si el UI muestra "12 torneos" en el dashboard pero `torneos.length === 8`, se ve mal y los usuarios pierden confianza.

## 6. División por cero

Cualquier cálculo derivado que divida algo:

```ts
// ❌ Si equipos === 0
const promedioGolesPorEquipo = totalGoles / equipos;  // NaN o Infinity → UI roto

// ❌ Si partidosJugados === 0
const promedioGolesPorPartido = totalGoles / partidosJugados;  // NaN
```

### Verificación

Buscar en el mock cualquier campo que pueda ser 0 y que se use como denominador en algún componente.

## 7. Referencias rotas

```ts
{
  bracket: {
    partidos: [
      { local: 'team-001', visitante: 'team-XXX' }  // 🚨 team-XXX no existe en equipos[]
    ]
  }
}
```

Toda referencia a un equipo (por id o nombre) debe existir en la lista de equipos del torneo.

## 8. Duplicados

```ts
equipos: ['team-A', 'team-A', 'team-B']  // 🚨 'team-A' duplicado
```

## Checks consolidados

Por cada torneo en el mock:
- [ ] `equipos` es número válido (>= 2).
- [ ] Si `formato === 'eliminacion'`, `equipos` es potencia de 2.
- [ ] `bracket.rondas === log2(equipos)` (para eliminación).
- [ ] `bracket.partidos.length === equipos - 1` (para eliminación).
- [ ] Para cada equipo en tabla: `pj === g + e + p`, `dif === gf - gc`, `pts === g*3 + e`.
- [ ] Toda fecha en formato ISO.
- [ ] Partidos finalizados tienen goles; pendientes no los tienen.
- [ ] No hay referencias a equipos inexistentes.
- [ ] No hay duplicados en la lista de equipos.
- [ ] Ningún denominador potencialmente 0 sin guard.

`statsGlobales`:
- [ ] `totalTorneos === torneos.length`.
- [ ] `totalPartidos === sum(...)`.
- [ ] `totalGoles === sum(...)`.
