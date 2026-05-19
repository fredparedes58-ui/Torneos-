import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Search, Trophy, MapPin, Calendar, ArrowRight, Filter, Tv, BarChart3,
  CheckCircle2, Users,
} from 'lucide-react';
import { torneos } from '../data/mock';
import type { TorneoStatus } from '../types';
import FloatingOrbs from '../components/effects/FloatingOrbs';
import Sparkles from '../components/effects/Sparkles';

const filters: { value: 'all' | TorneoStatus; label: string }[] = [
  { value: 'all',        label: 'Todo Fútbol Base' },
  { value: 'activo',     label: 'En Juego' },
  { value: 'proximo',    label: 'Próximos (Scouting)' },
  { value: 'finalizado', label: 'Histórico' },
];

const statusMap = {
  activo:     { label: 'EN JUEGO',           dotCls: 'bg-[#D4FF1F]',     textCls: 'text-[#D4FF1F]', bgCls: 'bg-[#D4FF1F]/15 border-[#D4FF1F]/30',
                ctaLabel: 'Ver Live',        ctaIcon: Tv,                ctaCls: 'bg-[#D4FF1F] text-[#0F1408]' },
  proximo:    { label: 'INSCRIPCIÓN ABIERTA', dotCls: 'bg-[#7AB8FF]',     textCls: 'text-[#7AB8FF]', bgCls: 'bg-[#7AB8FF]/15 border-[#7AB8FF]/30',
                ctaLabel: 'Ver Detalles',    ctaIcon: ArrowRight,        ctaCls: 'bg-[#2A3320] text-[#D5DBB8] border border-[#7A8A55]' },
  finalizado: { label: 'FINALIZADO',         dotCls: 'bg-[#A5B084]',     textCls: 'text-[#D5DBB8]', bgCls: 'bg-[#282C1D] border-[#7A8A55]',
                ctaLabel: 'Scouting',        ctaIcon: BarChart3,         ctaCls: 'bg-[#2A3320] text-[#D5DBB8] border border-[#7A8A55]' },
};

