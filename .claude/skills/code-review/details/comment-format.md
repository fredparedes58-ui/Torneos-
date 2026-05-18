# Formato de comentarios

## Severidades

| Icono | Nivel | Acción |
|---|---|---|
| 🚨🚨 | Critical | Bloquea merge. Requiere acción mayor (rotar key, decisión humana). |
| 🚨 | Blocker | Bloquea merge. Resolvible con cambios al PR. |
| ⚠️ | Warning | No bloquea individualmente. Si ≥3, considerar bloquear. |
| 💡 | Suggestion | Opcional. |

## Estructura

```
[ICONO] [NIVEL] — [TIPO]: [archivo:línea]

[Descripción del problema en 1-2 frases, citando la regla concreta de Torneos.]

[OPCIONAL: cita del código]

[Fix accionable con diff o ejemplo.]
```

## Ejemplos

### Critical

```
🚨🚨 CRITICAL — API key exposure: src/api/anthropic.ts:5

const KEY = import.meta.env.VITE_ANTHROPIC_KEY;

Esto expone la clave en el bundle del cliente.

Acción requerida:
1. Eliminar este archivo del cliente.
2. ROTAR la key en Anthropic Console.
3. Mover la lógica a una serverless function o Edge Function.
4. Env var SIN prefijo VITE_.

NO se mergea hasta resolver.
```

### Blocker

```
🚨 BLOCKER — TS6133: src/pages/DashboardPage.tsx:14

import { Trophy, Calendar, Users } from 'lucide-react';

`Calendar` no se usa. Genera TS6133 y rompe build.

Fix:
import { Trophy, Users } from 'lucide-react';
```

### Warning

```
⚠️ Warning — Sin animación de entrada: src/components/StatsBlock.tsx

Sub-componente sin motion.* wrapping. No bloquea (no es página top-level), 
pero la convención del proyecto es tener animación si tiene sentido.

Sugerencia: <motion.div {...fadeUp}>{...}</motion.div>
```

### Suggestion

```
💡 Suggestion: src/components/BracketView.tsx:45

Podrías extraer este bloque a sub-componente <BracketRound> para legibilidad.
No urgente, mantenible como está.
```

## Reglas de tono (Pedro)

- **Decisivo.** Si crees que algo está mal, dilo claro. "Considera" vacío no aporta.
- **Concreto.** Cita archivo, línea, regla específica de Torneos.
- **Fix accionable.** Diff o snippet, no descripción vaga.
- **Sin paja.** No "Muy buen trabajo!" preventivo, ni "Espero que esto ayude" final.
- **Una pasada que funciona.** Si tienes 80% certeza del fix, propónlo; no preguntes 3 veces para llegar al 95%.

## Cantidad

- 1 comentario, 1 tema. No mezclar bloqueante con suggestion.
- No comentes lo que ESLint/Prettier cubre.
- Si hay patrón repetido (10 imports sin usar), 1 comentario top-level resumiendo es mejor que 10 inline.
