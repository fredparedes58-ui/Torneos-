# Feedback visual y motion — Torneos

Toda acción del usuario debe tener una respuesta visual perceptible. Sin feedback, la plataforma "se siente lenta o rota".

## 1. Feedback inmediato a cualquier interacción

### Regla: <100ms desde acción hasta respuesta visual

Si tras tocar un botón nada cambia, el usuario cree que no funcionó.

### Tipos de feedback inmediato

- **Active state** (compresión, cambio de color): por defecto en `<button>` nativo, a veces se pierde con CSS custom.
- **Estado pressed** (Tailwind: `active:bg-...`, `active:scale-...`): cambio visual mientras se mantiene el dedo/click.

```tsx
// ✅ Tiene active state
<button className="bg-[#C8FF00] text-[#111508] active:bg-[#C8FF00]/80 active:scale-[0.98] transition">
  Crear torneo
</button>
```

### 🚨 Blocker: botón sin ningún feedback visual al click/tap

```tsx
// ❌ Nada cambia visualmente hasta que la acción async termina
<button onClick={crear}>
  Crear
</button>
```

Especialmente malo en móvil donde no hay hover que sugiera interactividad.

## 2. Loading state inmediato tras click/tap

### Regla: si la acción tarda >300ms, mostrar loading state EN EL BOTÓN

```tsx
const [creando, setCreando] = useState(false);

<button 
  disabled={creando}
  onClick={async () => {
    setCreando(true);
    try { await crearTorneo(); }
    finally { setCreando(false); }
  }}
  className="... disabled:opacity-50"
>
  {creando ? (
    <span className="flex items-center gap-2">
      <Loader2 className="w-4 h-4 animate-spin" />
      Creando...
    </span>
  ) : (
    'Crear torneo'
  )}
</button>
```

### ⚠️ Warning: loading global cuando debería ser local

Si solo se está cargando UNA cosa, no mostrar overlay global que bloquea toda la pantalla.

```tsx
// ❌ Overlay global por crear un torneo
{loading && <FullScreenLoader />}

// ✅ Loading local en el botón / card
<button disabled={creando}>{creando ? 'Creando...' : 'Crear'}</button>
```

## 3. Animaciones: duración

Convención del proyecto: **fadeUp con Framer Motion** en componentes nuevos (ya documentado en `repo-conventions/details/code-patterns.md`).

### Reglas generales

| Tipo | Duración |
|---|---|
| Transiciones de UI (color, opacity, transform leve) | 150-200ms |
| Movimientos sustanciales (modal abre, panel desliza) | 250-350ms |
| Entrada de página completa | 200-400ms |

### ❌ Demasiado rápido (<100ms)

El usuario no percibe la transición, parece "snap".

### ❌ Demasiado lento (>500ms)

Se siente lento, el usuario se frustra.

### Excepción: animaciones celebratorias

Al generar bracket completo, mostrar bracket con animación staggered tipo "ta-da". Puede durar hasta 1s total si es decorativa y opcional.

## 4. Easing

### Regla: `ease-out` por defecto

Movimientos naturales empiezan rápido y desaceleran al final.

```tsx
// ✅ Framer Motion
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.4, ease: 'easeOut' }}
>

// ✅ CSS
className="transition duration-200 ease-out"
```

### Cuándo usar otros

- `ease-in`: para salidas (algo que desaparece, acelerando).
- `ease-in-out`: para transformaciones simétricas.
- `linear`: para spinners en loop.

## 5. Stagger en listas (torneos, equipos, partidos)

### 💡 Sugerencia: anima items de lista con delay incremental

```tsx
import { motion } from 'framer-motion';

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },  // 50ms entre items
  },
};

const item = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

<motion.ul variants={container} initial="hidden" animate="visible">
  {torneos.map(t => (
    <motion.li key={t.id} variants={item}>
      <TournamentCard tournament={t} />
    </motion.li>
  ))}
</motion.ul>
```

Da sensación de fluidez sin saturar. Funciona muy bien para:
- Lista de torneos en dashboard.
- Cards de equipos en torneo nuevo.
- Filas de tabla de clasificación al cargar.

## 6. `prefers-reduced-motion`

### ⚠️ Warning: animaciones decorativas sin respetar la preferencia

Algunos usuarios tienen vestibular disorders. Sistemas operativos exponen `prefers-reduced-motion`.

