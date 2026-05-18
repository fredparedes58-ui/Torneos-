# Estados de UI — Torneos

Toda UI que carga, procesa o muestra datos tiene **5 estados**. La mayoría de bugs de UX vienen de olvidar uno.

## Los 5 estados

| Estado | Descripción | Ejemplo en Torneos |
|---|---|---|
| **Idle / inicial** | Antes de que el usuario haga nada | Pantalla "Selecciona un torneo para ver detalles" |
| **Loading** | Cargando datos o procesando | Skeleton del listado mientras carga el mock |
| **Success** | Tiene datos para mostrar | Lista de torneos completa |
| **Empty** | Cargó OK pero no hay datos | "No se encontraron torneos. Crear el primero." |
| **Error** | Algo falló | "No pudimos cargar los torneos. Reintentar." |

> Nota: en Fase 1 con mock data, "loading" y "error" son menos relevantes (los datos están en memoria). Pero diseñar los componentes con los 5 estados desde ya facilita la transición a Fase 2 (datos PHV).

## 🚨 Blocker: lista sin fallback empty

Ya documentado como bloqueante en `repo-conventions/details/code-patterns.md`. Re-énfasis aquí porque es el caso más frecuente en Torneos.

### ❌ Anti-pattern

```tsx
<ul>
  {torneos.map(t => <TournamentCard key={t.id} tournament={t} />)}
</ul>
// Si torneos.length === 0, no se ve nada
```

### ✅ Empty state accionable

```tsx
{torneos.length === 0 ? (
  <div className="text-center py-12">
    <h3 className="font-display text-2xl">No se encontraron torneos</h3>
    <p className="font-body text-sm text-[#C4CAAC] mt-2">
      Crea tu primer torneo para empezar.
    </p>
    <button 
      onClick={crearTorneo} 
      className="mt-4 bg-[#C8FF00] text-[#111508] label-caps px-4 py-2"
    >
      Crear torneo
    </button>
  </div>
) : (
  <ul>
    {torneos.map(t => <TournamentCard key={t.id} tournament={t} />)}
  </ul>
)}
```

Convención del proyecto: texto empty empieza con `No se encontraron …` (sin tilde).

## 🚨 Blocker: estado de error sin acción

### ❌ Anti-pattern

```tsx
{error && <p className="text-red-400">Error</p>}
```

### ✅ Error con acción de recuperación

```tsx
{error && (
  <div className="text-center py-12">
    <h3 className="font-display text-2xl">No pudimos cargar los torneos</h3>
    <p className="font-body text-sm text-[#C4CAAC] mt-2">
      Comprueba tu conexion y vuelve a intentarlo.
    </p>
    <button onClick={refetch} className="mt-4 ...">
      Reintentar
    </button>
  </div>
)}
```

Sin tildes en strings hardcoded (convención Torneos).

### Cuándo el error es recuperable vs no

- **Recuperable**: timeouts, errores de red, 5xx → botón "Reintentar".
- **No recuperable en este flujo**: 401, 403, 404 → redirigir o mostrar acción alternativa ("Volver al inicio").

## 🚨 Blocker: componente sin estado loading cuando hay async

Aunque Fase 1 usa mock, pensar en Fase 2. Componentes que en el futuro harán fetch:

```tsx
// ❌ Asume datos siempre presentes
export function TorneosPage() {
  const { torneos } = useTorneos();
  return <TorneosList torneos={torneos} />;
}

// ✅ Maneja loading desde Fase 1 (aunque mock devuelva loading: false)
export function TorneosPage() {
  const { torneos, loading, error } = useTorneos();
  
  if (loading) return <TorneosListSkeleton />;
  if (error) return <TorneosErrorState onRetry={refetch} />;
  if (!torneos || torneos.length === 0) return <TorneosEmptyState />;
  return <TorneosList torneos={torneos} />;
}
```

El hook puede en Fase 1 devolver siempre `loading: false`, pero el componente está preparado.

## ⚠️ Warning: loading state que parpadea

Si el "fetch" es síncrono (mock en memoria), mostrar skeleton hace parpadear (aparece skeleton, desaparece, aparece contenido).

### Solución para mock data

```tsx
// En Fase 1, devolver datos inmediatos sin skeleton
export function useTorneos() {
  return { torneos: mockTorneos, loading: false, error: null };
}
```

