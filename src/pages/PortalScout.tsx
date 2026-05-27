import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Video, BarChart3, Upload as UploadIcon, Bell, Play, Eye, ChevronRight,
  Sparkles as SparkIcon, Settings, Crown, LogOut,
} from 'lucide-react';
import FloatingOrbs from '../components/effects/FloatingOrbs';
import Sparkles from '../components/effects/Sparkles';
import Avatar from '../components/effects/Avatar';
import UploadDropzone from '../components/effects/UploadDropzone';

// Mock cuenta (simula scout ya autenticado)
const cuenta = {
  nombre: 'Marcos García',
  email: 'marcos.garcia@scoutsfc.es',
  tipo: 'individual' as const,
  plan: 'pro' as const,
  id: 'SCT-4721',
  avatarSeed: 47,
  categorias: ['Sub-15', 'Sub-17', 'Sub-19'],
  regiones: ['Cataluña', 'Madrid', 'C. Valenciana'],
  desde: '2026-03-15',
};

const highlights = [
  { titulo: 'GOLAZO de chilena · Marc Bellini',     torneo: 'MIC Football',        duracion: '0:45', visualizaciones: '1.2k', avatarSeed: 11, color: '#22D3EE' },
  { titulo: 'Triplete Marcus Vane vs Atletico Sur', torneo: 'Liga Invierno 2026',  duracion: '1:12', visualizaciones: '893',  avatarSeed: 21, color: '#84FF6E' },
  { titulo: 'Atajada milagrosa · Axel Drake',       torneo: 'Bilbao Intl. Cup',    duracion: '0:32', visualizaciones: '562',  avatarSeed: 23, color: '#A855F7' },
  { titulo: 'Doblete Javier Solis (Real Madrid)',   torneo: 'MIC Football',        duracion: '0:58', visualizaciones: '742',  avatarSeed: 12, color: '#FCD34D' },
  { titulo: 'Defensa épica Iker Larrazabal',        torneo: 'Donosti Cup',         duracion: '0:38', visualizaciones: '421',  avatarSeed: 17, color: '#F472B6' },
  { titulo: 'Asistencia Andoni Garcia',             torneo: 'Bilbao Intl. Cup',    duracion: '0:41', visualizaciones: '308',  avatarSeed: 16, color: '#22D3EE' },
];

const informes = [
  { jugador: 'Marc Bellini',     posicion: 'Delantero · #10', categoria: 'Sub-17', equipo: 'FC Barcelona A', score: 9.4, when: 'Hace 2h',   avatarSeed: 11, color: '#22D3EE' },
  { jugador: 'Marcus Vane',      posicion: 'Delantero · #10', categoria: 'Sub-19', equipo: 'Deportivo Norte', score: 9.2, when: 'Hace 6h',   avatarSeed: 21, color: '#84FF6E' },
  { jugador: 'Axel Drake',       posicion: 'Portero · #1',    categoria: 'Sub-19', equipo: 'FC Central',     score: 8.9, when: 'Ayer',      avatarSeed: 23, color: '#A855F7' },
  { jugador: 'Javier Solis',     posicion: 'MC · #8',         categoria: 'Sub-17', equipo: 'Real Madrid Y.', score: 9.1, when: 'Hace 2 d.', avatarSeed: 12, color: '#FCD34D' },
];

