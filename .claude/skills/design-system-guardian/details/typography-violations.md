# Typography violations

Violaciones del sistema tipográfico Barlow Condensed / JetBrains Mono / DM Sans.

## 🚨 Crítica: font arbitrary con quotes en JSX (rompe TS)

### Detección

```bash
# Buscar font-['...'] o font-["..."] en JSX:
grep -rEn 'font-\[("[^"]+"|'"'"'[^'"'"']+'"'"')\]' src/
```

### Patrón problemático

```tsx
<h1 className="font-['Barlow_Condensed']">Final</h1>
<p className={`font-["DM Sans"]`}>Texto</p>
```

### Reporte

```
🚨 CRITICAL — Font arbitrary class with quotes: <archivo>:<línea>

<h1 className="font-['Barlow_Condensed']">Final</h1>

Las quotes dentro de arbitrary classes en JSX rompen el parser de TypeScript.
El build se cae con errores crípticos.

Fix:
<h1 className="font-display">Final</h1>

Si el utility `font-display` no existe en @theme, añadirlo PRIMERO ahí, 
NO usar arbitrary class en JSX.
```

→ Contribuye -25 al score (es bloqueante de build, casi automatic kill).

## 🚨 Crítica: cambio del mapping de fonts

Si el diff modifica el mapping de las utilities `font-display`, `font-mono`, `font-body` en @theme:

```diff
- --font-display: 'Barlow Condensed', sans-serif;
+ --font-display: 'Bebas Neue', sans-serif;
```

→ 🚨🚨 Bloqueante crítico. Cambio de identidad tipográfica requiere discusión explícita.

## ⚠️ Warning: style inline con fontFamily

```tsx
<h1 style={{ fontFamily: 'Barlow Condensed' }}>  // ⚠️
```

```
⚠️ Inline fontFamily: <archivo>:<línea>

Fix: 
<h1 className="font-display">
```

## ⚠️ Warning: texto sin utility de font explícito en componentes nuevos

En componentes nuevos del PR, si hay `<h1>`, `<p>`, `<span>` sin clase de font, → ⚠️.

(En componentes existentes no flagear, son legacy aceptable.)

```tsx
// Si es archivo nuevo del PR:
<h1 className="text-2xl">Título</h1>  // ⚠️ sin font-display

// Mejor:
<h1 className="text-2xl font-display">Título</h1>
```

## 💡 Sugerencia: tamaño arbitrary cuando hay token estándar

```tsx
<p className="text-[14px]">  // 💡
```

```tsx
// Mejor (Tailwind ya tiene text-sm = 14px):
<p className="text-sm">
```

Excepción: si el diseño Stitch usa medidas específicas no estándar, está OK pero documentar en comentario.

## ⚠️ Warning: label sin label-caps

Headers de tabla, badges de estado y labels de stats:

```tsx
// Si es claramente un label:
<th>Equipo</th>  // ⚠️
<th>PJ</th>  // ⚠️

// Mejor:
<th className="label-caps text-[#C4CAAC]">Equipo</th>
<th className="label-caps text-[#C4CAAC]">PJ</th>
```

Heurística: TH con palabra corta o abreviatura → candidato a `label-caps`. Badge con "EN VIVO", "FINALIZADO", "EN CURSO" → candidato a `label-caps`.

## Contribución al score

| Tipo | Resta del score |
|---|---|
| Font arbitrary con quotes (rompe build) | -25 |
| Cambio del mapping de fonts | -100 (bloqueante automático) |
| Style inline fontFamily | -5 por ocurrencia |
| Componente nuevo sin font utility | -2 por ocurrencia |
| Tamaño arbitrary innecesario | -1 por ocurrencia |
| TH/badge sin `label-caps` | -1 por ocurrencia |
