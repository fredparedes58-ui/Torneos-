import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Trophy, Users, FileText, Zap, ArrowRight, MapPin, Calendar,
  Star, Activity, HeartPulse, Award, TrendingUp, PlusCircle, Sparkles as SparkIcon,
  Radio, Eye,
} from 'lucide-react';
import { torneos, statsGlobales, scoutingFeed, getPartidosLive } from '../data/mock';
import FloatingOrbs from '../components/effects/FloatingOrbs';
import Sparkles from '../components/effects/Sparkles';
import CounterUp from '../components/effects/CounterUp';
import Marquee from '../components/effects/Marquee';
import Avatar from '../components/effects/Avatar';

const stats = [
  { label: 'Torneos Activos', value: statsGlobales.torneosActivos, icon: Trophy,   hint: '+2 esta semana',     color: '#F2C53D' },
  { label: 'Jugadores U18',   value: statsGlobales.jugadoresU18,   icon: Users,    hint: '15 Proyectos Elite', color: '#7AB8FF' },
  { label: 'Informes',        value: statsGlobales.informes,       icon: FileText, hint: '86 nuevos hoy',      color: '#4DFFA0' },
  { label: 'Goles U12-U18',   value: statsGlobales.golesMarcados * 26, icon: Zap,  hint: 'Prom. 4.2 p/p',      color: '#FFD23B' },
];

const tagMap = {
  activo:     { label: 'EN VIVO',     cls: 'bg-[#F2C53D] text-[#0F1408]' },
  proximo:    { label: 'PRÓXIMO',     cls: 'bg-[#3A2A00] text-[#F2C53D] border border-[#F2C53D40]' },
  finalizado: { label: 'FINALIZADO',  cls: 'bg-[#282C1D] text-[#A5B084]' },
};

const toneMap = {
  green: { bg: 'bg-[#3A2A00]', color: 'text-[#F2C53D]', icon: Star,        ring: 'lime' as const },
  blue:  { bg: 'bg-[#102240]', color: 'text-[#7AB8FF]', icon: Activity,    ring: 'blue' as const },
  gold:  { bg: 'bg-[#2A1F00]', color: 'text-[#FFD23B]', icon: Award,       ring: 'gold' as const },
  red:   { bg: 'bg-[#2A000F]', color: 'text-[#FFC9C2]', icon: HeartPulse,  ring: 'red' as const },
};

