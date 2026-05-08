import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Users, MapPin, Trophy } from 'lucide-react';
import { torneos } from '../data/mock';
import type { Equipo } from '../types';

export default function Equipos() {
  const [query, setQuery] = useState('');

  // Deduplicate all teams across tournaments
  const allEquipos: (Equipo & { torneo: string })[] = [];
  const seen = new Set<string>();
  torneos.forEach(t => {
    t.equipos.forEach(e => {
      if (!seen.has(e.id)) {
        seen.add(e.id);
        allEquipos.push({ ...e, torneo: t.nombre });
      }
    });
  });

  const filtered = allEquipos.filter(e =>
    e.nombre.toLowerCase().includes(query.toLowerCase()) ||
    e.ciudad.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="min-h-screen p-6 lg:p-8 max-w-6xl mx-auto">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <p className="text-xs font-mono text-[#4A4A70] uppercase tracking-widest mb-1">Registro</p>
        <h1 className="font-display font-extrabold text-5xl text-[#E8E8FF] uppercase tracking-tight leading-none">
          Equipos
        </h1>
        <p className="text-sm text-[#4A4A70] mt-2">{allEquipos.length} equipos registrados en el sistema</p>
      </motion.div>

      {/* Search */}
      <div className="relative mb-6 max-w-sm">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#4A4A70]" />
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Buscar equipo o ciudad..."
          className="w-full bg-[#0E0E1C] border border-[#1C1C32] rounded-lg pl-9 pr-4 py-2.5 text-sm text-[#E8E8FF] placeholder-[#4A4A70] focus:outline-none focus:border-[#C8FF00] transition-colors"
        />
      </div>

      {/* Grid */}
      <motion.div
        className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3"
        initial="hidden"
        animate="show"
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05 } } }}
      >
        {filtered.map(equipo => (
          <motion.div
            key={equipo.id}
            variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.28 } } }}
            className="rounded-xl border border-[#1C1C32] bg-[#0E0E1C] p-5 hover:border-[#2A2A45] hover:bg-[#13131F] transition-all group"
          >
            {/* Shield */}
            <div className="flex items-center justify-between mb-4">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl border-2 transition-transform group-hover:scale-105"
                style={{ borderColor: equipo.color + '60', background: equipo.color + '15' }}
              >
                {equipo.escudo}
              </div>
              <div
                className="w-2 h-2 rounded-full"
                style={{ background: equipo.color }}
              />
            </div>

            {/* Info */}
            <h3 className="font-display font-bold text-xl text-[#E8E8FF] uppercase leading-tight mb-1 group-hover:text-[#C8FF00] transition-colors">
              {equipo.nombre}
            </h3>

            <div className="flex flex-col gap-1 mt-2">
              <span className="flex items-center gap-1.5 text-xs text-[#4A4A70]">
                <MapPin size={11} /> {equipo.ciudad}
              </span>
              <span className="flex items-center gap-1.5 text-xs text-[#4A4A70]">
                <Trophy size={11} /> {equipo.torneo}
              </span>
            </div>

            {/* Color stripe */}
            <div className="mt-4 h-0.5 rounded-full opacity-40" style={{ background: equipo.color }} />
          </motion.div>
        ))}
      </motion.div>

      {filtered.length === 0 && (
        <div className="text-center py-20 text-[#4A4A70]">
          <Users size={40} className="mx-auto mb-3 opacity-30" />
          <p className="font-medium">No se encontraron equipos</p>
        </div>
      )}
    </div>
  );
}

