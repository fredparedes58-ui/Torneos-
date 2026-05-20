import type { Torneo, Equipo, RondaBracket, OrganizerInfo, DiaSchedule } from '../types';

// ━━━━━━━ Unsplash hyperrealistic photo pool (stable IDs) ━━━━━━━
const IMG = {
  // Stadiums night / aerial
  stadiumNight:    'https://images.unsplash.com/photo-1518604666860-9ed391f76460?w=1400&q=80&auto=format&fit=crop',
  stadiumLights:   'https://images.unsplash.com/photo-1577223625816-7546f13df25d?w=1400&q=80&auto=format&fit=crop',
  stadiumAerial:   'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=1400&q=80&auto=format&fit=crop',
  fieldClose:      'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1400&q=80&auto=format&fit=crop',
  pitchSunset:     'https://images.unsplash.com/photo-1551958219-acbc608c6377?w=1400&q=80&auto=format&fit=crop',
  // Spanish cities
  costaBrava:      'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=1400&q=80&auto=format&fit=crop',
  donosti:         'https://images.unsplash.com/photo-1561553543-e4c7b608b98d?w=1400&q=80&auto=format&fit=crop',
  madrid:          'https://images.unsplash.com/photo-1543783207-ec64e4d95325?w=1400&q=80&auto=format&fit=crop',
  valencia:        'https://images.unsplash.com/photo-1599282080213-7d6708a64b97?w=1400&q=80&auto=format&fit=crop',
  sevilla:         'https://images.unsplash.com/photo-1559113202-c916b8e44373?w=1400&q=80&auto=format&fit=crop',
  bilbao:          'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=1400&q=80&auto=format&fit=crop',
  mallorca:        'https://images.unsplash.com/photo-1571417080323-d05a02f5e7e7?w=1400&q=80&auto=format&fit=crop',
  benidorm:        'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1400&q=80&auto=format&fit=crop',
  marbella:        'https://images.unsplash.com/photo-1602002418816-5c0aeef426aa?w=1400&q=80&auto=format&fit=crop',
  cantabria:       'https://images.unsplash.com/photo-1556803834-d7f6bc2afa30?w=1400&q=80&auto=format&fit=crop',
  asturias:        'https://images.unsplash.com/photo-1551522435-a13afa10f103?w=1400&q=80&auto=format&fit=crop',
  villarreal:      'https://images.unsplash.com/photo-1556056504-5c7696c4c28d?w=1400&q=80&auto=format&fit=crop',
  salou:           'https://images.unsplash.com/photo-1530333313-69cfee1c12d8?w=1400&q=80&auto=format&fit=crop',
  alcudia:         'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1400&q=80&auto=format&fit=crop',
  miranda:         'https://images.unsplash.com/photo-1571687949921-1306bfb24b72?w=1400&q=80&auto=format&fit=crop',
  cadiz:           'https://images.unsplash.com/photo-1583004849148-87a0e90e7c8f?w=1400&q=80&auto=format&fit=crop',
};

