# Análisis de bundle

Cuando el bundle se acerca o supera 500 KB, esta guía ayuda a diagnosticar.

## Herramientas

### vite-bundle-visualizer

```bash
npm install -D vite-bundle-visualizer
npx vite-bundle-visualizer
```

Genera un HTML interactivo con el árbol del bundle. Identifica fácilmente:
- Dependencias más pesadas.
- Imports duplicados.
- Código muerto.

### rollup-plugin-visualizer (alternativa)

```bash
npm install -D rollup-plugin-visualizer
```

En `vite.config.ts`:
```ts
import { visualizer } from 'rollup-plugin-visualizer';

export default {
  plugins: [
    visualizer({ open: true }),
  ],
};
```

## Causas comunes de bundles grandes en Torneos

### 1. Imports masivos de lucide-react

```tsx
// ❌ Pesado si solo usas 3
import * as Icons from 'lucide-react';
const Trophy = Icons.Trophy;

// ✅ Tree-shakeable
import { Trophy } from 'lucide-react';
```

Verificar imports de iconos: si hay 20+ iconos en un solo archivo, considerar lazy.

### 2. Framer Motion: importar todo

```tsx
// ❌ Importa todo Framer Motion (~80 KB)
import { motion, AnimatePresence, useAnimation, useTransform, ... } from 'framer-motion';

// ✅ Solo lo necesario
import { motion } from 'framer-motion';
```

Framer Motion es relativamente pesada. Si solo necesitas animaciones simples, considerar `framer-motion/m` (alias minimal, ~30 KB).

### 3. Datos mock grandes inflando el bundle

`src/data/mock.ts` con torneos y partidos grandes se incluyen en el bundle si se importan estáticamente.

Solución: lazy load:

```ts
// En vez de:
import { mockTorneos } from '@/data/mock';

// Hacer:
const [torneos, setTorneos] = useState<Torneo[]>([]);
useEffect(() => {
  import('@/data/mock').then(m => setTorneos(m.mockTorneos));
}, []);
```

### 4. Date libraries pesadas

Si usas `moment.js` o `date-fns` masivo, alternativas:
- `dayjs` (~3 KB).
- `date-fns` con imports específicos: `import { format } from 'date-fns/format';`.

### 5. Imports duplicados

A veces el bundler incluye 2 versiones de la misma lib por diferencias de import path. El visualizer lo detecta.

## Targets

| Tamaño | Action |
|---|---|
| < 200 KB | ✨ Excelente |
| 200-400 KB | ✅ Sano |
| 400-500 KB | ⚠️ Revisar antes de añadir features |
| > 500 KB | 🚫 Bloquear deploy + análisis obligatorio |

## Cuándo analizar el bundle

- Tras añadir cualquier dependencia.
- Antes de cada release a producción.
- Cuando el deploy-sentinel reporte 400+ KB.

## Output de análisis para reportes

Si el bundle excede límite, el deploy-sentinel reporta:

```
🚫 BLOCKER — Bundle 587 KB > 500 KB límite

Top 3 contribuyentes (estimado):
1. framer-motion: ~85 KB
2. lucide-react (40 iconos): ~60 KB
3. mock data inline: ~30 KB

Acciones recomendadas:
1. Lazy load mock data (no necesita estar en initial bundle).
2. Reducir iconos de lucide-react o usar dynamic imports.
3. Considerar framer-motion/m si las animaciones son simples.

Para análisis detallado:
   npx vite-bundle-visualizer
```
