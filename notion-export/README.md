# 📦 Torneos · Bundle de importación a Notion

Carpeta lista para arrastrar a Notion y tener todo el proyecto organizado.
Generado: 2026-05-20.

## 🚀 Cómo importar (3 minutos)

### Paso 1 · Crea un workspace o página padre en Notion
Por ejemplo: **"Torneos · Hub Krujens"**

### Paso 2 · Importa los `.md` como sub-páginas
1. Notion → tu página padre → tres puntos `···` → **Import**
2. Selecciona **Markdown & CSV**
3. Arrastra **todos los archivos `.md` de esta carpeta** al diálogo de import
4. Notion los convertirá automáticamente a sub-páginas con la jerarquía de títulos

### Paso 3 · Importa los `.csv` como databases
1. En la página `03-Tournaments-DB` → tres puntos → **Import**
2. Selecciona **CSV**
3. Arrastra `tournaments.csv` → Notion lo convierte en una **database con filtros**
4. Repite con `competitors.csv` en la página `04-Competitors-DB`

### Paso 4 · Configurar database views (opcional, 2 min)
En la database de Tournaments, añade vistas:
- **Tabla** (default) — todas las columnas
- **Calendario** por `fechaInicio`
- **Galería** con cover usando el `heroImage` URL
- **Tablero (kanban)** agrupado por `status` (activo / proximo / finalizado)
- **Por región** — agrupado por `region`

## 📂 Estructura del bundle

```
notion-export/
├── README.md                      ← este archivo (instrucciones)
├── 00-Hub.md                      ← portada del proyecto
├── 01-Roadmap.md                  ← hitos + estado actual
├── 02-Design-System.md            ← Neon Stadium spec completa
├── 03-Tournaments-DB.md           ← introducción a la DB de torneos
├── tournaments.csv                ← 16 torneos reales España (importar)
├── 04-Competitors-DB.md           ← introducción a la DB de competidores
├── competitors.csv                ← 11 competidores con funding/pricing
├── 05-Skills.md                   ← 9 skills Claude Code instaladas
├── 06-Decisions-Log.md            ← ADRs (architecture decisions)
├── 07-Backlog.md                  ← features pendientes / próximos pasos
└── 08-Links.md                    ← URLs producción, repo, deploys, docs
```

## 💡 Sugerencia de jerarquía en Notion

```
📂 Torneos · Hub Krujens (página padre)
├── 🏠 Hub
├── 🗺  Roadmap
├── 🎨 Design System
├── 🏆 Tournaments DB (database)
├── ⚔  Competitors DB (database)
├── 🤖 Skills Claude Code
├── 📐 Decisions Log
├── 🚀 Backlog
└── 🔗 Links + recursos
```

## 🔄 Si quieres sincronización repo↔Notion en el futuro

Opciones (todas requieren setup adicional):

1. **Notion API + GitHub Action** — script que lee `mock.ts` y sincroniza la database de torneos en push a main
2. **Notion CLI** (`@notionhq/client`) — librería oficial, integration token + script de export
3. **N8N / Make / Zapier** — sin código, conectores prefab

Pídemelo cuando quieras y te lo configuro.

## 📌 Notas importantes

- **Las imágenes Unsplash** (heroImage) son URLs externas — Notion las renderizará correctamente en vistas Galería
- **Los avatares de jugadores** usan pravatar.cc seeds — también son URLs externas
- **Los enlaces a Vercel** en `08-Links.md` apuntan al deploy de producción actual
- **El competitive analysis HTML** queda en `docs/` del repo, no en este bundle (no es Notion-friendly por su tamaño y SVGs inline)
