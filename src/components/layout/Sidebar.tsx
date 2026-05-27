import { NavLink } from 'react-router-dom';
import { Trophy, LayoutDashboard, Users, UserPlus, Eye, Sparkles as SparkIcon } from 'lucide-react';

const links = [
  { to: '/',         label: 'Dashboard',  icon: LayoutDashboard },
  { to: '/torneos',  label: 'Torneos',    icon: Trophy },
  { to: '/equipos',  label: 'Cantera',    icon: Users },
  { to: '/portal',   label: 'Portal Scout', icon: Eye },
];

export default function Sidebar() {
  return (
    <aside className="hidden md:flex flex-col w-60 h-[calc(100vh-64px)] sticky top-16 bg-[#0A1628]/80 backdrop-blur-xl border-r border-[#2A4570] p-4 gap-1.5 z-20">
      {links.map(({ to, label, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          end={to === '/'}
          className={({ isActive }) =>
            [
              'flex items-center gap-3 rounded-xl px-3 py-3.5 transition-all duration-250 group relative overflow-hidden',
              isActive
                ? 'bg-gradient-to-r from-[#22D3EE] to-[#0891B2] text-[#0A1628] glow-cyan'
                : 'text-[#CBDDF0] hover:bg-[#1E3560] hover:text-white',
            ].join(' ')
          }
        >
          {({ isActive }) => (
            <>
              {isActive && <span className="absolute right-2 top-2 w-1.5 h-1.5 rounded-full bg-[#0A1628] pulse-dot" />}
              <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
              <span className="label-caps text-[12px]">{label}</span>
            </>
          )}
        </NavLink>
      ))}

      <div className="mt-auto pt-4 border-t border-[#2A4570] space-y-3">
        <NavLink
          to="/registro"
          className="relative w-full bg-gradient-to-r from-[#22D3EE] to-[#84FF6E] text-[#0A1628] font-bold py-4 px-4 rounded-xl flex items-center justify-center gap-2 hover:scale-[1.03] transition-transform glow-cyan-lg label-caps overflow-hidden btn-shimmer"
        >
          <UserPlus size={18} strokeWidth={2.5} />
          <span className="relative z-[1]">Soy Scout</span>
        </NavLink>
        <p className="text-[10px] text-[#8FA3C0] text-center font-mono leading-relaxed">
          Registro · Acceso al portal<br/>+ publicaciones
        </p>
        <div className="flex items-center justify-center gap-1.5 pt-2 border-t border-[#1E3560] text-[10px] text-[#496588] font-mono">
          <SparkIcon size={9} className="text-[#22D3EE]" />
          <span>v4.4.0 · Torneos Engine</span>
        </div>
      </div>
    </aside>
  );
}
