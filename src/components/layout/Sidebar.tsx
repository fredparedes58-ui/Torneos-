import { NavLink } from 'react-router-dom';
import { Trophy, LayoutDashboard, Users, PlusCircle, Sparkles as SparkIcon } from 'lucide-react';

const links = [
  { to: '/',         label: 'Dashboard',  icon: LayoutDashboard },
  { to: '/torneos',  label: 'Torneos',    icon: Trophy },
  { to: '/equipos',  label: 'Cantera',    icon: Users },
];

export default function Sidebar() {
  return (
    <aside className="hidden md:flex flex-col w-60 h-[calc(100vh-64px)] sticky top-16 bg-[#0F1408]/80 backdrop-blur-xl border-r border-[#5A6644] p-4 gap-1.5 z-20">
      {links.map(({ to, label, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          end={to === '/'}
          className={({ isActive }) =>
            [
              'flex items-center gap-3 rounded-xl px-3 py-3.5 transition-all duration-250 group relative overflow-hidden',
              isActive
                ? 'bg-gradient-to-r from-[#D4FF1F] to-[#A8D700] text-[#0F1408] glow-green'
                : 'text-[#D5DBB8] hover:bg-[#2A3320] hover:text-white',
            ].join(' ')
          }
        >
          {({ isActive }) => (
            <>
              {isActive && <span className="absolute right-2 top-2 w-1.5 h-1.5 rounded-full bg-[#0F1408] pulse-dot" />}
              <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
              <span className="label-caps text-[12px]">{label}</span>
            </>
          )}
        </NavLink>
      ))}

      <div className="mt-auto pt-4 border-t border-[#5A6644]">
        <NavLink
          to="/nuevo"
          className="relative w-full bg-[#D4FF1F] text-[#0F1408] font-bold py-4 px-4 rounded-xl flex items-center justify-center gap-2 hover:scale-[1.03] transition-transform glow-green-lg label-caps overflow-hidden btn-shimmer"
        >
          <PlusCircle size={18} />
          <span className="relative z-[1]">Nuevo Torneo</span>
        </NavLink>
        <div className="flex items-center justify-center gap-1.5 mt-4 text-[10px] text-[#7A8A55] font-mono">
          <SparkIcon size={9} className="text-[#D4FF1F]" />
          <span>v4.2.1 · Torneos Engine</span>
        </div>
      </div>
    </aside>
  );
}
