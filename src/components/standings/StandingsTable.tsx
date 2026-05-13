import { motion } from 'framer-motion';
import type { PosicionTabla } from '../../types';

interface Props { tabla: PosicionTabla[] }

const cols = [
  { key: 'pj',  label: 'PJ' },
  { key: 'pg',  label: 'PG' },
  { key: 'pe',  label: 'PE' },
  { key: 'pp',  label: 'PP' },
  { key: 'gf',  label: 'GF' },
  { key: 'gc',  label: 'GC' },
  { key: 'gd',  label: 'GD' },
  { key: 'pts', label: 'PTS' },
] as const;

export default function StandingsTable({ tabla }: Props) {
  return (
    <div className="overflow-x-auto rounded-xl border border-[#434933] bg-[#191D10]">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-[#434933] bg-[#282C1D]">
            <th className="text-left px-4 py-3 label-caps text-[#8E9479] w-8">#</th>
            <th className="text-left px-4 py-3 label-caps text-[#8E9479]">Equipo</th>
            {cols.map(c => (
              <th key={c.key} className={['text-center px-3 py-3 label-caps', c.key === 'pts' ? 'text-[#C8FF00]' : 'text-[#8E9479]'].join(' ')}>
                {c.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tabla.map((row, i) => {
            const isTop1   = i === 0;
            const isTop3   = i < 3;
            const isBottom = i >= tabla.length - 2;
            return (
              <motion.tr
                key={row.equipo.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04 }}
                className="border-b border-[#434933] hover:bg-[#282C1D] transition-colors group"
              >
                <td className="px-4 py-3 text-center">
                  <span className={[
                    'font-mono font-bold text-sm w-6 h-6 rounded flex items-center justify-center',
                    isTop1   ? 'bg-[#1E2800] text-[#C8FF00]' :
                    isTop3   ? 'text-[#B5C9D9]' :
                    isBottom ? 'text-[#FFB4AB]' : 'text-[#8E9479]',
                  ].join(' ')}>
                    {i + 1}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span className="text-lg shrink-0">{row.equipo.escudo}</span>
                    <span className="font-medium text-white group-hover:text-[#C8FF00] transition-colors whitespace-nowrap">
                      {row.equipo.nombre}
                    </span>
                  </div>
                </td>
                {cols.map(c => (
                  <td key={c.key} className={[
                    'px-3 py-3 text-center font-mono text-sm',
                    c.key === 'pts' ? 'font-bold text-[#C8FF00]' :
                    c.key === 'gd' && row[c.key] > 0 ? 'text-[#00E87A]' :
                    c.key === 'gd' && row[c.key] < 0 ? 'text-[#FFB4AB]' :
                    'text-[#C4CAAC]',
                  ].join(' ')}>
                    {c.key === 'gd' && row[c.key] > 0 ? `+${row[c.key]}` : row[c.key]}
                  </td>
                ))}
              </motion.tr>
            );
          })}
        </tbody>
      </table>

      <div className="flex gap-4 px-4 py-3 border-t border-[#434933] bg-[#282C1D]">
        <span className="flex items-center gap-2 text-[10px] text-[#8E9479] font-mono">
          <span className="w-3 h-3 rounded-sm bg-[#1E2800] border border-[#C8FF0060]" /> Clasificacion
        </span>
        <span className="flex items-center gap-2 text-[10px] text-[#8E9479] font-mono">
          <span className="w-3 h-3 rounded-sm bg-transparent border border-[#B5C9D9]" /> Playoff
        </span>
        <span className="flex items-center gap-2 text-[10px] text-[#8E9479] font-mono">
          <span className="w-3 h-3 rounded-sm bg-transparent border border-[#FFB4AB]" /> Descenso
        </span>
      </div>
    </div>
  );
}
