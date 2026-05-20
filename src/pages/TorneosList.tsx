import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, Trophy, MapPin, Calendar, ArrowRight, Filter,
  Tv, BarChart3, LayoutGrid, CalendarDays, Building2, Landmark,
  X, Euro, Award, Clock, Snowflake, Sun, Leaf, Flower,
} from 'lucide-react';
import { torneos, regionesDisponibles } from '../data/mock';
import type { TorneoStatus, Estacion, TipoOrganizador, NivelTorneo } from '../types';
import FloatingOrbs from '../components/effects/FloatingOrbs';

type ViewMode = 'lista' | 'calendario';
type SortKey  = 'fecha' | 'precio' | 'nivel';

const estaciones: { value: Estacion; label: string; icon: React.ElementType; color: string }[] = [
  { value: 'primavera', label: 'Primavera', icon: Flower,    color: '#4DFFA0' },
  { value: 'verano',    label: 'Verano',    icon: Sun,       color: '#FFD23B' },
  { value: 'otono',     label: 'Otono',     icon: Leaf,      color: '#FF9F45' },
  { value: 'invierno',  label: 'Invierno',  icon: Snowflake, color: '#7AB8FF' },
];

const organizadores: { value: TipoOrganizador; label: string; icon: React.ElementType }[] = [
  { value: 'cantera',      label: 'Cantera',       icon: Trophy },
  { value: 'privado',      label: 'Privado',       icon: Building2 },
  { value: 'ayuntamiento', label: 'Ayuntamiento',  icon: Landmark },
  { value: 'federacion',   label: 'Federacion',    icon: Award },
];

const niveles: { value: NivelTorneo; label: string; color: string }[] = [
  { value: 'amateur',       label: 'Amateur',       color: '#A5B084' },
  { value: 'semi-pro',      label: 'Semi-Pro',      color: '#7AB8FF' },
  { value: 'pro',           label: 'Pro',           color: '#F2C53D' },
  { value: 'elite',         label: 'Elite',         color: '#FF9F45' },
  { value: 'internacional', label: 'Internacional', color: '#FF6B7E' },
];

const nivelOrder: Record<NivelTorneo, number> = {
  amateur: 1, 'semi-pro': 2, pro: 3, elite: 4, internacional: 5,
};

const meses = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
const mesesFull = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];

const statusMap = {
  activo:     { label: 'EN VIVO',           dotCls: 'bg-[#F2C53D]', textCls: 'text-[#F2C53D]', bgCls: 'bg-[#F2C53D]/15 border-[#F2C53D]/30',
                ctaLabel: 'Ver Live',       ctaIcon: Tv,            ctaCls: 'bg-[#F2C53D] text-[#1F2818]' },
  proximo:    { label: 'INSCRIPCION ABIERTA', dotCls: 'bg-[#7AB8FF]', textCls: 'text-[#7AB8FF]', bgCls: 'bg-[#7AB8FF]/15 border-[#7AB8FF]/30',
                ctaLabel: 'Inscribirse',    ctaIcon: ArrowRight,    ctaCls: 'bg-[#2A3320] text-[#D5DBB8] border border-[#7A8A55]' },
  finalizado: { label: 'FINALIZADO',         dotCls: 'bg-[#A5B084]', textCls: 'text-[#D5DBB8]', bgCls: 'bg-[#2A3320] border-[#7A8A55]',
                ctaLabel: 'Scouting',       ctaIcon: BarChart3,     ctaCls: 'bg-[#2A3320] text-[#D5DBB8] border border-[#7A8A55]' },
};

