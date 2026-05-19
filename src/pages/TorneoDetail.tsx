import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft, Trophy, Users, MapPin, Layers, Calendar, Image as ImageIcon,
  Target, Award, ShieldAlert, Crown, Sparkles as SparkIcon, Tv, ChevronRight,
  TrendingUp,
} from 'lucide-react';
import { getTorneoById } from '../data/mock';
import BracketView from '../components/bracket/BracketView';
import StandingsTable from '../components/standings/StandingsTable';
import FixtureList from '../components/fixture/FixtureList';
import FloatingOrbs from '../components/effects/FloatingOrbs';
import Sparkles from '../components/effects/Sparkles';
import CounterUp from '../components/effects/CounterUp';
import Avatar from '../components/effects/Avatar';

type Tab = 'bracket' | 'tabla' | 'fixture' | 'equipos' | 'media';

const statusMap = {
  activo:     { label: 'EN VIVO',     color: '#D4FF1F', textCls: 'text-[#D4FF1F]', bgCls: 'bg-[#2A3500] border-[#D4FF1F]' },
  proximo:    { label: 'PRÓXIMO',     color: '#7AB8FF', textCls: 'text-[#7AB8FF]', bgCls: 'bg-[#102240] border-[#7AB8FF]' },
  finalizado: { label: 'FINALIZADO',  color: '#D5DBB8', textCls: 'text-[#D5DBB8]', bgCls: 'bg-[#282C1D] border-[#7A8A55]' },
};

const formatoMap: Record<string, { tabs: Tab[]; defaultTab: Tab }> = {
  eliminacion: { tabs: ['bracket', 'fixture', 'equipos', 'media'], defaultTab: 'bracket' },
  liga:        { tabs: ['tabla', 'fixture', 'equipos', 'media'],   defaultTab: 'tabla'   },
  grupos:      { tabs: ['tabla', 'bracket', 'fixture', 'equipos', 'media'], defaultTab: 'tabla' },
};

const tabLabels: Record<Tab, { label: string; icon: React.ElementType }> = {
  bracket: { label: 'Bracket', icon: Layers },
  tabla:   { label: 'Tabla',   icon: Trophy },
  fixture: { label: 'Fixture', icon: Calendar },
  equipos: { label: 'Cantera', icon: Users },
  media:   { label: 'Media',   icon: ImageIcon },
};

const formatoLabel: Record<string, string> = {
  eliminacion: 'Eliminación Directa',
  liga:        'Liga Regular',
  grupos:      'Grupos + Eliminación',
};

