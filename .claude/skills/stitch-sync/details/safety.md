# Reglas de seguridad — stitch-sync

## Regla 1: NUNCA aplicas cambios al código

stitch-sync es solo lector + reportador. NO ejecuta:
- Edit
- str_replace
- Write
- create_file
- Cualquier modificación de archivos en `src/`

Si el usuario te pide "aplica los cambios", redirige:

```
Esta skill solo propone diffs, no los aplica. Para aplicar:

Opción A: copia y pega los snippets manualmente.
Opción B: pídeme "aplica el cambio de [X]" para usar la tool Edit 
         específicamente, fuera del scope de stitch-sync.

Esto es intencional: stitch-sync mantiene tu autoridad sobre qué 
cambios del diseño se aplican y cuáles no.
```

## Regla 2: NUNCA modificas el directorio `.design/`

Salvo:
- Mover ZIP procesado de `inbox/` a `archive/` (operación de archivo, no de contenido).
- Descomprimir ZIP nuevo en su carpeta de versión.

NO modificas el contenido de archivos Stitch (los HTML, JSON, PNG). Son input externo.

## Regla 3: Bloqueantes especiales de Stitch

Aunque Stitch los proponga, ESTOS cambios NO se sugieren aplicar:

### Cambios a la paleta core

Si Stitch usa hex distintos a `#111508`, `#C8FF00`, `#C4CAAC`, `#434933`:

```
🚨 Stitch propone color [#X] que NO está en la paleta core.

Esto puede ser:
- Intencional (rediseño de paleta).
- Accidental (diseñador no respetó la guía).

NO recomendado aplicar sin discutirlo con Pedro.
```

### Cambios a las fonts

Si Stitch usa fonts distintas a Barlow Condensed / JetBrains Mono / DM Sans:

```
🚨 Stitch propone font "[X]" que NO está en el sistema actual.

Cambiar el sistema de fonts es un bloqueante crítico del proyecto.
NO recomendado aplicar sin discusión explícita.
```

## Regla 4: Si Stitch propone componente totalmente nuevo

NO crear el componente. Reportarlo como "componente nuevo propuesto" y dejar la decisión al humano:

```
🆕 Nueva pantalla/componente propuesto en Stitch: <nombre>

No existe en el proyecto actual.

Stitch describe:
- [Propósito aparente]
- [Estructura]
- [Composición]

Decisión necesaria por parte del humano:
- ¿Implementar ahora?
- ¿Diferir a Fase 2?
- ¿Rechazar (fuera de scope)?

stitch-sync no crea componentes automáticamente.
```

## Regla 5: Confianza en Stitch

Stitch es la fuente de verdad para el diseño visual. PERO:
- Si Stitch contradice constraints técnicos del proyecto (puerto 5300, libs no compatibles, etc.), priorizar el constraint técnico y reportar la contradicción.
- Si Stitch contradice convenciones del proyecto (sin tildes, español neutro), priorizar el proyecto (Stitch puede tener placeholder text).

## Ejemplos de qué NO hacer

❌ Aplicar un Edit a `src/pages/DashboardPage.tsx` directamente desde esta skill.
❌ Modificar `.design/stitch_screens/v3.2/dashboard.html`.
❌ Decir "lo aplico" y proceder.
❌ Crear archivos nuevos en `src/` aunque Stitch los proponga.

✅ Reportar todos los diffs con snippets.
✅ Mover ZIP de inbox a archive tras procesarlo.
✅ Decir explícitamente "esta skill no aplica cambios, solo propone".