export default function PortalScout() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <FloatingOrbs variant="green" intensity="medium" />

      <div className="relative p-4 md:p-8 max-w-[1400px] mx-auto space-y-8">

        {/* ━━━ Welcome banner ━━━ */}
        <motion.div
          initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
          className="relative rounded-3xl border border-[#22D3EE]/50 bg-gradient-to-br from-[#0E2F3A] via-[#152849] to-[#1E3560] p-6 md:p-10 overflow-hidden glow-cyan"
        >
          <Sparkles count={15} color="#22D3EE" />
          <div className="absolute -top-32 -right-32 w-80 h-80 rounded-full bg-[#22D3EE] opacity-20 blur-[100px]" />
          <div className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full bg-[#A855F7] opacity-20 blur-[100px]" />

          <div className="relative flex flex-col md:flex-row items-start gap-5">
            <Avatar seed={cuenta.avatarSeed} size={88} ring="lime" />

            <div className="flex-1 min-w-0">
              <span className="label-caps text-[#84FF6E] mb-2 flex items-center gap-2 text-glow-lime">
                <span className="w-2 h-2 rounded-full bg-[#84FF6E] pulse-dot" />
                Portal Scout · Sesión activa
              </span>
              <h1 className="headline-mega text-4xl md:text-6xl gradient-text-cream leading-[0.9] mb-2">
                Bienvenido,<br />
                <span className="italic-accent">{cuenta.nombre}.</span>
              </h1>
              <div className="flex flex-wrap gap-2 mt-3">
                <span className="px-3 py-1 rounded-full bg-[#22D3EE]/15 border border-[#22D3EE]/40 text-[#22D3EE] text-[11px] font-mono font-bold uppercase tracking-widest flex items-center gap-1.5">
                  <Crown size={11} /> Plan Pro
                </span>
                <span className="px-3 py-1 rounded-full bg-[#152849]/80 border border-[#496588] text-[#CBDDF0] text-[11px] font-mono font-bold uppercase tracking-widest">
                  ID #{cuenta.id}
                </span>
                <span className="px-3 py-1 rounded-full bg-[#152849]/80 border border-[#496588] text-[#CBDDF0] text-[11px] font-mono uppercase tracking-widest">
                  {cuenta.categorias.length} categorías · {cuenta.regiones.length} regiones
                </span>
              </div>
            </div>

            <div className="flex gap-2 shrink-0">
              <button className="w-11 h-11 rounded-xl bg-[#152849] border border-[#2A4570] hover:border-[#22D3EE] hover:text-[#22D3EE] text-[#CBDDF0] flex items-center justify-center transition-colors" title="Ajustes">
                <Settings size={18} />
              </button>
              <button className="w-11 h-11 rounded-xl bg-[#152849] border border-[#2A4570] hover:border-[#FF5577] hover:text-[#FF5577] text-[#CBDDF0] flex items-center justify-center transition-colors" title="Cerrar sesión">
                <LogOut size={18} />
              </button>
            </div>
          </div>
        </motion.div>

        {/* ━━━ Capability cards ━━━ */}
        <motion.div
          initial="hidden" animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {[
            { icon: Video,     title: 'Videos IA',          count: '142', label: 'esta semana',         color: '#22D3EE' },
            { icon: BarChart3, title: 'Informes IA',        count: '38',  label: 'jugadores hoy',       color: '#84FF6E' },
            { icon: UploadIcon,title: 'Mis publicaciones',  count: '3',   label: 'subidas este mes',    color: '#FCD34D' },
            { icon: Bell,      title: 'Alertas activas',    count: '6',   label: 'jugadores radar',     color: '#A855F7' },
          ].map(c => {
            const Icon = c.icon;
            return (
              <motion.div key={c.title}
                variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.35 } } }}
                className="relative glass-card rounded-2xl p-5 hover:border-[#22D3EE]/40 transition-all group overflow-hidden"
              >
                <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full blur-2xl opacity-0 group-hover:opacity-30 transition-opacity" style={{ background: c.color }} />
                <div className="stat-ring mb-4" style={{ color: c.color, background: c.color + '15' }}>
                  <Icon size={26} />
                </div>
                <div className="flex items-baseline gap-2 mb-1">
                  <p className="font-mono font-bold text-3xl" style={{ color: c.color }}>{c.count}</p>
                  <span className="text-[10px] font-mono text-[#8FA3C0] uppercase tracking-widest">{c.label}</span>
                </div>
                <h3 className="font-display font-extrabold text-base text-white uppercase tracking-tight leading-tight">{c.title}</h3>
              </motion.div>
            );
          })}
        </motion.div>

        {/* ━━━ Highlights con IA ━━━ */}
        <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
          <div className="flex items-center justify-between mb-5">
            <div>
              <span className="label-caps text-[#8FA3C0] block mb-1">Generados hoy</span>
              <h2 className="headline-mega text-3xl text-white">
                Highlights <span className="italic-accent">con IA</span>
              </h2>
            </div>
            <button className="label-caps text-[#22D3EE] flex items-center gap-1.5 hover:gap-2.5 transition-all">
              Ver todos <ChevronRight size={14} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {highlights.map((v, i) => (
              <Link key={i} to={`/jugador/${v.avatarSeed}`}
                className="group relative rounded-2xl overflow-hidden border border-[#2A4570] bg-[#152849] hover:border-[#22D3EE] transition-all duration-400 cursor-pointer block"
              >
                <div className="aspect-video relative pitch-bg overflow-hidden">
                  <div className="absolute inset-0 stadium-overlay" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button className="play-btn group-hover:scale-110 transition-transform" aria-label="Play">
                      <Play size={22} fill="currentColor" />
                    </button>
                  </div>
                  <div className="absolute top-3 left-3">
                    <span className="px-2 py-1 rounded-full bg-[#0A1628]/80 backdrop-blur text-[10px] font-mono font-bold uppercase tracking-wider"
                          style={{ color: v.color, border: `1px solid ${v.color}60` }}>
                      IA · {v.torneo}
                    </span>
                  </div>
                  <div className="absolute bottom-3 right-3 px-2 py-1 rounded bg-[#0A1628]/85 backdrop-blur text-[10px] font-mono font-bold text-white">
                    {v.duracion}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-display font-bold text-base text-white uppercase tracking-tight leading-tight mb-2 group-hover:text-[#22D3EE] transition-colors line-clamp-2">
                    {v.titulo}
                  </h3>
                  <div className="flex items-center justify-between text-[10px] font-mono text-[#8FA3C0]">
                    <span className="flex items-center gap-1"><Eye size={10} /> {v.visualizaciones}</span>
                    <span>Auto-generado</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </motion.section>

        {/* ━━━ Informes IA recientes ━━━ */}
        <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
          <div className="flex items-center justify-between mb-5">
            <div>
              <span className="label-caps text-[#8FA3C0] block mb-1">Reportes técnicos</span>
              <h2 className="headline-mega text-3xl text-white">
                Informes <span className="italic-lime">IA</span>
              </h2>
            </div>
            <button className="label-caps text-[#22D3EE] flex items-center gap-1.5 hover:gap-2.5 transition-all">
              Ver todos <ChevronRight size={14} />
            </button>
          </div>

          <div className="rounded-2xl border border-[#2A4570] bg-[#152849]/60 backdrop-blur divide-y divide-[#2A4570] overflow-hidden">
            {informes.map((r, i) => (
              <Link key={i} to={`/jugador/${r.avatarSeed}`}
                className="flex items-center gap-4 p-4 hover:bg-[#1E3560] transition-colors group cursor-pointer">
                <Avatar seed={r.avatarSeed} size={44} ring="lime" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-white truncate group-hover:text-[#22D3EE] transition-colors">{r.jugador}</p>
                  <p className="text-xs text-[#CBDDF0] truncate">{r.posicion} · {r.categoria} · <span className="text-[#8FA3C0]">{r.equipo}</span></p>
                </div>
                <div className="text-right shrink-0">
                  <p className="font-mono font-bold text-xl" style={{ color: r.color }}>{r.score}</p>
                  <p className="text-[10px] font-mono text-[#8FA3C0] uppercase tracking-widest">rating IA</p>
                </div>
                <span className="text-[10px] font-mono text-[#8FA3C0] hidden sm:block whitespace-nowrap shrink-0 w-20 text-right">{r.when}</span>
                <ChevronRight size={16} className="text-[#496588] group-hover:text-[#22D3EE] transition-colors shrink-0" />
              </Link>
            ))}
          </div>
        </motion.section>

        {/* ━━━ Mis publicaciones / Upload ━━━ */}
        <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
          <div className="flex items-center justify-between mb-5">
            <div>
              <span className="label-caps text-[#8FA3C0] block mb-1">Tu contenido</span>
              <h2 className="headline-mega text-3xl text-white">
                Mis <span className="italic-purple">publicaciones</span>
              </h2>
            </div>
            <span className="text-xs text-[#8FA3C0] font-mono">
              <span className="text-[#FCD34D] font-bold">3</span> de ∞ · Plan Pro
            </span>
          </div>

          <UploadDropzone />

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              { name: 'Análisis táctico FCB U17.pdf', tipo: 'PDF', size: '4.2 MB', when: 'Hace 3 días',  color: '#FCD34D' },
              { name: 'Highlight personal #10.mp4',   tipo: 'MP4', size: '128 MB', when: 'Hace 1 semana', color: '#22D3EE' },
              { name: 'Notas Cup Daurada.md',          tipo: 'MD',  size: '12 KB',  when: 'Hace 2 semanas', color: '#A855F7' },
            ].map((p, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-[#152849]/60 border border-[#2A4570] hover:border-[#22D3EE]/50 transition-colors group cursor-pointer">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center font-mono font-bold text-[10px] shrink-0"
                     style={{ background: p.color + '20', color: p.color, border: `1px solid ${p.color}60` }}>
                  {p.tipo}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-white truncate group-hover:text-[#22D3EE] transition-colors">{p.name}</p>
                  <p className="text-[10px] font-mono text-[#8FA3C0]">{p.size} · {p.when}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* ━━━ Footer info ━━━ */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
          className="rounded-2xl border border-[#A855F7]/30 bg-gradient-to-br from-[#A855F7]/10 to-[#22D3EE]/5 p-5 flex flex-col md:flex-row items-start md:items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#A855F7]/20 border border-[#A855F7]/50 flex items-center justify-center shrink-0">
            <SparkIcon size={22} className="text-[#A855F7]" />
          </div>
          <div className="flex-1">
            <h3 className="font-display font-bold text-lg text-white uppercase tracking-tight mb-1">Llévalo al siguiente nivel</h3>
            <p className="text-xs text-[#CBDDF0]">Upgrade a Enterprise: 10 cuentas para tu equipo + API + white-label opcional.</p>
          </div>
          <button className="px-5 py-2.5 rounded-lg bg-[#A855F7] text-white label-caps glow-purple hover:scale-[1.03] transition-transform">
            Ver Enterprise →
          </button>
        </motion.div>
      </div>
    </div>
  );
}
