import type { Torneo, Equipo, Partido, PosicionTabla, RondaBracket } from '../types';

// â”€â”€â”€ Equipos Copa Sub-17 â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const equiposCopa: Equipo[] = [
  { id: 'e1', nombre: 'FC Barcelona A',    ciudad: 'Barcelona',   escudo: 'ðŸ”µðŸ”´', color: '#004D98' },
  { id: 'e2', nombre: 'Real Madrid Youth', ciudad: 'Madrid',      escudo: 'âšª',    color: '#FFFFFF' },
  { id: 'e3', nombre: 'AtlÃ©tico Madrid B', ciudad: 'Madrid',      escudo: 'ðŸ”´âšª',  color: '#CB3524' },
  { id: 'e4', nombre: 'Valencia CF',       ciudad: 'Valencia',    escudo: 'ðŸ¦‡',    color: '#FF8C00' },
  { id: 'e5', nombre: 'Sevilla FC',        ciudad: 'Sevilla',     escudo: 'âšªðŸ”´',  color: '#D10A11' },
  { id: 'e6', nombre: 'Athletic Bilbao',   ciudad: 'Bilbao',      escudo: 'ðŸ¦',    color: '#EE2523' },
  { id: 'e7', nombre: 'Real Sociedad',     ciudad: 'San SebastiÃ¡n', escudo: 'ðŸ”µâšª', color: '#0067B1' },
  { id: 'e8', nombre: 'Villarreal CF',     ciudad: 'Villarreal',  escudo: 'ðŸŸ¡',    color: '#FFE000' },
];

const bracketCopa: RondaBracket[] = [
  {
    nombre: 'Cuartos de Final',
    partidos: [
      { id: 'p1', jornada: 1, local: equiposCopa[0], visitante: equiposCopa[7], golesLocal: 3, golesVisitante: 1, fecha: '2026-04-05', hora: '10:00', estado: 'jugado', fase: 'Cuartos' },
      { id: 'p2', jornada: 1, local: equiposCopa[1], visitante: equiposCopa[6], golesLocal: 2, golesVisitante: 0, fecha: '2026-04-05', hora: '12:00', estado: 'jugado', fase: 'Cuartos' },
      { id: 'p3', jornada: 1, local: equiposCopa[2], visitante: equiposCopa[5], golesLocal: 1, golesVisitante: 0, fecha: '2026-04-06', hora: '10:00', estado: 'jugado', fase: 'Cuartos' },
      { id: 'p4', jornada: 1, local: equiposCopa[3], visitante: equiposCopa[4], golesLocal: 2, golesVisitante: 2, fecha: '2026-04-06', hora: '12:00', estado: 'jugado', fase: 'Cuartos', },
    ],
  },
  {
    nombre: 'Semifinales',
    partidos: [
      { id: 'p5', jornada: 2, local: equiposCopa[0], visitante: equiposCopa[3], fecha: '2026-05-10', hora: '11:00', estado: 'pendiente', fase: 'Semi' },
      { id: 'p6', jornada: 2, local: equiposCopa[1], visitante: equiposCopa[2], fecha: '2026-05-10', hora: '14:00', estado: 'pendiente', fase: 'Semi' },
    ],
  },
  {
    nombre: 'Final',
    partidos: [
      { id: 'p7', jornada: 3, local: equiposCopa[0], visitante: equiposCopa[1], fecha: '2026-05-24', hora: '16:00', estado: 'pendiente', fase: 'Final' },
    ],
  },
];

// â”€â”€â”€ Equipos Liga Invierno â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const equiposLiga: Equipo[] = [
  { id: 'l1', nombre: 'Deportivo Norte',   ciudad: 'Norte',    escudo: 'ðŸ”µ', color: '#1E40AF' },
  { id: 'l2', nombre: 'AtlÃ©tico Sur',      ciudad: 'Sur',      escudo: 'ðŸ”´', color: '#DC2626' },
  { id: 'l3', nombre: 'FC Central',        ciudad: 'Central',  escudo: 'ðŸŸ¢', color: '#16A34A' },
  { id: 'l4', nombre: 'UniÃ³n Este',        ciudad: 'Este',     escudo: 'ðŸŸ¡', color: '#D97706' },
  { id: 'l5', nombre: 'Racing Oeste',      ciudad: 'Oeste',    escudo: 'âš«', color: '#374151' },
  { id: 'l6', nombre: 'Sporting CF',       ciudad: 'Capital',  escudo: 'ðŸŸ£', color: '#7C3AED' },
  { id: 'l7', nombre: 'CD Monterrey',      ciudad: 'Monte',    escudo: 'ðŸŸ ', color: '#EA580C' },
  { id: 'l8', nombre: 'Inter Coastal',     ciudad: 'Costa',    escudo: 'âšª', color: '#64748B' },
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
  { id: 'l-p1', jornada: 11, local: equiposLiga[0], visitante: equiposLiga[1], fecha: '2026-05-10', hora: '11:00', estado: 'pendiente' },
  { id: 'l-p2', jornada: 11, local: equiposLiga[2], visitante: equiposLiga[3], fecha: '2026-05-10', hora: '13:00', estado: 'pendiente' },
  { id: 'l-p3', jornada: 11, local: equiposLiga[4], visitante: equiposLiga[5], fecha: '2026-05-11', hora: '10:00', estado: 'pendiente' },
  { id: 'l-p4', jornada: 11, local: equiposLiga[6], visitante: equiposLiga[7], fecha: '2026-05-11', hora: '12:00', estado: 'pendiente' },
  { id: 'l-p5', jornada: 10, local: equiposLiga[1], visitante: equiposLiga[2], golesLocal: 1, golesVisitante: 1, fecha: '2026-04-26', hora: '11:00', estado: 'jugado' },
  { id: 'l-p6', jornada: 10, local: equiposLiga[0], visitante: equiposLiga[4], golesLocal: 3, golesVisitante: 0, fecha: '2026-04-26', hora: '13:00', estado: 'jugado' },
  { id: 'l-p7', jornada: 10, local: equiposLiga[3], visitante: equiposLiga[5], golesLocal: 2, golesVisitante: 1, fecha: '2026-04-27', hora: '10:00', estado: 'jugado' },
  { id: 'l-p8', jornada: 10, local: equiposLiga[6], visitante: equiposLiga[7], golesLocal: 0, golesVisitante: 2, fecha: '2026-04-27', hora: '12:00', estado: 'jugado' },
];