export default function TorneosList() {
  const [query, setQuery]   = useState('');
  const [filter, setFilter] = useState<'all' | TorneoStatus>('all');

  const filtered = torneos.filter(t => {
    const matchStatus = filter === 'all' || t.status === filter;
    const matchQuery  = t.nombre.toLowerCase().includes(query.toLowerCase()) ||
                        t.categoria.toLowerCase().includes(query.toLowerCase());
    return matchStatus && matchQuery;
  });

  return (
    <div className="relative min-h-screen overflow-hidden">
      <FloatingOrbs variant="green" intensity="subtle" />

      <div className="relative p-4 md:p-8 space-y-6 max-w-[1400px] mx-auto">
        {/* ━━━ Hero header ━━━ */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <span className="label-caps text-[#D4FF1F] mb-3 flex items-center gap-2 text-glow-green">
            <span className="w-2 h-2 rounded-full bg-[#D4FF1F] pulse-dot" />
            Cantera Hub · Directorio
          </span>
          <h1 className="headline-mega text-6xl md:text-8xl lg:text-9xl leading-[0.82]">
            <span className="gradient-text-cream">Explorar</span>
            <br />
            <span className="italic-accent">Torneos.</span>
          </h1>
          <p className="text-base text-[#D5DBB8] mt-5 font-body max-w-xl leading-relaxed">
            {torneos.length} competiciones registradas. Filtra por estado, categoría o disciplina y descubre el próximo gran escenario.
          </p>
        </motion.div>

        {/* ━━━ Search ━━━ */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
          className="relative"
        >
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A5B084]" />
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Buscar torneo de formación..."
            className="w-full bg-[#1A2010]/80 backdrop-blur border border-[#5A6644] rounded-xl pl-12 pr-4 py-4 text-sm text-white placeholder-[#A5B084] focus:outline-none focus:border-[#D4FF1F] transition-colors"
          />
        </motion.div>

        {/* ━━━ Filter pills ━━━ */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}
          className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1 items-center"
        >
          <Filter size={14} className="text-[#A5B084] shrink-0" />
          {filters.map(f => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={[
                'px-4 py-2.5 rounded-full label-caps whitespace-nowrap transition-all border',
                filter === f.value
                  ? 'bg-[#D4FF1F] text-[#0F1408] border-[#D4FF1F] glow-green'
                  : 'bg-transparent text-[#D5DBB8] border-[#7A8A55] hover:border-[#A5B084] hover:text-white',
              ].join(' ')}
            >
              {f.label}
            </button>
          ))}
        </motion.div>

        {/* ━━━ Grid ━━━ */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
          initial="hidden" animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
        >
          {filtered.map((t, i) => {
            const s = statusMap[t.status];
            const Cta = s.ctaIcon;
            return (
              <motion.div
                key={t.id}
                variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.4 } } }}
              >
                <Link
                  to={`/torneos/${t.id}`}
                  className="block relative bg-[#1A2010] rounded-2xl overflow-hidden border border-[#5A6644] hover:border-[#D4FF1F] transition-all duration-400 group"
                  style={{ animationDelay: `${i * 0.05}s` }}
                >
                  {/* Image hero */}
                  <div className="h-56 relative overflow-hidden">
                    <img
                      src={t.heroImage}
                      alt=""
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                    />
                    <div className="absolute inset-0 pitch-bg opacity-50 mix-blend-overlay" />
                    <div className="absolute inset-0 stadium-overlay" />

                    {/* Status badge top-left */}
                    <div className="absolute top-4 left-4">
                      <span className={['inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full label-caps backdrop-blur', s.bgCls, s.textCls].join(' ')}>
                        <span className={['w-1.5 h-1.5 rounded-full', s.dotCls, t.status === 'activo' ? 'pulse-dot' : ''].join(' ')} />
                        {s.label}
                      </span>
                    </div>

                    {/* Trophy on finalized */}
                    {t.status === 'finalizado' && t.campeon && (
                      <div className="absolute bottom-4 right-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FFD23B20] backdrop-blur border border-[#FFD23B60]">
                        <Trophy size={12} className="text-[#FFD23B]" />
                        <span className="label-caps text-[#FFD23B]">Campeón: {t.campeon.nombre}</span>
                      </div>
                    )}

                    {/* Shield monogram */}
                    <div className="absolute bottom-4 left-4 w-14 h-14 rounded-xl bg-[#1A2010]/80 backdrop-blur border border-[#D4FF1F40] flex items-center justify-center font-display font-extrabold text-[#D4FF1F] text-lg">
                      {t.logo}
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-5">
                    <h3 className="font-display font-extrabold text-2xl text-white uppercase tracking-tight leading-tight group-hover:text-[#D4FF1F] transition-colors mb-3">
                      {t.nombre}
                    </h3>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {t.tags?.map(tag => (
                        <span key={tag} className="px-2 py-0.5 rounded text-[10px] font-mono text-[#D5DBB8] bg-[#2A3320] border border-[#7A8A55]">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <p className="text-xs text-[#D5DBB8] mb-4 line-clamp-2 leading-relaxed">{t.descripcion}</p>

                    <div className="flex items-center justify-between pt-3 border-t border-[#5A6644]">
                      <div className="flex flex-col gap-1">
                        <span className="flex items-center gap-1.5 text-[10px] font-mono text-[#A5B084]">
                          <Calendar size={11} /> {t.fechaInicio.slice(5)} → {t.fechaFin.slice(5)}
                        </span>
                        {t.sede && (
                          <span className="flex items-center gap-1.5 text-[10px] font-mono text-[#A5B084]">
                            <MapPin size={11} /> {t.sede.split('·')[0]?.trim()}
                          </span>
                        )}
                      </div>
                      <span className={['flex items-center gap-1.5 label-caps px-3 py-2 rounded-lg transition-all', s.ctaCls].join(' ')}>
                        {s.ctaLabel} <Cta size={12} />
                      </span>
                    </div>
                  </div>

                  {/* Hover scan line */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none overflow-hidden">
                    <span className="scan-line" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        {/* ━━━ CTA banner cuando hay resultados ━━━ */}
        {filtered.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
            className="relative rounded-2xl border border-[#D4FF1F] bg-[#D4FF1F] p-6 md:p-8 overflow-hidden glow-green-lg"
          >
            <Sparkles count={15} color="#0F1408" />
            <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <span className="label-caps text-[#0F1408] mb-2 block flex items-center gap-2">
                  <CheckCircle2 size={12} /> Premios de Colección
                </span>
                <h3 className="font-display font-extrabold text-3xl md:text-4xl text-[#0F1408] uppercase leading-none">
                  Siguiente Gran Reto
                </h3>
                <p className="text-sm text-[#0F1408]/80 mt-2 max-w-md">
                  Completa el álbum de la Liga Pro y gana acceso exclusivo a la Final en el Estadio Metropolitano.
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3 px-4 py-2 rounded-lg bg-[#0F1408] text-[#D4FF1F]">
                  <Users size={14} />
                  <span className="font-mono font-bold text-lg">1.2k+</span>
                  <span className="label-caps">Inscritos</span>
                </div>
                <Link
                  to="/nuevo"
                  className="px-6 py-3 rounded-lg bg-[#0F1408] text-[#D4FF1F] label-caps text-center hover:scale-[1.02] transition-transform"
                >
                  Crear Torneo →
                </Link>
              </div>
            </div>
          </motion.div>
        )}

        {filtered.length === 0 && (
          <div className="text-center py-20 text-[#A5B084]">
            <Trophy size={48} className="mx-auto mb-3 opacity-30" />
            <p className="font-display font-bold text-xl uppercase">No se encontraron torneos</p>
            <p className="text-xs font-mono mt-2">Prueba a cambiar el filtro o la búsqueda</p>
          </div>
        )}
      </div>
    </div>
  );
}
