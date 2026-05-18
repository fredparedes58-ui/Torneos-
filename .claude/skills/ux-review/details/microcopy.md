# Microcopy — Torneos

El microcopy es el texto pequeño: botones, labels, placeholders, mensajes de error, toasts. Marca la diferencia entre app que se siente "amateur" y app que se siente "pro".

## Reglas universales del proyecto

### Sin tildes en strings hardcoded

Convención del proyecto (de `repo-conventions/details/code-patterns.md`):

```tsx
// ✅
<h1>Copa de Cantera</h1>
<p>Eliminacion directa</p>
<button>Anadir equipo</button>

// ❌ (riesgo de corrupción con PowerShell)
<h1>Copa de Cantería</h1>
<p>Eliminación directa</p>
<button>Añadir equipo</button>
```

Esto es regla del repo. ⚠️ Warning si detectas tildes en strings hardcoded de archivos editados via PowerShell (puede ser corrupción).

### Tono profesional pero cercano

Torneos es plataforma para clubs, scouts, organizadores. No es app consumer juvenil.

| Demasiado formal ❌ | Bien profesional ✅ | Demasiado cercano ❌ |
|---|---|---|
| "Procedamos a la creacion del torneo" | "Crear torneo" | "Dale al boton para crear tu torneo, capo" |
| "Su torneo ha sido creado exitosamente" | "Torneo creado" | "Bingo! Tu torneo esta listo" |
| "Por favor introduzca el nombre" | "Nombre del torneo" | "Como se llama, jefe?" |

Usar **tú** o **usted**: Torneos es B2B, **tú** funciona mejor que usted (menos distante), pero sin ser informal.

## 1. CTAs (botones de acción)

### Regla: verbo + objeto específico

```
❌ "OK" / "Submit" / "Guardar" (solo)
✅ "Crear torneo" / "Anadir equipo" / "Generar fixture"

❌ "Si" / "No"
✅ "Si, eliminar" / "No, cancelar"

❌ "Enviar"
✅ "Crear y abrir torneo"
```

### Excepciones aceptables

- Modal de confirmación con título descriptivo: "Eliminar" sin objeto, OK.
- Botón en form claramente contextual: "Guardar" basta.

### ⚠️ Warning: CTAs genéricos

```tsx
// ⚠️ ambiguo
<button>Continuar</button>

// ✅ específico
<button>Generar bracket</button>
```

## 2. Labels de formulario

### Regla: corto y descriptivo

```
❌ "Por favor, introduce el nombre completo del torneo aqui"
✅ "Nombre del torneo"

❌ "Numero de equipos participantes en el torneo"
✅ "Equipos"
```

### Texto helper si hace falta más contexto

```tsx
<label>
  Equipos
  <input type="number" />
  <small className="text-[#C4CAAC]">
    Debe ser potencia de 2 para eliminacion directa (2, 4, 8, 16...)
  </small>
</label>
```

## 3. Placeholders

### Regla: ejemplo realista, no instrucción

```
❌ placeholder="Introduce el nombre del torneo"  ← redundante con label
✅ placeholder="Copa de Verano 2026"  ← ejemplo realista

❌ placeholder="Numero"
✅ placeholder="8"
```

## 4. Mensajes de error de validación

### Regla: explicar QUÉ pasa y QUÉ hacer

```
❌ "Invalido"
✅ "El nombre del torneo es obligatorio"

❌ "Error"
✅ "Debe ser una potencia de 2 para eliminacion directa"

❌ "Required"
✅ "Falta el formato del torneo"
```

### ⚠️ Warning: errores en lenguaje técnico

```
❌ "404 Not Found"
✅ "Este torneo no existe o fue eliminado"

❌ "Network error"
✅ "Sin conexion. Comprueba tu internet."

❌ "TypeError: Cannot read property 'equipos' of undefined"
✅ "No pudimos cargar el torneo. Reintenta."
```

## 5. Toasts

### Regla: 1 línea, máximo 2

```
❌ "Tu torneo ha sido creado exitosamente y guardado en la base de datos. 
    Puedes verlo en la lista de torneos."

✅ "Torneo creado"
```

### Toast de éxito / error / info

```tsx
toast.success('Torneo creado');
toast.success('Equipo anadido');
toast.error('No pudimos crear el torneo');
toast.info('El bracket se generara cuando tengas 8 equipos');
```

### Cuándo NO usar toast

