import { motion } from 'framer-motion';
import type { RondaBracket, Partido } from '../../types';

interface Props { bracket: RondaBracket[] }

function MatchCard({ partido, delay }: { partido: Partido; delay: number }) {
  const isJugado = partido.estado === 'jugado';
  const localGana = isJugado && (partido.golesLocal ?? 0) > (partido.golesVisitante ?? 0);
  const visitGana = isJugado && (partido.golesVisitante ?? 0) > (partido.golesLocal ?? 0);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.3 }}
      className="w-52 rounded-lg border border-[#434933] bg-[#191D10] overflow-hidden hover:border-[#C8FF00]/50 transition-colors"
    >
      {[
        { equipo: partido.local,    goles: partido.golesLocal,     gana: localGana },
        { equipo: partido.visitante, goles: partido.golesVisitante, gana: visitGana },
      ].map(({ equipo, goles, gana }, i) => (
        <div
          key={equipo.id}
          className={[
            'flex items-center gap-2 px-3 py-2.5 transition-colors',
            i === 0 ? 'border-b border-[#434933]' : '',
            gana ? 'bg-[#1E2800]' : '',
          ].join(' ')}
        >
          <span className="text-base shrink-0">{equipo.escudo}</span>
          <span className={['text-xs font-medium flex-1 truncate', gana ? 'text-[#C8FF00]' : 'text-white'].join(' ')}>
            {equipo.nombre.split(' ').slice(0, 3).join(' ')}
          </span>
          {isJugado ? (
            <span className={['font-mono font-bold text-sm w-5 text-right', gana ? 'text-[#C8FF00]' : 'text-[#8E9479]'].join(' ')}>
              {goles}
            </span>
          ) : (
            <span className="font-mono text-[10px] text-[#5D6353]">–</span>
          )}
        </div>
      ))}
      <div className="px-3 py-1.5 bg-[#0C0F04] flex justify-between items-center">
        <span className="text-[9px] font-mono text-[#8E9479]">{partido.fecha}</span>
        <span className={[
          'text-[9px] font-mono font-bold uppercase tracking-widest',
          partido.estado === 'jugado' ? 'text-[#00E87A]' :
          partido.estado === 'en_curso' ? 'text-[#C8FF00]' : 'text-[#8E9479]',
        ].join(' ')}>
          {partido.estado === 'jugado' ? 'FIN' : partido.estado === 'en_curso' ? '● LIVE' : 'PEND'}
        </span>
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
                <div className="mb-4 px-2">
                  <span className="label-caps text-[#8E9479]">{ronda.nombre}</span>
                </div>
                <div className="flex flex-col" style={{ gap: `${Math.pow(2, rondaIdx) * 24 + 8}px` }}>
                  {ronda.partidos.map((partido, matchIdx) => (
                    <div
                      key={partido.id}
                      className="flex items-center"
                      style={{ marginTop: rondaIdx > 0 ? `${Math.pow(2, rondaIdx - 1) * 24}px` : undefined }}
                    >
                      <MatchCard partido={partido} delay={rondaIdx * 0.12 + matchIdx * 0.06} />
                    </div>
                  ))}
                </div>
              </div>

              {!isLast && (
                <div className="flex flex-col" style={{ width: 40, marginTop: 36 }}>
                  {ronda.partidos.map((_, i) => {
                    const pairsCount = Math.ceil(ronda.partidos.length / 2);
                    if (i % 2 !== 0) return null;
                    const matchHeight = 84;
                    const gap = Math.pow(2, rondaIdx) * 24 + 8;
                    const pairHeight = matchHeight * 2 + gap;
                    return (
                      <svg
                        key={i}
                        width={40}
                        height={pairHeight}
                        style={{ marginBottom: i / 2 < pairsCount - 1 ? gap : 0 }}
                        overflow="visible"
                      >
                        <path
                          d={`M 0 ${matchHeight / 2} H 20 V ${pairHeight / 2}`}
                          fill="none" stroke="#434933" strokeWidth="1.5"
                          className="bracket-line"
                        />
                        <path
                          d={`M 0 ${matchHeight + gap + matchHeight / 2} H 20 V ${pairHeight / 2}`}
                          fill="none" stroke="#434933" strokeWidth="1.5"
                          className="bracket-line"
                          style={{ animationDelay: '0.1s' }}
                        />
                        <path
                          d={`M 20 ${pairHeight / 2} H 40`}
                          fill="none" stroke="#C8FF0060" strokeWidth="1.5"
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
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col items-center ml-4 mt-9"
        >
          <p className="label-caps text-[#8E9479] mb-4">Gran Final</p>
          <div className="w-56 h-32 rounded-xl border-2 border-[#C8FF00] bg-[#1E2800] flex flex-col items-center justify-center glow-green-lg">
            <Trophy />
            <span className="label-caps text-[#C8FF00] mt-2">Ganador S1</span>
            <span className="font-display font-extrabold text-2xl text-white">?</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function Trophy() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#C8FF00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/>
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/>
      <path d="M4 22h16"/>
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/>
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/>
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>
    </svg>
  );
}