Cuando se conecte Fase 2 a la API real, ya habrá tiempos de carga reales y el skeleton tendrá sentido.

### Solución para futuro Fase 2

```tsx
// Delay para fetches muy rápidos
const [showSkeleton, setShowSkeleton] = useState(false);

useEffect(() => {
  if (loading) {
    const timer = setTimeout(() => setShowSkeleton(true), 200);
    return () => clearTimeout(timer);
  }
  setShowSkeleton(false);
}, [loading]);

if (loading && showSkeleton) return <Skeleton />;
if (loading) return null;
```

## 🚨 Blocker: botón que no se desactiva durante acción

Especialmente en forms de "Crear torneo" o "Añadir equipo":

### ❌ Permite doble submit

```tsx
<button onClick={async () => {
  await crearTorneo(data);
}}>
  Crear
</button>
```

Si el usuario toca dos veces (común en touch), se crea dos veces.

### ✅ Disabled + feedback visual

```tsx
const [creando, setCreando] = useState(false);

<button 
  disabled={creando}
  onClick={async () => {
    setCreando(true);
    try {
      await crearTorneo(data);
    } finally {
      setCreando(false);
    }
  }}
  className="... disabled:opacity-50 disabled:cursor-not-allowed"
>
  {creando ? 'Creando...' : 'Crear torneo'}
</button>
```

Nota: `Creando…` (con puntos suspensivos `…`) o `Creando...` (con tres puntos) — ambos válidos pero el carácter `…` evita problemas de width si las fuentes lo manejan distinto.

## ⚠️ Warning: estado de éxito sin confirmación

Tras crear un torneo o añadir un equipo, el usuario necesita confirmación visual.

### Opciones

- **Toast**: para acciones rápidas (equipo añadido).
- **Navegación**: para acciones completas (torneo creado → ir al detalle del torneo).
- **Cambio in-place**: para toggles.

```tsx
async function handleCrearTorneo() {
  setCreando(true);
  try {
    const torneo = await crearTorneo(data);
    toast.success('Torneo creado');
    navigate(`/torneos/${torneo.id}`);  // ir al detalle
  } catch {
    toast.error('No pudimos crear el torneo');
  } finally {
    setCreando(false);
  }
}
```

## Estados específicos de Torneos

### Bracket sin equipos suficientes

Si un torneo de eliminación tiene <8 equipos registrados (o <potencia de 2 cualquiera), el bracket no se puede mostrar.

```tsx
if (equipos.length < 2 || !isPowerOfTwo(equipos.length)) {
  return (
    <div className="text-center py-12">
      <p className="font-body text-[#C4CAAC]">
        Necesitas {nextPowerOfTwo(equipos.length)} equipos para el bracket. 
        Actualmente: {equipos.length}.
      </p>
      <button onClick={anadirEquipo} className="mt-4 ...">
        Anadir equipo
      </button>
    </div>
  );
}
```

### Fixture vacío

Torneo creado pero sin partidos programados:

```tsx
{partidos.length === 0 ? (
  <div className="text-center py-12">
    <p className="font-body text-[#C4CAAC]">
      Aun no hay partidos programados.
    </p>
    <button onClick={generarFixture}>
      Generar fixture
    </button>
  </div>
) : (...)}
```

### Clasificación sin partidos jugados

```tsx
{partidosJugados === 0 ? (
  <p className="text-[#C4CAAC] text-center py-8">
    La clasificacion aparecera cuando se juegue el primer partido.
  </p>
) : (
  <ClasificacionTable equipos={clasificacion} />
)}
```

## Checklist por componente que maneja datos

- [ ] Maneja loading state (incluso si en Fase 1 es trivial).
- [ ] Maneja error state CON acción de recuperación.
- [ ] Maneja empty state CON call-to-action.
- [ ] Loading no parpadea (delay o mock síncrono).
- [ ] Botones de acción se desactivan durante el procesamiento.
- [ ] Cambia label del botón mientras procesa ("Creando...").
- [ ] Confirmación tras éxito (toast, navegación, cambio visible).
- [ ] Casos específicos de dominio Torneos: bracket sin equipos, fixture vacío, clasificación sin partidos.