- Errores que el usuario debe corregir (forms) → mensaje inline.
- Confirmaciones críticas (eliminar torneo) → modal con confirmación.
- Info de larga consulta → pantalla dedicada o panel lateral.

## 6. Vocabulario futbolístico de scouting / gestión

Torneos es para scouts, clubs, academia. Vocabulario técnico del deporte.

### Términos a usar

- **Formatos**: liga, eliminacion (directa), fase de grupos, liguilla, grupos + eliminacion.
- **Fases**: octavos, cuartos, semifinales, final, primera ronda, segunda ronda.
- **Tabla**: clasificacion, posicion, partidos jugados (PJ), ganados (G), empatados (E), perdidos (P), goles a favor (GF), goles en contra (GC), diferencia (DG), puntos (Pts).
- **Estados**: pendiente, en curso, finalizado, suspendido.
- **Acciones organizativas**: programar partido, generar fixture, registrar resultado, anadir equipo, eliminar equipo.
- **Resultado**: victoria, derrota, empate, walkover (W.O.), no presentado.

### ⚠️ Warning: genericismos cuando aplica término específico

```
❌ "Numero de equipos que ganaron"
✅ "Equipos clasificados"

❌ "Listado de partidos del torneo"
✅ "Fixture"

❌ "Tabla de puntos"
✅ "Clasificacion"

❌ "Eliminacion fase 1"
✅ "Octavos de final"
```

## 7. Estados del torneo (microcopy específico)

| Estado | Microcopy badge | Microcopy descripción |
|---|---|---|
| pendiente | PENDIENTE | "Aun no comenzado" |
| en_curso | EN CURSO | "{X} de {Y} partidos jugados" |
| finalizado | FINALIZADO | "Ganador: {equipo}" o "Sin ganador definido" |
| suspendido | SUSPENDIDO | "{razon de la suspension}" |

Badges con `label-caps` (uppercase + tracking).

## 8. Longitud por contexto

| Contexto | Máximo |
|---|---|
| Toast | 50 chars |
| Botón (label) | 20 chars |
| Label de input | 20 chars |
| Placeholder | 25 chars |
| Title de tabla (th) | 8-15 chars o abreviatura (PJ, GF, GC) |
| Headline (h1 de página) | 60 chars |
| Body paragraph | 200 chars |
| Tooltip | 100 chars |

### ⚠️ Warning: texto que se trunca en móvil

Si el texto se trunca con ellipsis en pantallas pequeñas, está mal dimensionado o demasiado largo.

## 9. Confirmaciones de acciones destructivas

Para acciones que no se pueden deshacer (eliminar torneo, eliminar equipo del torneo):

### ✅ Patrón correcto

```tsx
<Dialog>
  <DialogTitle>¿Eliminar este torneo?</DialogTitle>
  <DialogDescription>
    Se perderan todos los partidos, equipos y resultados de "Copa de Verano".
    Esta accion no se puede deshacer.
  </DialogDescription>
  <DialogActions>
    <button onClick={cancelar}>Cancelar</button>
    <button onClick={confirmar} className="bg-red-500">
      Si, eliminar
    </button>
  </DialogActions>
</Dialog>
```

Reglas:
- Título pregunta explícita: "¿Eliminar este torneo?".
- Descripción menciona consecuencias concretas.
- CTA confirmación reafirma la acción: "Si, eliminar" (NO solo "Si").
- CTA cancelar visualmente menos destacado (sin background del color de acción).

## 10. Disclaimers y legal

### Para textos legales (terms, privacy)

- Español neutro claro, sin tecnicismos.
- Sin tildes en strings hardcoded (convención del repo).
- Si el legal text viene de archivo externo MD, las tildes ahí están OK (no se editan via PowerShell).

### Para tooltips de ayuda

```
❌ "Este campo determina el sistema de eliminacion utilizado en el torneo"
✅ "Como se enfrentan los equipos"
```

## Checklist rápido

- [ ] CTAs son verbo + objeto específico (no "OK" / "Continuar").
- [ ] Sin tildes en strings hardcoded (convención Torneos).
- [ ] Errores de validación explican QUÉ hacer.
- [ ] Errores de sistema NO usan jerga técnica.
- [ ] Toasts son 1-2 líneas máximo.
- [ ] Tono profesional pero cercano (tú, no usted formal).
- [ ] Vocabulario futbolístico técnico cuando aplique.
- [ ] Estados del torneo con badges `label-caps`.
- [ ] Confirmaciones destructivas reafirman acción.
- [ ] Texto no se trunca en móvil (~360px).
