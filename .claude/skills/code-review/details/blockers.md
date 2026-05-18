# 🚨 Bloqueantes de Torneos

Bloquean merge pero son resolvibles con cambios al PR (no requieren decisiones de negocio).

## 1. Tildes corruptas (UTF-8 mal)

### Qué buscar

```bash
grep -rE "Ã[©¡­³¼±¨ª]" src/
```

Caracteres como `Ã©`, `Ã±`, `Ã­` indican corrupción tras pipeline PowerShell.

### Cómo reportar

```
🚨 BLOCKER — Tildes corruptas en <archivo>

Caracteres `Ã©` detectados (probable corrupción UTF-8 tras edit via PowerShell).

Fix:
1. Revertir el archivo: git checkout HEAD~1 -- <archivo>
2. Re-aplicar cambios via Edit/Write directo (no PowerShell).

Si el PR completo fue editado via PowerShell, revertir todo el PR y rehacer.
```

## 2. Font arbitrary con quotes en JSX (rompe build)

### Qué buscar

```bash
grep -rEn 'font-\["[^"]+"\]|font-\['"'"'[^'"'"']+'"'"'\]' src/
```

### Cómo reportar

```
🚨 BLOCKER — font-['Name'] en JSX: <archivo>:<línea>

<h1 className="font-['Barlow_Condensed']">

Las quotes anidadas rompen el parser de TypeScript. Build se cae.

Fix:
<h1 className="font-display">

Si el utility no existe, añadirlo en @theme PRIMERO.
```

## 3. Import de lucide-react no usado (TS6133)

### Qué buscar

Tras editar imports de lucide, verificar que TODOS los iconos importados se usen.

```bash
# Para cada archivo modificado:
# Listar imports de lucide:
grep -E "^import.*lucide-react" <archivo>
# Y verificar cada uno se usa en el archivo
```

### Cómo reportar

```
🚨 BLOCKER — Import no usado de lucide-react: <archivo>:<línea>

import { Trophy, Calendar, Users } from 'lucide-react';

`Calendar` no se usa en este archivo. Genera TS6133 y rompe el build.

Fix:
import { Trophy, Users } from 'lucide-react';
```

## 4. console.log nuevos sin guard de DEV

### Qué buscar

En el diff, `console.log(` añadidos sin envolver en `if (import.meta.env.DEV)`.

### Cómo reportar

```
🚨 BLOCKER — console.log en producción: <archivo>:<línea>

console.log('debug:', state);

Política: no console.log en código de producción.

Fix:
- Eliminar si era de debug.
- Si lo necesitas en dev:
  if (import.meta.env.DEV) console.log('debug:', state);
```

Excepción aceptable: `console.error` y `console.warn` con moderación.

## 5. Componente sin animación de entrada (regla obligatoria)

### Qué buscar

Componentes nuevos exportados como página o sección top-level que NO usan `motion.*`.

### Cómo reportar

```
🚨 BLOCKER — Componente sin animación de entrada: <archivo>

Por convención, todo componente nuevo de página debe tener animación 
de entrada con Framer Motion (fadeUp).

Fix:
import { motion } from 'framer-motion';

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: 'easeOut' },
};

export function MyPage() {
  return (
    <motion.div {...fadeUp}>
      [contenido existente]
    </motion.div>
  );
}
```

## 6. Página nueva sin fallback empty

### Qué buscar

En el diff, listas (`.map(...)`) sin guard de `.length === 0`.

### Cómo reportar

```
🚨 BLOCKER — Lista sin fallback empty: <archivo>:<línea>

<ul>
  {torneos.map(t => <li key={t.id}>{t.nombre}</li>)}
</ul>

Sin manejar el caso de array vacío, el usuario ve una sección en blanco.

Fix:
{torneos.length === 0 ? (
  <div className="text-center py-12">
    <p className="font-body text-[#C4CAAC]">No se encontraron torneos</p>
  </div>
) : (
  <ul>
    {torneos.map(t => <li key={t.id}>{t.nombre}</li>)}
  </ul>
)}
```

Texto empty estándar: `No se encontraron …` (sin tilde por convención del proyecto).

## 7. postcss.config.js eliminado

### Qué buscar

Diff que borra `postcss.config.js` del root.

### Cómo reportar

```
🚨 BLOCKER — postcss.config.js eliminado

Este archivo es necesario en el root, aunque esté casi vacío.

Razón: neutraliza el postcss.config.js global de C:\Users\pparedes\ 
que afecta builds locales.

Restaurar:
git checkout HEAD~1 -- postcss.config.js
```