// ━━━━━━━ Organizadores reales ━━━━━━━
const ORG = {
  micFootball: {
    nombre: 'MIC Football SL', tipo: 'privado', logo: 'MIC', color: '#0F75BC',
    web: 'micfootball.com',
  } as OrganizerInfo,
  donosti: {
    nombre: 'Donosti Cup',     tipo: 'privado', logo: 'DSK', color: '#005CA8',
    web: 'donosticup.com',
  } as OrganizerInfo,
  villarrealCF: {
    nombre: 'Villarreal CF Cantera', tipo: 'cantera', logo: 'VCF', color: '#FFE000',
    web: 'villarrealcf.es',
  } as OrganizerInfo,
  laliga: {
    nombre: 'LaLiga',          tipo: 'federacion', logo: 'LL', color: '#D80027',
    web: 'laliga.com',
  } as OrganizerInfo,
  costaDaurada: {
    nombre: 'Costa Daurada Cup', tipo: 'privado', logo: 'CDC', color: '#E5B826',
  } as OrganizerInfo,
  madridYouth: {
    nombre: 'Madrid Youth Cup',  tipo: 'privado', logo: 'MYC', color: '#6CACE4',
    web: 'madridyouthcup.com',
  } as OrganizerInfo,
  alcudiaAjto: {
    nombre: 'Ajuntament L\'Alcudia', tipo: 'ayuntamiento', logo: 'COT', color: '#FF8200',
    web: 'cotif.es',
  } as OrganizerInfo,
  costaBlancaPrivado: {
    nombre: 'Costa Blanca Tournaments', tipo: 'privado', logo: 'CBC', color: '#00A859',
    web: 'costablancacup.com',
  } as OrganizerInfo,
  iberCup: {
    nombre: 'IberCup',         tipo: 'privado', logo: 'IBC', color: '#1E4A8C',
    web: 'ibercup.com',
  } as OrganizerInfo,
  valenciaCF: {
    nombre: 'Valencia CF Academy', tipo: 'cantera', logo: 'VCF', color: '#FF8C00',
    web: 'valenciacf.com',
  } as OrganizerInfo,
  avilesAjto: {
    nombre: 'Ayto. de Aviles',  tipo: 'ayuntamiento', logo: 'AVL', color: '#003DA5',
  } as OrganizerInfo,
  cantabriaSports: {
    nombre: 'Cantabria Sports', tipo: 'privado', logo: 'CTC', color: '#C8102E',
    web: 'cantabriacup.com',
  } as OrganizerInfo,
  athleticBilbao: {
    nombre: 'Athletic Club Cantera', tipo: 'cantera', logo: 'ATH', color: '#EE2523',
    web: 'athletic-club.eus',
  } as OrganizerInfo,
  marivent: {
    nombre: 'Marivent Sports', tipo: 'privado', logo: 'MAR', color: '#0095DA',
  } as OrganizerInfo,
  mirandaAjto: {
    nombre: 'Ayto. Miranda de Ebro', tipo: 'ayuntamiento', logo: 'MDE', color: '#6FBE44',
  } as OrganizerInfo,
  marbellaCup: {
    nombre: 'Marbella Football Cup', tipo: 'privado', logo: 'MBC', color: '#FFD700',
    web: 'marbellafootballcup.com',
  } as OrganizerInfo,
};

// ━━━━━━━ Helper: generar schedule de 3 dias para un torneo ━━━━━━━
function makeSchedule(startDate: string, days: number, phases: string[]): DiaSchedule[] {
  const out: DiaSchedule[] = [];
  const d0 = new Date(startDate);
  const semanas = ['Domingo','Lunes','Martes','Miercoles','Jueves','Viernes','Sabado'];
  for (let i = 0; i < days; i++) {
    const d = new Date(d0);
    d.setDate(d0.getDate() + i);
    const iso = d.toISOString().slice(0, 10);
    out.push({
      dia: iso,
      diaSemana: semanas[d.getDay()],
      horaInicio: i === days - 1 ? '17:00' : '09:30',
      horaFin:    i === days - 1 ? '20:30' : '20:00',
      partidos:   i === days - 1 ? 1 : 8 - Math.min(i, 4),
      fase:       phases[Math.min(i, phases.length - 1)],
    });
  }
  return out;
}

// ━━━━━━━ Equipos base reutilizables ━━━━━━━
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

const equiposGenericos = (prefix: string): Equipo[] =>
  Array.from({ length: 8 }).map((_, i) => ({
    id: `${prefix}-${i+1}`,
    nombre: `${['Aguilas','Tigres','Lobos','Halcones','Toros','Leones','Hidras','Cuervos'][i]} ${prefix}`,
    ciudad: ['Norte','Sur','Este','Oeste','Centro','Costa','Valle','Monte'][i],
    escudo: ['AGL','TGR','LOB','HAL','TOR','LEO','HID','CUE'][i],
    color: ['#1E40AF','#DC2626','#16A34A','#D97706','#374151','#7C3AED','#EA580C','#64748B'][i],
    rank: i + 1, division: 'Cadete',
  }));