export default function Dashboard() {
  const liveMatches = getPartidosLive();

  return (
    <div className="relative min-h-screen overflow-hidden">
      <FloatingOrbs variant="green" intensity="medium" />

      <div className="relative p-4 md:p-8 space-y-8 max-w-[1400px] mx-auto">
        {/* ━━━ Header ━━━ */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-4"
        >
          <div className="relative">
            <span className="label-caps text-[#F2C53D] mb-3 flex items-center gap-2 text-glow-green">
              <span className="w-2.5 h-2.5 rounded-full bg-[#F2C53D] pulse-dot" />
              Temporada 2026 · Youth Elite
            </span>
            <h1 className="headline-mega text-6xl md:text-8xl lg:text-9xl leading-[0.82]">
              <span className="gradient-text-cream">Panel de</span>
              <br />
              <span className="italic-accent">Cantera.</span>
            </h1>
            <p className="text-base text-[#D5DBB8] mt-5 font-body max-w-md leading-relaxed">
              Scouting profesional con corrección PHV. Detecta talento oculto en academias juveniles antes que nadie.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#F2C53D]/10 border border-[#F2C53D]/30 self-start">
              <span className="w-2 h-2 rounded-full bg-[#F2C53D] pulse-dot" />
              <span className="label-caps text-[#F2C53D]">
                {statsGlobales.scoutsActivos} Scouts Activos
              </span>
            </div>
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1A2010]/60 border border-[#5A6644] self-start">
              <Radio size={11} className="text-[#4DFFA0]" />
              <span className="label-caps text-[#4DFFA0]">{liveMatches.length} Partidos Live</span>
            </div>
          </div>
        </motion.div>

        {/* ━━━ Marquee de actividad ━━━ */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}
          className="rounded-xl border border-[#5A6644] bg-gradient-to-r from-[#1A2010] via-[#2A3320] to-[#1A2010] py-2"
        >
          <Marquee speed={45}>
            <span className="text-xs font-mono text-[#A5B084]">
              <span className="text-[#F2C53D]">●</span> LIVE · FC Barcelona A 2–1 Valencia CF · Minuto 74'
            </span>
            <span className="text-xs font-mono text-[#A5B084]">
              <span className="text-[#FFD23B]">▲</span> Marcus Vane lidera tabla de goleo · 24 G
            </span>
            <span className="text-xs font-mono text-[#A5B084]">
              <span className="text-[#7AB8FF]">●</span> 12 scouts conectados · 3 nuevos informes en queue
            </span>
            <span className="text-xs font-mono text-[#A5B084]">
              <span className="text-[#4DFFA0]">↑</span> +40% inscripciones esta semana
            </span>
            <span className="text-xs font-mono text-[#A5B084]">
              <span className="text-[#F2C53D]">★</span> Marc Bellini (Barça A · #10) — Jugador revelación U17
            </span>
          </Marquee>
        </motion.div>

        {/* ━━━ Stats bento ━━━ */}
        <motion.div
          initial="hidden" animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {stats.map(({ label, value, icon: Icon, hint, color }) => (
            <motion.div
              key={label}
              variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.4 } } }}
              className="relative glass-card rounded-xl p-5 group hover:border-[#F2C53D]/40 transition-all duration-300 overflow-hidden"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full blur-2xl" style={{ background: color, opacity: 0.15 }} />
              </div>
              <div className="relative flex justify-between items-start mb-4">
                <span className="label-caps text-[#D5DBB8]">{label}</span>
                <Icon size={18} style={{ color }} className="opacity-80" />
              </div>
              <div className="relative font-mono font-bold text-4xl text-white tracking-tight" style={{ color }}>
                <CounterUp to={value} />
              </div>
              <div className="relative mt-2 flex items-center gap-1.5">
                <TrendingUp size={11} className="text-[#F2C53D]" />
                <span className="text-xs text-[#A5B084] font-mono">{hint}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* ━━━ Main grid: torneos + scouting ━━━ */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Torneos */}
          <motion.div
            initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
            className="lg:col-span-2 space-y-5"
          >
            <div className="flex justify-between items-end">
              <div>
                <span className="label-caps text-[#A5B084] block mb-1">Calendario</span>
                <h2 className="font-display font-extrabold text-3xl md:text-4xl text-white uppercase tracking-tight leading-none">
                  Próximos <span className="italic-accent">Torneos Top</span>
                </h2>
              </div>
              <Link
                to="/torneos"
                className="text-[#F2C53D] label-caps flex items-center gap-1.5 hover:gap-2.5 transition-all group whitespace-nowrap"
              >
                Explorar <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {torneos.slice(0, 4).map((t, i) => {
                const tag = tagMap[t.status];
                return (
                  <motion.div
                    key={t.id}
                    initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + i * 0.08 }}
                  >
                    <Link
                      to={`/torneos/${t.id}`}
                      className="block relative bg-[#1A2010] rounded-xl overflow-hidden border border-[#5A6644] hover:border-[#F2C53D] transition-all duration-400 group tilt-hover"
                    >
                      {/* Hero image */}
                      <div className="h-44 relative overflow-hidden">
                        <img
                          src={t.heroImage}
                          alt=""
                          loading="lazy"
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                        />
                        <div className="absolute inset-0 pitch-bg opacity-60 mix-blend-overlay" />
                        <div className="absolute inset-0 stadium-overlay" />

                        {/* Top tags */}
                        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                          <span className={['px-2 py-1 text-[9px] font-bold rounded label-caps', tag.cls].join(' ')}>
                            {t.status === 'activo' && <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#0F1408] mr-1 pulse-dot" />}
                            {tag.label}
                          </span>
                          {t.tags?.[0] && (
                            <span className="px-2 py-1 text-[9px] font-bold rounded label-caps bg-[#0A0F00]/80 text-[#D5DBB8] backdrop-blur border border-[#7A8A55]">
                              {t.tags[0]}
                            </span>
                          )}
                        </div>

                        {/* Decorative emoji-shield bottom-right */}
                        <div className="absolute bottom-3 right-3 w-12 h-12 rounded-lg bg-[#1A2010]/70 backdrop-blur border border-[#F2C53D40] flex items-center justify-center font-display font-extrabold text-[#F2C53D] text-sm">
                          {t.logo}
                        </div>
                      </div>

                      {/* Body */}
                      <div className="p-4 relative">
                        <h3 className="font-display font-extrabold text-xl text-white mb-1 uppercase tracking-tight leading-tight group-hover:text-[#F2C53D] transition-colors">
                          {t.nombre}
                        </h3>
                        <div className="flex items-center gap-3 text-[#A5B084] font-mono text-[10px]">
                          <span className="flex items-center gap-1"><MapPin size={10} /> {t.sede?.split('·')[0]?.trim()}</span>
                          <span className="flex items-center gap-1"><Calendar size={10} /> {t.fechaInicio.slice(5, 10)}</span>
                        </div>
                      </div>

                      {/* Hover scan line */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                        <span className="scan-line" />
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Scouting feed + CTA */}
          <motion.div
            initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.35 }}
            className="space-y-5"
          >
            <div>
              <span className="label-caps text-[#A5B084] block mb-1">Tiempo real</span>
              <h2 className="font-display font-extrabold text-3xl text-white uppercase tracking-tight leading-none">
                Reporte de <span className="italic-accent">Scouting</span>
              </h2>
            </div>

            <div className="bg-[#1A2010]/80 backdrop-blur border border-[#5A6644] rounded-xl divide-y divide-[#5A6644] overflow-hidden">
              {scoutingFeed.map((item, i) => {
                const tone = toneMap[item.tone as keyof typeof toneMap];
                const Icon = tone.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 + i * 0.08 }}
                    className="p-4 flex gap-3 items-center hover:bg-[#2A3320] transition-colors group"
                  >
                    <div className="relative shrink-0">
                      <Avatar seed={item.avatarSeed} size={42} ring={tone.ring} />
                      <div className={['absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center', tone.bg].join(' ')}>
                        <Icon size={11} className={tone.color} />
                      </div>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold text-white truncate">{item.title}</p>
                      <p className="text-xs text-[#D5DBB8] truncate">{item.desc}</p>
                      <span className="text-[10px] font-mono text-[#A5B084]">{item.when}</span>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* CTA Premium */}
            <Link
              to="/nuevo"
              className="relative block bg-[#F2C53D] text-[#0F1408] p-5 rounded-xl glow-green-lg hover:scale-[1.02] transition-transform overflow-hidden group"
            >
              <Sparkles count={10} color="#0F1408" />
              <div className="relative flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <SparkIcon size={14} />
                    <span className="label-caps">Premium</span>
                  </div>
                  <p className="font-display font-extrabold text-2xl uppercase leading-tight">
                    Registrar<br />Nueva Academia
                  </p>
                  <p className="text-xs mt-2 opacity-80">Acceso a scouting profesional + heatmaps</p>
                </div>
                <PlusCircle size={36} className="float-y" />
              </div>
            </Link>
          </motion.div>
        </div>

        {/* ━━━ Live ticker / featured ━━━ */}
        {liveMatches.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
            className="rounded-2xl border border-[#5A6644] overflow-hidden relative"
          >
            <div className="absolute inset-0 pitch-bg opacity-50" />
            <div className="absolute inset-0 stadium-overlay-strong" />
            <div className="relative p-6 md:p-8 grid md:grid-cols-2 gap-6 items-center">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-2 h-2 rounded-full bg-[#FF6B7E] pulse-dot" />
                  <span className="label-caps text-[#FF6B7E]">Directo · Minuto {liveMatches[0].minuto}</span>
                </div>
                <h2 className="font-display font-extrabold text-3xl md:text-4xl text-white uppercase leading-none mb-2">
                  {liveMatches[0].local.nombre}
                  <span className="text-[#F2C53D] mx-3">vs</span>
                  {liveMatches[0].visitante.nombre}
                </h2>
                <p className="text-xs font-mono text-[#A5B084]">{liveMatches[0].pitch} · Semifinal</p>
              </div>
              <div className="flex items-center justify-center gap-6">
                <div className="text-center">
                  <p className="font-mono font-bold text-6xl md:text-7xl text-[#F2C53D] leading-none">
                    {liveMatches[0].golesLocal}
                  </p>
                  <p className="label-caps text-[#A5B084] mt-2">{liveMatches[0].local.escudo}</p>
                </div>
                <div className="font-display text-3xl text-[#7A8A55]">–</div>
                <div className="text-center">
                  <p className="font-mono font-bold text-6xl md:text-7xl text-white leading-none">
                    {liveMatches[0].golesVisitante}
                  </p>
                  <p className="label-caps text-[#A5B084] mt-2">{liveMatches[0].visitante.escudo}</p>
                </div>
              </div>
            </div>
            <div className="relative px-6 md:px-8 py-3 border-t border-[#5A6644] bg-[#0F1408]/60 flex items-center justify-between">
              <span className="label-caps text-[#A5B084] flex items-center gap-2">
                <Eye size={12} /> 2.4k espectadores
              </span>
              <button className="label-caps text-[#F2C53D] hover:underline flex items-center gap-1">
                Ver transmisión <ArrowRight size={11} />
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
