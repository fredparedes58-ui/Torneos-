import { motion } from 'framer-motion';
import { Trophy } from 'lucide-react';
import type { RondaBracket, Partido } from '../../types';

interface Props { bracket: RondaBracket[] }

function MatchCard({ partido, delay }: { partido: Partido; delay: number }) {
  const isJugado = partido.estado === 'jugado';
  const isLive   = partido.estado === 'en_curso';
  const localGana = isJugado && (partido.golesLocal ?? 0) > (partido.golesVisitante ?? 0);
  const visitGana = isJugado && (partido.golesVisitante ?? 0) > (partido.golesLocal ?? 0);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.35 }}
      className={[
        'w-56 rounded-xl border bg-[#1A2010] overflow-hidden transition-all',
        isLive ? 'border-[#F2C53D] glow-green' : 'border-[#5A6644] hover:border-[#F2C53D]/50',
      ].join(' ')}
    >
      {/* Pitch label */}
      {partido.pitch && (
        <div className="px-3 py-1.5 bg-[#2A3320] flex justify-between items-center border-b border-[#5A6644]">
          <span className="label-caps text-[#A5B084]">{partido.pitch}</span>
          <span className={[
            'label-caps font-bold',
            isLive ? 'text-[#FF6B7E]' : isJugado ? 'text-[#4DFFA0]' : 'text-[#A5B084]',
          ].join(' ')}>
            {isLive ? `● ${partido.minuto}'` : isJugado ? 'FIN' : 'PEND'}
          </span>
        </div>
      )}

      {[
        { equipo: partido.local,    goles: partido.golesLocal,     gana: localGana },
        { equipo: partido.visitante, goles: partido.golesVisitante, gana: visitGana },
      ].map(({ equipo, goles, gana }, i) => (
        <div
          key={equipo.id}
          className={[
            'flex items-center gap-2 px-3 py-2.5 transition-colors relative',
            i === 0 ? 'border-b border-[#5A6644]' : '',
            gana ? 'bg-[#3A2A00]' : '',
          ].join(' ')}
        >
          {gana && <span className="absolute left-0 top-0 bottom-0 w-1 bg-[#F2C53D]" />}
          <div
            className="w-7 h-7 rounded font-mono font-bold text-[10px] flex items-center justify-center shrink-0"
            style={{ background: (equipo.color || '#2A3320') + '25', color: equipo.color, border: `1px solid ${equipo.color}50` }}
          >
            {equipo.escudo}
          </div>
          <span className={['text-xs font-medium flex-1 truncate', gana ? 'text-[#F2C53D] font-bold' : 'text-white'].join(' ')}>
            {equipo.nombre}
          </span>
          {(isJugado || isLive) ? (
            <span className={['font-mono font-bold text-sm w-5 text-right', gana ? 'text-[#F2C53D]' : 'text-[#A5B084]'].join(' ')}>
              {goles}
            </span>
          ) : (
            <span className="font-mono text-[10px] text-[#7A8A55]">–</span>
          )}
        </div>
      ))}

      {/* Date footer */}
      <div className="px-3 py-1.5 bg-[#0A0F00]/80 flex justify-between items-center">
        <span className="text-[9px] font-mono text-[#A5B084]">{partido.fecha}</span>
        <span className="text-[9px] font-mono text-[#A5B084]">{partido.hora}</span>
      </div>
    </motion.div>
  );
}

export default function BracketView({ bracket }: Props) {
  return (
    <div className="overflow-x-auto pb-4">
      <div className="flex items-start gap-0 min-w-max">
        {bracket.map((ronda, rondaIdx) => {
          const isLast = rondaIdx === bracket.length - 1;
          return (
            <div key={ronda.nombre} className="flex items-start">
              <div className="flex flex-col">
                <div className="mb-5 px-2">
                  <span className="label-caps text-[#A5B084] block">{ronda.nombre}</span>
                  <span className="text-[10px] font-mono text-[#7A8A55]">
                    {ronda.partidos.length} {ronda.partidos.length === 1 ? 'partido' : 'partidos'}
                  </span>
                </div>
                <div className="flex flex-col" style={{ gap: `${Math.pow(2, rondaIdx) * 28 + 8}px` }}>
                  {ronda.partidos.map((partido, matchIdx) => (
                    <div
                      key={partido.id}
                      className="flex items-center"
                      style={{ marginTop: rondaIdx > 0 ? `${Math.pow(2, rondaIdx - 1) * 28}px` : undefined }}
                    >
                      <MatchCard partido={partido} delay={rondaIdx * 0.12 + matchIdx * 0.06} />
                    </div>
                  ))}
                </div>
              </div>

              {!isLast && (
                <div className="flex flex-col" style={{ width: 48, marginTop: 64 }}>
                  {ronda.partidos.map((_, i) => {
                    if (i % 2 !== 0) return null;
                    const matchHeight = 132;
                    const gap = Math.pow(2, rondaIdx) * 28 + 8;
                    const pairHeight = matchHeight * 2 + gap;
                    const pairsCount = Math.ceil(ronda.partidos.length / 2);
                    return (
                      <svg
                        key={i}
                        width={48}
                        height={pairHeight}
                        style={{ marginBottom: i / 2 < pairsCount - 1 ? gap : 0 }}
                        overflow="visible"
                      >
                        <path
                          d={`M 0 ${matchHeight / 2} H 24 V ${pairHeight / 2}`}
                          fill="none" stroke="#7A8A55" strokeWidth="1.5"
                          className="bracket-line"
                        />
                        <path
                          d={`M 0 ${matchHeight + gap + matchHeight / 2} H 24 V ${pairHeight / 2}`}
                          fill="none" stroke="#7A8A55" strokeWidth="1.5"
                          className="bracket-line"
                          style={{ animationDelay: '0.1s' }}
                        />
                        <path
                          d={`M 24 ${pairHeight / 2} H 48`}
                          fill="none" stroke="#F2C53D" strokeOpacity="0.7" strokeWidth="1.5"
                          className="bracket-line"
                          style={{ animationDelay: '0.2s' }}
                        />
                      </svg>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}

        {/* Champion */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col items-center ml-6 mt-12"
        >
          <span className="label-caps text-[#A5B084] mb-4">Trofeo</span>
          <div className="relative w-60 h-40 rounded-2xl bg-gradient-to-br from-[#3A2A00] to-[#1A2010] border-2 border-[#F2C53D] flex flex-col items-center justify-center glow-green-lg overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 rounded-full bg-[#F2C53D] blur-3xl" />
            </div>
            <Trophy size={38} className="text-[#F2C53D] mb-2 relative float-y" strokeWidth={2.2} />
            <span className="label-caps text-[#F2C53D] relative">Gran Final</span>
            <span className="font-display font-extrabold text-4xl text-white relative">?</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
