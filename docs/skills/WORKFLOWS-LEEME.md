# Workflows de GitHub — Outer loop semanal

Esta carpeta contiene el workflow opcional que automatiza el outer loop semanal de las skills.

## Qué hace

Cada lunes (o ejecutado a mano), el workflow `improve-skills-weekly.yml`:

1. **Recopila PRs mergeados los últimos 7 días** en `github.com/fredparedes58-ui/Torneos-`.
2. **Extrae los comentarios de review** de esos PRs.
3. **Crea o actualiza un issue** con label `outer-loop` que resume el feedback acumulado.
4. **Sube los datos como artifact** para que puedas descargarlos si necesitas detalle.

Lo que **NO hace** automáticamente:

- ❌ NO modifica las skills (Pedro decide qué feedback aplicar).
- ❌ NO mergea PRs ni hace cambios al repo.
- ❌ NO usa la API de Claude (es solo orquestación; el trabajo creativo lo haces tú con Claude Code).

## Por qué es así

Pedro mantiene autoridad: el workflow solo te junta el feedback para que tú decidas. Aplicar el feedback es trabajo humano usando la skill `improve-skill` en Claude Code.

## Cómo activarlo

### 1. Copia el archivo `.github/` al repo Torneos-

```bash
cd /ruta/a/Torneos-
cp -r /ruta/al/paquete/4-workflows-github/.github .
```

Verifica:

```bash
ls .github/workflows/
# Debe listar: improve-skills-weekly.yml
```

### 2. Commit y push

```bash
git add .github/
git commit -m "ci: add weekly outer loop workflow"
git push origin main
```

### 3. Crea el label `outer-loop` (manualmente o desde la UI)

En GitHub → Settings → Labels → New label:
- Name: `outer-loop`
- Color: el que quieras (sugerido: #C8FF00 lime accent, en línea con el branding).

O por terminal si tienes `gh` instalado (en la máquina de Pedro NO está):

```bash
gh label create "outer-loop" --color "C8FF00" --description "Weekly skills review"
```

### 4. Espera al primer lunes o lánzalo a mano

Para probarlo inmediatamente sin esperar:

- GitHub → tu repo → Actions → "Improve skills weekly" → Run workflow.

## Cómo lo usas tú cada lunes

1. **Recibes notificación del issue** (automática si tienes notifications activadas).
2. **Abres el issue** y lees el resumen.
3. **Descargas los artifacts** si necesitas detalle de PRs / comentarios.
4. **Identificas 3-5 patrones** de feedback recurrente:
   - "design-system-guardian marcó X como violación 3 veces y X era válido"
   - "deploy-sentinel no detectó Y"
   - "code-review se confundió de severidad en Z"
5. **Abres Claude Code en el repo Torneos-** y ejecutas:

   ```
   "Mejora design-system-guardian con estos feedbacks:
   1. [feedback 1]
   2. [feedback 2]"
   ```

6. **Revisas los diffs** que la skill `improve-skill` propone.
7. **Aceptas o rechazas** cada uno.
8. **Cierras el issue** cuando termines.

Tiempo total: 20-30 min/semana.

## Desactivar el workflow

Si no quieres ejecución automática (porque prefieres correr el outer loop cuando te apetezca):

### Opción A: borrar el archivo

```bash
rm .github/workflows/improve-skills-weekly.yml
git commit -am "ci: remove weekly outer loop workflow"
git push
```

### Opción B: deshabilitarlo en GitHub

GitHub → Actions → "Improve skills weekly" → ⋮ → Disable workflow.

### Opción C: cambiar el cron

Edita la línea `cron:` en el YAML. Sintaxis estándar de cron. Ejemplos:
- Cada quincena (día 1 y 15): `0 9 1,15 * *`
- Primer lunes de cada mes: `0 9 1-7 * 1`

## Costes y permisos

- **Permisos:** `contents: read`, `pull-requests: read`, `issues: write`. Suficiente para lo que hace.
- **Coste:** ~30 segundos de ejecución por run. Dentro del free tier de GitHub Actions sin problema.
- **Secrets necesarios:** ninguno extra. Usa el `GITHUB_TOKEN` que GitHub provee automáticamente.

## Limitaciones conocidas

- **No analiza commits sin PR.** Si pusheas directo a main sin PR, esos cambios no entran al loop.
- **No analiza el contenido del código.** Solo títulos, comentarios y reviews. El análisis profundo lo haces tú con Claude Code.
- **Funciona solo en repos GitHub.** Si migras a GitLab/Bitbucket, hay que adaptar.

## Personalización futura

Si quieres que el workflow haga más (analizar el código, llamar a Claude API directamente, abrir PRs de mejora):

1. Usa `improve-skill` para mejorar el propio workflow.
2. Considera invocar `anthropic/claude-code-action@main` desde GitHub Actions (acción oficial de Anthropic).
3. Pero ten cuidado: automatizar demasiado el outer loop reduce tu capacidad de filtrar feedback malo.

Pedro prefiere "una pasada que funciona" sobre "tres preguntas de clarificación", y eso aplica también al outer loop: mejor un workflow simple que junta info, y tú decides; que un sistema complejo que decide por ti.
