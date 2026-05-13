import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Users, MapPin, Trophy } from 'lucide-react';
import { torneos } from '../data/mock';
import type { Equipo } from '../types';

export default function Equipos() {
  const [query, setQuery] = useState('');

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
    <div className="p-4 md:p-8 space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <span className="label-caps text-[#C8FF00]">Registro · Cantera</span>
        <h1 className="font-display font-extrabold text-5xl md:text-6xl text-white uppercase tracking-tight leading-none mt-2">
          Equipos
        </h1>
        <p className="text-sm text-[#C4CAAC] mt-3 font-mono">
          {allEquipos.length} equipos registrados en el sistema
        </p>
      </motion.div>

      <div className="relative max-w-md">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8E9479]" />
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Buscar equipo o ciudad..."
          className="w-full bg-[#191D10] border border-[#434933] rounded-lg pl-11 pr-4 py-3 text-sm text-white placeholder-[#8E9479] focus:outline-none focus:border-[#C8FF00] transition-colors"
        />
      </div>

      <motion.div
        className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        initial="hidden"
        animate="show"
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05 } } }}
      >
        {filtered.map(equipo => (
          <motion.div
            key={equipo.id}
            variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.28 } } }}
            className="glass-card p-5 rounded-xl hover:border-[#C8FF00]/50 transition-all group"
          >
            <div className="flex items-center justify-between mb-4">
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl border-2 transition-transform group-hover:scale-105"
                style={{ borderColor: equipo.color + '80', background: equipo.color + '20' }}
              >
                {equipo.escudo}
              </div>
              <div className="w-2 h-2 rounded-full" style={{ background: equipo.color }} />
            </div>

            <h3 className="font-display font-bold text-2xl text-white uppercase leading-tight mb-2 group-hover:text-[#C8FF00] transition-colors">
              {equipo.nombre}
            </h3>

            <div className="flex flex-col gap-1.5">
              <span className="flex items-center gap-1.5 text-xs text-[#C4CAAC] font-mono">
                <MapPin size={11} className="text-[#8E9479]" /> {equipo.ciudad}
              </span>
              <span className="flex items-center gap-1.5 text-xs text-[#C4CAAC] font-mono">
                <Trophy size={11} className="text-[#8E9479]" /> {equipo.torneo}
              </span>
            </div>

            <div className="mt-4 h-0.5 rounded-full opacity-60" style={{ background: equipo.color }} />
          </motion.div>
        ))}
      </motion.div>

      {filtered.length === 0 && (
        <div className="text-center py-20 text-[#8E9479]">
          <Users size={40} className="mx-auto mb-3 opacity-30" />
          <p className="font-medium">No se encontraron equipos</p>
        </div>
      )}
    </div>
  );
}
