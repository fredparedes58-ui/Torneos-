import { NavLink } from 'react-router-dom';
import { Trophy, LayoutDashboard, Users, PlusCircle } from 'lucide-react';

const links = [
  { to: '/',         label: 'Dashboard',  icon: LayoutDashboard },
  { to: '/torneos',  label: 'Torneos',    icon: Trophy },
  { to: '/equipos',  label: 'Cantera',    icon: Users },
];

export default function Sidebar() {
  return (
    <aside className="hidden md:flex flex-col w-60 h-[calc(100vh-64px)] sticky top-16 bg-[#07070F]/80 backdrop-blur-xl border-r border-[#1C1C32] p-4 gap-1 z-20">
      {links.map(({ to, label, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          end={to === '/'}
          className={({ isActive }) =>
            [
              'flex items-center gap-3 rounded-xl px-3 py-3 transition-all duration-200 group relative overflow-hidden',
              isActive
                ? 'bg-[#C8FF00] text-[#161F00]'
                : 'text-[#8E9479] hover:bg-[#13131F] hover:text-white',
            ].join(' ')
          }
        >
          <Icon size={20} strokeWidth={2} />
          <span className="label-caps">{label}</span>
        </NavLink>
      ))}

      <div className="mt-auto pt-4 border-t border-[#1C1C32]">
        <NavLink
          to="/nuevo"
          className="relative w-full bg-[#C8FF00] text-[#161F00] font-bold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform glow-green-lg label-caps overflow-hidden"
        >
          <PlusCircle size={18} />
          <span>Nuevo Torneo</span>
        </NavLink>
        <p className="text-[10px] text-[#4A4A70] mt-3 font-mono text-center">
          v4.2.1 · Torneos Engine
        </p>
      </div>
    </aside>
  );
}