// ━━━━━━━ TORNEOS REALES DE ESPAÑA (16) ━━━━━━━
export const torneos: Torneo[] = [
  // 1. MIC Football — Costa Brava, Catalunya — Semana Santa
  {
    id: 'mic',
    nombre: 'MIC Football 2026',
    categoria: 'U12 - U19',
    formato: 'grupos',
    status: 'activo',
    fechaInicio: '2026-04-01', fechaFin: '2026-04-05',
    equipos: equiposCopa, partidos: bracketCopa.flatMap(r => r.partidos),
    bracket: bracketCopa,
    descripcion: 'El torneo de futbol base mas prestigioso del mundo. Mas de 380 equipos de 60 paises se reunen en la Costa Brava para 5 dias de competicion y scouting profesional.',
    totalEquipos: 380, logo: 'MIC',
    heroImage: IMG.costaBrava, cityImage: IMG.costaBrava,
    tags: ['Elite Internacional', 'Scouting Live', 'Semana Santa'],
    sede: 'Costa Brava · Girona', premio: '40,000 EUR + Beca cantera',
    inscritos: 380, jornadaActual: 3,
    topScorer: { nombre: 'Marc Bellini',  goles: 14, avatarSeed: 11 },
    cleanSheets: { equipo: 'Real Madrid Youth', cantidad: 4 },
    redCards: 2, completion: 65,
    region: 'Catalunya', provincia: 'Girona', ciudad: 'Palamos', pueblo: 'Palamos / Calonge',
    pais: 'Espana', estacion: 'primavera', mes: 4,
    organizador: ORG.micFootball, precio: 600, nivel: 'internacional',
    disciplina: 'futbol-11', yearsRunning: 25,
    schedule: makeSchedule('2026-04-01', 5, ['Llegada / Sorteo', 'Fase Grupos', 'Fase Grupos', 'Cuartos / Semis', 'Final']),
  },

  // 2. Donosti Cup — San Sebastian — Julio
  {
    id: 'donosti',
    nombre: 'Donosti Cup XXXIII',
    categoria: 'Cadete - Juvenil',
    formato: 'grupos',
    status: 'proximo',
    fechaInicio: '2026-07-04', fechaFin: '2026-07-10',
    equipos: equiposGenericos('DC'), partidos: [],
    descripcion: 'Celebrando el futbol formativo con mas de 600 equipos. Una semana de scouting, paneles de resultados y estadisticas por jugador en la capital donostiarra.',
    totalEquipos: 600, logo: 'DSK',
    heroImage: IMG.donosti, cityImage: IMG.donosti,
    tags: ['Internacional', '600+ equipos', 'Estadio Anoeta'],
    sede: 'San Sebastian · Donostia', premio: '30,000 EUR',
    inscritos: 540, completion: 0,
    region: 'Pais Vasco', provincia: 'Gipuzkoa', ciudad: 'San Sebastian',
    pais: 'Espana', estacion: 'verano', mes: 7,
    organizador: ORG.donosti, precio: 450, nivel: 'internacional',
    disciplina: 'futbol-11', yearsRunning: 33,
    schedule: makeSchedule('2026-07-04', 7, ['Recepcion', 'Grupos', 'Grupos', 'Octavos', 'Cuartos', 'Semis', 'Final']),
  },

  // 3. Villarreal Yellow Cup — Villarreal — Abril
  {
    id: 'yellow',
    nombre: 'Villarreal Yellow Cup',
    categoria: 'Alevin - Cadete',
    formato: 'grupos',
    status: 'proximo',
    fechaInicio: '2026-04-10', fechaFin: '2026-04-13',
    equipos: equiposGenericos('VY'), partidos: [],
    descripcion: 'Competicion de alto nivel en las instalaciones de la Ciudad Deportiva Jose Manuel Llaneza. Organizada por la cantera amarilla.',
    totalEquipos: 64, logo: 'VYC',
    heroImage: IMG.villarreal, cityImage: IMG.villarreal,
    tags: ['Premium', 'Elite Academies', 'Cantera Grogueta'],
    sede: 'Estadio de la Ceramica · Villarreal', premio: '15,000 EUR + trial',
    inscritos: 64, completion: 0,
    region: 'Comunidad Valenciana', provincia: 'Castellon', ciudad: 'Villarreal',
    pais: 'Espana', estacion: 'primavera', mes: 4,
    organizador: ORG.villarrealCF, precio: 350, nivel: 'elite',
    disciplina: 'futbol-11', yearsRunning: 12,
    schedule: makeSchedule('2026-04-10', 4, ['Llegada', 'Grupos', 'Cuartos / Semis', 'Final']),
  },

  // 4. LaLiga Promises Santander — Madrid — Junio
  {
    id: 'promises',
    nombre: 'LaLiga Promises Santander',
    categoria: 'Alevin U12',
    formato: 'grupos',
    status: 'finalizado',
    fechaInicio: '2025-06-20', fechaFin: '2025-06-22',
    equipos: equiposCopa, partidos: [],
    campeon: equiposCopa[0],
    descripcion: 'El escaparate de las futuras estrellas de nuestra liga. Reporte tecnico disponible para todos los clubes participantes.',
    totalEquipos: 16, logo: 'LLP',
    heroImage: IMG.madrid, cityImage: IMG.madrid,
    tags: ['Federacion', 'Alevin', 'Futbol 7'],
    sede: 'Ciudad del Futbol · Las Rozas', premio: 'Invitacion + viaje',
    inscritos: 16, completion: 100,
    region: 'Comunidad de Madrid', provincia: 'Madrid', ciudad: 'Las Rozas',
    pais: 'Espana', estacion: 'verano', mes: 6,
    organizador: ORG.laliga, precio: 0, nivel: 'elite',
    disciplina: 'futbol-7', yearsRunning: 15,
  },

  // 5. Costa Daurada Cup — Salou — Abril
  {
    id: 'cdc',
    nombre: 'Costa Daurada Cup',
    categoria: 'Benjamin - Juvenil',
    formato: 'grupos',
    status: 'proximo',
    fechaInicio: '2026-04-04', fechaFin: '2026-04-08',
    equipos: equiposGenericos('CD'), partidos: [],
    descripcion: 'Torneo internacional en la Costa Daurada con sedes en Salou, Cambrils y La Pineda. Mas de 200 equipos compiten cada Semana Santa.',
    totalEquipos: 240, logo: 'CDC',
    heroImage: IMG.salou, cityImage: IMG.salou,
    tags: ['Costa Daurada', 'Semana Santa', '200+ equipos'],
    sede: 'Salou · Tarragona', premio: '12,000 EUR',
    inscritos: 240,
    region: 'Catalunya', provincia: 'Tarragona', ciudad: 'Salou',
    pais: 'Espana', estacion: 'primavera', mes: 4,
    organizador: ORG.costaDaurada, precio: 400, nivel: 'pro',
    disciplina: 'futbol-11', yearsRunning: 18,
  },

  // 6. Madrid Youth Cup — Madrid — Julio
  {
    id: 'myc',
    nombre: 'Madrid Youth Cup',
    categoria: 'U13 - U19',
    formato: 'grupos',
    status: 'proximo',
    fechaInicio: '2026-07-14', fechaFin: '2026-07-21',
    equipos: equiposGenericos('MY'), partidos: [],
    descripcion: 'Uno de los torneos internacionales mas importantes de Europa, con equipos de hasta 30 paises compitiendo en sedes de la Comunidad de Madrid.',
    totalEquipos: 220, logo: 'MYC',
    heroImage: IMG.madrid, cityImage: IMG.madrid,
    tags: ['Internacional', 'Madrid', 'Wanda Met'],
    sede: 'Comunidad de Madrid', premio: '20,000 EUR + scouting NBA Style',
    inscritos: 220,
    region: 'Comunidad de Madrid', provincia: 'Madrid', ciudad: 'Madrid',
    pais: 'Espana', estacion: 'verano', mes: 7,
    organizador: ORG.madridYouth, precio: 500, nivel: 'elite',
    disciplina: 'futbol-11', yearsRunning: 14,
  },

  // 7. COTIF L'Alcudia — L'Alcudia — Agosto
  {
    id: 'cotif',
    nombre: 'COTIF L\'Alcudia 2026',
    categoria: 'Sub-20',
    formato: 'grupos',
    status: 'proximo',
    fechaInicio: '2026-08-01', fechaFin: '2026-08-10',
    equipos: equiposGenericos('CO'), partidos: [],
    descripcion: 'Torneo internacional sub-20 con seleccions nacionales. Organizado por el ayuntamiento de l\'Alcudia desde 1984, ha visto pasar a leyendas como Iniesta, Aimar y Tevez.',
    totalEquipos: 12, logo: 'COT',
    heroImage: IMG.alcudia, cityImage: IMG.alcudia,
    tags: ['Selecciones', 'Sub-20', 'UEFA'],
    sede: 'Camp Municipal · L\'Alcudia', premio: 'Invitacion + bolsa de viaje',
    inscritos: 12,
    region: 'Comunidad Valenciana', provincia: 'Valencia', ciudad: 'L\'Alcudia',
    pais: 'Espana', estacion: 'verano', mes: 8,
    organizador: ORG.alcudiaAjto, precio: 0, nivel: 'internacional',
    disciplina: 'futbol-11', yearsRunning: 42,
  },

  // 8. Costa Blanca Cup — Benidorm — Noviembre
  {
    id: 'cbc',
    nombre: 'Costa Blanca Cup',
    categoria: 'B7 - U19',
    formato: 'grupos',
    status: 'proximo',
    fechaInicio: '2026-11-12', fechaFin: '2026-11-15',
    equipos: equiposGenericos('CB'), partidos: [],
    descripcion: 'Torneo internacional con equipos de Europa del Norte que aprovechan el clima mediterraneo de Benidorm para preparar la pretemporada invernal.',
    totalEquipos: 180, logo: 'CBC',
    heroImage: IMG.benidorm, cityImage: IMG.benidorm,
    tags: ['Internacional', 'Pretemporada', 'Mediterraneo'],
    sede: 'Benidorm · Alicante', premio: '8,000 EUR',
    inscritos: 180,
    region: 'Comunidad Valenciana', provincia: 'Alicante', ciudad: 'Benidorm',
    pais: 'Espana', estacion: 'otono', mes: 11,
    organizador: ORG.costaBlancaPrivado, precio: 350, nivel: 'pro',
    disciplina: 'futbol-11', yearsRunning: 22,
  },

  // 9. IberCup España — Madrid — Junio
  {
    id: 'ibercup',
    nombre: 'IberCup Madrid 2026',
    categoria: 'U10 - U17',
    formato: 'grupos',
    status: 'proximo',
    fechaInicio: '2026-06-26', fechaFin: '2026-07-02',
    equipos: equiposGenericos('IB'), partidos: [],
    descripcion: 'Una semana inolvidable de futbol internacional en Madrid con equipos de 35 paises. Multiples sedes en la Comunidad.',
    totalEquipos: 280, logo: 'IBC',
    heroImage: IMG.madrid, cityImage: IMG.madrid,
    tags: ['Internacional', 'Mundial Cantera', 'Madrid'],
    sede: 'Multisede · Comunidad de Madrid', premio: '18,000 EUR',
    inscritos: 280,
    region: 'Comunidad de Madrid', provincia: 'Madrid', ciudad: 'Madrid',
    pais: 'Espana', estacion: 'verano', mes: 6,
    organizador: ORG.iberCup, precio: 550, nivel: 'internacional',
    disciplina: 'futbol-11', yearsRunning: 11,
  },

  // 10. Trofeo Naranja — Valencia — Agosto
  {
    id: 'naranja',
    nombre: 'Trofeo Naranja Sub-17',
    categoria: 'Sub-17',
    formato: 'eliminacion',
    status: 'proximo',
    fechaInicio: '2026-08-15', fechaFin: '2026-08-18',
    equipos: equiposGenericos('TN'), partidos: [],
    descripcion: 'Torneo de pretemporada organizado por la cantera del Valencia CF en honor a la fruta emblematica. Cuatro equipos elite por invitacion.',
    totalEquipos: 4, logo: 'TNJ',
    heroImage: IMG.valencia, cityImage: IMG.valencia,
    tags: ['Pretemporada', 'Cantera VCF', 'Sub-17'],
    sede: 'Ciudad Deportiva Paterna · Valencia', premio: '5,000 EUR',
    inscritos: 4,
    region: 'Comunidad Valenciana', provincia: 'Valencia', ciudad: 'Paterna',
    pais: 'Espana', estacion: 'verano', mes: 8,
    organizador: ORG.valenciaCF, precio: 300, nivel: 'pro',
    disciplina: 'futbol-11', yearsRunning: 38,
  },

  // 11. Memorial Quini — Aviles — Julio
  {
    id: 'quini',
    nombre: 'Memorial Quini',
    categoria: 'Cadete',
    formato: 'eliminacion',
    status: 'proximo',
    fechaInicio: '2026-07-25', fechaFin: '2026-07-28',
    equipos: equiposGenericos('MQ'), partidos: [],
    descripcion: 'Homenaje al gran Quini en su Asturias natal. Torneo organizado por el ayuntamiento de Aviles con caracter formativo y solidario.',
    totalEquipos: 16, logo: 'MQI',
    heroImage: IMG.asturias, cityImage: IMG.asturias,
    tags: ['Memorial', 'Asturias', 'Cadete'],
    sede: 'Estadio Roman Suarez Puerta · Aviles', premio: 'Trofeo + Beca',
    inscritos: 16,
    region: 'Asturias', provincia: 'Asturias', ciudad: 'Aviles',
    pais: 'Espana', estacion: 'verano', mes: 7,
    organizador: ORG.avilesAjto, precio: 250, nivel: 'amateur',
    disciplina: 'futbol-11', yearsRunning: 8,
  },

  // 12. Cantabria Cup — Santander — Julio
  {
    id: 'cantabria',
    nombre: 'Cantabria Cup 2026',
    categoria: 'Alevin - Juvenil',
    formato: 'grupos',
    status: 'proximo',
    fechaInicio: '2026-07-18', fechaFin: '2026-07-22',
    equipos: equiposGenericos('CT'), partidos: [],
    descripcion: 'Torneo internacional con sedes en Santander, Laredo y Castro Urdiales. Combinacion perfecta de competicion y vacaciones en el norte.',
    totalEquipos: 140, logo: 'CTC',
    heroImage: IMG.cantabria, cityImage: IMG.cantabria,
    tags: ['Internacional', 'Cantabria', 'Verano'],
    sede: 'Multisede · Cantabria', premio: '10,000 EUR',
    inscritos: 140,
    region: 'Cantabria', provincia: 'Cantabria', ciudad: 'Santander',
    pais: 'Espana', estacion: 'verano', mes: 7,
    organizador: ORG.cantabriaSports, precio: 380, nivel: 'pro',
    disciplina: 'futbol-11', yearsRunning: 16,
  },

  // 13. Bilbao International — Bilbao — Mayo
  {
    id: 'bilbao',
    nombre: 'Bilbao International Football Cup',
    categoria: 'U10 - U17',
    formato: 'grupos',
    status: 'activo',
    fechaInicio: '2026-05-15', fechaFin: '2026-05-19',
    equipos: equiposGenericos('BI'), partidos: [],
    descripcion: 'Torneo internacional organizado en colaboracion con la cantera del Athletic Club. Filosofia formativa con jugadores de Bizkaia y del mundo.',
    totalEquipos: 96, logo: 'BIF',
    heroImage: IMG.bilbao, cityImage: IMG.bilbao,
    tags: ['Cantera Athletic', 'Bizkaia', 'Internacional'],
    sede: 'San Mames · Bilbao', premio: '12,000 EUR + visita cantera',
    inscritos: 96, jornadaActual: 2, completion: 35,
    region: 'Pais Vasco', provincia: 'Bizkaia', ciudad: 'Bilbao',
    pais: 'Espana', estacion: 'primavera', mes: 5,
    organizador: ORG.athleticBilbao, precio: 400, nivel: 'elite',
    disciplina: 'futbol-11', yearsRunning: 9,
  },

  // 14. Trofeo Marivent — Palma — Junio
  {
    id: 'marivent',
    nombre: 'Trofeo Marivent',
    categoria: 'Infantil - Cadete',
    formato: 'eliminacion',
    status: 'proximo',
    fechaInicio: '2026-06-13', fechaFin: '2026-06-16',
    equipos: equiposGenericos('MV'), partidos: [],
    descripcion: 'Torneo en la perla del Mediterraneo. Combina competicion de alto nivel con sedes junto al mar y excursiones turisticas para los equipos.',
    totalEquipos: 32, logo: 'MAR',
    heroImage: IMG.mallorca, cityImage: IMG.mallorca,
    tags: ['Mediterraneo', 'Mallorca', 'Vacacional'],
    sede: 'Son Moix · Palma', premio: '6,000 EUR',
    inscritos: 32,
    region: 'Illes Balears', provincia: 'Mallorca', ciudad: 'Palma',
    pais: 'Espana', estacion: 'verano', mes: 6,
    organizador: ORG.marivent, precio: 450, nivel: 'pro',
    disciplina: 'futbol-11', yearsRunning: 28,
  },

  // 15. Ciudad de Miranda — Miranda de Ebro — Mayo
  {
    id: 'miranda',
    nombre: 'Trofeo Ciudad de Miranda',
    categoria: 'Benjamin - Infantil',
    formato: 'grupos',
    status: 'proximo',
    fechaInicio: '2026-05-22', fechaFin: '2026-05-24',
    equipos: equiposGenericos('CM'), partidos: [],
    descripcion: 'Torneo veterano del calendario formativo organizado por el ayuntamiento mirandes. Caracter familiar y formativo.',
    totalEquipos: 48, logo: 'TCM',
    heroImage: IMG.miranda, cityImage: IMG.miranda,
    tags: ['Burgos', 'Futbol Base', 'Municipal'],
    sede: 'Anduva · Miranda de Ebro', premio: 'Trofeo + Material',
    inscritos: 48,
    region: 'Castilla y Leon', provincia: 'Burgos', ciudad: 'Miranda de Ebro',
    pais: 'Espana', estacion: 'primavera', mes: 5,
    organizador: ORG.mirandaAjto, precio: 200, nivel: 'amateur',
    disciplina: 'futbol-7', yearsRunning: 35,
  },

  // 16. Marbella Football Cup — Marbella — Enero
  {
    id: 'marbella',
    nombre: 'Marbella Football Cup',
    categoria: 'U13 - U17',
    formato: 'grupos',
    status: 'proximo',
    fechaInicio: '2027-01-04', fechaFin: '2027-01-09',
    equipos: equiposGenericos('MBC'), partidos: [],
    descripcion: 'Tradicional cita invernal de la Costa del Sol. Equipos del norte de Europa aprovechan el clima andaluz para arrancar la temporada.',
    totalEquipos: 100, logo: 'MBC',
    heroImage: IMG.marbella, cityImage: IMG.marbella,
    tags: ['Costa del Sol', 'Invierno', 'Internacional'],
    sede: 'Marbella Football Center · Marbella', premio: '15,000 EUR',
    inscritos: 100,
    region: 'Andalucia', provincia: 'Malaga', ciudad: 'Marbella',
    pais: 'Espana', estacion: 'invierno', mes: 1,
    organizador: ORG.marbellaCup, precio: 420, nivel: 'pro',
    disciplina: 'futbol-11', yearsRunning: 17,
  },
];