Framer Motion tiene el hook `useReducedMotion()`:

```tsx
import { useReducedMotion } from 'framer-motion';

const reduce = useReducedMotion();

<motion.div
  initial={reduce ? false : { opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: reduce ? 0 : 0.4 }}
>
```

Para animaciones **estructurales sutiles** (transición de páginas con fadeUp), aceptable mantenerlas breves con reduce-motion.
Para **decorativas** (stagger de 30 cards, glow pulsante), desactivar.

## 7. Transiciones entre páginas

Convención: cada componente de página usa fadeUp como entrada.

### ✅ Patrón canónico

```tsx
// PageTransition.tsx (componente reutilizable)
import { motion, useReducedMotion } from 'framer-motion';

export function PageTransition({ children }) {
  const reduce = useReducedMotion();
  
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduce ? undefined : { opacity: 0, y: -8 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  );
}

// Cada página:
export function DashboardPage() {
  return (
    <PageTransition>
      {/* contenido */}
    </PageTransition>
  );
}
```

### ⚠️ Warning: página sin transition wrapper

Si una página nueva NO está envuelta en transition → ⚠️ warning. (Ya es bloqueante en `repo-conventions/details/code-patterns.md` como "Componente sin animación de entrada", reforzado aquí.)

## 8. Animaciones de números (stats)

### 💡 Sugerencia: animar contadores al cambiar

Cuando se registra un nuevo partido y el contador "Partidos jugados" pasa de 5 a 6:

```tsx
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';

function AnimatedCounter({ value }: { value: number }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, v => Math.round(v));
  
  useEffect(() => {
    const controls = animate(count, value, { duration: 0.5 });
    return () => controls.stop();
  }, [value]);
  
  return <motion.span>{rounded}</motion.span>;
}
```

Útil en:
- Dashboard con statsGlobales.
- Tabla de clasificación al actualizar puntos.
- Stats individuales del torneo.

## 9. Bracket: animación del avance de equipos

Al cerrar una ronda y avanzar los ganadores a la siguiente:

### 💡 Patrón sugerido

```tsx
// Equipo ganador "se mueve" visualmente a la siguiente ronda
<motion.div
  layout  // Framer Motion calcula el movimiento automático
  transition={{ duration: 0.4, ease: 'easeOut' }}
>
  <TeamCard equipo={ganador} />
</motion.div>
```

`layout` de Framer Motion anima cambios de posición. Útil cuando los equipos se reordenan en el bracket tras un resultado.

## 10. Skeleton vs spinner

### Skeleton cuando:
- Sabes la estructura del contenido (lista de torneos, tabla, perfil).
- Es loading de página o sección.
- Quieres dar percepción de "casi listo".

### Spinner cuando:
- Es loading puntual (botón, indicador pequeño).
- No sabes la estructura del contenido.
- Operaciones rápidas (<1s).

### ⚠️ Warning: skeleton que no se parece al contenido final

```tsx
// ❌ Skeleton genérico de cuadrados grises
<div className="w-full h-32 bg-gray-700 animate-pulse" />

// ✅ Skeleton estructurado como la card real de torneo
<div className="glass-card p-6 rounded-2xl animate-pulse">
  <div className="h-6 bg-[#434933] rounded w-2/3" />  {/* nombre */}
  <div className="h-4 bg-[#434933] rounded w-1/3 mt-2" />  {/* meta */}
  <div className="h-20 bg-[#434933] rounded mt-4" />  {/* bracket preview */}
</div>
```

Usar el utility `glass-card` ya da la estructura correcta. Los pulses internos imitan el contenido futuro.

## Checklist rápido

- [ ] Cada botón tiene active state visible.
- [ ] Botones async muestran loading state local con label cambiado ("Creando...").
- [ ] Animaciones duran 150-350ms con `ease-out`.
- [ ] `useReducedMotion()` respetado en animaciones decorativas.
- [ ] Páginas envueltas en `<PageTransition>` con fadeUp.
- [ ] Listas largas tienen stagger sutil (50ms entre items).
- [ ] Skeletons reflejan estructura del contenido final (usar `glass-card` etc.).
- [ ] (Sugerido) Counters de stats animados al cambiar.
- [ ] (Sugerido) Bracket usa `layout` de Framer Motion para movimientos de equipos.
