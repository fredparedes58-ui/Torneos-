import type { Torneo, Equipo, Partido, PosicionTabla, RondaBracket } from '../types';

// Unsplash hero IDs (stable public photos)
const HERO_STADIUM_NIGHT  = 'https://images.unsplash.com/photo-1518604666860-9ed391f76460?w=1400&q=70&auto=format&fit=crop';
const HERO_STADIUM_AERIAL = 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=1400&q=70&auto=format&fit=crop';
const HERO_FIELD_LIGHTS   = 'https://images.unsplash.com/photo-1577223625816-7546f13df25d?w=1400&q=70&auto=format&fit=crop';
const HERO_YOUTH_TRAINING = 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1400&q=70&auto=format&fit=crop';
const HERO_TROPHY_GOLD    = 'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=1200&q=70&auto=format&fit=crop';

// ── Equipos Copa Sub-17 (con jugador estrella + division) ────────────────
const equiposCopa: Equipo[] = [
  { id: 'e1', nombre: 'FC Barcelona A',    ciudad: 'Barcelona',     escudo: 'BAR', color: '#004D98', rank: 1, matches: 12, wins: 10, rating: 9.2, division: 'Pro A',
    jugadorEstrella: { nombre: 'Marc Bellini',    posicion: 'Delantero',     numero: 10, rating: 9.4, goles: 14, avatarSeed: 11 } },
  { id: 'e2', nombre: 'Real Madrid Youth', ciudad: 'Madrid',        escudo: 'MAD', color: '#FFFFFF', rank: 2, matches: 12, wins: 9,  rating: 8.9, division: 'Pro A',
    jugadorEstrella: { nombre: 'Javier Solis',    posicion: 'Mediocampista', numero: 8,  rating: 9.1, goles: 9,  avatarSeed: 12 } },
  { id: 'e3', nombre: 'Atletico Madrid B', ciudad: 'Madrid',        escudo: 'ATM', color: '#CB3524', rank: 3, matches: 12, wins: 8,  rating: 8.6, division: 'Pro A',
    jugadorEstrella: { nombre: 'Tomas Reyes',     posicion: 'Defensa',       numero: 4,  rating: 8.7, asistencias: 6, avatarSeed: 13 } },
  { id: 'e4', nombre: 'Valencia CF',       ciudad: 'Valencia',      escudo: 'VAL', color: '#FF8C00', rank: 4, matches: 12, wins: 7,  rating: 8.3, division: 'Pro A',
    jugadorEstrella: { nombre: 'Luis Mendoza',    posicion: 'Delantero',     numero: 9,  rating: 8.5, goles: 11, avatarSeed: 14 } },
  { id: 'e5', nombre: 'Sevilla FC',        ciudad: 'Sevilla',       escudo: 'SEV', color: '#D10A11', rank: 5, matches: 12, wins: 6,  rating: 8.0, division: 'Pro B',
    jugadorEstrella: { nombre: 'Pablo Castro',    posicion: 'Portero',       numero: 1,  rating: 8.9, paradas: 56, avatarSeed: 15 } },
  { id: 'e6', nombre: 'Athletic Bilbao',   ciudad: 'Bilbao',        escudo: 'ATH', color: '#EE2523', rank: 6, matches: 12, wins: 6,  rating: 7.8, division: 'Pro B',
    jugadorEstrella: { nombre: 'Andoni Garcia',   posicion: 'Mediocampista', numero: 6,  rating: 8.2, asistencias: 8, avatarSeed: 16 } },
  { id: 'e7', nombre: 'Real Sociedad',     ciudad: 'San Sebastian', escudo: 'RSO', color: '#0067B1', rank: 7, matches: 12, wins: 5,  rating: 7.5, division: 'Pro B',
    jugadorEstrella: { nombre: 'Iker Larrazabal', posicion: 'Defensa',       numero: 3,  rating: 7.9, avatarSeed: 17 } },
  { id: 'e8', nombre: 'Villarreal CF',     ciudad: 'Villarreal',    escudo: 'VIL', color: '#FFE000', rank: 8, matches: 12, wins: 4,  rating: 7.2, division: 'Pro B',
    jugadorEstrella: { nombre: 'Hugo Marquez',    posicion: 'Delantero',     numero: 11, rating: 7.6, goles: 7,  avatarSeed: 18 } },
];

