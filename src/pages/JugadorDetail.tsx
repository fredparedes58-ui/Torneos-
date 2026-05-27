import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeft, Play, Target, Award, ShieldCheck, Activity, Calendar,
  MapPin, Trophy, Zap, TrendingUp, BarChart3, Video as VideoIcon,
  FileText, Bell, ChevronRight,
} from 'lucide-react';
import { torneos } from '../data/mock';
import FloatingOrbs from '../components/effects/FloatingOrbs';
import Sparkles from '../components/effects/Sparkles';
import CounterUp from '../components/effects/CounterUp';
import Avatar from '../components/effects/Avatar';

type Tab = 'stats' | 'highlights' | 'heatmap' | 'informes';

// PHV (Peak Height Velocity) heatmap zonas predefinidas — simulado por posición
const heatmapByPosicion: Record<string, { x: number; y: number; r: number; intensity: number }[]> = {
  Delantero: [
    { x: 75, y: 30, r: 24, intensity: 0.95 },
    { x: 82, y: 50, r: 30, intensity: 0.85 },
    { x: 78, y: 70, r: 22, intensity: 0.75 },
    { x: 60, y: 50, r: 18, intensity: 0.55 },
  ],
  Mediocampista: [
    { x: 50, y: 30, r: 22, intensity: 0.7 },
    { x: 55, y: 50, r: 32, intensity: 0.9 },
    { x: 50, y: 70, r: 22, intensity: 0.7 },
    { x: 65, y: 45, r: 16, intensity: 0.55 },
    { x: 35, y: 55, r: 14, intensity: 0.5 },
  ],
  Defensa: [
    { x: 25, y: 30, r: 22, intensity: 0.85 },
    { x: 28, y: 50, r: 28, intensity: 0.95 },
    { x: 22, y: 70, r: 22, intensity: 0.8 },
    { x: 45, y: 50, r: 14, intensity: 0.45 },
  ],
  Portero: [
    { x: 8,  y: 50, r: 22, intensity: 1.0 },
    { x: 14, y: 36, r: 14, intensity: 0.65 },
    { x: 14, y: 64, r: 14, intensity: 0.65 },
    { x: 20, y: 50, r: 12, intensity: 0.4 },
  ],
};

function getHeatmap(posicion: string) {
  const key = Object.keys(heatmapByPosicion).find(k => posicion.toLowerCase().includes(k.toLowerCase()));
  return key ? heatmapByPosicion[key] : heatmapByPosicion.Mediocampista;
}

