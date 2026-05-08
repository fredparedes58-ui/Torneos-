export type TorneoStatus = 'activo' | 'proximo' | 'finalizado';
export type TorneoFormato = 'eliminacion' | 'liga' | 'grupos';

export interface Equipo {
  id: string;
  nombre: string;
  ciudad: string;
  escudo: string; // emoji
  color: string;
  grupo?: string;
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
}

export interface PosicionTabla {
  equipo: Equipo;
  pj: number;
  pg: number;
  pe: number;
  pp: number;
  gf: number;
  gc: number;
  gd: number;
  pts: number;
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
  logo: string; // emoji
}

