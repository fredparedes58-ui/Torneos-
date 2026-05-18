# Workflow stitch-sync

## Caso 1: comparar una pantalla específica

Usuario dice: "compara DashboardPage contra el último Stitch".

### Pasos

1. Localizar el Stitch:
   ```bash
   ls .design/stitch_screens/
   # Buscar archivo que contenga "dashboard" o similar
   ```

2. Localizar el `.tsx` actual:
   ```bash
   find src/pages -iname "*dashboard*"
   # → src/pages/DashboardPage.tsx
   ```

3. Leer ambos:
   - Si Stitch es HTML estático, leerlo como tal.
   - Si Stitch es export de Figma con JSON, parsear.
   - Si Stitch es captura PNG + specs, leer el PNG (vista) y los specs.

4. Extraer atributos visuales de ambos (ver `diff-extraction.md`).

5. Generar diff.

## Caso 2: ZIP nuevo de Stitch llega al proyecto

Usuario dice: "Recibí Stitch v3.2, está en .design/stitch_screens/inbox/v3.2.zip".

### Pasos

1. Descomprimir:
   ```bash
   cd .design/stitch_screens/
   unzip inbox/v3.2.zip -d v3.2/
   ```

2. Identificar archivos:
   ```bash
   ls v3.2/
   # → dashboard.html torneos.html bracket.html ...
   ```

3. Para cada archivo:
   - Localizar `.tsx` correspondiente en `src/pages/` o `src/components/`.
   - Comparar (siguiente sección).

4. Generar reporte AGREGADO con secciones por pantalla.

5. Sugerir mover `inbox/v3.2.zip` a `archive/` tras la review:
   ```bash
   mkdir -p .design/stitch_screens/archive/
   mv .design/stitch_screens/inbox/v3.2.zip .design/stitch_screens/archive/
   ```

## Caso 3: Stitch generó nueva pantalla que no existe en el proyecto

Si en `.design/stitch_screens/v3.2/` hay un archivo cuya pantalla NO existe en `src/pages/`:

→ Reportar como "pantalla nueva propuesta por Stitch". Listar:
- Nombre y propósito aparente.
- Estructura general.
- Si encajaría en algún flujo existente.

NO crear el archivo `.tsx` automáticamente. El humano decide si lo implementa.

## Caso 4: pantalla en el proyecto que ya NO está en Stitch

Si una pantalla del proyecto desaparece del nuevo Stitch:

→ Reportar como "pantalla del proyecto sin correspondencia en Stitch v3.2".

Posibles razones:
- Stitch la eliminó intencionalmente (deprecada en el diseño).
- Stitch se olvidó / no la incluyó en este export.
- La pantalla nunca estuvo en Stitch (es interna del dev).

NO eliminar la pantalla. Reportar para que el humano clarifique.

## Estructura de directorio recomendada

```
.design/
└── stitch_screens/
    ├── current/             ← versión activa de referencia
    │   ├── dashboard.html
    │   ├── torneos.html
    │   └── ...
    ├── inbox/               ← ZIPs nuevos sin procesar
    │   └── v3.2.zip
    └── archive/             ← versiones antiguas
        ├── v3.0/
        ├── v3.1/
        └── v3.1.zip
```

Si el proyecto no tiene esta estructura, sugerirlo en el primer audit.

## Cuándo PARAR y preguntar

- Si no encuentras el Stitch correspondiente a una pantalla mencionada.
- Si hay >5 pantallas con cambios mayores (la pasada va a ser muy larga, mejor priorizar con el usuario).
- Si Stitch propone cambio de paleta core o fonts (bloqueante).
