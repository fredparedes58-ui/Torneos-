# Patrones de código — Torneos

## Mock-first, IA después

Cada feature nueva DEBE funcionar con localStorage o mock data antes de pensar en Claude API o backend real.

### Por qué

- Permite iteración visual sin coste de tokens.
- Si la integración real cambia (Supabase vs PHV vs otro), el UI no se rompe.
- Tests visuales contra mocks son deterministas.

### Patrón

```tsx
// src/data/mock.ts
export const mockTorneos: Torneo[] = [
  {
    id: 't-001',
    nombre: 'Copa de Cantera 2026',
    equipos: 12,
    formato: 'eliminacion',
    // ...
  },
];

// src/hooks/useTorneos.ts
export function useTorneos() {
  // Fase 1: lee de mock
  return { torneos: mockTorneos, loading: false };
  
  // Fase 2: cambia a fetch real, manteniendo la misma signature
  // const { data: torneos, loading } = useQuery(...);
}
```

Componentes consumen `useTorneos()`. Cuando llegue Fase 2, solo cambias el hook, no los componentes.

### ⚠️ Warning: feature que llama API directo sin pasar por mock antes

Si un PR añade un componente que llama a Claude API o fetch externo SIN haber pasado por mock data primero, → ⚠️ sugerir extraer a hook con mock data primero.

## Español sin tildes en strings hardcoded

**Lección aprendida:** PowerShell + UTF-8 BOM corrompe tildes y emojis. Hasta que el pipeline editorial esté limpio, **strings hardcoded SIN tildes**.

### ✅ Correcto

```tsx
<h1>Copa de Cantera</h1>
<p>Sin equipos registrados</p>
<button>Anadir equipo</button>
<span>Eliminacion directa</span>
```

### ❌ Incorrecto (en archivos editados via PowerShell)

```tsx
<h1>Copa de Cantería</h1>  // tilde corrompida tras pipeline
<p>Sin equipos disponíbles</p>  // mismo problema
```

### Excepción

Si editas el archivo con **Edit/Write directo** (Claude Code, VSCode), las tildes funcionan. El problema es SOLO con scripts PowerShell de replace masivo.

### Detección de tildes corruptas

Caracteres tipo `Ã©`, `Ã¡`, `Ã­` en lugar de `é`, `á`, `í` indican corrupción UTF-8.

```bash
# Buscar caracteres sospechosos:
grep -rE "Ã[©¡­³¼±]" src/
```

Si encuentras → 🚨 reportar como "encoding corrupto, regenerar el archivo".

## Animaciones de entrada con Framer Motion (fadeUp)

Cada componente nuevo de página debe tener animación de entrada. Por convención: **fadeUp**.

### Variant canónico

```tsx
import { motion } from 'framer-motion';

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: 'easeOut' },
};

<motion.div {...fadeUp}>
  ...
</motion.div>
```

### Para listas, stagger

```tsx
const container = {
  initial: {},
  animate: { transition: { staggerChildren: 0.05 } },
};

const item = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

<motion.ul variants={container} initial="initial" animate="animate">
  {torneos.map(t => (
    <motion.li key={t.id} variants={item}>...</motion.li>
  ))}
</motion.ul>
```

### ⚠️ Warning: componente nuevo sin animación de entrada

Si un componente top-level de página o sección no tiene `motion.*` ni envolvente, → ⚠️ sugerir añadirlo.

## Fallback para data vacía

Toda lista que dependa de mock data o futura API debe manejar el caso vacío.

### ❌ Mal

```tsx
<ul>
  {torneos.map(t => <li key={t.id}>{t.nombre}</li>)}
</ul>
// Si torneos.length === 0, no se ve nada
```

### ✅ Bien

```tsx
{torneos.length === 0 ? (
  <div className="text-center py-12">
    <p className="font-body text-[#C4CAAC]">No se encontraron torneos</p>
    <button className="mt-4 bg-[#C8FF00] text-[#111508] label-caps px-4 py-2">
      Crear torneo
    </button>
  </div>
) : (
  <ul>
    {torneos.map(t => <li key={t.id}>{t.nombre}</li>)}
  </ul>
)}
```

Mensaje empty estándar: `No se encontraron …`.

## Imports de lucide-react: TS6133

`lucide-react` tiene cientos de iconos. Si importas uno y no lo usas, TypeScript con `noUnusedLocals` lo flag como **TS6133** y el build se cae.

### ✅ Correcto

```tsx
import { Trophy } from 'lucide-react';
// usa Trophy
```

### ❌ Mal (rompe build)

```tsx
import { Trophy, Users, Calendar } from 'lucide-react';
// solo usa Trophy
// Users y Calendar generan TS6133
```

### Detección automática

```bash
# Buscar imports de lucide-react no usados:
npx tsc -b --noEmit
# Buscar TS6133 en lucide-react
```

`deploy-sentinel` corre este check antes de cada push.

## Edits puntuales, no reescrituras

Pedro lo dijo explícitamente: reescribir un archivo cuando solo necesita un Edit puntual es un anti-pattern.

### Cuándo Edit / str_replace

- Cambiar 1-5 líneas: Edit puntual.
- Añadir una sección nueva al final: Edit puntual con anchor en el último contenido.

### Cuándo reescribir (Write completo)

- Archivo nuevo.
- Refactor mayor (>50% del archivo cambia).
- Migración de sintaxis donde el archivo cambia de forma significativa.

### 🚨 Anti-pattern

Reescribir un componente entero para cambiar un color o un texto. Eso es Edit puntual.

## Commits

- **Mensaje en inglés** (convencional): `feat: add bracket view`, `fix: handle empty teams in eliminacion`, `chore: bump deps`.
- **Body en español si hace falta detalle**: explicar contexto, decisiones, side effects.

## Si detectas violación

| Patrón | Severidad |
|---|---|
| Tildes corruptas (`Ã©`) en código | 🚨 Bloqueante |
| Componente nuevo sin animación de entrada | ⚠️ Warning |
| Lista sin fallback empty | ⚠️ Warning |
| Import de lucide-react no usado | 🚨 Bloqueante (rompe build) |
| Reescritura completa cuando bastaba Edit | ⚠️ Warning (señalar próxima vez) |
| Tilde en string hardcoded | ⚠️ Warning si se editó via PowerShell; OK si via Edit directo |