export const getTorneoById = (id: string) => torneos.find(t => t.id === id);

export const getPartidosRecientes = () =>
  torneos.flatMap(t => t.partidos.filter(p => p.estado === 'jugado')).slice(0, 6);

export const getPartidosProximos = () =>
  torneos.flatMap(t => t.partidos.filter(p => p.estado === 'pendiente')).slice(0, 4);

export const getPartidosLive = () =>
  torneos.flatMap(t => t.partidos.filter(p => p.estado === 'en_curso')).slice(0, 4);

// Regiones unicas en orden
export const regionesDisponibles = Array.from(new Set(torneos.map(t => t.region))).sort();
export const provinciasDisponibles = Array.from(new Set(torneos.map(t => t.provincia))).sort();
export const organizadoresPorTipo = {
  cantera:      torneos.filter(t => t.organizador.tipo === 'cantera').length,
  privado:      torneos.filter(t => t.organizador.tipo === 'privado').length,
  ayuntamiento: torneos.filter(t => t.organizador.tipo === 'ayuntamiento').length,
  federacion:   torneos.filter(t => t.organizador.tipo === 'federacion').length,
};

export const statsGlobales = {
  torneosActivos: torneos.filter(t => t.status === 'activo').length,
  torneosTotal:   torneos.length,
  totalEquipos:   torneos.reduce((acc, t) => acc + t.totalEquipos, 0),
  partidosJugados: torneos.flatMap(t => t.partidos).filter(p => p.estado === 'jugado').length,
  golesMarcados: torneos
    .flatMap(t => t.partidos)
    .filter(p => p.estado === 'jugado')
    .reduce((acc, p) => acc + (p.golesLocal ?? 0) + (p.golesVisitante ?? 0), 0),
  jugadoresU18:  842,
  informes:      1205,
  scoutsActivos: 12,
  premiosTotales: '$68,000',
  regiones: regionesDisponibles.length,
};

export const scoutingFeed = [
  { tone: 'green',  title: 'Jugador Revelacion U15', desc: 'Lukas Meyer (Bayer Ac.) destaca en MIC fase zonal.', when: 'Hace 45 min', avatarSeed: 31 },
  { tone: 'blue',   title: 'Metrica de Rendimiento', desc: 'Heatmaps Villarreal Yellow Cup actualizado.',       when: 'Hace 3 horas', avatarSeed: 32 },
  { tone: 'gold',   title: 'MVP de la semana',       desc: 'Marc Bellini (Barca A) seleccionado en MIC.',      when: 'Hace 5 horas', avatarSeed: 11 },
  { tone: 'red',    title: 'Informe Medico Acad.',   desc: 'Baja por sobrecarga: Pivot Cantera A.',             when: 'Ayer',         avatarSeed: 33 },
];
