# ⚔ Competitors Database

> 11 competidores analizados en el competitive analysis de mayo 2026.
> Importa `competitors.csv` en esta página para verlos como database.

## Tiers

- **Tier 1 — Incumbentes en España** (4): Competize, bcoach Arena, Nadugol, Federaciones territoriales
- **Tier 2 — Internacionales con tracción** (4): Tournify, GotSport, SportsEngine Tournaments, TourneyEngine
- **Tier 3 — IA y adyacentes** (2): OTTO SPORT AI, LeagueApps
- **Amenazas verticales** (1): Hudl + Wyscout

## Columnas

| Columna | Tipo | Descripción |
|---|---|---|
| `Nombre` | Title | Nombre del competidor |
| `Tier` | Select | 1 / 2 / 3 / Amenaza |
| `País` | Select | ES / NL / US / UK / IT |
| `Año fundación` | Number | |
| `Funding` | Text | Total levantado o estado |
| `Pricing` | Text | Modelo de precio público |
| `ARPU estimado € / año` | Number | |
| `Foco mercado` | Select | España / Europa / USA / Global |
| `Tiene AI` | Checkbox | |
| `Tiene scouting overlay` | Checkbox | |
| `Tiene streaming` | Checkbox | |
| `Integración federaciones` | Checkbox | |
| `Moat strength` | Number | 1-5 |
| `Amenaza para Krujens` | Select | Existencial / Alta / Media / Baja |
| `URL` | URL | Sitio web oficial |
| `Notas` | Text | Observaciones |

## Vistas sugeridas

1. **Tabla** completa
2. **Por tier** — agrupado por `Tier`, ordenado por `Moat strength` desc
3. **Por amenaza** — agrupado por `Amenaza para Krujens`
4. **España vs internacional** — filtro `Foco mercado`
5. **Con AI** — filtro `Tiene AI = true`

## Conclusiones clave (del competitive analysis)

### Quien gana hoy
- Competize tiene escala (700k usuarios) pero **bootstrap débil** (solo €250k revenue tras 13 años)
- GotSport domina USA pero no tiene presencia EU significativa
- Tournify es price leader EU sin diferenciación premium

### Quien amenaza
- 🚨 **Hudl + Wyscout** (oct 2025 adquisición + feb 2026 cup en España) — descenso desde pro a base
- 🚨 **OTTO SPORT AI** — $16.5M seed ene 2026, misma visión "youth sports OS"

### Donde puede ganar Krujens
- **Ecosistema único**: nadie combina torneos + catálogo + scouting + academy
- **Compliance ES** (RGPD + LO 8/2021) como moat regulatorio frente a players USA
- **Federaciones territoriales españolas** sin plataforma propia — partnership window

## LTV combinado defendible

```
LTV directo Torneos (3 años)   €1.350
LTV indirecto Vitas             €5.184
LTV indirecto Ludus             €1.620
─────────────────────────────────────
LTV COMBINADO                   €8.154

CAC €400 → LTV/CAC 20.4× con ecosistema · vs 3.4× sin
Multiplicador ecosistémico = 6.0×
```

Ver `competitive-analysis-torneos.html` y `executive-summary.html` en `docs/` del repo para el análisis completo (86 KB · 12 secciones · 18 referencias bibliográficas).
