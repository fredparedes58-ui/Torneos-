# Cómo cargar el contexto de la skill objetivo

Antes de modificar nada, leer todo lo que ya existe. Sin esto, los edits van a entrar en conflicto con reglas implícitas.

## Pasos

### 1. Confirmar el target

El usuario dice algo como:
- "mejora design-system-guardian con esto:..."
- "la skill code-review se confunde cuando..."
- "actualiza mock-data-validator para que..."

Si NO está claro, preguntar UNA vez:

```
¿A qué skill te refieres? Las disponibles son:
- repo-conventions
- design-system-guardian
- stitch-sync
- mock-data-validator
- deploy-sentinel
- code-review
- pr-description
- improve-skill (esta misma)
```

### 2. Leer el SKILL.md

```bash
view .claude/skills/<target>/SKILL.md
```

Necesario para entender:
- Cómo se dispara (description).
- Qué carga de contexto declara.
- Qué principios explicita.

### 3. Listar y leer todos los details/

```bash
ls .claude/skills/<target>/details/
```

Por cada archivo, leerlo completo. NO saltarse ninguno: el feedback podría requerir cambios en más de uno.

### 4. Identificar dependencias con otras skills

Si el SKILL.md menciona "delega a X" o "carga repo-conventions", verificar que el feedback no implica cambios en esas otras skills.

Ejemplo: si el feedback es "design-system-guardian no detecta el cambio de paleta", podría ser:
- Falta una regla en `design-system-guardian/details/token-violations.md`.
- O la paleta está en `repo-conventions/details/design-tokens.md` y allí está la fuente de verdad. ¿Está actualizada?

### 5. Verificar el estado del repo de Torneos (opcional)

Si el feedback referencia un PR específico (ej. "en el PR #42 no detectó X"), pedir al usuario que pegue:
- El diff del PR.
- El reporte que la skill generó.
- Lo que esperaba ver.

Sin esto, la mejora va a ser especulativa.

## Qué NO leer

- No leer SKILL.md de otras skills salvo que se mencionen explícitamente.
- No leer el código del proyecto Torneos (`src/`) salvo que el feedback lo requiera.

## Cuándo PARAR y preguntar

- Feedback contradictorio con un principio explícito (ej. "haz que sea menos estricto con la paleta" — eso es bloqueante crítico, requiere confirmación).
- Feedback vago ("no me convence el output") — pedir un ejemplo concreto.
- Feedback que sugiere cambios mayores (no edits puntuales) — confirmar el scope antes.