export default function TorneoDetail() {
  const { id } = useParams<{ id: string }>();
  const torneo = id ? getTorneoById(id) : undefined;

  const fmtConfig = torneo ? formatoMap[torneo.formato] : formatoMap.liga;
  const [activeTab, setActiveTab] = useState<Tab>(fmtConfig.defaultTab);

  if (!torneo) {
    return (
      <div className="flex items-center justify-center h-[60vh] text-[#A5B084] p-12">
        <p>Torneo no encontrado</p>
      </div>
    );
  }

  const s = statusMap[torneo.status];

  return (
    <div className="relative min-h-screen">
      {/* ━━━ Hero cinemático ━━━ */}
      <div className="relative">
        {/* Background image */}
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={torneo.heroImage}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
          />
          <div className="absolute inset-0 pitch-bg opacity-50 mix-blend-overlay" />
          <div className="absolute inset-0 stadium-overlay-strong" />
        </div>

        <FloatingOrbs variant="green" intensity="strong" />

        <div className="relative px-4 md:px-8 pt-6 pb-12 max-w-[1400px] mx-auto">
          {/* Back link */}
          <Link
            to="/torneos"
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1A2010]/70 backdrop-blur text-xs text-[#D5DBB8] hover:text-white transition-colors border border-[#7A8A55] mb-8"
          >
            <ArrowLeft size={14} /> Volver
          </Link>

          {/* Logo monogram big */}
          <div className="absolute right-4 md:right-8 top-12 text-[180px] md:text-[240px] font-display font-extrabold leading-none text-[#D4FF1F]/5 select-none pointer-events-none">
            {torneo.logo}
          </div>

          <div className="relative max-w-4xl mt-8">
            <span className="label-caps text-[#D4FF1F] mb-4 flex items-center gap-2 text-glow-green">
              <span className={['w-2.5 h-2.5 rounded-full', torneo.status === 'activo' ? 'bg-[#D4FF1F] pulse-dot' : 'bg-[#7A8A55]'].join(' ')} />
              Champions Elite Series · {torneo.categoria}
            </span>

            <h1 className="headline-mega text-6xl md:text-9xl text-glow-white leading-[0.8] mb-4 gradient-text-cream">
              {torneo.nombre}
            </h1>

            <p className="font-display font-bold text-2xl md:text-3xl italic-accent uppercase tracking-wider mb-6">
              {formatoLabel[torneo.formato]}
            </p>

            {/* Meta pills */}
            <div className="flex flex-wrap gap-2 mb-6">
              <span className={['inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full label-caps border', s.bgCls, s.textCls].join(' ')}>
                <span className={['w-1.5 h-1.5 rounded-full bg-current', torneo.status === 'activo' ? 'pulse-dot' : ''].join(' ')} />
                {s.label}
              </span>
              {torneo.jornadaActual && (
                <span className="px-3 py-1.5 rounded-full bg-[#1A2010]/70 backdrop-blur border border-[#7A8A55] label-caps text-[#D5DBB8]">
                  Matchday {torneo.jornadaActual}
                </span>
              )}
              <span className="px-3 py-1.5 rounded-full bg-[#1A2010]/70 backdrop-blur border border-[#7A8A55] label-caps text-[#D5DBB8]">
                {torneo.totalEquipos} Teams
              </span>
              {torneo.tags?.[0] && (
                <span className="px-3 py-1.5 rounded-full bg-[#D4FF1F]/10 border border-[#D4FF1F]/30 label-caps text-[#D4FF1F]">
                  {torneo.tags[0]}
                </span>
              )}
            </div>

            {/* Meta info */}
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-[#D5DBB8] font-mono text-xs md:text-sm mb-8">
              {torneo.sede && (
                <span className="flex items-center gap-1.5">
                  <MapPin size={13} className="text-[#D4FF1F]" /> {torneo.sede}
                </span>
              )}
              <span className="flex items-center gap-1.5">
                <Calendar size={13} className="text-[#D4FF1F]" /> {torneo.fechaInicio} → {torneo.fechaFin}
              </span>
              {torneo.premio && (
                <span className="flex items-center gap-1.5">
                  <Trophy size={13} className="text-[#FFD23B]" /> {torneo.premio}
                </span>
              )}
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-3">
              {torneo.status === 'activo' && (
                <button className="relative bg-[#D4FF1F] text-[#0F1408] label-caps px-6 py-3.5 rounded-lg glow-green-lg hover:scale-[1.02] transition-transform overflow-hidden flex items-center gap-2">
                  <Sparkles count={8} color="#0F1408" />
                  <Tv size={14} /><span className="relative">Seguir Torneo</span>
                </button>
              )}
              {torneo.status === 'proximo' && (
                <button className="bg-[#D4FF1F] text-[#0F1408] label-caps px-6 py-3.5 rounded-lg glow-green hover:scale-[1.02] transition-transform">
                  Register Team →
                </button>
              )}
              <button className="bg-transparent text-white label-caps px-6 py-3.5 rounded-lg border border-[#7A8A55] hover:border-[#D4FF1F] transition-colors">
                Standings
              </button>
            </div>

            {/* Campeon banner */}
            {torneo.campeon && (
              <div className="mt-6 inline-flex items-center gap-4 bg-gradient-to-r from-[#FFD23B20] to-transparent border border-[#FFD23B50] rounded-xl px-5 py-3 backdrop-blur">
                <div className="w-12 h-12 rounded-full bg-[#FFD23B] flex items-center justify-center glow-gold">
                  <Crown size={22} className="text-[#0F1408]" />
                </div>
                <div>
                  <p className="label-caps text-[#FFD23B]/70">Campeón Histórico</p>
                  <p className="font-display font-extrabold text-2xl text-[#FFD23B] uppercase">{torneo.campeon.nombre}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ━━━ Tabs sticky ━━━ */}
      <div className="sticky top-16 bg-[#0F1408]/95 backdrop-blur-xl z-30 border-b border-[#5A6644]">
        <div className="px-4 md:px-8 max-w-[1400px] mx-auto">
          <div className="flex gap-1 overflow-x-auto">
            {fmtConfig.tabs.map(tab => {
              const { label, icon: Icon } = tabLabels[tab];
              const active = activeTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={[
                    'flex items-center gap-2 px-5 py-4 label-caps border-b-2 transition-all -mb-px whitespace-nowrap',
                    active
                      ? 'text-[#D4FF1F] border-[#D4FF1F]'
                      : 'text-[#A5B084] border-transparent hover:text-white hover:border-[#7A8A55]',
                  ].join(' ')}
                >
                  <Icon size={15} /> {label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ━━━ Tab content ━━━ */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}
        className="relative p-4 md:p-8 max-w-[1400px] mx-auto"
      >
        {activeTab === 'bracket' && torneo.bracket && <BracketView bracket={torneo.bracket} />}
        {activeTab === 'bracket' && !torneo.bracket && (
          <div className="text-center py-16 text-[#A5B084]">
            <Layers size={40} className="mx-auto mb-3 opacity-30" />
            <p>El bracket se generará cuando comiencen los partidos</p>
          </div>
        )}
        {activeTab === 'tabla' && torneo.tabla && <StandingsTable tabla={torneo.tabla} />}
        {activeTab === 'fixture' && <FixtureList partidos={torneo.partidos} />}

        {activeTab === 'equipos' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {torneo.equipos.map((equipo, i) => (
              <motion.div
                key={equipo.id}
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="glass-card rounded-2xl p-5 hover:border-[#D4FF1F]/50 transition-all group relative overflow-hidden"
              >
                <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full blur-2xl opacity-0 group-hover:opacity-20 transition-opacity"
                     style={{ background: equipo.color }} />

                <div className="relative flex items-center justify-between mb-4">
                  <span className="label-caps text-[#A5B084]">{equipo.division ?? 'Cadete'}</span>
                  {equipo.rank && (
                    <span className="font-mono font-bold text-[#D4FF1F] text-sm">#{String(equipo.rank).padStart(2, '0')}</span>
                  )}
                </div>

                <div className="relative flex items-center gap-3 mb-4">
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center font-display font-extrabold text-lg border-2 transition-transform group-hover:scale-105"
                    style={{ borderColor: equipo.color + '80', background: equipo.color + '15', color: equipo.color }}
                  >
                    {equipo.escudo}
                  </div>
                  <div className="min-w-0">
                    <p className="font-display font-extrabold text-lg text-white uppercase leading-tight truncate group-hover:text-[#D4FF1F] transition-colors">
                      {equipo.nombre}
                    </p>
                    <p className="text-xs text-[#A5B084] font-mono flex items-center gap-1"><MapPin size={9} /> {equipo.ciudad}</p>
                  </div>
                </div>

                {/* Jugador estrella */}
                {equipo.jugadorEstrella && (
                  <div className="relative rounded-lg bg-[#2A3320]/60 border border-[#7A8A55] p-3 mb-4">
                    <span className="label-caps text-[#A5B084] block mb-2">Jugador Estrella</span>
                    <div className="flex items-center gap-3">
                      <Avatar seed={equipo.jugadorEstrella.avatarSeed} size={36} ring="lime" />
                      <div className="min-w-0">
                        <p className="font-display font-bold text-sm text-white uppercase truncate">{equipo.jugadorEstrella.nombre}</p>
                        <p className="text-[10px] text-[#D5DBB8] font-mono uppercase">{equipo.jugadorEstrella.posicion} · #{equipo.jugadorEstrella.numero}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Stats row */}
                <div className="grid grid-cols-3 gap-2 pt-3 border-t border-[#5A6644]">
                  <div>
                    <p className="label-caps text-[#A5B084]">Goles</p>
                    <p className="font-mono font-bold text-[#D4FF1F] text-lg">{equipo.jugadorEstrella?.goles ?? equipo.wins ?? '–'}</p>
                  </div>
                  <div>
                    <p className="label-caps text-[#A5B084]">PJ</p>
                    <p className="font-mono font-bold text-white text-lg">{equipo.matches ?? '–'}</p>
                  </div>
                  <div>
                    <p className="label-caps text-[#A5B084]">Rating</p>
                    <p className="font-mono font-bold text-[#D4FF1F] text-lg">{equipo.rating ?? '–'}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {activeTab === 'media' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }}
                className="relative aspect-video rounded-xl overflow-hidden border border-[#5A6644] hover:border-[#D4FF1F] transition-colors group cursor-pointer"
              >
                <div className="absolute inset-0 pitch-bg" />
                <img
                  src={torneo.heroImage}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-80 transition-opacity"
                  onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                />
                <div className="absolute inset-0 stadium-overlay" />
                <div className="absolute bottom-3 left-3">
                  <span className="label-caps text-[#D4FF1F]">Highlight · {i}</span>
                  <p className="font-display font-bold text-sm text-white uppercase">Mejores Jugadas — J{i}</p>
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-12 h-12 rounded-full bg-[#D4FF1F] flex items-center justify-center glow-green">
                    <ChevronRight size={20} className="text-[#0F1408]" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>

      {/* ━━━ Estadísticas clave ━━━ */}
      {torneo.status !== 'proximo' && (
        <div className="relative p-4 md:p-8 max-w-[1400px] mx-auto">
          <div className="mb-6">
            <span className="label-caps text-[#A5B084] block mb-2">Datos del Torneo</span>
            <h2 className="font-display font-extrabold text-3xl md:text-4xl text-white uppercase leading-none">
              Estadísticas <span className="italic-accent">Clave</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {/* Top scorer */}
            {torneo.topScorer && (
              <motion.div
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                className="glass-card rounded-2xl p-5 relative overflow-hidden"
              >
                <span className="label-caps text-[#A5B084] block mb-3">Top Scorer</span>
                <div className="flex items-center gap-4">
                  <Avatar seed={torneo.topScorer.avatarSeed} size={56} ring="lime" />
                  <div>
                    <p className="font-display font-extrabold text-xl text-white uppercase leading-tight">
                      {torneo.topScorer.nombre}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <Target size={11} className="text-[#D4FF1F]" />
                      <span className="font-mono font-bold text-[#D4FF1F]">
                        <CounterUp to={torneo.topScorer.goles} /> Goles
                      </span>
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full bg-[#D4FF1F] opacity-10 blur-2xl" />
              </motion.div>
            )}

            {/* Clean sheets */}
            {torneo.cleanSheets && (
              <motion.div
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                className="glass-card rounded-2xl p-5"
              >
                <span className="label-caps text-[#A5B084] block mb-3">Clean Sheets</span>
                <p className="font-display font-extrabold text-2xl text-white uppercase">{torneo.cleanSheets.equipo}</p>
                <div className="flex items-center gap-2 mt-2">
                  <Award size={11} className="text-[#7AB8FF]" />
                  <span className="font-mono font-bold text-[#7AB8FF]">
                    <CounterUp to={torneo.cleanSheets.cantidad} suffix=" Partidos" />
                  </span>
                </div>
              </motion.div>
            )}

            {/* Red cards / completion */}
            <motion.div
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="glass-card rounded-2xl p-5"
            >
              <span className="label-caps text-[#A5B084] block mb-3">Disciplina · Completion</span>
              <div className="flex items-center gap-4">
                <div className="flex flex-col">
                  <ShieldAlert size={20} className="text-[#FF6B7E] mb-1" />
                  <span className="font-mono font-bold text-[#FFC9C2] text-2xl">{torneo.redCards ?? 0}</span>
                  <span className="label-caps text-[#A5B084]">Rojas</span>
                </div>
                <div className="h-12 w-px bg-[#7A8A55]" />
                <div className="flex flex-col flex-1">
                  <span className="label-caps text-[#A5B084] mb-1">Completion</span>
                  <span className="font-mono font-bold text-[#D4FF1F] text-2xl">
                    <CounterUp to={torneo.completion ?? 0} suffix="%" />
                  </span>
                  <div className="w-full h-1.5 bg-[#5A6644] rounded-full mt-2 overflow-hidden">
                    <div className="h-full bg-[#D4FF1F]" style={{ width: `${torneo.completion ?? 0}%` }} />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Premium Pass */}
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="relative rounded-2xl bg-[#D4FF1F] p-6 overflow-hidden glow-green-lg"
          >
            <Sparkles count={20} color="#0F1408" />
            <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-[#0F1408] flex items-center justify-center shrink-0">
                  <SparkIcon size={26} className="text-[#D4FF1F]" />
                </div>
                <div>
                  <span className="label-caps text-[#0F1408]/70 block mb-1">Premium Pass</span>
                  <p className="font-display font-extrabold text-2xl md:text-3xl text-[#0F1408] uppercase leading-tight">
                    Acceso a Repeticiones 4K + Stats Live
                  </p>
                </div>
              </div>
              <button className="bg-[#0F1408] text-[#D4FF1F] label-caps px-6 py-3.5 rounded-lg hover:scale-[1.02] transition-transform flex items-center gap-2 shrink-0">
                <TrendingUp size={14} /> Upgrade
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
