import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Trophy, MapPin, Calendar, ArrowRight } from 'lucide-react';
import { torneos } from '../data/mock';
import type { TorneoStatus } from '../types';

const filters: { value: 'all' | TorneoStatus | 'cantera'; label: string }[] = [
  { value: 'all',        label: 'Todo: Futbol Base' },
  { value: 'activo',     label: 'En Juego' },
  { value: 'proximo',    label: 'Proximos' },
  { value: 'finalizado', label: 'Historicos' },
];

const tagMap = {
  activo:     { label: 'En Juego',    cls: 'bg-[#C8FF00] text-[#161F00]' },
  proximo:    { label: 'Inscripcion', cls: 'bg-[#333627] text-[#C4CAAC]' },
  finalizado: { label: 'Finalizado',  cls: 'bg-[#282C1D] text-[#8E9479]' },
};

export default function TorneosList() {
  const [query, setQuery]   = useState('');
  const [filter, setFilter] = useState<'all' | TorneoStatus | 'cantera'>('all');

  const filtered = torneos.filter(t => {
    const matchStatus = filter === 'all' || filter === 'cantera' || t.status === filter;
    const matchQuery  = t.nombre.toLowerCase().includes(query.toLowerCase()) ||
                        t.categoria.toLowerCase().includes(query.toLowerCase());
    return matchStatus && matchQuery;
  });

  return (
    <div className="p-4 md:p-8 space-y-6">
      {/* Search */}
      <div className="relative">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8E9479]" />
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Buscar torneo de formacion..."
          className="w-full bg-[#191D10] border border-[#434933] rounded-lg pl-11 pr-4 py-3 text-sm text-white placeholder-[#8E9479] focus:outline-none focus:border-[#C8FF00] transition-colors"
        />
      </div>

      {/* Filter pills */}
      <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
        {filters.map(f => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={[
              'px-4 py-2 rounded-full label-caps whitespace-nowrap transition-all border',
              filter === f.value
                ? 'bg-[#C8FF00] text-[#161F00] border-[#C8FF00]'
                : 'bg-transparent text-[#C4CAAC] border-[#434933] hover:border-[#8E9479] hover:text-white',
            ].join(' ')}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-5"
        initial="hidden"
        animate="show"
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
      >
        {filtered.map(t => {
          const tag = tagMap[t.status];
          return (
            <motion.div
              key={t.id}
              variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.3 } } }}
            >
              <Link
                to={`/torneos/${t.id}`}
                className="block bg-[#191D10] rounded-xl overflow-hidden border border-[#434933] hover:border-[#C8FF00] transition-all duration-300 group"
              >
                {/* Image / pitch bg */}
                <div className="h-44 relative pitch-bg overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center text-[120px] opacity-25 group-hover:scale-105 transition-transform duration-500">
                    {t.logo}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#191D10] via-transparent to-transparent" />
                  <div className="absolute top-3 left-3">
                    <span className={['px-2 py-0.5 text-[10px] font-bold rounded label-caps', tag.cls].join(' ')}>
                      {tag.label}
                    </span>
                  </div>
                </div>

                {/* Body */}
                <div className="p-5">
                  <h3 className="font-display font-bold text-2xl text-white mb-2 uppercase tracking-tight group-hover:text-[#C8FF00] transition-colors">
                    {t.nombre}
                  </h3>

                  <div className="flex items-center gap-3 text-[#8E9479] font-mono text-[11px] mb-3">
                    <span className="flex items-center gap-1"><Trophy size={11} /> {t.categoria}</span>
                    <span className="flex items-center gap-1">
                      <MapPin size={11} /> {t.equipos[0]?.ciudad ?? 'Multisede'}
                    </span>
                  </div>

                  <p className="text-xs text-[#C4CAAC] mb-4 line-clamp-2">{t.descripcion}</p>

                  <div className="flex items-center justify-between pt-3 border-t border-[#434933]">
                    <span className="flex items-center gap-1.5 text-[#8E9479] font-mono text-[11px]">
                      <Calendar size={11} /> {t.fechaInicio.slice(5)} a {t.fechaFin.slice(5)}
                    </span>
                    <span
                      className={[
                        'flex items-center gap-1 label-caps px-3 py-1.5 rounded-full transition-all',
                        t.status === 'activo'
                          ? 'bg-[#C8FF00] text-[#161F00]'
                          : 'bg-[#282C1D] text-[#C4CAAC] group-hover:bg-[#C8FF00] group-hover:text-[#161F00]',
                      ].join(' ')}
                    >
                      {t.status === 'activo' ? 'Ver Live' : t.status === 'proximo' ? 'Inscribir' : 'Ver Detalles'}
                      <ArrowRight size={11} />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </motion.div>

      {filtered.length === 0 && (
        <div className="text-center py-20 text-[#8E9479]">
          <Trophy size={40} className="mx-auto mb-3 opacity-30" />
          <p className="font-medium">No se encontraron torneos</p>
        </div>
      )}
    </div>
  );
}
