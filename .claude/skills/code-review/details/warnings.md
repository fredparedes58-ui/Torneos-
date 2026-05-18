# ⚠️ Warnings de Torneos

Avisan pero no bloquean individualmente. Si hay 3+, considerar escalar a "request changes".

## 1. Bundle > 400 KB minified

Si el PR introduce cambios y `deploy-sentinel` reporta bundle entre 400-500 KB:

```
⚠️ Warning — Bundle 432 KB (cerca del límite de 500 KB)

Considerar análisis con `npx vite-bundle-visualizer` antes de añadir más dependencies.
```

## 2. PR toca > 8 archivos sin descripción clara

### Qué verificar

```bash
git diff --name-only main...HEAD | wc -l
```

Si > 8 archivos y el PR description no explica claramente el scope → ⚠️.

### Cómo reportar

```
⚠️ Warning — PR toca N archivos (> 8) sin scope claro

Recomendaciones:
- Dividir en PRs más pequeños.
- Si es necesariamente grande, ampliar la descripción explicando 
  qué partes son independientes y por qué van juntas.
```

## 3. Reescritura completa cuando bastaba Edit

### Qué buscar

Si un PR cambia un archivo entero (>50% del archivo modificado) pero el changelog/description sugiere un cambio puntual.

### Cómo reportar

```
⚠️ Warning — Reescritura amplia detectada: <archivo>

El archivo cambió N líneas (~M% del total). Si la intención era 
un cambio puntual, considerar revertir y aplicar solo el Edit necesario.

Pedro prefiere Edits puntuales sobre reescrituras completas (es más 
trazable y menos riesgo de regresión).
```

## 4. Strings hardcoded con tildes editados via PowerShell

### Qué buscar

Si en el diff hay tildes y la conversación menciona uso de PowerShell scripts → ⚠️.

### Cómo reportar

```
⚠️ Warning — Tildes en strings editados via PowerShell

<archivo>:<línea>: "Eliminación directa"

Aunque las tildes se ven bien ahora, si este archivo se edita via 
PowerShell de nuevo (replace masivo), se corromperán.

Política del proyecto: strings hardcoded SIN tildes hasta resolver 
el encoding del pipeline.

Fix sugerido:
"Eliminacion directa"  ← sin tilde

(Aplicar solo si el riesgo de re-edición via PowerShell es real. 
Si el archivo solo se edita via Claude Code/VSCode, las tildes son OK.)
```

## 5. TODO/FIXME nuevos sin issue

### Qué buscar

```bash
git diff main...HEAD | grep -E "^\+.*\b(TODO|FIXME)\b"
```

### Cómo reportar

```
⚠️ Warning — TODO/FIXME sin issue de tracking: <archivo>:<línea>

// TODO: agregar paginación

Política: cada TODO/FIXME debe asociarse a un issue de GitHub.

Fix:
1. Abrir issue: gh issue create --title "Add pagination to feed" --body "..."
2. Referenciar: // TODO(#42): agregar paginación
3. O eliminar el TODO si no es prioridad real.
```

(Nota: `gh` no está instalado en la máquina de Pedro según el briefing — sugerir abrir el issue manualmente en github.com.)

## 6. Componente nuevo sin animación de entrada (severidad menor)

Si el componente es un sub-componente reutilizable (no top-level), warning en lugar de blocker.

```
⚠️ Warning — Sub-componente sin motion.* wrapping: <archivo>

No es bloqueante (es sub-componente), pero la convención del proyecto 
es que casi todo componente tenga animación de entrada.

Sugerencia: envolver en motion.div con fadeUp si tiene sentido en el contexto.
```

## 7. Datos mock con tipos any o sin tipar

### Qué buscar

En `src/data/mock.ts` o equivalente, datos sin tipos explícitos:

```ts
export const algo: any = [...];
// o
export const algo = [...];  // sin type inference clara
```

### Cómo reportar

```
⚠️ Warning — Mock data sin tipo explícito: <archivo>:<línea>

export const mockTorneos = [...];

Sin tipo explícito, los consumers no tienen autocomplete ni 
chequeo. Pedro prefiere tipar todo.

Fix:
import type { Torneo } from '@/types';
export const mockTorneos: Torneo[] = [...];
```

## 8. useEffect sin dependencias declaradas explícitamente

### Qué buscar

```tsx
useEffect(() => {
  fetchData(userId);
}, []);  // ← userId usado pero no en deps
```

### Cómo reportar

```
⚠️ Warning — useEffect con deps incompletas: <archivo>:<línea>

useEffect(() => {
  fetchData(userId);
}, []);

`userId` se usa dentro pero no está en deps. Si cambia, el efecto no se re-ejecuta.

Fix:
useEffect(() => {
  fetchData(userId);
}, [userId]);

O si es intencional (solo correr una vez al montar), añadir comentario:
useEffect(() => {
  fetchData(userId);
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);
```

## 9. Estado de loading no manejado

### Qué buscar

Componentes que hacen `fetch` o lógica async sin estado de loading.

```tsx
const data = await fetchData();
return <div>{data.map(...)}</div>;
```

### Cómo reportar

```
⚠️ Warning — Sin estado de loading: <archivo>

Mientras `fetchData` resuelve, el usuario ve la pantalla en blanco 
o el componente sin contenido.

Fix:
const [data, setData] = useState<X[] | null>(null);

if (data === null) return <Skeleton />;
return <div>{data.map(...)}</div>;
```

## 10. Variables descriptivas pero largas en exceso

Convención del repo: variables claras pero no verborrágicas.

```tsx
// ⚠️ Demasiado largo
const tournamentEliminationFirstRoundMatchScoresArray = ...;

// ✅ Mejor
const firstRoundScores = ...;
```

Suggestion, no bloqueante.
