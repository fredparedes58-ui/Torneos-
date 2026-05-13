import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trophy, Users, FileText, Zap, ArrowRight, MapPin, Calendar, Star, Activity, HeartPulse, PlusCircle, TrendingUp } from 'lucide-react';
import { torneos, statsGlobales } from '../data/mock';

const stagger = {
  container: { hidden: {}, show: { transition: { staggerChildren: 0.07 } } },
  item: { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.35 } } },
};

const stats = [
  { label: 'Torneos',         value: statsGlobales.torneosActivos.toString().padStart(2, '0'), icon: Trophy,    hint: 'En temporada' },
  { label: 'Jugadores U18',   value: '842',                                                     icon: Users,     hint: '15 proyectos elite' },
  { label: 'Informes',        value: '1,205',                                                   icon: FileText,  hint: '86 nuevos hoy' },
  { label: 'Goles U12-U18',   value: '3,128',                                                   icon: Zap,       hint: 'Prom. 4.2 p/p' },
];

const tagMap = {
  activo:     { label: 'En Curso',   className: 'bg-[#C8FF00] text-[#161F00]' },
  proximo:    { label: 'Proximo',    className: 'bg-[#333627] text-[#C4CAAC]' },
  finalizado: { label: 'Finalizado', className: 'bg-[#282C1D] text-[#8E9479]' },
};

const scoutingFeed = [
  { tone: 'green',  icon: Star,        title: 'Jugador Revelacion U15', desc: 'Lukas Meyer (Bayer Ac.) destaca en fase zonal.', when: 'Hace 45 min' },
  { tone: 'blue',   icon: Activity,    title: 'Metrica de Rendimiento', desc: 'Actualizacion de Heatmaps: Villarreal U18.',      when: 'Hace 3 horas' },
  { tone: 'red',    icon: HeartPulse,  title: 'Informe Medico Acad.',   desc: 'Baja por sobrecarga: Pivot Cantera A.',           when: 'Ayer' },
];

export default function Dashboard() {
  return (
    <div className="p-4 md:p-8 space-y-10">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-4"
      >
        <div>
          <span className="label-caps text-[#C8FF00] mb-2 block">Temporada 2026 — Youth Elite</span>
          <h1 className="font-display font-extrabold text-5xl md:text-6xl text-white leading-none uppercase tracking-tight">
            Panel de Cantera
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#C8FF00]/10 border border-[#C8FF00]/30">
            <span className="w-2 h-2 rounded-full bg-[#C8FF00] animate-pulse glow-green" />
            <span className="label-caps text-[#C8FF00]">12 Scouts Activos</span>
          </div>
        </div>
      </motion.div>

      {/* Stats bento */}
      <motion.div
        variants={stagger.container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {stats.map(({ label, value, icon: Icon, hint }) => (
          <motion.div
            key={label}
            variants={stagger.item}
            className="glass-card p-5 rounded-xl group hover:border-[#C8FF00]/50 transition-all duration-300"
          >
            <div className="flex justify-between items-start mb-4">
              <span className="label-caps text-[#C4CAAC]">{label}</span>
              <Icon size={18} className="text-[#C8FF00] opacity-70 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="font-mono font-semibold text-3xl text-white tracking-tight">{value}</div>
            <div className="mt-2 flex items-center gap-1.5">
              <TrendingUp size={11} className="text-[#C8FF00]" />
              <span className="text-xs text-[#8E9479] font-mono">{hint}</span>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Tournaments */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 space-y-5"
        >
          <div className="flex justify-between items-center">
            <h2 className="font-display font-bold text-2xl text-white uppercase tracking-tight">
              Proximos Torneos Top
            </h2>
            <Link
              to="/torneos"
              className="text-[#C8FF00] label-caps flex items-center gap-1.5 hover:gap-2.5 transition-all"
            >
              Explorar <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {torneos.slice(0, 4).map(t => {
              const tag = tagMap[t.status];
              return (
                <Link
                  key={t.id}
                  to={`/torneos/${t.id}`}
                  className="bg-[#191D10] rounded-xl overflow-hidden border border-[#434933] hover:border-[#C8FF00] transition-all duration-300 group"
                >
                  <div className="h-44 relative pitch-bg overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center text-[80px] opacity-30 group-hover:scale-105 transition-transform duration-500">
                      {t.logo}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#191D10] via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-3 flex items-center gap-2">
                      <span className={['px-2 py-0.5 text-[10px] font-bold rounded label-caps', tag.className].join(' ')}>
                        {tag.label}
                      </span>
                      <span className="text-white label-caps text-[10px] drop-shadow-md">
                        {t.categoria}
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-display font-bold text-xl text-white mb-2 uppercase tracking-tight group-hover:text-[#C8FF00] transition-colors">
                      {t.nombre}
                    </h3>
                    <div className="flex justify-between text-[#C4CAAC] font-mono text-xs">
                      <span className="flex items-center gap-1.5">
                        <MapPin size={12} /> {t.equipos[0]?.ciudad ?? 'Multisede'}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Calendar size={12} /> {t.fechaInicio.slice(0, 7)}
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </motion.div>

        {/* Scouting feed */}
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.25 }}
          className="space-y-5"
        >
          <h2 className="font-display font-bold text-2xl text-white uppercase tracking-tight">
            Reporte de Scouting
          </h2>

          <div className="bg-[#191D10] border border-[#434933] rounded-xl divide-y divide-[#434933] shadow-lg">
            {scoutingFeed.map(({ tone, icon: Icon, title, desc, when }, i) => {
              const toneMap = {
                green: { bg: 'bg-[#C8FF00]/10', color: 'text-[#C8FF00]' },
                blue:  { bg: 'bg-[#464556]',    color: 'text-[#C7C4D8]' },
                red:   { bg: 'bg-[#93000a]/40', color: 'text-[#FFB4AB]' },
              }[tone] ?? { bg: 'bg-[#282C1D]', color: 'text-white' };
              return (
                <div key={i} className="p-4 flex gap-3 items-center hover:bg-[#282C1D] transition-colors">
                  <div className={['w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0', toneMap.bg].join(' ')}>
                    <Icon size={18} className={toneMap.color} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-white">{title}</p>
                    <p className="text-xs text-[#C4CAAC]">{desc}</p>
                    <span className="text-[10px] font-mono text-[#8E9479]">{when}</span>
                  </div>
                </div>
              );
            })}
          </div>

          <Link
            to="/nuevo"
            className="bg-[#C8FF00] p-4 rounded-xl flex items-center justify-between glow-green-lg hover:scale-[1.02] transition-transform"
          >
            <div>
              <p className="text-[#161F00] font-bold leading-tight">Registrar Nuevo Torneo</p>
              <p className="text-[#161F00]/80 text-xs">Anade tu estructura de cantera.</p>
            </div>
            <PlusCircle size={32} className="text-[#161F00]" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
