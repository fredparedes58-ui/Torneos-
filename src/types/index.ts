export type TorneoStatus = 'activo' | 'proximo' | 'finalizado';
export type TorneoFormato = 'eliminacion' | 'liga' | 'grupos';
export type Disciplina = 'futbol-11' | 'futbol-7' | 'futbol-sala' | 'infantil' | 'veteranos';
export type Estacion = 'primavera' | 'verano' | 'otono' | 'invierno';
export type NivelTorneo = 'amateur' | 'semi-pro' | 'pro' | 'elite' | 'internacional';
export type TipoOrganizador = 'cantera' | 'privado' | 'ayuntamiento' | 'federacion';

export interface OrganizerInfo {
  nombre: string;
  tipo: TipoOrganizador;
  logo: string;     // monogram
  color: string;
  web?: string;
}

export interface DiaSchedule {
  dia: string;     // ISO date
  diaSemana: string;
  horaInicio: string;
  horaFin: string;
  partidos: number;
  fase: string;
}

export interface JugadorEstrella {
  nombre: string;
  posicion: string;
  numero: number;
  rating: number;
  goles?: number;
  asistencias?: number;
  paradas?: number;
  avatarSeed: number;
}

export interface Equipo {
  id: string;
  nombre: string;
  ciudad: string;
  escudo: string;
  color: string;
  grupo?: string;
  rank?: number;
  matches?: number;
  wins?: number;
  rating?: number;
  jugadorEstrella?: JugadorEstrella;
  division?: string;
}

export interface Partido {
  id: string;
  jornada: number;
  local: Equipo;
  visitante: Equipo;
  golesLocal?: number;
  golesVisitante?: number;
  fecha: string;
  hora: string;
  estado: 'jugado' | 'en_curso' | 'pendiente';
  fase?: string;
  pitch?: string;
  minuto?: number;
}

export interface PosicionTabla {
  equipo: Equipo;
  pj: number; pg: number; pe: number; pp: number;
  gf: number; gc: number; gd: number; pts: number;
}

export interface RondaBracket {
  nombre: string;
  partidos: Partido[];
}

export interface Torneo {
  id: string;
  nombre: string;
  categoria: string;
  formato: TorneoFormato;
  status: TorneoStatus;
  fechaInicio: string;
  fechaFin: string;
  equipos: Equipo[];
  partidos: Partido[];
  tabla?: PosicionTabla[];
  bracket?: RondaBracket[];
  campeon?: Equipo;
  descripcion: string;
  totalEquipos: number;
  logo: string;
  heroImage?: string;
  trophyImage?: string;
  tags?: string[];
  sede?: string;
  premio?: string;
  inscritos?: number;
  jornadaActual?: number;
  topScorer?: { nombre: string; goles: number; avatarSeed: number };
  cleanSheets?: { equipo: string; cantidad: number };
  redCards?: number;
  completion?: number;

  // ─── Nuevos campos: localizacion + organizacion + economia ───
  region: string;
  provincia: string;
  ciudad: string;
  pueblo?: string;
  pais: string;
  estacion: Estacion;
  mes: number;             // 1-12
  organizador: OrganizerInfo;
  precio: number;          // EUR (0 = invitacion)
  nivel: NivelTorneo;
  schedule?: DiaSchedule[];
  cityImage?: string;
  disciplina?: Disciplina;
  yearsRunning?: number;
}