export default function TorneosList() {
  const [view, setView] = useState<ViewMode>('lista');
  const [query, setQuery] = useState('');
  const [statusF, setStatusF] = useState<'all' | TorneoStatus>('all');
  const [region, setRegion] = useState<string | null>(null);
  const [estacion, setEstacion] = useState<Estacion | null>(null);
  const [organizador, setOrganizador] = useState<TipoOrganizador | null>(null);
  const [nivel, setNivel] = useState<NivelTorneo | null>(null);
  const [sort, setSort] = useState<SortKey>('fecha');
  const [showFilters, setShowFilters] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    let arr = torneos.filter(t => {
      const matchStatus = statusF === 'all' || t.status === statusF;
      const matchQuery  = !query || t.nombre.toLowerCase().includes(query.toLowerCase()) ||
                          t.ciudad.toLowerCase().includes(query.toLowerCase()) ||
                          t.provincia.toLowerCase().includes(query.toLowerCase());
      const matchRegion = !region || t.region === region;
      const matchEst    = !estacion || t.estacion === estacion;
      const matchOrg    = !organizador || t.organizador.tipo === organizador;
      const matchNivel  = !nivel || t.nivel === nivel;
      return matchStatus && matchQuery && matchRegion && matchEst && matchOrg && matchNivel;
    });
    if (sort === 'fecha')  arr = [...arr].sort((a, b) => a.fechaInicio.localeCompare(b.fechaInicio));
    if (sort === 'precio') arr = [...arr].sort((a, b) => a.precio - b.precio);
    if (sort === 'nivel')  arr = [...arr].sort((a, b) => nivelOrder[b.nivel] - nivelOrder[a.nivel]);
    return arr;
  }, [query, statusF, region, estacion, organizador, nivel, sort]);

  const clearFilters = () => {
    setRegion(null); setEstacion(null); setOrganizador(null); setNivel(null); setStatusF('all'); setQuery('');
  };

  const activeFilterCount = [region, estacion, organizador, nivel].filter(Boolean).length + (statusF !== 'all' ? 1 : 0);

  const byMonth = useMemo(() => {
    const map: Record<number, typeof torneos> = {};
    filtered.forEach(t => {
      if (!map[t.mes]) map[t.mes] = [];
      map[t.mes].push(t);
    });
    return map;
  }, [filtered]);

  return (
    <div className="relative min-h-screen overflow-hidden">
      <FloatingOrbs variant="gold" intensity="subtle" />

      <div className="relative p-4 md:p-8 space-y-6 max-w-[1400px] mx-auto">
        {/* ━━━ Hero ━━━ */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <span className="label-caps text-[#F2C53D] mb-3 flex items-center gap-2 text-glow-green">
            <span className="w-2 h-2 rounded-full bg-[#F2C53D] pulse-dot" />
            Espana · Cantera Nacional
          </span>
          <h1 className="headline-mega text-6xl md:text-8xl lg:text-9xl leading-[0.82]">
            <span className="gradient-text-cream">Explorar</span>
            <br />
            <span className="italic-accent">Torneos.</span>
          </h1>
          <p className="text-base text-[#D5DBB8] mt-5 font-body max-w-2xl leading-relaxed">
            <span className="font-bold text-white">{torneos.length} competiciones reales</span> de futbol base en {regionesDisponibles.length} regiones de Espana. Filtra por estacion, organizador, precio y nivel.
          </p>
        </motion.div>

        {/* ━━━ Toolbar ━━━ */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
          className="flex flex-col md:flex-row gap-3 items-stretch"
        >
          <div className="relative flex-1">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A5B084]" />
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Buscar torneo, ciudad o provincia..."
              className="w-full bg-[#2A3320]/80 backdrop-blur border border-[#5A6644] rounded-xl pl-12 pr-4 py-3.5 text-sm text-white placeholder-[#A5B084] focus:outline-none focus:border-[#F2C53D] transition-colors"
            />
          </div>

          <div className="flex bg-[#2A3320]/80 backdrop-blur border border-[#5A6644] rounded-xl p-1 gap-1">
            <button onClick={() => setView('lista')}
              className={['px-4 py-2.5 rounded-lg label-caps flex items-center gap-2 transition-all',
                view === 'lista' ? 'bg-[#F2C53D] text-[#1F2818]' : 'text-[#A5B084] hover:text-white'].join(' ')}>
              <LayoutGrid size={14} /> Lista
            </button>
            <button onClick={() => setView('calendario')}
              className={['px-4 py-2.5 rounded-lg label-caps flex items-center gap-2 transition-all',
                view === 'calendario' ? 'bg-[#F2C53D] text-[#1F2818]' : 'text-[#A5B084] hover:text-white'].join(' ')}>
              <CalendarDays size={14} /> Calendario
            </button>
          </div>

          <select
            value={sort}
            onChange={e => setSort(e.target.value as SortKey)}
            className="bg-[#2A3320]/80 backdrop-blur border border-[#5A6644] rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-[#F2C53D] label-caps cursor-pointer"
          >
            <option value="fecha">Ordenar: Fecha</option>
            <option value="precio">Ordenar: Precio</option>
            <option value="nivel">Ordenar: Nivel</option>
          </select>

          <button
            onClick={() => setShowFilters(v => !v)}
            className={['px-4 py-3.5 rounded-xl label-caps flex items-center gap-2 transition-all border',
              showFilters || activeFilterCount > 0
                ? 'bg-[#F2C53D] text-[#1F2818] border-[#F2C53D]'
                : 'bg-transparent text-[#D5DBB8] border-[#5A6644] hover:border-[#F2C53D]'].join(' ')}>
            <Filter size={14} /> Filtros {activeFilterCount > 0 && (
              <span className="bg-[#1F2818] text-[#F2C53D] rounded-full px-1.5 py-0.5 text-[10px] font-bold">
                {activeFilterCount}
              </span>
            )}
          </button>
        </motion.div>

        {/* ━━━ Filter panel ━━━ */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="rounded-2xl border border-[#5A6644] bg-[#2A3320]/60 backdrop-blur p-5 space-y-5">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin size={13} className="text-[#F2C53D]" />
                    <span className="label-caps text-[#D5DBB8]">Region / Comunidad</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {regionesDisponibles.map(r => (
                      <button key={r} onClick={() => setRegion(region === r ? null : r)}
                        className={['px-3 py-1.5 rounded-full text-xs font-mono border transition-all',
                          region === r
                            ? 'bg-[#F2C53D] text-[#1F2818] border-[#F2C53D]'
                            : 'bg-transparent text-[#D5DBB8] border-[#5A6644] hover:border-[#F2C53D]'].join(' ')}>
                        {r}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar size={13} className="text-[#F2C53D]" />
                    <span className="label-caps text-[#D5DBB8]">Estacion del Ano</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {estaciones.map(e => {
                      const Icon = e.icon;
                      const active = estacion === e.value;
                      return (
                        <button key={e.value} onClick={() => setEstacion(active ? null : e.value)}
                          className={['px-3 py-1.5 rounded-full text-xs font-mono border flex items-center gap-1.5 transition-all',
                            active ? 'border-transparent' : 'bg-transparent text-[#D5DBB8] border-[#5A6644] hover:border-[#F2C53D]'].join(' ')}
                          style={active ? { background: e.color, color: '#1F2818' } : {}}>
                          <Icon size={12} /> {e.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Building2 size={13} className="text-[#F2C53D]" />
                    <span className="label-caps text-[#D5DBB8]">Organizado por</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {organizadores.map(o => {
                      const Icon = o.icon;
                      return (
                        <button key={o.value} onClick={() => setOrganizador(organizador === o.value ? null : o.value)}
                          className={['px-3 py-1.5 rounded-full text-xs font-mono border flex items-center gap-1.5 transition-all',
                            organizador === o.value
                              ? 'bg-[#F2C53D] text-[#1F2818] border-[#F2C53D]'
                              : 'bg-transparent text-[#D5DBB8] border-[#5A6644] hover:border-[#F2C53D]'].join(' ')}>
                          <Icon size={12} /> {o.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Award size={13} className="text-[#F2C53D]" />
                    <span className="label-caps text-[#D5DBB8]">Nivel de competicion</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {niveles.map(n => {
                      const active = nivel === n.value;
                      return (
                        <button key={n.value} onClick={() => setNivel(active ? null : n.value)}
                          className={['px-3 py-1.5 rounded-full text-xs font-mono border transition-all',
                            active ? 'border-transparent' : 'bg-transparent text-[#D5DBB8] border-[#5A6644] hover:border-[#F2C53D]'].join(' ')}
                          style={active ? { background: n.color, color: '#1F2818' } : {}}>
                          {n.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {activeFilterCount > 0 && (
                  <button onClick={clearFilters}
                    className="text-xs text-[#FF9F45] flex items-center gap-1.5 hover:text-[#FFD23B] transition-colors">
                    <X size={13} /> Limpiar filtros
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex items-center justify-between gap-3 flex-wrap">
          <span className="label-caps text-[#A5B084]">
            <span className="text-[#F2C53D] font-bold">{filtered.length}</span> torneos encontrados
          </span>
          <div className="flex gap-1.5">
            {(['all', 'activo', 'proximo', 'finalizado'] as const).map(s => (
              <button key={s} onClick={() => setStatusF(s)}
                className={['px-3 py-1.5 rounded-full label-caps text-[10px] transition-all border',
                  statusF === s
                    ? 'bg-[#F2C53D] text-[#1F2818] border-[#F2C53D]'
                    : 'bg-transparent text-[#D5DBB8] border-[#5A6644] hover:border-[#F2C53D]'].join(' ')}>
                {s === 'all' ? 'Todos' : s === 'activo' ? 'En vivo' : s === 'proximo' ? 'Proximos' : 'Historico'}
              </button>
            ))}
          </div>
        </div>

        {/* ━━━ LISTA VIEW ━━━ */}
        {view === 'lista' && (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
            initial="hidden" animate="show"
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
          >
            {filtered.map((t) => {
              const s = statusMap[t.status];
              const Cta = s.ctaIcon;
              const orgMeta = organizadores.find(o => o.value === t.organizador.tipo);
              const OrgIcon = orgMeta?.icon ?? Building2;
              const estacionData = estaciones.find(e => e.value === t.estacion);
              const EstIcon = estacionData?.icon ?? Sun;
              const isHovered = hoveredId === t.id;
              const nivelData = niveles.find(n => n.value === t.nivel);

              return (
                <motion.div
                  key={t.id}
                  variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.4 } } }}
                  onMouseEnter={() => setHoveredId(t.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  className="relative"
                >
                  <Link
                    to={`/torneos/${t.id}`}
                    className="block relative bg-[#2A3320] rounded-2xl overflow-hidden border border-[#5A6644] hover:border-[#F2C53D] transition-all duration-400 group"
                  >
                    <div className="h-56 relative overflow-hidden">
                      <img src={t.heroImage} alt="" loading="lazy"
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }} />
                      <div className="absolute inset-0 pitch-bg opacity-40 mix-blend-overlay" />
                      <div className="absolute inset-0 stadium-overlay" />

                      <div className="absolute top-4 left-4">
                        <span className={['inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full label-caps backdrop-blur', s.bgCls, s.textCls].join(' ')}>
                          <span className={['w-1.5 h-1.5 rounded-full', s.dotCls, t.status === 'activo' ? 'pulse-dot' : ''].join(' ')} />
                          {s.label}
                        </span>
                      </div>

                      <div className="absolute top-4 right-4">
                        <div className="px-3 py-1.5 rounded-lg bg-[#1F2818]/80 backdrop-blur border border-[#F2C53D]/40 flex items-center gap-1.5">
                          {t.precio > 0 ? (
                            <>
                              <Euro size={11} className="text-[#F2C53D]" />
                              <span className="font-mono font-bold text-[#F2C53D] text-sm">{t.precio}</span>
                              <span className="text-[9px] font-mono text-[#A5B084] uppercase tracking-wider">/equipo</span>
                            </>
                          ) : (
                            <span className="label-caps text-[#4DFFA0] text-[10px]">INVITACION</span>
                          )}
                        </div>
                      </div>

                      <div className="absolute bottom-4 right-4 flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-[#1F2818]/80 backdrop-blur border border-[#7A8A55] max-w-[60%]">
                        <div className="w-7 h-7 rounded font-mono font-bold text-[9px] flex items-center justify-center shrink-0"
                          style={{ background: t.organizador.color + '30', color: t.organizador.color, border: `1px solid ${t.organizador.color}80` }}>
                          {t.organizador.logo}
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="text-[9px] font-mono text-[#A5B084] uppercase tracking-wider flex items-center gap-1">
                            <OrgIcon size={9} /> {orgMeta?.label}
                          </span>
                          <span className="text-[10px] text-white font-bold truncate">{t.organizador.nombre}</span>
                        </div>
                      </div>

                      <div className="absolute bottom-4 left-4 w-14 h-14 rounded-xl bg-[#1F2818]/80 backdrop-blur border border-[#F2C53D]/40 flex items-center justify-center font-display font-extrabold text-[#F2C53D] text-lg">
                        {t.logo}
                      </div>
                    </div>

                    <div className="p-5">
                      <h3 className="font-display font-extrabold text-2xl text-white uppercase tracking-tight leading-tight group-hover:text-[#F2C53D] transition-colors mb-2">
                        {t.nombre}
                      </h3>

                      <div className="flex items-center gap-1.5 text-xs text-[#D5DBB8] font-mono mb-2">
                        <MapPin size={11} className="text-[#F2C53D]" />
                        <span className="font-bold text-white">{t.ciudad}</span>
                        <span className="text-[#A5B084]">·</span>
                        <span>{t.provincia}, {t.region}</span>
                      </div>

                      <div className="flex items-center gap-3 text-xs font-mono text-[#A5B084] mb-3">
                        <span className="flex items-center gap-1">
                          <Calendar size={11} className="text-[#F2C53D]" />
                          {t.fechaInicio.slice(5)} → {t.fechaFin.slice(5)}
                        </span>
                        <span className="flex items-center gap-1" style={{ color: estacionData?.color }}>
                          <EstIcon size={11} /> {estacionData?.label}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-1.5 mb-3">
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider"
                          style={{ background: (nivelData?.color ?? '#A5B084') + '20',
                                   color: nivelData?.color,
                                   border: `1px solid ${(nivelData?.color ?? '#A5B084')}40` }}>
                          {t.nivel}
                        </span>
                        {t.tags?.slice(0, 2).map(tag => (
                          <span key={tag} className="px-2 py-0.5 rounded text-[10px] font-mono text-[#D5DBB8] bg-[#374028] border border-[#7A8A55]">
                            {tag}
                          </span>
                        ))}
                      </div>

                      <p className="text-xs text-[#D5DBB8] mb-4 line-clamp-2 leading-relaxed">{t.descripcion}</p>

                      <div className="flex items-center justify-between pt-3 border-t border-[#5A6644]">
                        <div className="flex items-center gap-2">
                          <span className="label-caps text-[10px] text-[#A5B084]">{t.totalEquipos} equipos</span>
                          {t.yearsRunning && (
                            <>
                              <span className="text-[#7A8A55]">·</span>
                              <span className="label-caps text-[10px] text-[#A5B084]">{t.yearsRunning}a edicion</span>
                            </>
                          )}
                        </div>
                        <span className={['flex items-center gap-1.5 label-caps px-3 py-1.5 rounded-lg transition-all text-[10px]', s.ctaCls].join(' ')}>
                          {s.ctaLabel} <Cta size={11} />
                        </span>
                      </div>
                    </div>
                  </Link>

                  {/* Hover schedule popup (sibling of Link to avoid nested links) */}
                  <AnimatePresence>
                    {isHovered && t.schedule && t.schedule.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                        transition={{ duration: 0.15 }}
                        className="absolute -top-3 right-3 z-30 bg-[#1F2818]/95 backdrop-blur-xl border border-[#F2C53D] rounded-xl p-3 w-72 glow-green-lg pointer-events-none"
                      >
                        <div className="label-caps text-[#F2C53D] mb-2 flex items-center gap-1.5">
                          <Clock size={11} /> Horario del torneo
                        </div>
                        <div className="space-y-1.5">
                          {t.schedule.slice(0, 5).map((d, i) => (
                            <div key={i} className="flex items-center justify-between text-[11px] font-mono gap-2">
                              <span className="text-white font-bold w-16 shrink-0">{d.diaSemana.slice(0, 3)} {d.dia.slice(8)}</span>
                              <span className="text-[#A5B084] flex-1 truncate">{d.fase}</span>
                              <span className="text-[#D5DBB8] shrink-0">{d.horaInicio}–{d.horaFin}</span>
                              <span className="text-[#F2C53D] font-bold w-8 text-right shrink-0">{d.partidos}p</span>
                            </div>
                          ))}
                          {t.schedule.length > 5 && (
                            <div className="text-[10px] text-[#A5B084] font-mono pt-1 border-t border-[#5A6644]">
                              +{t.schedule.length - 5} dias mas · clic para detalle
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </motion.div>
        )}

        {/* ━━━ CALENDARIO VIEW ━━━ */}
        {view === 'calendario' && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {meses.map((_mes, idx) => {
              const m = idx + 1;
              const torneosDeMes = byMonth[m] ?? [];
              const count = torneosDeMes.length;
              const hasActive = torneosDeMes.some(t => t.status === 'activo');
              const estacionMes: Estacion =
                m === 12 || m === 1 || m === 2 ? 'invierno' :
                m >= 3 && m <= 5 ? 'primavera' :
                m >= 6 && m <= 8 ? 'verano' : 'otono';
              const eData = estaciones.find(e => e.value === estacionMes)!;
              const EIcon = eData.icon;

              return (
                <motion.div
                  key={m}
                  initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.03 }}
                  className={['rounded-2xl border p-4 transition-all',
                    count > 0
                      ? 'bg-[#2A3320] border-[#5A6644] hover:border-[#F2C53D]'
                      : 'bg-[#1F2818]/40 border-[#374028]'].join(' ')}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className="label-caps text-[#A5B084]">{m.toString().padStart(2, '0')}</span>
                        <EIcon size={10} style={{ color: eData.color }} />
                      </div>
                      <p className="font-display font-extrabold text-2xl text-white uppercase leading-none">{mesesFull[idx]}</p>
                    </div>
                    {count > 0 ? (
                      <div className="flex flex-col items-end">
                        <span className="font-mono font-bold text-3xl text-[#F2C53D] leading-none">{count}</span>
                        <span className="text-[9px] font-mono text-[#A5B084] uppercase tracking-wider">torneos</span>
                      </div>
                    ) : (
                      <span className="text-xs font-mono text-[#7A8A55]">–</span>
                    )}
                  </div>

                  {hasActive && (
                    <div className="flex items-center gap-1.5 mb-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#F2C53D] pulse-dot" />
                      <span className="label-caps text-[#F2C53D] text-[10px]">Hay activos</span>
                    </div>
                  )}

                  <div className="space-y-1.5">
                    {torneosDeMes.slice(0, 4).map(t => (
                      <Link key={t.id} to={`/torneos/${t.id}`}
                        className="flex items-center gap-2 text-xs hover:text-[#F2C53D] transition-colors group">
                        <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: t.organizador.color }} />
                        <span className="text-white font-medium truncate flex-1 group-hover:text-[#F2C53D]">{t.nombre}</span>
                        <span className="font-mono text-[#A5B084] text-[10px] shrink-0">d{t.fechaInicio.slice(8)}</span>
                      </Link>
                    ))}
                    {torneosDeMes.length > 4 && (
                      <p className="text-[10px] font-mono text-[#7A8A55] pt-1">
                        +{torneosDeMes.length - 4} mas
                      </p>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}

        {filtered.length === 0 && (
          <div className="text-center py-20 text-[#A5B084]">
            <Trophy size={48} className="mx-auto mb-3 opacity-30" />
            <p className="font-display font-bold text-xl uppercase">No se encontraron torneos</p>
            <p className="text-xs font-mono mt-2">Prueba a limpiar los filtros</p>
            <button onClick={clearFilters} className="mt-4 px-4 py-2 rounded-lg bg-[#F2C53D] text-[#1F2818] label-caps">
              Limpiar filtros
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
