import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Trophy, Users, Calendar, Layers } from 'lucide-react';
import { getTorneoById } from '../data/mock';
import BracketView from '../components/bracket/BracketView';
import StandingsTable from '../components/standings/StandingsTable';
import FixtureList from '../components/fixture/FixtureList';

type Tab = 'bracket' | 'tabla' | 'fixture' | 'equipos';

const statusMap = {
  activo:     { label: 'En Curso',   color: '#C8FF00', bg: '#1E2800', border: '#C8FF0040' },
  proximo:    { label: 'Proximo',    color: '#4E8FFF', bg: '#0D1A3A', border: '#4E8FFF40' },
  finalizado: { label: 'Finalizado', color: '#4A4A70', bg: '#13131F', border: '#2A2A45' },
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
  equipos: { label: 'Equipos', icon: Users },
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
      <div className="flex items-center justify-center h-full text-[#4A4A70]">
        <p>Torneo no encontrado</p>
      </div>
    );
  }

  const s = statusMap[torneo.status];

  return (
    <div className="min-h-screen p-6 lg:p-8 max-w-6xl mx-auto">
      <Link to="/torneos" className="inline-flex items-center gap-2 text-xs text-[#4A4A70] hover:text-[#E8E8FF] transition-colors mb-6">
        <ArrowLeft size={14} /> Todos los torneos
      </Link>

      {/* Hero */}
      <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
        className="rounded-xl border border-[#1C1C32] bg-[#0E0E1C] p-6 mb-6 relative overflow-hidden">
        <div className="absolute right-6 top-1/2 -translate-y-1/2 text-[120px] opacity-5 select-none pointer-events-none leading-none">
          {torneo.logo}
        </div>

        <div className="relative">
          <div className="flex items-start gap-4 mb-4">
            <span className="text-4xl">{torneo.logo}</span>
            <div>
              <span className="inline-flex items-center gap-1.5 text-[10px] font-mono font-medium px-2 py-0.5 rounded-full border mb-2"
                style={{ color: s.color, borderColor: s.border, background: s.bg }}>
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: s.color }} />
                {s.label}
              </span>
              <h1 className="font-display font-extrabold text-4xl text-[#E8E8FF] uppercase leading-none">
                {torneo.nombre}
              </h1>
            </div>
          </div>

          <p className="text-sm text-[#4A4A70] max-w-xl mb-4">{torneo.descripcion}</p>

          <div className="flex flex-wrap gap-4 text-xs text-[#4A4A70]">
            <span className="flex items-center gap-1.5 font-mono">
              <Users size={12} className="text-[#C8FF00]" /> {torneo.totalEquipos} equipos
            </span>
            <span className="flex items-center gap-1.5 font-mono">
              <Trophy size={12} className="text-[#C8FF00]" /> {formatoLabel[torneo.formato]}
            </span>
            <span className="flex items-center gap-1.5 font-mono">
              <Calendar size={12} className="text-[#C8FF00]" /> {torneo.fechaInicio} to {torneo.fechaFin}
            </span>
            <span className="flex items-center gap-1.5 font-mono px-2 py-0.5 rounded bg-[#13131F] border border-[#1C1C32]">
              {torneo.categoria}
            </span>
          </div>

          {torneo.campeon && (
            <div className="mt-4 inline-flex items-center gap-3 bg-[#1A1200] border border-[#FFB80030] rounded-lg px-4 py-2">
              <span className="text-[#FFB800] text-lg">🏆</span>
              <div>
                <p className="text-[10px] font-mono text-[#4A4A70] uppercase tracking-widest">Campeon</p>
                <p className="font-display font-bold text-lg text-[#FFB800] uppercase">{torneo.campeon.nombre}</p>
              </div>
            </div>
          )}
        </div>
      </motion.div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 border-b border-[#1C1C32]">
        {fmtConfig.tabs.map(tab => {
          const { label, icon: Icon } = tabLabels[tab];
          const active = activeTab === tab;
          return (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={['flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-all -mb-px',
                active ? 'text-[#C8FF00] border-[#C8FF00]' : 'text-[#4A4A70] border-transparent hover:text-[#E8E8FF] hover:border-[#2A2A45]'].join(' ')}>
              <Icon size={15} /> {label}
            </button>
          );
        })}
      </div>

      {/* Tab content */}
      <motion.div key={activeTab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
        {activeTab === 'bracket' && torneo.bracket && <BracketView bracket={torneo.bracket} />}
        {activeTab === 'bracket' && !torneo.bracket && (
          <div className="text-center py-16 text-[#4A4A70]">
            <Layers size={40} className="mx-auto mb-3 opacity-30" />
            <p>El bracket se generara cuando comiencen los partidos</p>
          </div>
        )}
        {activeTab === 'tabla' && torneo.tabla && <StandingsTable tabla={torneo.tabla} />}
        {activeTab === 'fixture' && <FixtureList partidos={torneo.partidos} />}
        {activeTab === 'equipos' && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {torneo.equipos.map((equipo, i) => (
              <motion.div key={equipo.id}
                initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.04 }}
                className="rounded-xl border border-[#1C1C32] bg-[#0E0E1C] p-4 hover:border-[#2A2A45] transition-colors">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-xl border-2"
                    style={{ borderColor: equipo.color + '60', background: equipo.color + '20' }}>
                    {equipo.escudo}
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-[#E8E8FF]">{equipo.nombre}</p>
                    <p className="text-xs text-[#4A4A70]">{equipo.ciudad}</p>
                  </div>
                </div>
                <div className="h-0.5 rounded-full" style={{ background: equipo.color + '40' }} />
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
