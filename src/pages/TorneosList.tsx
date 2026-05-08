import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Trophy, Users, Calendar, ArrowRight, Filter } from 'lucide-react';
import { torneos } from '../data/mock';
import type { TorneoStatus } from '../types';

const statusMap: Record<TorneoStatus, { label: string; color: string; bg: string; border: string }> = {
  activo:     { label: 'En Curso',   color: '#C8FF00', bg: '#1E2800', border: '#C8FF0040' },
  proximo:    { label: 'PrÃ³ximo',    color: '#4E8FFF', bg: '#0D1A3A', border: '#4E8FFF40' },
  finalizado: { label: 'Finalizado', color: '#4A4A70', bg: '#13131F', border: '#2A2A45' },
};

const formatoMap: Record<string, string> = {
  eliminacion: 'EliminaciÃ³n',
  liga: 'Liga',
  grupos: 'Grupos + EliminaciÃ³n',
};

const filters: { value: 'all' | TorneoStatus; label: string }[] = [
  { value: 'all',        label: 'Todos' },
  { value: 'activo',     label: 'En Curso' },
  { value: 'proximo',    label: 'PrÃ³ximos' },
  { value: 'finalizado', label: 'Finalizados' },
];

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
    <div className="min-h-screen p-6 lg:p-8 max-w-6xl mx-auto">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <p className="text-xs font-mono text-[#4A4A70] uppercase tracking-widest mb-1">
          GestiÃ³n
        </p>
        <h1 className="font-display font-extrabold text-5xl text-[#E8E8FF] uppercase tracking-tight leading-none">
          Torneos
        </h1>
      </motion.div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#4A4A70]" />
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Buscar torneo..."
            className="w-full bg-[#0E0E1C] border border-[#1C1C32] rounded-lg pl-9 pr-4 py-2.5 text-sm text-[#E8E8FF] placeholder-[#4A4A70] focus:outline-none focus:border-[#C8FF00] transition-colors"
          />
        </div>
        <div className="flex gap-2 items-center">
          <Filter size={14} className="text-[#4A4A70] shrink-0" />
          {filters.map(f => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={[
                'px-3 py-2 rounded-lg text-xs font-medium transition-all border',
                filter === f.value
                  ? 'bg-[#1E2800] text-[#C8FF00] border-[#C8FF0040]'
                  : 'bg-[#0E0E1C] text-[#4A4A70] border-[#1C1C32] hover:text-[#E8E8FF] hover:border-[#2A2A45]',
              ].join(' ')}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <motion.div
        className="grid sm:grid-cols-2 lg:grid-cols-2 gap-4"
        initial="hidden"
        animate="show"
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
      >
        {filtered.map(t => {
          const s = statusMap[t.status];
          return (
            <motion.div
              key={t.id}
              variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.3 } } }}
            >
              <Link
                to={`/torneos/${t.id}`}
                className="block rounded-xl border border-[#1C1C32] bg-[#0E0E1C] p-5 hover:border-[#2A2A45] hover:bg-[#13131F] transition-all duration-200 group"
              >
                {/* Top row */}
                <div className="flex items-start justify-between mb-4">
                  <div className="text-3xl">{t.logo}</div>
                  <span
                    className="flex items-center gap-1.5 text-xs font-mono font-medium px-2 py-0.5 rounded-full border"
                    style={{ color: s.color, borderColor: s.border, background: s.bg }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: s.color }} />
                    {s.label}
                  </span>
                </div>

                {/* Name */}
                <h3 className="font-display font-bold text-2xl text-[#E8E8FF] uppercase leading-tight group-hover:text-[#C8FF00] transition-colors mb-1">
                  {t.nombre}
                </h3>
                <p className="text-xs text-[#4A4A70] mb-4 line-clamp-2">{t.descripcion}</p>

                {/* Meta row */}
                <div className="flex items-center gap-4 text-xs text-[#4A4A70]">
                  <span className="flex items-center gap-1.5">
                    <Users size={12} /> {t.totalEquipos} equipos
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Trophy size={12} /> {formatoMap[t.formato]}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar size={12} /> {t.categoria}
                  </span>
                </div>

                {/* Dates */}
                <div className="mt-4 pt-4 border-t border-[#1C1C32] flex items-center justify-between">
                  <span className="font-mono text-[10px] text-[#4A4A70]">
                    {t.fechaInicio} â†’ {t.fechaFin}
                  </span>
                  <span className="text-[#C8FF00] opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 text-xs font-medium">
                    Ver <ArrowRight size={12} />
                  </span>
                </div>

                {/* Campeon badge */}
                {t.campeon && (
                  <div className="mt-3 flex items-center gap-2 text-xs text-[#FFB800]">
                    <Trophy size={12} /> CampeÃ³n: <strong>{t.campeon.nombre}</strong>
                  </div>
                )}
              </Link>
            </motion.div>
          );
        })}
      </motion.div>

      {filtered.length === 0 && (
        <div className="text-center py-20 text-[#4A4A70]">
          <Trophy size={40} className="mx-auto mb-3 opacity-30" />
          <p className="font-medium">No se encontraron torneos</p>
        </div>
      )}
    </div>
  );
}

