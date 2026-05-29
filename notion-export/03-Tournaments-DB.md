# 🏆 Tournaments Database

> 16 torneos reales de fútbol base de España con metadata completa.
> Importa `tournaments.csv` en esta página para verlos como database con filtros.

## Columnas de la database

| Columna | Tipo | Descripción |
|---|---|---|
| `Nombre` | Title | Nombre oficial del torneo |
| `Categoría` | Select | Sub-13 / Sub-15 / Sub-17 / Sub-19 / Sub-20 / Cadete / Juvenil / Alevín |
| `Estado` | Status | activo · proximo · finalizado |
| `Formato` | Select | eliminacion / liga / grupos |
| `Estación` | Select | primavera · verano · otono · invierno |
| `Mes` | Number | 1-12 |
| `Fecha inicio` | Date | YYYY-MM-DD |
| `Fecha fin` | Date | YYYY-MM-DD |
| `Ciudad` | Text | Ciudad sede |
| `Provincia` | Text | Provincia |
| `Región` | Select | Catalunya / Madrid / C. Valenciana / etc. (8 valores) |
| `Sede` | Text | Estadio / ciudad deportiva |
| `País` | Text | España |
| `Total Equipos` | Number | Equipos participantes |
| `Precio €` | Number | EUR / equipo (0 = invitación) |
| `Nivel` | Select | amateur · semi-pro · pro · elite · internacional |
| `Organizador` | Text | Nombre del organizador |
| `Tipo Organizador` | Select | cantera · privado · ayuntamiento · federacion |
| `Premio` | Text | Premio en metálico o descripción |
| `Años edición` | Number | Edición actual del torneo |
| `Hero image` | URL | Foto Unsplash de la ciudad/estadio |
| `Tags` | Multi-select | Tags asociados |
| `Descripción` | Text | Descripción larga |

## Vistas sugeridas (después de importar)

1. **Tabla** (default) — todas las columnas
2. **Calendario** — por `Fecha inicio` (mostrar Estado + Ciudad)
3. **Galería** — agrupado por `Estación`, cover = `Hero image`
4. **Tablero** — agrupado por `Estado`
5. **Por región** — agrupado por `Región`, ordenado por `Fecha inicio`
6. **Por organizador** — agrupado por `Tipo Organizador`, sub-orden por `Precio €`
7. **Premium tier** — filtro `Nivel = elite OR internacional`, ordenado por `Precio €` desc

## Distribución actual

### Por región
- Catalunya: **2** (MIC Football, Costa Daurada Cup)
- C. Valenciana: **4** (Yellow Cup, COTIF, Costa Blanca, Trofeo Naranja)
- Madrid: **2** (Madrid Youth Cup, IberCup Madrid)
- País Vasco: **2** (Donosti Cup, Bilbao Int. Cup)
- Castilla y León: **1** (Trofeo Miranda)
- Asturias: **1** (Memorial Quini)
- Cantabria: **1** (Cantabria Cup)
- Illes Balears: **1** (Trofeo Marivent)
- Andalucía: **1** (Marbella Football Cup)
- Madrid (LaLiga Promises): **1**

### Por tipo de organizador
- **Privado:** 9 (MIC, Donosti, Costa Daurada, Madrid Youth, Costa Blanca, IberCup, Cantabria, Marivent, Marbella)
- **Cantera:** 3 (Villarreal, Valencia CF, Athletic Bilbao)
- **Ayuntamiento:** 3 (L'Alcúdia, Avilés, Miranda Ebro)
- **Federación:** 1 (LaLiga Promises)

### Por estación
- **Primavera:** 4 (abril-mayo) — Semana Santa, mejor clima
- **Verano:** 8 (junio-agosto) — pico del calendario juvenil
- **Otoño:** 1 (noviembre)
- **Invierno:** 1 (enero) — Costa del Sol

### Por nivel
- **Internacional:** 4 (MIC, Donosti, COTIF, IberCup)
- **Elite:** 4 (Yellow Cup, LaLiga Promises, Madrid Youth, Bilbao)
- **Pro:** 5
- **Amateur:** 2

### Precio
- **Invitación:** 2 (LaLiga Promises, COTIF)
- **€200-300:** 3 (Miranda, Memorial Quini, Trofeo Naranja)
- **€350-450:** 7
- **€500-600:** 4 (premium)

## Top scoring tournaments

| Torneo | Equipos | Precio | Nivel | Estación |
|---|---|---|---|---|
| **MIC Football** | 380 | €600 | Internacional | Primavera |
| **Donosti Cup** | 600 | €450 | Internacional | Verano |
| **IberCup Madrid** | 280 | €550 | Internacional | Verano |
| **Costa Daurada Cup** | 240 | €400 | Pro | Primavera |
| **Madrid Youth Cup** | 220 | €500 | Elite | Verano |
