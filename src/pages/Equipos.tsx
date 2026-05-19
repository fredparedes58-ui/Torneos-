import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, ArrowDownAZ, ShieldCheck, Target, Award, MapPin, EyeOff, Trophy } from 'lucide-react';
import { torneos } from '../data/mock';
import type { Equipo } from '../types';
import FloatingOrbs from '../components/effects/FloatingOrbs';
import CounterUp from '../components/effects/CounterUp';
import Avatar from '../components/effects/Avatar';

type ExtendedEquipo = Equipo & { torneo: string };

const divisionColorMap: Record<string, { ring: string; ringAlpha: string; text: string }> = {
  'Pro A':  { ring: '#F2C53D', ringAlpha: 'rgba(242,197,61,0.4)',  text: 'text-[#F2C53D]' },
  'Pro B':  { ring: '#FFC9C2', ringAlpha: 'rgba(255,180,171,0.3)', text: 'text-[#FFC9C2]' },
  'Cadete': { ring: '#7AB8FF', ringAlpha: 'rgba(78,143,255,0.3)',  text: 'text-[#7AB8FF]' },
};

export default function Equipos() {
  const [query, setQuery] = useState('');
  const [sortBy, setSortBy] = useState<'rank' | 'name' | 'rating'>('rank');

  const allEquipos = useMemo<ExtendedEquipo[]>(() => {
    const result: ExtendedEquipo[] = [];
    const seen = new Set<string>();
    torneos.forEach(t => {
      t.equipos.forEach(e => {
        if (!seen.has(e.id)) {
          seen.add(e.id);
          result.push({ ...e, torneo: t.nombre });
        }
      });
    });
    return result;
  }, []);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    const arr = allEquipos.filter(e =>
      e.nombre.toLowerCase().includes(q) ||
      e.ciudad.toLowerCase().includes(q) ||
      e.jugadorEstrella?.nombre.toLowerCase().includes(q)
    );
    if (sortBy === 'name')   arr.sort((a, b) => a.nombre.localeCompare(b.nombre));
    if (sortBy === 'rank')   arr.sort((a, b) => (a.rank ?? 99) - (b.rank ?? 99));
    if (sortBy === 'rating') arr.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
    return arr;
  }, [allEquipos, query, sortBy]);

  const totalGoles  = allEquipos.reduce((acc, e) => acc + (e.jugadorEstrella?.goles ?? 0), 0);
  const avgRating   = (allEquipos.reduce((acc, e) => acc + (e.rating ?? 0), 0) / allEquipos.length).toFixed(1);
  const totalParadas = allEquipos.reduce((acc, e) => acc + (e.jugadorEstrella?.paradas ?? 0), 0);

  return (
    <div className="relative min-h-screen overflow-hidden">
      <FloatingOrbs variant="mixed" intensity="subtle" />

      <div className="relative p-4 md:p-8 space-y-8 max-w-[1400px] mx-auto">
        {/* ━━━ Hero ━━━ */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <span className="label-caps text-[#F2C53D] mb-3 flex items-center gap-2 text-glow-green">
            <span className="w-2 h-2 rounded-full bg-[#F2C53D] pulse-dot" />
            Scouting Directory v4.2
          </span>
          <h1 className="headline-mega text-6xl md:text-8xl lg:text-9xl leading-[0.82]">
            <span className="gradient-text-cream">Directorio de</span>
            <br />
            <span className="italic-accent">Equipos.</span>
          </h1>
          <p className="text-base text-[#D5DBB8] mt-5 font-body max-w-xl leading-relaxed">
            Explora la élite competitiva. Estadísticas en tiempo real y perfiles de los jugadores estrella que dominan el campo.
          </p>
        </motion.div>

        {/* ━━━ Search + Sort ━━━ */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
          className="flex flex-col sm:flex-row gap-3"
        >
          <div className="relative flex-1">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A5B084]" />
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Buscar equipo o jugador..."
              className="w-full bg-[#2A3320]/80 backdrop-blur border border-[#5A6644] rounded-xl pl-12 pr-4 py-3.5 text-sm text-white placeholder-[#A5B084] focus:outline-none focus:border-[#F2C53D] transition-colors"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setSortBy('rank')}
              className={[
                'px-4 py-3.5 rounded-xl label-caps transition-colors flex items-center gap-2 border',
                sortBy === 'rank'
                  ? 'bg-[#2A3320] text-white border-[#7A8A55]'
                  : 'bg-transparent text-[#A5B084] border-[#5A6644] hover:text-white',
              ].join(' ')}
            >
              <Filter size={14} /> Rank
            </button>
            <button
              onClick={() => setSortBy('name')}
              className={[
                'px-4 py-3.5 rounded-xl label-caps transition-colors flex items-center gap-2 border',
                sortBy === 'name'
                  ? 'bg-[#2A3320] text-white border-[#7A8A55]'
                  : 'bg-transparent text-[#A5B084] border-[#5A6644] hover:text-white',
              ].join(' ')}
            >
              <ArrowDownAZ size={14} /> A-Z
            </button>
            <button
              onClick={() => setSortBy('rating')}
              className={[
                'px-4 py-3.5 rounded-xl label-caps transition-colors flex items-center gap-2 border',
                sortBy === 'rating'
                  ? 'bg-[#F2C53D] text-[#1F2818] border-[#F2C53D]'
                  : 'bg-transparent text-[#A5B084] border-[#5A6644] hover:text-white',
              ].join(' ')}
            >
              <Award size={14} /> Rating
            </button>
          </div>
        </motion.div>

        {/* ━━━ Stats overview ━━━ */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3"
        >
          <div className="rounded-xl border border-[#5A6644] bg-[#2A3320]/60 backdrop-blur p-4">
            <span className="label-caps text-[#A5B084] block mb-2">Equipos</span>
            <p className="font-mono font-bold text-2xl text-white"><CounterUp to={allEquipos.length} /></p>
          </div>
          <div className="rounded-xl border border-[#5A6644] bg-[#2A3320]/60 backdrop-blur p-4">
            <span className="label-caps text-[#A5B084] block mb-2">Goles Totales</span>
            <p className="font-mono font-bold text-2xl text-[#F2C53D]"><CounterUp to={totalGoles} /></p>
          </div>
          <div className="rounded-xl border border-[#5A6644] bg-[#2A3320]/60 backdrop-blur p-4">
            <span className="label-caps text-[#A5B084] block mb-2">Paradas</span>
            <p className="font-mono font-bold text-2xl text-[#7AB8FF]"><CounterUp to={totalParadas} /></p>
          </div>
          <div className="rounded-xl border border-[#5A6644] bg-[#2A3320]/60 backdrop-blur p-4">
            <span className="label-caps text-[#A5B084] block mb-2">Avg Rating</span>
            <p className="font-mono font-bold text-2xl text-[#FFD23B]">{avgRating}</p>
          </div>
        </motion.div>

        {/* ━━━ Grid ━━━ */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          initial="hidden" animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
        >
          {filtered.map((equipo) => {
            const divColor = divisionColorMap[equipo.division ?? 'Cadete'] ?? divisionColorMap['Cadete'];
            const isOculto = !equipo.jugadorEstrella;

            return (
              <motion.div
                key={equipo.id}
                variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.35 } } }}
                className="relative rounded-2xl overflow-hidden bg-[#2A3320] border-2 hover:scale-[1.02] transition-all group"
                style={{
                  borderColor: divColor.ringAlpha,
                  boxShadow: `0 8px 30px ${divColor.ringAlpha}`,
                }}
              >
                {/* ambient image overlay */}
                <div className="absolute inset-0 pitch-bg opacity-30" />

                <div className="relative p-5">
                  {/* Top: name + division */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className={['font-display font-extrabold text-xl uppercase leading-tight tracking-tight', isOculto ? 'text-[#A5B084]' : 'text-white'].join(' ')}>
                        {equipo.nombre}
                      </h3>
                      <span className={['label-caps mt-1 block', divColor.text].join(' ')}>
                        División {equipo.division ?? 'Cadete'}
                      </span>
                    </div>

                    {/* Shield monogram */}
                    <div
                      className="w-11 h-11 rounded-lg flex items-center justify-center font-display font-extrabold text-sm shrink-0"
                      style={{
                        background: (equipo.color || '#374028') + '20',
                        border: `2px solid ${equipo.color}50`,
                        color: equipo.color,
                      }}
                    >
                      {equipo.escudo}
                    </div>
                  </div>

                  {/* Jugador estrella */}
                  {equipo.jugadorEstrella ? (
                    <div className="rounded-xl bg-[#374028]/60 border border-[#7A8A55] p-3 mb-4">
                      <span className="label-caps text-[#A5B084] block mb-2">Jugador Estrella</span>
                      <div className="flex items-center gap-3">
                        <Avatar seed={equipo.jugadorEstrella.avatarSeed} size={44} ring="lime" />
                        <div className="min-w-0 flex-1">
                          <p className="font-display font-extrabold text-base text-white uppercase truncate">{equipo.jugadorEstrella.nombre}</p>
                          <p className="text-[10px] text-[#D5DBB8] font-mono uppercase tracking-wider">{equipo.jugadorEstrella.posicion} · #{equipo.jugadorEstrella.numero}</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="rounded-xl bg-[#374028]/40 border border-[#7A8A55] p-4 mb-4 flex items-center justify-center gap-2 text-[#A5B084]">
                      <EyeOff size={14} />
                      <span className="label-caps">Equipo Reservado</span>
                    </div>
                  )}

                  {/* Stats footer */}
                  <div className="grid grid-cols-3 gap-2 pt-3 border-t border-[#5A6644]">
                    {equipo.jugadorEstrella?.goles !== undefined && (
                      <div>
                        <p className="label-caps text-[#A5B084] mb-1 flex items-center gap-1"><Target size={9} /> Goles</p>
                        <p className="font-mono font-bold text-[#F2C53D] text-xl">{equipo.jugadorEstrella.goles}</p>
                      </div>
                    )}
                    {equipo.jugadorEstrella?.paradas !== undefined && (
                      <div>
                        <p className="label-caps text-[#A5B084] mb-1 flex items-center gap-1"><ShieldCheck size={9} /> Paradas</p>
                        <p className="font-mono font-bold text-[#7AB8FF] text-xl">{equipo.jugadorEstrella.paradas}</p>
                      </div>
                    )}
                    {equipo.jugadorEstrella?.asistencias !== undefined && (
                      <div>
                        <p className="label-caps text-[#A5B084] mb-1 flex items-center gap-1"><Award size={9} /> Asist.</p>
                        <p className="font-mono font-bold text-[#FFD23B] text-xl">{equipo.jugadorEstrella.asistencias}</p>
                      </div>
                    )}
                    <div>
                      <p className="label-caps text-[#A5B084] mb-1">PJ</p>
                      <p className="font-mono font-bold text-white text-xl">{equipo.matches ?? '–'}</p>
                    </div>
                    <div>
                      <p className="label-caps text-[#A5B084] mb-1">Rating</p>
                      <p className={['font-mono font-bold text-xl', divColor.text].join(' ')}>{equipo.rating ?? '–'}</p>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="mt-4 pt-3 border-t border-[#5A6644] flex items-center justify-between">
                    <span className="text-[10px] text-[#A5B084] font-mono flex items-center gap-1">
                      <MapPin size={9} /> {equipo.ciudad}
                    </span>
                    <span className="text-[10px] text-[#A5B084] font-mono flex items-center gap-1">
                      <Trophy size={9} /> {equipo.torneo.slice(0, 18)}...
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-[#A5B084]">
            <ShieldCheck size={48} className="mx-auto mb-3 opacity-30" />
            <p className="font-display font-bold text-xl uppercase">No se encontraron equipos</p>
          </div>
        )}
      </div>
    </div>
  );
}
