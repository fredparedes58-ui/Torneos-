import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trophy, Users, Zap, Target, ArrowRight, Clock, CheckCircle2 } from 'lucide-react';
import { torneos, statsGlobales, getPartidosRecientes, getPartidosProximos } from '../data/mock';

const stagger = {
  container: { hidden: {}, show: { transition: { staggerChildren: 0.07 } } },
  item: { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.35 } } },
};

const stats = [
  { label: 'Torneos Activos',   value: statsGlobales.torneosActivos,  icon: Trophy,  color: '#C8FF00', bg: '#1E2800' },
  { label: 'Equipos Totales',   value: statsGlobales.totalEquipos,    icon: Users,   color: '#4E8FFF', bg: '#0D1A3A' },
  { label: 'Partidos Jugados',  value: statsGlobales.partidosJugados, icon: Zap,     color: '#00E87A', bg: '#002A1A' },
  { label: 'Goles Marcados',    value: statsGlobales.golesMarcados,   icon: Target,  color: '#FF3B5C', bg: '#2A000F' },
];

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { label: string; color: string; dot: string }> = {
    activo:     { label: 'En Curso',   color: '#C8FF00', dot: '#C8FF00' },
    proximo:    { label: 'PrÃ³ximo',    color: '#4E8FFF', dot: '#4E8FFF' },
    finalizado: { label: 'Finalizado', color: '#4A4A70', dot: '#2A2A45' },
  };
  const s = map[status];
  return (
    <span className="flex items-center gap-1.5 text-xs font-mono font-medium px-2 py-0.5 rounded-full border"
      style={{ color: s.color, borderColor: s.color + '40', background: s.color + '14' }}>
      <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: s.dot }} />
      {s.label}
    </span>
  );
}

export default function Dashboard() {
  const recientes = getPartidosRecientes().slice(0, 4);
  const proximos  = getPartidosProximos().slice(0, 3);

  return (
    <div className="min-h-screen p-6 lg:p-8 max-w-6xl mx-auto">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <p className="text-xs font-mono text-[#4A4A70] uppercase tracking-widest mb-1">
          Panel de Control
        </p>
        <h1 className="font-display font-extrabold text-5xl text-[#E8E8FF] uppercase tracking-tight leading-none">
          Dashboard
        </h1>
      </motion.div>

      {/* Stats */}
      <motion.div variants={stagger.container} initial="hidden" animate="show"
        className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
        {stats.map(({ label, value, icon: Icon, color, bg }) => (
          <motion.div key={label} variants={stagger.item}
            className="rounded-xl border border-[#1C1C32] p-4 flex flex-col gap-3 hover:border-[#2A2A45] transition-colors"
            style={{ background: '#0E0E1C' }}>
            <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: bg }}>
              <Icon size={18} style={{ color }} strokeWidth={2.5} />
            </div>
            <div>
              <p className="font-mono font-semibold text-3xl leading-none" style={{ color }}>
                {value}
              </p>
              <p className="text-xs text-[#4A4A70] mt-1 font-medium">{label}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid lg:grid-cols-5 gap-6">
        {/* Torneos activos */}
        <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
          className="lg:col-span-3 rounded-xl border border-[#1C1C32] bg-[#0E0E1C] overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-[#1C1C32]">
            <h2 className="font-display font-bold text-lg uppercase tracking-wider text-[#E8E8FF]">
              Torneos
            </h2>
            <Link to="/torneos" className="text-xs text-[#4A4A70] hover:text-[#C8FF00] flex items-center gap-1 transition-colors">
              Ver todos <ArrowRight size={12} />
            </Link>
          </div>
          <div className="divide-y divide-[#1C1C32]">
            {torneos.map(t => (
              <Link key={t.id} to={`/torneos/${t.id}`}
                className="flex items-center gap-4 px-5 py-3.5 hover:bg-[#13131F] transition-colors group">
                <span className="text-2xl shrink-0">{t.logo}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm text-[#E8E8FF] truncate group-hover:text-[#C8FF00] transition-colors">
                    {t.nombre}
                  </p>
                  <p className="text-xs text-[#4A4A70] mt-0.5">{t.categoria} Â· {t.totalEquipos} equipos</p>
                </div>
                <StatusBadge status={t.status} />
              </Link>
            ))}
          </div>
        </motion.div>

        {/* PrÃ³ximos partidos */}
        <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 }}
          className="lg:col-span-2 flex flex-col gap-4">

          {proximos.length > 0 && (
            <div className="rounded-xl border border-[#1C1C32] bg-[#0E0E1C] overflow-hidden">
              <div className="px-5 py-4 border-b border-[#1C1C32]">
                <h2 className="font-display font-bold text-lg uppercase tracking-wider text-[#E8E8FF] flex items-center gap-2">
                  <Clock size={16} className="text-[#4E8FFF]" /> PrÃ³ximos
                </h2>
              </div>
              <div className="divide-y divide-[#1C1C32]">
                {proximos.map(p => (
                  <div key={p.id} className="px-5 py-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-mono text-[#4A4A70] uppercase tracking-widest">
                        {p.fase ?? `J${p.jornada}`}
                      </span>
                      <span className="text-[10px] font-mono text-[#4E8FFF]">{p.hora}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-[#E8E8FF] font-medium truncate flex-1 text-right">{p.local.nombre}</span>
                      <span className="text-[10px] font-mono text-[#2A2A45] px-1.5 py-0.5 rounded bg-[#13131F] border border-[#1C1C32]">VS</span>
                      <span className="text-xs text-[#E8E8FF] font-medium truncate flex-1">{p.visitante.nombre}</span>
                    </div>
                    <p className="text-[10px] text-[#4A4A70] mt-1 font-mono">{p.fecha}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Ãšltimos resultados */}
          {recientes.length > 0 && (
            <div className="rounded-xl border border-[#1C1C32] bg-[#0E0E1C] overflow-hidden">
              <div className="px-5 py-4 border-b border-[#1C1C32]">
                <h2 className="font-display font-bold text-lg uppercase tracking-wider text-[#E8E8FF] flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-[#00E87A]" /> Resultados
                </h2>
              </div>
              <div className="divide-y divide-[#1C1C32]">
                {recientes.map(p => (
                  <div key={p.id} className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-[#4A4A70] truncate flex-1 text-right">{p.local.nombre}</span>
                      <span className="font-mono font-bold text-sm text-[#E8E8FF] px-2 py-0.5 rounded bg-[#13131F] border border-[#2A2A45] whitespace-nowrap">
                        {p.golesLocal} â€“ {p.golesVisitante}
                      </span>
                      <span className="text-xs text-[#4A4A70] truncate flex-1">{p.visitante.nombre}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