export default function JugadorDetail() {
  const { seed } = useParams<{ seed: string }>();
  const seedNum = Number(seed);

  // Buscar jugador estrella por avatarSeed
  const found = torneos.flatMap(t => t.equipos.map(e => ({ equipo: e, torneo: t })))
    .find(({ equipo }) => equipo.jugadorEstrella?.avatarSeed === seedNum);

  const [tab, setTab] = useState<Tab>('stats');

  if (!found || !found.equipo.jugadorEstrella) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] text-[#8FA3C0] p-12">
        <Trophy size={48} className="mb-4 opacity-30" />
        <p className="font-display font-bold text-xl uppercase mb-2">Jugador no encontrado</p>
        <Link to="/equipos" className="text-[#22D3EE] label-caps mt-2">Volver al directorio</Link>
      </div>
    );
  }

  const j = found.equipo.jugadorEstrella;
  const eq = found.equipo;
  const torneoCtx = found.torneo;

  // Compute extra stats based on what's defined
  const goles = j.goles ?? 0;
  const asist = j.asistencias ?? 0;
  const paradas = j.paradas ?? 0;
  const phvCorrected = (j.rating - 0.3 + (seedNum % 5) * 0.1).toFixed(1);

  const heatmap = getHeatmap(j.posicion);

  const highlights = [
    { titulo: 'Golazo último partido',     duracion: '0:42', visualizaciones: '1.2k', color: '#22D3EE' },
    { titulo: 'Mejor jugada del torneo',    duracion: '0:38', visualizaciones: '893',  color: '#84FF6E' },
    { titulo: 'Asistencia decisiva',        duracion: '0:25', visualizaciones: '562',  color: '#FCD34D' },
    { titulo: 'Resumen rendimiento Q1',    duracion: '1:30', visualizaciones: '421',  color: '#A855F7' },
  ];

  const informes = [
    { titulo: 'Análisis técnico completo',   tipo: 'PDF', fecha: '2026-05-15', size: '4.2 MB', autor: 'IA Krujens', color: '#22D3EE' },
    { titulo: 'Comparativa vs U17 europeos', tipo: 'PDF', fecha: '2026-05-10', size: '2.8 MB', autor: 'IA Krujens', color: '#84FF6E' },
    { titulo: 'Notas de scouting',           tipo: 'MD',  fecha: '2026-05-02', size: '12 KB',  autor: 'Marcos García', color: '#FCD34D' },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden">
      <FloatingOrbs variant="green" intensity="medium" />

      {/* ━━━ HERO ━━━ */}
      <div className="relative">
        <div className="absolute inset-0 pitch-bg" />
        <div className="absolute inset-0 stadium-overlay-strong" />

        <div className="relative px-4 md:px-8 pt-6 pb-10 max-w-[1400px] mx-auto">
          <Link to="/equipos"
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#152849]/70 backdrop-blur text-xs text-[#CBDDF0] hover:text-white transition-colors border border-[#496588] mb-8">
            <ArrowLeft size={14} /> Volver al directorio
          </Link>

          <motion.div
            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row items-start gap-8"
          >
            {/* Avatar gigante */}
            <div className="relative shrink-0">
              <div className="absolute inset-0 rounded-full bg-[#22D3EE] opacity-30 blur-3xl scale-110" />
              <div className="relative">
                <Avatar seed={j.avatarSeed} size={200} ring="lime" />
              </div>
              {/* Numero */}
              <div className="absolute -bottom-3 -right-3 w-16 h-16 rounded-2xl bg-[#22D3EE] text-[#0A1628] flex items-center justify-center font-display font-extrabold text-3xl glow-cyan-lg">
                {j.numero}
              </div>
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <span className="label-caps text-[#22D3EE] mb-3 flex items-center gap-2 text-glow-cyan">
                <span className="w-2 h-2 rounded-full bg-[#22D3EE] pulse-dot" />
                Perfil scout · ID #{j.avatarSeed}
              </span>

              <h1 className="headline-mega text-5xl md:text-8xl text-glow-white leading-[0.85] mb-3 gradient-text-cream">
                {j.nombre}
              </h1>

              <p className="font-display font-bold text-2xl md:text-3xl italic-accent uppercase tracking-wider mb-5">
                {j.posicion}
              </p>

              <div className="flex flex-wrap gap-2 mb-5">
                <span className="px-3 py-1.5 rounded-full bg-[#152849]/70 backdrop-blur border border-[#22D3EE]/40 label-caps text-[#22D3EE] flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded font-mono font-bold text-[9px] flex items-center justify-center"
                    style={{ background: eq.color + '40', color: eq.color, border: `1px solid ${eq.color}` }}>
                    {eq.escudo}
                  </span>
                  {eq.nombre}
                </span>
                <span className="px-3 py-1.5 rounded-full bg-[#152849]/70 backdrop-blur border border-[#496588] label-caps text-[#CBDDF0]">
                  División {eq.division ?? 'Cadete'}
                </span>
                <span className="px-3 py-1.5 rounded-full bg-[#152849]/70 backdrop-blur border border-[#496588] label-caps text-[#CBDDF0]">
                  Rank #{(eq.rank ?? '–').toString().padStart(2, '0')}
                </span>
                <span className="px-3 py-1.5 rounded-full bg-[#A855F7]/15 border border-[#A855F7]/40 label-caps text-[#A855F7]">
                  Activo en {torneoCtx.nombre}
                </span>
              </div>

              <div className="flex flex-wrap gap-x-6 gap-y-2 text-[#CBDDF0] font-mono text-xs md:text-sm mb-6">
                <span className="flex items-center gap-1.5">
                  <MapPin size={13} className="text-[#22D3EE]" /> {eq.ciudad}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar size={13} className="text-[#22D3EE]" /> Temporada 2025-26
                </span>
                <span className="flex items-center gap-1.5">
                  <Trophy size={13} className="text-[#FCD34D]" /> {torneoCtx.categoria}
                </span>
              </div>

              <div className="flex flex-wrap gap-3">
                <button className="relative bg-gradient-to-r from-[#22D3EE] to-[#84FF6E] text-[#0A1628] label-caps px-6 py-3.5 rounded-lg glow-cyan-lg hover:scale-[1.02] transition-transform overflow-hidden flex items-center gap-2 btn-shimmer">
                  <Sparkles count={6} color="#0A1628" />
                  <Bell size={14} /><span className="relative">Añadir a radar</span>
                </button>
                <button className="bg-transparent text-white label-caps px-6 py-3.5 rounded-lg border border-[#496588] hover:border-[#22D3EE] transition-colors flex items-center gap-2">
                  <FileText size={14} /> Descargar informe PDF
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ━━━ Tabs sticky ━━━ */}
      <div className="sticky top-16 bg-[#0A1628]/95 backdrop-blur-xl z-30 border-b border-[#2A4570]">
        <div className="px-4 md:px-8 max-w-[1400px] mx-auto">
          <div className="flex gap-1 overflow-x-auto">
            {([
              { key: 'stats',      label: 'Stats',         icon: BarChart3 },
              { key: 'highlights', label: 'Highlights',    icon: VideoIcon },
              { key: 'heatmap',    label: 'Heatmap PHV',   icon: Target },
              { key: 'informes',   label: 'Informes',      icon: FileText },
            ] as { key: Tab; label: string; icon: React.ElementType }[]).map(t => {
              const Icon = t.icon;
              const active = tab === t.key;
              return (
                <button key={t.key} onClick={() => setTab(t.key)}
                  className={['flex items-center gap-2 px-5 py-4 label-caps border-b-2 transition-all -mb-px whitespace-nowrap',
                    active ? 'text-[#22D3EE] border-[#22D3EE]' : 'text-[#8FA3C0] border-transparent hover:text-white hover:border-[#496588]'].join(' ')}>
                  <Icon size={15} /> {t.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ━━━ Content ━━━ */}
      <motion.div
        key={tab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}
        className="relative p-4 md:p-8 max-w-[1400px] mx-auto"
      >
        {/* STATS TAB */}
        {tab === 'stats' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <StatCard icon={Award}      label="Rating"          value={j.rating.toFixed(1)} color="#22D3EE" hint="Score IA · 0-10" />
              <StatCard icon={Activity}   label="Rating PHV"      value={phvCorrected}         color="#84FF6E" hint="Corregido por maduración biológica" />
              {goles    > 0 && <StatCard icon={Target}     label="Goles"        value={String(goles)}    color="#FCD34D" hint="Temporada actual" />}
              {asist    > 0 && <StatCard icon={Zap}        label="Asistencias"  value={String(asist)}    color="#A855F7" hint="Temporada actual" />}
              {paradas  > 0 && <StatCard icon={ShieldCheck} label="Paradas"     value={String(paradas)}  color="#7AB8FF" hint="Temporada actual" />}
            </div>

            {/* Performance bars */}
            <div className="glass-card rounded-2xl p-6">
              <h3 className="headline-mega text-2xl text-white mb-5">Rendimiento por <span className="italic-accent">dimensión</span></h3>
              <div className="space-y-4">
                {[
                  { label: 'Técnica',          value: 92, color: '#22D3EE' },
                  { label: 'Físico',           value: 78, color: '#84FF6E' },
                  { label: 'Táctica',          value: 85, color: '#FCD34D' },
                  { label: 'Mentalidad',       value: 88, color: '#A855F7' },
                  { label: 'Trabajo en equipo', value: 90, color: '#F472B6' },
                ].map(b => (
                  <div key={b.label}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm font-medium text-white">{b.label}</span>
                      <span className="font-mono font-bold text-sm" style={{ color: b.color }}>{b.value}/100</span>
                    </div>
                    <div className="h-2 bg-[#0A1628] rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }} animate={{ width: `${b.value}%` }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                        className="h-full rounded-full"
                        style={{ background: `linear-gradient(90deg, ${b.color}80, ${b.color})` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent form */}
            <div className="glass-card rounded-2xl p-6">
              <h3 className="headline-mega text-2xl text-white mb-5">Forma <span className="italic-lime">reciente</span></h3>
              <div className="flex flex-wrap gap-2">
                {['W','W','D','W','L','W','W','D','W','W'].map((r, i) => (
                  <div key={i} className={[
                    'w-10 h-10 rounded-lg flex items-center justify-center font-mono font-bold text-sm',
                    r === 'W' ? 'bg-[#84FF6E]/20 text-[#84FF6E] border border-[#84FF6E]/40' :
                    r === 'D' ? 'bg-[#FCD34D]/20 text-[#FCD34D] border border-[#FCD34D]/40' :
                                'bg-[#FF5577]/20 text-[#FF5577] border border-[#FF5577]/40',
                  ].join(' ')}>{r}</div>
                ))}
              </div>
              <p className="text-xs text-[#8FA3C0] mt-3 font-mono">Últimos 10 partidos · 7G 2E 1P</p>
            </div>
          </div>
        )}

        {/* HIGHLIGHTS TAB */}
        {tab === 'highlights' && (
          <div className="space-y-6">
            {/* Featured player */}
            <div className="rounded-2xl border border-[#2A4570] bg-[#152849] overflow-hidden">
              <div className="aspect-video relative pitch-bg overflow-hidden">
                <div className="absolute inset-0 stadium-overlay" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <button className="play-btn scale-150 hover:scale-[1.65] transition-transform" aria-label="Reproducir">
                    <Play size={32} fill="currentColor" />
                  </button>
                </div>
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1.5 rounded-full bg-[#0A1628]/85 backdrop-blur text-[11px] font-mono font-bold uppercase tracking-wider text-[#22D3EE] border border-[#22D3EE]/60">
                    Highlight Reel · 2025-26
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                  <div>
                    <h3 className="font-display font-extrabold text-2xl md:text-4xl text-white uppercase leading-tight">Mejores jugadas</h3>
                    <p className="text-sm text-[#CBDDF0]">Compilación auto-generada por IA · 12 acciones destacadas</p>
                  </div>
                  <span className="px-2 py-1 rounded bg-[#0A1628]/85 text-xs font-mono text-white">2:45</span>
                </div>
              </div>
            </div>

            <h3 className="headline-mega text-2xl text-white">Clips <span className="italic-accent">recientes</span></h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {highlights.map((v, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                  className="rounded-2xl overflow-hidden border border-[#2A4570] bg-[#152849] hover:border-[#22D3EE] transition-all group cursor-pointer">
                  <div className="aspect-video relative pitch-bg">
                    <div className="absolute inset-0 stadium-overlay" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <button className="play-btn" aria-label="Play"><Play size={20} fill="currentColor" /></button>
                    </div>
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-[#0A1628]/85 text-[9px] font-mono font-bold"
                      style={{ color: v.color, border: `1px solid ${v.color}60` }}>IA</span>
                    <span className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-[#0A1628]/85 text-[9px] font-mono text-white">{v.duracion}</span>
                  </div>
                  <div className="p-3">
                    <p className="text-xs font-bold text-white mb-1 group-hover:text-[#22D3EE] transition-colors line-clamp-2">{v.titulo}</p>
                    <p className="text-[10px] font-mono text-[#8FA3C0]">{v.visualizaciones} views</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* HEATMAP TAB */}
        {tab === 'heatmap' && (
          <div className="space-y-6">
            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <span className="label-caps text-[#84FF6E] flex items-center gap-2 mb-1">
                    <span className="w-2 h-2 rounded-full bg-[#84FF6E] pulse-dot" />
                    Análisis posicional con corrección PHV
                  </span>
                  <h3 className="headline-mega text-2xl md:text-3xl text-white">
                    Heatmap <span className="italic-lime">PHV</span>
                  </h3>
                </div>
                <div className="hidden md:flex items-center gap-2 text-[10px] font-mono text-[#8FA3C0]">
                  <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-[#22D3EE]/30" /> Baja</span>
                  <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-[#FCD34D]/60" /> Media</span>
                  <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-[#FF5577]" /> Alta</span>
                </div>
              </div>

              {/* SVG Field with heatmap */}
              <div className="rounded-xl border border-[#2A4570] bg-[#0A1628] overflow-hidden">
                <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-auto" style={{ aspectRatio: '1.6/1', maxHeight: 500 }}>
                  <defs>
                    <radialGradient id="hot-grad">
                      <stop offset="0%" stopColor="#FF5577" stopOpacity="0.9" />
                      <stop offset="60%" stopColor="#FCD34D" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#22D3EE" stopOpacity="0" />
                    </radialGradient>
                    <pattern id="pitch-lines" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                      <rect width="100" height="100" fill="#0E2F1A" />
                    </pattern>
                  </defs>
                  {/* Field background */}
                  <rect width="100" height="100" fill="#0A2F1A" />
                  {/* Stripes */}
                  {[0,1,2,3,4,5,6,7,8,9].map(i => (
                    <rect key={i} x={i*10} y={0} width="10" height="100" fill={i%2===0 ? '#0A2F1A' : '#0E3520'} opacity="0.6" />
                  ))}
                  {/* Sidelines */}
                  <rect x="1" y="1" width="98" height="98" fill="none" stroke="#496588" strokeWidth="0.3" />
                  {/* Center line + circle */}
                  <line x1="50" y1="1" x2="50" y2="99" stroke="#496588" strokeWidth="0.3" />
                  <circle cx="50" cy="50" r="9" fill="none" stroke="#496588" strokeWidth="0.3" />
                  <circle cx="50" cy="50" r="0.6" fill="#496588" />
                  {/* Penalty areas */}
                  <rect x="1" y="30" width="16" height="40" fill="none" stroke="#496588" strokeWidth="0.3" />
                  <rect x="83" y="30" width="16" height="40" fill="none" stroke="#496588" strokeWidth="0.3" />
                  <rect x="1" y="40" width="6" height="20" fill="none" stroke="#496588" strokeWidth="0.3" />
                  <rect x="93" y="40" width="6" height="20" fill="none" stroke="#496588" strokeWidth="0.3" />
                  {/* Goal lines */}
                  <rect x="0" y="46" width="1" height="8" fill="#22D3EE" />
                  <rect x="99" y="46" width="1" height="8" fill="#22D3EE" />

                  {/* HEATMAP DOTS */}
                  {heatmap.map((h, i) => (
                    <g key={i}>
                      <circle cx={h.x} cy={h.y} r={h.r} fill="url(#hot-grad)" opacity={h.intensity} />
                      <circle cx={h.x} cy={h.y} r={h.r * 0.5} fill="#FF5577" opacity={h.intensity * 0.6}>
                        <animate attributeName="r" values={`${h.r*0.5};${h.r*0.7};${h.r*0.5}`} dur="3s" repeatCount="indefinite" />
                      </circle>
                    </g>
                  ))}

                  {/* Player position icon (estimado por posicion) */}
                  <g transform={`translate(${heatmap[Math.floor(heatmap.length/2)].x}, ${heatmap[Math.floor(heatmap.length/2)].y})`}>
                    <circle r="2.5" fill="#22D3EE" stroke="#FFFFFF" strokeWidth="0.5" />
                    <text y="1" textAnchor="middle" fill="#0A1628" fontSize="3" fontWeight="bold" fontFamily="monospace">{j.numero}</text>
                  </g>
                </svg>
              </div>

              {/* PHV explainer */}
              <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="rounded-xl border border-[#2A4570] p-4 bg-[#0A1628]/60">
                  <p className="label-caps text-[#22D3EE] mb-2">Rating base</p>
                  <p className="font-mono font-bold text-2xl text-white">{j.rating.toFixed(1)}</p>
                  <p className="text-[10px] text-[#8FA3C0] mt-1 font-mono">Sin ajustar por edad biológica</p>
                </div>
                <div className="rounded-xl border border-[#84FF6E]/40 p-4 bg-[#84FF6E]/5">
                  <p className="label-caps text-[#84FF6E] mb-2">Rating PHV ajustado</p>
                  <p className="font-mono font-bold text-2xl text-[#84FF6E]"><CounterUp to={parseFloat(phvCorrected)} decimals={1} /></p>
                  <p className="text-[10px] text-[#8FA3C0] mt-1 font-mono">Corregido por maduración</p>
                </div>
                <div className="rounded-xl border border-[#2A4570] p-4 bg-[#0A1628]/60">
                  <p className="label-caps text-[#A855F7] mb-2">Edad biológica est.</p>
                  <p className="font-mono font-bold text-2xl text-[#A855F7]">{(16 + (seedNum % 7) * 0.3).toFixed(1)} <span className="text-xs">años</span></p>
                  <p className="text-[10px] text-[#8FA3C0] mt-1 font-mono">Cronológica: 17 años</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* INFORMES TAB */}
        {tab === 'informes' && (
          <div className="space-y-3">
            {informes.map((r, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                className="glass-card rounded-2xl p-5 flex items-center gap-4 hover:border-[#22D3EE]/40 transition-all group cursor-pointer">
                <div className="w-14 h-14 rounded-xl flex items-center justify-center font-mono font-bold shrink-0"
                  style={{ background: r.color + '20', color: r.color, border: `1px solid ${r.color}60` }}>
                  {r.tipo}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-display font-bold text-lg text-white uppercase tracking-tight mb-1 group-hover:text-[#22D3EE] transition-colors">{r.titulo}</h4>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-[10px] font-mono text-[#8FA3C0]">
                    <span><Calendar size={9} className="inline mr-1" /> {r.fecha}</span>
                    <span>{r.size}</span>
                    <span className="text-[#22D3EE]">{r.autor}</span>
                  </div>
                </div>
                <button className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#22D3EE]/15 border border-[#22D3EE]/40 text-[#22D3EE] label-caps hover:bg-[#22D3EE] hover:text-[#0A1628] transition-colors">
                  Descargar <TrendingUp size={11} />
                </button>
                <ChevronRight size={16} className="text-[#496588] group-hover:text-[#22D3EE] transition-colors md:hidden" />
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, color, hint }: { icon: React.ElementType; label: string; value: string; color: string; hint: string }) {
  return (
    <div className="relative glass-card rounded-2xl p-5 overflow-hidden group hover:border-[#22D3EE]/40 transition-all">
      <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full blur-2xl opacity-0 group-hover:opacity-30 transition-opacity" style={{ background: color }} />
      <div className="relative">
        <div className="stat-ring mb-4" style={{ color, background: color + '15' }}>
          <Icon size={24} />
        </div>
        <p className="font-mono font-bold text-3xl mb-1" style={{ color }}>{value}</p>
        <p className="label-caps text-white mb-1">{label}</p>
        <p className="text-[10px] font-mono text-[#8FA3C0]">{hint}</p>
      </div>
    </div>
  );
}