const bracketCopa: RondaBracket[] = [
  {
    nombre: 'Cuartos de Final',
    partidos: [
      { id: 'p1', jornada: 1, local: equiposCopa[0], visitante: equiposCopa[7], golesLocal: 3, golesVisitante: 1, fecha: '2026-04-05', hora: '10:00', estado: 'jugado',   fase: 'Cuartos', pitch: 'Pitch 01' },
      { id: 'p2', jornada: 1, local: equiposCopa[1], visitante: equiposCopa[6], golesLocal: 2, golesVisitante: 0, fecha: '2026-04-05', hora: '12:00', estado: 'jugado',   fase: 'Cuartos', pitch: 'Pitch 02' },
      { id: 'p3', jornada: 1, local: equiposCopa[2], visitante: equiposCopa[5], golesLocal: 1, golesVisitante: 0, fecha: '2026-04-06', hora: '10:00', estado: 'jugado',   fase: 'Cuartos', pitch: 'Pitch 03' },
      { id: 'p4', jornada: 1, local: equiposCopa[3], visitante: equiposCopa[4], golesLocal: 2, golesVisitante: 2, fecha: '2026-04-06', hora: '12:00', estado: 'jugado',   fase: 'Cuartos', pitch: 'Pitch 04' },
    ],
  },
  {
    nombre: 'Semifinales',
    partidos: [
      { id: 'p5', jornada: 2, local: equiposCopa[0], visitante: equiposCopa[3], golesLocal: 2, golesVisitante: 1, minuto: 74, fecha: '2026-05-10', hora: '11:00', estado: 'en_curso', fase: 'Semi', pitch: 'Pitch 01' },
      { id: 'p6', jornada: 2, local: equiposCopa[1], visitante: equiposCopa[2],                                                fecha: '2026-05-10', hora: '14:00', estado: 'pendiente', fase: 'Semi', pitch: 'Pitch 02' },
    ],
  },
  {
    nombre: 'Gran Final',
    partidos: [
      { id: 'p7', jornada: 3, local: equiposCopa[0], visitante: equiposCopa[1], fecha: '2026-05-24', hora: '21:00', estado: 'pendiente', fase: 'Final', pitch: 'Estadio Metropolitano' },
    ],
  },
];

// ── Equipos Liga Invierno ────────────────────────────────────────────────
const equiposLiga: Equipo[] = [
  { id: 'l1', nombre: 'Deportivo Norte', ciudad: 'Norte',  escudo: 'DEN', color: '#1E40AF', rank: 1, matches: 10, wins: 7, rating: 8.8, division: 'Pro A',
    jugadorEstrella: { nombre: 'Marcus Vane',   posicion: 'Delantero',    numero: 10, rating: 9.2, goles: 24, avatarSeed: 21 } },
  { id: 'l2', nombre: 'Atletico Sur',    ciudad: 'Sur',    escudo: 'ATS', color: '#DC2626', rank: 2, matches: 10, wins: 6, rating: 8.5, division: 'Pro A',
    jugadorEstrella: { nombre: 'Leon Hardt',    posicion: 'Mediocampista', numero: 8,  rating: 8.5, asistencias: 12, avatarSeed: 22 } },
  { id: 'l3', nombre: 'FC Central',      ciudad: 'Centro', escudo: 'FCC', color: '#16A34A', rank: 3, matches: 10, wins: 6, rating: 8.2, division: 'Pro A',
    jugadorEstrella: { nombre: 'Axel Drake',    posicion: 'Portero',      numero: 1,  rating: 8.9, paradas: 56, avatarSeed: 23 } },
  { id: 'l4', nombre: 'Union Este',      ciudad: 'Este',   escudo: 'UNE', color: '#D97706', rank: 4, matches: 10, wins: 5, rating: 7.9, division: 'Pro A',
    jugadorEstrella: { nombre: 'Kane Silva',    posicion: 'Defensa',      numero: 4,  rating: 7.8, avatarSeed: 24 } },
  { id: 'l5', nombre: 'Racing Oeste',    ciudad: 'Oeste',  escudo: 'RCO', color: '#374151', rank: 5, matches: 10, wins: 4, rating: 7.5, division: 'Pro B',
    jugadorEstrella: { nombre: 'Dario Ruiz',    posicion: 'Mediocampista', numero: 7,  rating: 7.7, asistencias: 5, avatarSeed: 25 } },
  { id: 'l6', nombre: 'Sporting CF',     ciudad: 'Capital', escudo: 'SCF', color: '#7C3AED', rank: 6, matches: 10, wins: 3, rating: 7.0, division: 'Pro B',
    jugadorEstrella: { nombre: 'Nico Vlados',   posicion: 'Delantero',    numero: 9,  rating: 7.3, goles: 6, avatarSeed: 26 } },
  { id: 'l7', nombre: 'CD Monterrey',    ciudad: 'Monte',  escudo: 'CDM', color: '#EA580C', rank: 7, matches: 10, wins: 2, rating: 6.6, division: 'Pro B',
    jugadorEstrella: { nombre: 'Sami Korte',    posicion: 'Defensa',      numero: 5,  rating: 6.8, avatarSeed: 27 } },
  { id: 'l8', nombre: 'Inter Coastal',   ciudad: 'Costa',  escudo: 'INC', color: '#64748B', rank: 8, matches: 10, wins: 1, rating: 6.3, division: 'Pro B',
    jugadorEstrella: { nombre: 'Bruno Falk',    posicion: 'Portero',      numero: 1,  rating: 6.9, paradas: 41, avatarSeed: 28 } },
];

