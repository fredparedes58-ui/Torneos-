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
      className="flex items-center gap-3 px-5 py-3 border-b border-[#1C1C32] last:border-0 hover:bg-[#13131F] transition-colors"
    >
      {/* Hora/fecha */}
      <div className="w-14 shrink-0 text-right">
        <p className="font-mono text-[10px] text-[#4A4A70]">{partido.hora}</p>
        <p className="font-mono text-[9px] text-[#2A2A45]">{partido.fecha.slice(5)}</p>
      </div>

      {/* Local */}
      <div className="flex items-center gap-2 flex-1 justify-end">
        <span className={['text-sm font-medium truncate max-w-28', localGana ? 'text-[#C8FF00]' : 'text-[#E8E8FF]'].join(' ')}>
          {partido.local.nombre}
        </span>
        <span className="text-lg shrink-0">{partido.local.escudo}</span>
      </div>

      {/* Score */}
      <div className="flex items-center gap-1 shrink-0">
        {isJugado ? (
          <span className={[
            'font-mono font-bold text-base px-3 py-1 rounded-lg border',
            empate
              ? 'text-[#FFB800] bg-[#1A1400] border-[#FFB80030]'
              : 'text-[#E8E8FF] bg-[#13131F] border-[#2A2A45]',
          ].join(' ')}>
            {partido.golesLocal} â€“ {partido.golesVisitante}
          </span>
        ) : (
          <span className="font-mono text-sm text-[#2A2A45] px-3 py-1 rounded-lg border border-[#1C1C32] bg-[#0E0E1C]">
            VS
          </span>
        )}
      </div>

      {/* Visitante */}
      <div className="flex items-center gap-2 flex-1">
        <span className="text-lg shrink-0">{partido.visitante.escudo}</span>
        <span className={['text-sm font-medium truncate max-w-28', visitGana ? 'text-[#C8FF00]' : 'text-[#E8E8FF]'].join(' ')}>
          {partido.visitante.nombre}
        </span>
      </div>

      {/* Status */}
      <div className="w-12 shrink-0 text-right">
        <span className={[
          'text-[9px] font-mono font-semibold uppercase',
          partido.estado === 'jugado' ? 'text-[#00E87A]' :
          partido.estado === 'en_curso' ? 'text-[#C8FF00]' : 'text-[#4A4A70]',
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
      <div className="text-center py-16 text-[#4A4A70]">
        <p className="font-medium">No hay partidos programados</p>
      </div>
    );
  }

  const groups = groupByJornada(partidos);

  return (
    <div className="flex flex-col gap-4">
      {groups.map(([jornada, ps], gi) => (
        <div key={jornada} className="rounded-xl border border-[#1C1C32] bg-[#0E0E1C] overflow-hidden">
          <div className="px-5 py-3 border-b border-[#1C1C32] bg-[#13131F] flex items-center gap-3">
            <span className="font-display font-bold text-sm uppercase tracking-widest text-[#4A4A70]">
              {ps[0].fase ? ps[0].fase : `Jornada ${jornada}`}
            </span>
            <span className="text-[10px] font-mono text-[#2A2A45]">
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

