# Formato del output stitch-sync

## Template básico (1 pantalla comparada)

```markdown
## Stitch Sync — <NombrePantalla>

**Archivo Stitch:** `.design/stitch_screens/current/<archivo>`
**Archivo actual:** `src/pages/<archivo>.tsx`
**Última modificación de cada uno:** [si es relevante]

---

### Diffs detectados

#### 1. <Categoría: ej. "Header — paleta">
**Sección:** Header de la página.
**Antes (actual):**
```tsx
<header className="bg-[#111508] border-b border-[#434933]">
```

**Después (Stitch):**
```tsx
<header className="bg-[#111508] border-b border-[#C8FF00]/20">
```

**Cambio concreto:** color del border bottom: `#434933` → `#C8FF00/20` (más prominente).

**Archivo a editar:** `src/pages/DashboardPage.tsx:14`

---

#### 2. <Categoría: ej. "Cards — spacing">
**Sección:** Grid de tarjetas de torneo.
**Antes:**
```tsx
<div className="grid grid-cols-3 gap-4">
```

**Después:**
```tsx
<div className="grid grid-cols-3 gap-6">
```

**Cambio:** gap de 16px → 24px.

---

[Más diffs...]

---

### Resumen

| Categoría | Cambios |
|---|---|
| Paleta | 1 |
| Layout | 0 |
| Spacing | 2 |
| Tipografía | 1 |
| Otros | 0 |

### Recomendación

[Una de:]
- ✅ Cambios pequeños y seguros. Aplicar todos.
- ⚠️ Cambios significativos. Revisar uno por uno antes de aplicar.
- 🚫 Stitch propone cambios a paleta core / fonts. Discutir con Pedro antes.

### Aplicación

Esta skill NO aplica cambios. Para aplicar:
1. Revisa los diffs.
2. Decide cuáles aceptas.
3. Aplica con Edit puntual en cada archivo listado.
```

## Template agregado (ZIP completo, varias pantallas)

```markdown
## Stitch Sync — v3.2

**ZIP procesado:** `.design/stitch_screens/inbox/v3.2.zip`
**Pantallas comparadas:** N
**Pantallas con cambios:** M

---

### Resumen ejecutivo

| Pantalla | Estado | Cambios |
|---|---|---|
| Dashboard | 🟢 alineado | 1 minor |
| Torneos | 🟡 cambios moderados | 3 |
| Bracket | 🔴 cambios mayores | 7 |
| Fixture | 🆕 nueva en Stitch | — |

🔴 Stitch propone cambio de paleta en Bracket — **requiere discusión**.

---

### Detalle por pantalla

#### Dashboard 🟢

[Una sección breve con los diffs]

#### Torneos 🟡

[Más detallada]

#### Bracket 🔴

⚠️ **Esta pantalla tiene cambios mayores.** Recomendación: discutir con Pedro antes de aplicar.

[Detalle]

#### Fixture 🆕

Pantalla nueva propuesta en Stitch. No existe en `src/pages/`.

**Estructura aparente:** ...
**Encajaría con flujo:** ...
**Decisión necesaria:** ¿se implementa, se rechaza, o se difiere?

---

### Próximos pasos sugeridos

1. Revisar pantallas 🟡 y 🔴 una por una con el equipo.
2. Decidir sobre pantalla nueva 🆕 Fixture.
3. Si todo OK, aplicar diffs 🟢 directamente.
4. Mover ZIP a `archive/`:
   ```bash
   mv .design/stitch_screens/inbox/v3.2.zip .design/stitch_screens/archive/
   ```
```

## Reglas

- **Cada diff es ACCIONABLE.** Tiene: sección, antes, después, archivo a editar, snippet.
- **NO aplicas los cambios.** Lo dejas explícito al final del reporte.
- **Si Stitch sugiere bloqueante (paleta/fonts), márcalo prominente** con icono y texto claro.
- **Si el diff es trivial (sub-pixel, micro-spacing), no lo incluyas.** Ruido.
