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
    <div className="overflow-x-auto rounded-xl border border-[#7A8A55] bg-[#191D10]">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-[#7A8A55] bg-[#282C1D]">
            <th className="text-left px-4 py-3 label-caps text-[#A5B084] w-8">#</th>
            <th className="text-left px-4 py-3 label-caps text-[#A5B084]">Equipo</th>
            {cols.map(c => (
              <th key={c.key} className={['text-center px-3 py-3 label-caps', c.key === 'pts' ? 'text-[#F2C53D]' : 'text-[#A5B084]'].join(' ')}>
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
                className="border-b border-[#7A8A55] hover:bg-[#282C1D] transition-colors group"
              >
                <td className="px-4 py-3 text-center">
                  <span className={[
                    'font-mono font-bold text-sm w-6 h-6 rounded flex items-center justify-center',
                    isTop1   ? 'bg-[#3A2A00] text-[#F2C53D]' :
                    isTop3   ? 'text-[#C9DBEC]' :
                    isBottom ? 'text-[#FFC9C2]' : 'text-[#A5B084]',
                  ].join(' ')}>
                    {i + 1}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span className="text-lg shrink-0">{row.equipo.escudo}</span>
                    <span className="font-medium text-white group-hover:text-[#F2C53D] transition-colors whitespace-nowrap">
                      {row.equipo.nombre}
                    </span>
                  </div>
                </td>
                {cols.map(c => (
                  <td key={c.key} className={[
                    'px-3 py-3 text-center font-mono text-sm',
                    c.key === 'pts' ? 'font-bold text-[#F2C53D]' :
                    c.key === 'gd' && row[c.key] > 0 ? 'text-[#4DFFA0]' :
                    c.key === 'gd' && row[c.key] < 0 ? 'text-[#FFC9C2]' :
                    'text-[#D5DBB8]',
                  ].join(' ')}>
                    {c.key === 'gd' && row[c.key] > 0 ? `+${row[c.key]}` : row[c.key]}
                  </td>
                ))}
              </motion.tr>
            );
          })}
        </tbody>
      </table>

      <div className="flex gap-4 px-4 py-3 border-t border-[#7A8A55] bg-[#282C1D]">
        <span className="flex items-center gap-2 text-[10px] text-[#A5B084] font-mono">
          <span className="w-3 h-3 rounded-sm bg-[#3A2A00] border border-[#F2C53D60]" /> Clasificacion
        </span>
        <span className="flex items-center gap-2 text-[10px] text-[#A5B084] font-mono">
          <span className="w-3 h-3 rounded-sm bg-transparent border border-[#C9DBEC]" /> Playoff
        </span>
        <span className="flex items-center gap-2 text-[10px] text-[#A5B084] font-mono">
          <span className="w-3 h-3 rounded-sm bg-transparent border border-[#FFC9C2]" /> Descenso
        </span>
      </div>
    </div>
  );
}