// â”€â”€â”€ Equipos Torneo Clausura Sub-15 â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const equiposClausura: Equipo[] = [
  { id: 'c1', nombre: 'Juvenil A',   ciudad: 'Norte', escudo: 'â­', color: '#2563EB' },
  { id: 'c2', nombre: 'Promesas FC', ciudad: 'Sur',   escudo: 'ðŸŒŸ', color: '#7C3AED' },
  { id: 'c3', nombre: 'Cantera 15',  ciudad: 'Este',  escudo: 'ðŸ”¥', color: '#EA580C' },
  { id: 'c4', nombre: 'Sub-15 CF',   ciudad: 'Oeste', escudo: 'ðŸ’«', color: '#059669' },
  { id: 'c5', nombre: 'FC JÃ³venes',  ciudad: 'Cen',   escudo: 'ðŸ†', color: '#D97706' },
  { id: 'c6', nombre: 'Academia B',  ciudad: 'Costa', escudo: 'âš¡', color: '#DC2626' },
  { id: 'c7', nombre: 'Talento SC',  ciudad: 'Valle', escudo: 'ðŸŽ¯', color: '#0891B2' },
  { id: 'c8', nombre: 'Elite 15',    ciudad: 'Monte', escudo: 'ðŸ›¡ï¸', color: '#4B5563' },
];

// â”€â”€â”€ Equipos Copa Primavera (finalizado) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const equiposPrimavera: Equipo[] = [
  { id: 'pr1', nombre: 'Campeones FC',    ciudad: 'Norte', escudo: 'ðŸ†', color: '#D97706' },
  { id: 'pr2', nombre: 'Finalistas SC',   ciudad: 'Sur',   escudo: 'ðŸ¥ˆ', color: '#6B7280' },
  { id: 'pr3', nombre: 'Semifinal A',     ciudad: 'Este',  escudo: 'ðŸ”µ', color: '#2563EB' },
  { id: 'pr4', nombre: 'Semifinal B',     ciudad: 'Oeste', escudo: 'ðŸ”´', color: '#DC2626' },
  { id: 'pr5', nombre: 'Cuartos CF',      ciudad: 'Cen',   escudo: 'ðŸŸ¢', color: '#16A34A' },
  { id: 'pr6', nombre: 'Racing QF',       ciudad: 'Costa', escudo: 'ðŸŸ¡', color: '#CA8A04' },
  { id: 'pr7', nombre: 'Sporting QF',     ciudad: 'Valle', escudo: 'ðŸŸ£', color: '#7C3AED' },
  { id: 'pr8', nombre: 'AtlÃ©tico QF',     ciudad: 'Monte', escudo: 'ðŸŸ ', color: '#EA580C' },
];

// â”€â”€â”€ Torneos â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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
    descripcion: 'Torneo de eliminaciÃ³n directa para la categorÃ­a Sub-17. Participan los 8 mejores equipos de la academia.',
    totalEquipos: 8,
    logo: 'ðŸ†',
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
    descripcion: 'Liga round-robin de 10 jornadas para la categorÃ­a Sub-19. El lÃ­der asciende a la divisiÃ³n superior.',
    totalEquipos: 8,
    logo: 'âš½',
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
    descripcion: 'PrÃ³ximo torneo de eliminaciÃ³n directa para la categorÃ­a Sub-15. Inscripciones abiertas hasta el 25 de mayo.',
    totalEquipos: 8,
    logo: 'ðŸŽ¯',
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
    descripcion: 'Copa de primavera finalizada. Campeones FC se coronÃ³ campeÃ³n tras una emocionante final.',
    totalEquipos: 8,
    logo: 'ðŸŒ¸',
  },
];

export const getTorneoById = (id: string) => torneos.find(t => t.id === id);

export const getPartidosRecientes = () =>
  torneos
    .flatMap(t => t.partidos.filter(p => p.estado === 'jugado'))
    .slice(0, 6);

export const getPartidosProximos = () =>
  torneos
    .flatMap(t => t.partidos.filter(p => p.estado === 'pendiente'))
    .slice(0, 4);

export const statsGlobales = {
  torneosActivos: torneos.filter(t => t.status === 'activo').length,
  totalEquipos: torneos.reduce((acc, t) => acc + t.totalEquipos, 0),
  partidosJugados: torneos.flatMap(t => t.partidos).filter(p => p.estado === 'jugado').length,
  golesMarcados: torneos
    .flatMap(t => t.partidos)
    .filter(p => p.estado === 'jugado')
    .reduce((acc, p) => acc + (p.golesLocal ?? 0) + (p.golesVisitante ?? 0), 0),
};

