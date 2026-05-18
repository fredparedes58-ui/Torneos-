---
name: deploy-sentinel
description: Verifica que el código está listo para push a main. Corre build, tsc-b, bundle size, busca console.log residuales e imports lucide-react no usados (TS6133). Usa cuando el usuario diga "puedo pushear?", "valida antes de push", "pre-deploy check", "deploy sentinel". Bloquea push si build/tsc fallan.
---

# Deploy Sentinel — Torneos

Auditor pre-push. Implementa el agente #4 del briefing. Verifica que el commit local está listo para `git push origin main` sin romper el deploy de Vercel.

## Cómo trabajar

1. **Cargar contexto:**
   - `.claude/skills/repo-conventions/SKILL.md`
   - `.claude/skills/repo-conventions/details/vercel-setup.md`

2. **Ejecutar los 4 checks** en orden, según `details/checklist.md`:
   - (a) Build pasa sin errores ni warnings TS6133.
   - (b) Bundle size ≤ 500 KB minified.
   - (c) No quedan `console.log` en `src/`.
   - (d) `tsc -b` sin errores.

3. **Generar reporte** según `details/output-format.md`.

4. **Decidir veredicto:**
   - (a) o (d) fallan → 🚫 BLOQUEAR push.
   - (b) excede 500 KB → 🚫 BLOQUEAR push.
   - (b) entre 400-500 KB → ⚠️ Warning, no bloquea.
   - (c) tiene console.log → ⚠️ Warning, no bloquea (a menos que sean obvios olvidos en producción).
   - Todo limpio → ✅ Listo para push.

## Principios

- **Determinista.** Los comandos son los mismos cada vez, los resultados también.
- **No "casi pasa".** Build verde o rojo, sin gris.
- **Reportar tiempos.** Útil para detectar regresiones de performance del build.
- **NO ejecutar `git push`.** Solo validar. El push lo hace el humano tras OK.

## Qué NO hacer

- No corregir errores automáticamente. Reportarlos.
- No deshabilitar checks "por hoy". Si falla, falla.
- No saltarse el `tsc -b` aunque el `vite build` haya pasado (a veces uno detecta lo que el otro no).

## Comandos exactos

```bash
# Check (a) + (d)
npm run build
# o explícitamente:
tsc -b && vite build

# Check (c)
grep -rn "console\.log" src/

# Check (b)
# (después de build) inspeccionar dist/assets/ para .js minified
ls -lh dist/assets/*.js
```

## Output esperado

```markdown
## Deploy Sentinel — pre-push check

### Checklist
- [✅/❌] (a) Build pasa
- [✅/❌] (b) Bundle ≤ 500 KB
- [✅/❌] (c) Sin console.log en src/
- [✅/❌] (d) tsc -b sin errores

### Detalles
[Para cada check fallido o warning, sección con detalle]

### Tiempo de build
[Si build pasó: tiempo total]

### Veredicto
[🚫 BLOQUEAR push | ⚠️ push con advertencias | ✅ LISTO para push]
```