const tablaLiga: PosicionTabla[] = [
  { equipo: equiposLiga[0], pj: 10, pg: 7, pe: 2, pp: 1, gf: 22, gc: 8,  gd: 14, pts: 23 },
  { equipo: equiposLiga[1], pj: 10, pg: 6, pe: 3, pp: 1, gf: 19, gc: 11, gd: 8,  pts: 21 },
  { equipo: equiposLiga[2], pj: 10, pg: 6, pe: 1, pp: 3, gf: 18, gc: 13, gd: 5,  pts: 19 },
  { equipo: equiposLiga[3], pj: 10, pg: 5, pe: 2, pp: 3, gf: 16, gc: 14, gd: 2,  pts: 17 },
  { equipo: equiposLiga[4], pj: 10, pg: 4, pe: 3, pp: 3, gf: 13, gc: 14, gd: -1, pts: 15 },
  { equipo: equiposLiga[5], pj: 10, pg: 3, pe: 2, pp: 5, gf: 11, gc: 17, gd: -6, pts: 11 },
  { equipo: equiposLiga[6], pj: 10, pg: 2, pe: 1, pp: 7, gf: 9,  gc: 21, gd: -12, pts: 7 },
  { equipo: equiposLiga[7], pj: 10, pg: 1, pe: 2, pp: 7, gf: 7,  gc: 17, gd: -10, pts: 5 },
];

const partidosLiga: Partido[] = [
  { id: 'l-p1', jornada: 11, local: equiposLiga[0], visitante: equiposLiga[1], fecha: '2026-05-22', hora: '11:00', estado: 'pendiente', pitch: 'Estadio Norte' },
  { id: 'l-p2', jornada: 11, local: equiposLiga[2], visitante: equiposLiga[3], fecha: '2026-05-22', hora: '13:00', estado: 'pendiente', pitch: 'Estadio Central' },
  { id: 'l-p3', jornada: 11, local: equiposLiga[4], visitante: equiposLiga[5], fecha: '2026-05-23', hora: '10:00', estado: 'pendiente', pitch: 'Campo Oeste' },
  { id: 'l-p4', jornada: 11, local: equiposLiga[6], visitante: equiposLiga[7], fecha: '2026-05-23', hora: '12:00', estado: 'pendiente', pitch: 'Pitch Monte' },
  { id: 'l-p5', jornada: 10, local: equiposLiga[1], visitante: equiposLiga[2], golesLocal: 1, golesVisitante: 1, fecha: '2026-05-11', hora: '11:00', estado: 'jugado' },
  { id: 'l-p6', jornada: 10, local: equiposLiga[0], visitante: equiposLiga[4], golesLocal: 3, golesVisitante: 0, fecha: '2026-05-11', hora: '13:00', estado: 'jugado' },
  { id: 'l-p7', jornada: 10, local: equiposLiga[3], visitante: equiposLiga[5], golesLocal: 2, golesVisitante: 1, fecha: '2026-05-12', hora: '10:00', estado: 'jugado' },
  { id: 'l-p8', jornada: 10, local: equiposLiga[6], visitante: equiposLiga[7], golesLocal: 0, golesVisitante: 2, fecha: '2026-05-12', hora: '12:00', estado: 'jugado' },
];

