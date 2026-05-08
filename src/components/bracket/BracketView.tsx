import { motion } from 'framer-motion';
import type { RondaBracket, Partido } from '../../types';

interface Props {
  bracket: RondaBracket[];
}

function MatchCard({ partido, delay }: { partido: Partido; delay: number }) {
  const isJugado = partido.estado === 'jugado';
  const localGana = isJugado && (partido.golesLocal ?? 0) > (partido.golesVisitante ?? 0);
  const visitGana = isJugado && (partido.golesVisitante ?? 0) > (partido.golesLocal ?? 0);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.3 }}
      className="w-44 rounded-lg border border-[#1C1C32] bg-[#0E0E1C] overflow-hidden"
    >
      {/* Team row */}
      {[
        { equipo: partido.local,    goles: partido.golesLocal,     gana: localGana },
        { equipo: partido.visitante, goles: partido.golesVisitante, gana: visitGana },
      ].map(({ equipo, goles, gana }, i) => (
        <div
          key={equipo.id}
          className={[
            'flex items-center gap-2 px-3 py-2 transition-colors',
            i === 0 ? 'border-b border-[#1C1C32]' : '',
            gana ? 'bg-[#1E2800]' : '',
          ].join(' ')}
        >
          <span className="text-base shrink-0">{equipo.escudo}</span>
          <span className={['text-xs font-medium flex-1 truncate', gana ? 'text-[#C8FF00]' : 'text-[#E8E8FF]'].join(' ')}>
            {equipo.nombre.split(' ').slice(0, 2).join(' ')}
          </span>
          {isJugado && (
            <span className={['font-mono font-bold text-sm w-5 text-right', gana ? 'text-[#C8FF00]' : 'text-[#4A4A70]'].join(' ')}>
              {goles}
            </span>
          )}
          {!isJugado && (
            <span className="font-mono text-[10px] text-[#2A2A45]">â€“</span>
          )}
        </div>
      ))}
      {/* Date row */}
      <div className="px-3 py-1.5 bg-[#13131F] flex justify-between items-center">
        <span className="text-[9px] font-mono text-[#4A4A70]">{partido.fecha}</span>
        <span className={[
          'text-[9px] font-mono font-medium uppercase',
          partido.estado === 'jugado' ? 'text-[#00E87A]' : partido.estado === 'en_curso' ? 'text-[#C8FF00]' : 'text-[#4A4A70]',
        ].join(' ')}>
          {partido.estado === 'jugado' ? 'FIN' : partido.estado === 'en_curso' ? 'â— LIVE' : 'PEND'}
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
          const totalRondas = bracket.length;
          const isLast = rondaIdx === totalRondas - 1;

          return (
            <div key={ronda.nombre} className="flex items-start">
              {/* Ronda column */}
              <div className="flex flex-col">
                {/* Ronda label */}
                <div className="mb-4 px-2">
                  <span className="font-display font-bold text-sm uppercase tracking-widest text-[#4A4A70]">
                    {ronda.nombre}
                  </span>
                </div>

                {/* Matches with vertical spacing */}
                <div
                  className="flex flex-col"
                  style={{ gap: `${Math.pow(2, rondaIdx) * 24 + 8}px` }}
                >
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

              {/* Connector SVG */}
              {!isLast && (
                <div className="flex flex-col" style={{ width: 40, marginTop: 36 }}>
                  {ronda.partidos.map((_, i) => {
                    const pairsCount = Math.ceil(ronda.partidos.length / 2);
                    if (i % 2 !== 0) return null;
                    const matchHeight = 72;
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
                        {/* Top branch */}
                        <path
                          d={`M 0 ${matchHeight / 2} H 20 V ${pairHeight / 2}`}
                          fill="none" stroke="#2A2A45" strokeWidth="1.5"
                          className="bracket-line"
                        />
                        {/* Bottom branch */}
                        <path
                          d={`M 0 ${matchHeight + gap + matchHeight / 2} H 20 V ${pairHeight / 2}`}
                          fill="none" stroke="#2A2A45" strokeWidth="1.5"
                          className="bracket-line"
                          style={{ animationDelay: '0.1s' }}
                        />
                        {/* Right connector */}
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

        {/* Champion placeholder */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col items-center ml-2 mt-9"
        >
          <p className="font-display font-bold text-sm uppercase tracking-widest text-[#4A4A70] mb-4">
            CampeÃ³n
          </p>
          <div className="w-24 h-24 rounded-full border-2 border-dashed border-[#C8FF0040] flex items-center justify-center glow-pulse">
            <span className="text-3xl">ðŸ†</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

