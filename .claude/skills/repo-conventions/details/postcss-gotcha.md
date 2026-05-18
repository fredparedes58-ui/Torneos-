# Gotcha conocido: postcss.config.js local

## El problema

En la máquina de Pedro existe `C:\Users\pparedes\postcss.config.js` global. Este config se carga automáticamente por algunos tooling si no hay un postcss.config.js local en el proyecto.

Resultado: build de Torneos puede tomar config de PostCSS del global, generando comportamiento impredecible.

## La solución

El proyecto debe incluir `postcss.config.js` (vacío o con la config correcta) en el root:

```js
// postcss.config.js
export default {};
// o si Tailwind v4 + autoprefixer:
export default {
  plugins: {
    '@tailwindcss/postcss': {},
    autoprefixer: {},
  },
};
```

## 🚨 Bloqueante: borrar postcss.config.js del root

Si un PR elimina este archivo:

```
🚨 BLOCKER — postcss.config.js removed from root

Este archivo es NECESARIO en el root del proyecto, incluso si está casi vacío.

Su función: neutralizar el postcss.config.js global de Windows 
(C:\Users\pparedes\postcss.config.js) que afecta a builds locales.

Sin este archivo:
- Build local puede tomar config inesperado.
- Builds inconsistentes entre máquinas.
- Comportamiento "raro" intermitente.

Restaurar el archivo antes de mergear.
```

## ⚠️ Warning: modificar postcss.config.js sin justificación

Si un PR cambia este archivo, verificar que el cambio es intencional y necesario. No tocarlo "por limpieza".

## Detección

```bash
# Verificar que existe
test -f postcss.config.js || echo "❌ postcss.config.js MISSING from root"
```

`deploy-sentinel` puede incluir este check.