// ── Equipos Torneo Clausura Sub-15 ───────────────────────────────────────
const equiposClausura: Equipo[] = [
  { id: 'c1', nombre: 'Juvenil A',     ciudad: 'Norte', escudo: 'JUV', color: '#2563EB', rank: 1, division: 'Cadete' },
  { id: 'c2', nombre: 'Promesas FC',   ciudad: 'Sur',   escudo: 'PRO', color: '#7C3AED', rank: 2, division: 'Cadete' },
  { id: 'c3', nombre: 'Cantera 15',    ciudad: 'Este',  escudo: 'C15', color: '#EA580C', rank: 3, division: 'Cadete' },
  { id: 'c4', nombre: 'Sub-15 CF',     ciudad: 'Oeste', escudo: 'S15', color: '#059669', rank: 4, division: 'Cadete' },
  { id: 'c5', nombre: 'FC Jovenes',    ciudad: 'Centro', escudo: 'JOV', color: '#D97706', rank: 5, division: 'Cadete' },
  { id: 'c6', nombre: 'Academia B',    ciudad: 'Costa', escudo: 'ACA', color: '#DC2626', rank: 6, division: 'Cadete' },
  { id: 'c7', nombre: 'Talento SC',    ciudad: 'Valle', escudo: 'TAL', color: '#0891B2', rank: 7, division: 'Cadete' },
  { id: 'c8', nombre: 'Elite 15',      ciudad: 'Monte', escudo: 'EL5', color: '#4B5563', rank: 8, division: 'Cadete' },
];

// ── Copa Primavera 2025 (finalizado) ─────────────────────────────────────
const equiposPrimavera: Equipo[] = [
  { id: 'pr1', nombre: 'Campeones FC',  ciudad: 'Norte', escudo: 'CMP', color: '#D97706', rank: 1, rating: 9.4 },
  { id: 'pr2', nombre: 'Finalistas SC', ciudad: 'Sur',   escudo: 'FIN', color: '#6B7280', rank: 2, rating: 8.9 },
  { id: 'pr3', nombre: 'Semifinal A',   ciudad: 'Este',  escudo: 'SF1', color: '#2563EB', rank: 3, rating: 8.5 },
  { id: 'pr4', nombre: 'Semifinal B',   ciudad: 'Oeste', escudo: 'SF2', color: '#DC2626', rank: 4, rating: 8.3 },
  { id: 'pr5', nombre: 'Cuartos CF',    ciudad: 'Centro', escudo: 'QF1', color: '#16A34A', rank: 5, rating: 7.8 },
  { id: 'pr6', nombre: 'Racing QF',     ciudad: 'Costa', escudo: 'QF2', color: '#CA8A04', rank: 6, rating: 7.6 },
  { id: 'pr7', nombre: 'Sporting QF',   ciudad: 'Valle', escudo: 'QF3', color: '#7C3AED', rank: 7, rating: 7.3 },
  { id: 'pr8', nombre: 'Atletico QF',   ciudad: 'Monte', escudo: 'QF4', color: '#EA580C', rank: 8, rating: 7.1 },
];

