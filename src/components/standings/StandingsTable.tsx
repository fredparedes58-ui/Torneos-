import { motion } from 'framer-motion';
import type { PosicionTabla } from '../../types';

interface Props { tabla: PosicionTabla[] }

const cols = [
  { key: 'pj', label: 'PJ' },
  { key: 'pg', label: 'PG' },
  { key: 'pe', label: 'PE' },
  { key: 'pp', label: 'PP' },
  { key: 'gf', label: 'GF' },
  { key: 'gc', label: 'GC' },
  { key: 'gd', label: 'GD' },
  { key: 'pts', label: 'PTS' },
] as const;

export default function StandingsTable({ tabla }: Props) {
  return (
    <div className="overflow-x-auto rounded-xl border border-[#1C1C32]">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-[#1C1C32] bg-[#13131F]">
            <th className="text-left px-4 py-3 text-[10px] font-mono text-[#4A4A70] uppercase tracking-widest w-8">#</th>
            <th className="text-left px-4 py-3 text-[10px] font-mono text-[#4A4A70] uppercase tracking-widest">Equipo</th>
            {cols.map(c => (
              <th key={c.key} className={[
                'text-center px-3 py-3 text-[10px] font-mono uppercase tracking-widest',
                c.key === 'pts' ? 'text-[#C8FF00]' : 'text-[#4A4A70]',
              ].join(' ')}>
                {c.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tabla.map((row, i) => {
            const isTop3 = i < 3;
            const isBottom = i >= tabla.length - 2;
            return (
              <motion.tr
                key={row.equipo.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04 }}
                className={[
                  'border-b border-[#1C1C32] hover:bg-[#13131F] transition-colors group',
                ].join(' ')}
              >
                {/* Position */}
                <td className="px-4 py-3 text-center">
                  <span className={[
                    'font-mono font-semibold text-sm w-6 h-6 rounded flex items-center justify-center',
                    i === 0 ? 'bg-[#1E2800] text-[#C8FF00]' :
                    isTop3   ? 'text-[#4E8FFF]' :
                    isBottom ? 'text-[#FF3B5C]' : 'text-[#4A4A70]',
                  ].join(' ')}>
                    {i + 1}
                  </span>
                </td>

                {/* Team */}
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span className="text-lg shrink-0">{row.equipo.escudo}</span>
                    <span className="font-medium text-[#E8E8FF] group-hover:text-[#C8FF00] transition-colors whitespace-nowrap">
                      {row.equipo.nombre}
                    </span>
                  </div>
                </td>

                {/* Stats */}
                {cols.map(c => (
                  <td key={c.key} className={[
                    'px-3 py-3 text-center font-mono text-sm',
                    c.key === 'pts' ? 'font-bold text-[#C8FF00]' :
                    c.key === 'gd' && row[c.key] > 0 ? 'text-[#00E87A]' :
                    c.key === 'gd' && row[c.key] < 0 ? 'text-[#FF3B5C]' :
                    'text-[#4A4A70]',
                  ].join(' ')}>
                    {c.key === 'gd' && row[c.key] > 0 ? `+${row[c.key]}` : row[c.key]}
                  </td>
                ))}
              </motion.tr>
            );
          })}
        </tbody>
      </table>

      {/* Legend */}
      <div className="flex gap-4 px-4 py-3 border-t border-[#1C1C32] bg-[#13131F]">
        <span className="flex items-center gap-2 text-[10px] text-[#4A4A70]">
          <span className="w-3 h-3 rounded-sm bg-[#1E2800] border border-[#C8FF0040]" /> ClasificaciÃ³n
        </span>
        <span className="flex items-center gap-2 text-[10px] text-[#4A4A70]">
          <span className="w-3 h-3 rounded-sm bg-[#0D1A3A] border border-[#4E8FFF40]" /> Playoff
        </span>
        <span className="flex items-center gap-2 text-[10px] text-[#4A4A70]">
          <span className="w-3 h-3 rounded-sm bg-[#2A000F] border border-[#FF3B5C40]" /> Descenso
        </span>
      </div>
    </div>
  );
}

