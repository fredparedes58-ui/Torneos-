import { motion } from 'framer-motion';
import type { Partido } from '../../types';

interface Props { partidos: Partido[] }

function groupByJornada(partidos: Partido[]) {
  const map = new Map<number, Partido[]>();
  for (const p of partidos) {
    if (!map.has(p.jornada)) map.set(p.jornada, []);
    map.get(p.jornada)!.push(p);
  }
  return Array.from(map.entries()).sort(([a], [b]) => a - b);
}

function MatchRow({ partido, delay }: { partido: Partido; delay: number }) {
  const isJugado = partido.estado === 'jugado';
  const localGana = isJugado && (partido.golesLocal ?? 0) > (partido.golesVisitante ?? 0);
  const visitGana = isJugado && (partido.golesVisitante ?? 0) > (partido.golesLocal ?? 0);
  const empate    = isJugado && !localGana && !visitGana;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.28 }}
      className="flex items-center gap-3 px-5 py-3 border-b border-[#7A8A55] last:border-0 hover:bg-[#282C1D] transition-colors"
    >
      <div className="w-14 shrink-0 text-right">
        <p className="font-mono text-[10px] text-[#D5DBB8]">{partido.hora}</p>
        <p className="font-mono text-[9px] text-[#A5B084]">{partido.fecha.slice(5)}</p>
      </div>

      <div className="flex items-center gap-2 flex-1 justify-end">
        <span className={['text-sm font-medium truncate max-w-28', localGana ? 'text-[#D4FF1F]' : 'text-white'].join(' ')}>
          {partido.local.nombre}
        </span>
        <span className="text-lg shrink-0">{partido.local.escudo}</span>
      </div>

      <div className="flex items-center gap-1 shrink-0">
        {isJugado ? (
          <span className={[
            'font-mono font-bold text-base px-3 py-1 rounded-lg border',
            empate
              ? 'text-[#FFD23B] bg-[#FFD23B10] border-[#FFD23B40]'
              : 'text-white bg-[#0A0F00] border-[#7A8A55]',
          ].join(' ')}>
            {partido.golesLocal} – {partido.golesVisitante}
          </span>
        ) : (
          <span className="font-mono text-sm text-[#A5B084] px-3 py-1 rounded-lg border border-[#7A8A55] bg-[#191D10]">
            VS
          </span>
        )}
      </div>

      <div className="flex items-center gap-2 flex-1">
        <span className="text-lg shrink-0">{partido.visitante.escudo}</span>
        <span className={['text-sm font-medium truncate max-w-28', visitGana ? 'text-[#D4FF1F]' : 'text-white'].join(' ')}>
          {partido.visitante.nombre}
        </span>
      </div>

      <div className="w-12 shrink-0 text-right">
        <span className={[
          'text-[9px] font-mono font-bold uppercase tracking-widest',
          partido.estado === 'jugado'   ? 'text-[#4DFFA0]' :
          partido.estado === 'en_curso' ? 'text-[#D4FF1F]' : 'text-[#A5B084]',
        ].join(' ')}>
          {partido.estado === 'jugado' ? 'FIN' : partido.estado === 'en_curso' ? 'LIVE' : 'PEND'}
        </span>
      </div>
    </motion.div>
  );
}

export default function FixtureList({ partidos }: Props) {
  if (partidos.length === 0) {
    return (
      <div className="text-center py-16 text-[#A5B084]">
        <p className="font-medium">No hay partidos programados</p>
      </div>
    );
  }

  const groups = groupByJornada(partidos);

  return (
    <div className="flex flex-col gap-4">
      {groups.map(([jornada, ps], gi) => (
        <div key={jornada} className="rounded-xl border border-[#7A8A55] bg-[#191D10] overflow-hidden">
          <div className="px-5 py-3 border-b border-[#7A8A55] bg-[#282C1D] flex items-center gap-3">
            <span className="font-display font-bold text-sm uppercase tracking-widest text-[#D5DBB8]">
              {ps[0].fase ? ps[0].fase : `Jornada ${jornada}`}
            </span>
            <span className="text-[10px] font-mono text-[#A5B084]">
              {ps.length} {ps.length === 1 ? 'partido' : 'partidos'}
            </span>
          </div>
          {ps.map((p, pi) => (
            <MatchRow key={p.id} partido={p} delay={gi * 0.05 + pi * 0.04} />
          ))}
        </div>
      ))}
    </div>
  );
}