// ── Torneos ──────────────────────────────────────────────────────────────
export const torneos: Torneo[] = [
  {
    id: 't1',
    nombre: 'Copa Futuro Sub-17',
    categoria: 'Sub-17',
    formato: 'eliminacion',
    status: 'activo',
    fechaInicio: '2026-04-05',
    fechaFin: '2026-05-24',
    equipos: equiposCopa,
    partidos: bracketCopa.flatMap(r => r.partidos),
    bracket: bracketCopa,
    descripcion: 'El torneo de futbol base mas prestigioso de la temporada. Seguimiento en vivo para scouting profesional con corteccion PHV.',
    totalEquipos: 8,
    logo: 'CF',
    heroImage: HERO_STADIUM_NIGHT,
    tags: ['Elite Canteras', 'U17', 'Eliminacion Directa'],
    sede: 'Estadio Metropolitano · Costa Brava',
    premio: '$25,000 USD',
    inscritos: 8,
    jornadaActual: 2,
    topScorer: { nombre: 'Marc Bellini',  goles: 14, avatarSeed: 11 },
    cleanSheets: { equipo: 'FC Barcelona A', cantidad: 8 },
    redCards: 2,
    completion: 65,
  },
  {
    id: 't2',
    nombre: 'Liga Invierno 2026',
    categoria: 'Sub-19',
    formato: 'liga',
    status: 'activo',
    fechaInicio: '2026-02-15',
    fechaFin: '2026-06-20',
    equipos: equiposLiga,
    partidos: partidosLiga,
    tabla: tablaLiga,
    descripcion: 'Liga round-robin de 10 jornadas para la categoria Sub-19. El lider asciende a la division superior y desbloquea cupo en la Copa Continental.',
    totalEquipos: 8,
    logo: 'LI',
    heroImage: HERO_STADIUM_AERIAL,
    tags: ['Liga Regular', 'U19', 'Round-Robin'],
    sede: 'Multisede · 8 ciudades',
    premio: '$15,000 USD',
    inscritos: 8,
    jornadaActual: 10,
    topScorer: { nombre: 'Marcus Vane', goles: 24, avatarSeed: 21 },
    cleanSheets: { equipo: 'Deportivo Norte', cantidad: 5 },
    redCards: 7,
    completion: 80,
  },
  {
    id: 't3',
    nombre: 'Torneo Clausura Sub-15',
    categoria: 'Sub-15',
    formato: 'eliminacion',
    status: 'proximo',
    fechaInicio: '2026-06-01',
    fechaFin: '2026-07-15',
    equipos: equiposClausura,
    partidos: [],
    descripcion: 'Proximo torneo de eliminacion directa para la categoria Sub-15. Inscripciones abiertas hasta el 25 de mayo. Plazas limitadas a 8 academias.',
    totalEquipos: 8,
    logo: 'TC',
    heroImage: HERO_YOUTH_TRAINING,
    tags: ['Fútbol Base', 'U15', 'Inscripciones'],
    sede: 'Ciudad Deportiva · Costa Norte',
    premio: '$8,000 USD',
    inscritos: 6,
    completion: 0,
  },
  {
    id: 't4',
    nombre: 'Copa Primavera 2025',
    categoria: 'Sub-17',
    formato: 'eliminacion',
    status: 'finalizado',
    fechaInicio: '2025-03-10',
    fechaFin: '2025-04-28',
    equipos: equiposPrimavera,
    partidos: [],
    campeon: equiposPrimavera[0],
    descripcion: 'Copa de primavera finalizada. Campeones FC se corono campeon tras una emocionante final 3-2 en el Estadio Metropolitano.',
    totalEquipos: 8,
    logo: 'CP',
    heroImage: HERO_FIELD_LIGHTS,
    trophyImage: HERO_TROPHY_GOLD,
    tags: ['Historico', 'U17', 'Final 3-2'],
    sede: 'Estadio Metropolitano',
    premio: '$20,000 USD',
    completion: 100,
  },
];

export const getTorneoById = (id: string) => torneos.find(t => t.id === id);

export const getPartidosRecientes = () =>
  torneos.flatMap(t => t.partidos.filter(p => p.estado === 'jugado')).slice(0, 6);

export const getPartidosProximos = () =>
  torneos.flatMap(t => t.partidos.filter(p => p.estado === 'pendiente')).slice(0, 4);

export const getPartidosLive = () =>
  torneos.flatMap(t => t.partidos.filter(p => p.estado === 'en_curso')).slice(0, 4);

export const statsGlobales = {
  torneosActivos: torneos.filter(t => t.status === 'activo').length,
  totalEquipos: torneos.reduce((acc, t) => acc + t.totalEquipos, 0),
  partidosJugados: torneos.flatMap(t => t.partidos).filter(p => p.estado === 'jugado').length,
  golesMarcados: torneos
    .flatMap(t => t.partidos)
    .filter(p => p.estado === 'jugado')
    .reduce((acc, p) => acc + (p.golesLocal ?? 0) + (p.golesVisitante ?? 0), 0),
  jugadoresU18: 842,
  informes: 1205,
  scoutsActivos: 12,
  premiosTotales: '$68,000',
};

export const scoutingFeed = [
  { tone: 'green',  title: 'Jugador Revelacion U15', desc: 'Lukas Meyer (Bayer Ac.) destaca en fase zonal.', when: 'Hace 45 min', avatarSeed: 31 },
  { tone: 'blue',   title: 'Metrica de Rendimiento', desc: 'Actualizacion de Heatmaps: Villarreal U18.',     when: 'Hace 3 horas', avatarSeed: 32 },
  { tone: 'gold',   title: 'MVP de la semana',       desc: 'Marc Bellini (Barca A) seleccionado.',          when: 'Hace 5 horas', avatarSeed: 11 },
  { tone: 'red',    title: 'Informe Medico Acad.',   desc: 'Baja por sobrecarga: Pivot Cantera A.',         when: 'Ayer',         avatarSeed: 33 },
];
