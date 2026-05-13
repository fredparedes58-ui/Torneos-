import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Trophy, Users, MapPin, Layers, Calendar } from 'lucide-react';
import { getTorneoById } from '../data/mock';
import BracketView from '../components/bracket/BracketView';
import StandingsTable from '../components/standings/StandingsTable';
import FixtureList from '../components/fixture/FixtureList';

type Tab = 'bracket' | 'tabla' | 'fixture' | 'equipos';

const tagMap = {
  activo:     { label: 'En Curso',   cls: 'bg-[#C8FF00] text-[#161F00]' },
  proximo:    { label: 'Proximo',    cls: 'bg-[#333627] text-[#C4CAAC]' },
  finalizado: { label: 'Finalizado', cls: 'bg-[#282C1D] text-[#8E9479]' },
};

const formatoMap: Record<string, { tabs: Tab[]; defaultTab: Tab }> = {
  eliminacion: { tabs: ['bracket', 'fixture', 'equipos'], defaultTab: 'bracket' },
  liga:        { tabs: ['tabla', 'fixture', 'equipos'],   defaultTab: 'tabla'   },
  grupos:      { tabs: ['tabla', 'bracket', 'fixture', 'equipos'], defaultTab: 'tabla' },
};

const tabLabels: Record<Tab, { label: string; icon: React.ElementType }> = {
  bracket: { label: 'Bracket', icon: Layers },
  tabla:   { label: 'Tabla',   icon: Trophy },
  fixture: { label: 'Fixture', icon: Calendar },
  equipos: { label: 'Cantera', icon: Users },
};

const formatoLabel: Record<string, string> = {
  eliminacion: 'Eliminacion Directa',
  liga:        'Liga Regular',
  grupos:      'Grupos + Eliminacion',
};

export default function TorneoDetail() {
  const { id } = useParams<{ id: string }>();
  const torneo = id ? getTorneoById(id) : undefined;

  const fmtConfig = torneo ? formatoMap[torneo.formato] : formatoMap.liga;
  const [activeTab, setActiveTab] = useState<Tab>(fmtConfig.defaultTab);

  if (!torneo) {
    return (
      <div className="flex items-center justify-center h-full text-[#8E9479] p-12">
        <p>Torneo no encontrado</p>
      </div>
    );
  }

  const tag = tagMap[torneo.status];

  return (
    <div className="relative">
      {/* Hero with stadium pitch bg */}
      <div className="relative pitch-bg">
        <div className="absolute inset-0 stadium-overlay" />
        <div className="absolute top-4 left-4 z-10">
          <Link
            to="/torneos"
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0C0F04]/70 backdrop-blur text-xs text-[#C4CAAC] hover:text-white transition-colors border border-[#434933]"
          >
            <ArrowLeft size={14} /> Volver
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative px-4 md:px-8 pt-20 pb-10"
        >
          <div className="absolute right-8 top-12 text-[180px] opacity-10 select-none pointer-events-none leading-none">
            {torneo.logo}
          </div>

          <div className="relative max-w-4xl">
            <span className={['inline-block label-caps px-3 py-1 rounded-full mb-4', tag.cls].join(' ')}>
              {tag.label}
            </span>

            <h1 className="font-display font-extrabold text-5xl md:text-7xl text-white uppercase leading-[0.9] tracking-tight mb-3">
              {torneo.nombre}
            </h1>

            <p className="font-display font-bold text-lg md:text-xl text-[#C8FF00] uppercase tracking-wider mb-5">
              {torneo.categoria} · {formatoLabel[torneo.formato]}
            </p>

            <div className="flex flex-wrap gap-x-5 gap-y-2 text-[#C4CAAC] font-mono text-xs md:text-sm">
              <span className="flex items-center gap-1.5">
                <MapPin size={13} className="text-[#C8FF00]" /> {torneo.equipos[0]?.ciudad ?? 'Multisede'}
              </span>
              <span className="flex items-center gap-1.5">
                <Users size={13} className="text-[#C8FF00]" /> {torneo.totalEquipos} equipos
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar size={13} className="text-[#C8FF00]" /> {torneo.fechaInicio} a {torneo.fechaFin}
              </span>
            </div>

            {torneo.status === 'activo' && (
              <button className="mt-6 bg-[#C8FF00] text-[#161F00] label-caps px-6 py-3 rounded-lg glow-green-lg hover:scale-[1.02] transition-transform">
                Seguir Torneo
              </button>
            )}

            {torneo.campeon && (
              <div className="mt-5 inline-flex items-center gap-3 bg-[#FFB80020] border border-[#FFB80060] rounded-lg px-4 py-2.5">
                <Trophy size={20} className="text-[#FFB800]" />
                <div>
                  <p className="label-caps text-[#FFB800]/80">Campeon</p>
                  <p className="font-display font-bold text-lg text-[#FFB800] uppercase">{torneo.campeon.nombre}</p>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Tabs */}
      <div className="px-4 md:px-8 sticky top-16 bg-[#111508]/95 backdrop-blur-md z-30 border-b border-[#434933]">
        <div className="flex gap-1 overflow-x-auto">
          {fmtConfig.tabs.map(tab => {
            const { label, icon: Icon } = tabLabels[tab];
            const active = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={[
                  'flex items-center gap-2 px-4 py-4 label-caps border-b-2 transition-all -mb-px whitespace-nowrap',
                  active
                    ? 'text-[#C8FF00] border-[#C8FF00]'
                    : 'text-[#8E9479] border-transparent hover:text-white hover:border-[#434933]',
                ].join(' ')}
              >
                <Icon size={15} /> {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="p-4 md:p-8"
      >
        {activeTab === 'bracket' && torneo.bracket && <BracketView bracket={torneo.bracket} />}
        {activeTab === 'bracket' && !torneo.bracket && (
          <div className="text-center py-16 text-[#8E9479]">
            <Layers size={40} className="mx-auto mb-3 opacity-30" />
            <p>El bracket se generara cuando comiencen los partidos</p>
          </div>
        )}
        {activeTab === 'tabla' && torneo.tabla && <StandingsTable tabla={torneo.tabla} />}
        {activeTab === 'fixture' && <FixtureList partidos={torneo.partidos} />}
        {activeTab === 'equipos' && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {torneo.equipos.map((equipo, i) => (
              <motion.div
                key={equipo.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.04 }}
                className="glass-card p-5 rounded-xl hover:border-[#C8FF00]/50 transition-all"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl border-2"
                    style={{ borderColor: equipo.color + '60', background: equipo.color + '15' }}
                  >
                    {equipo.escudo}
                  </div>
                  <div className="min-w-0">
                    <p className="font-display font-bold text-lg text-white uppercase truncate">{equipo.nombre}</p>
                    <p className="text-xs text-[#8E9479] font-mono">{equipo.ciudad}</p>
                  </div>
                </div>
                <div className="h-0.5 rounded-full" style={{ background: equipo.color + '60' }} />
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
