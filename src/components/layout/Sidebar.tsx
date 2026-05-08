import { NavLink, useLocation } from 'react-router-dom';
import { Trophy, LayoutDashboard, Users, PlusCircle, ChevronRight } from 'lucide-react';

const links = [
  { to: '/',         label: 'Dashboard',  icon: LayoutDashboard },
  { to: '/torneos',  label: 'Torneos',    icon: Trophy },
  { to: '/equipos',  label: 'Equipos',    icon: Users },
  { to: '/nuevo',    label: 'Nuevo',      icon: PlusCircle },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside className="flex flex-col w-16 lg:w-56 shrink-0 border-r border-[#1C1C32] bg-[#07070F] h-screen sticky top-0 z-40">
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-[#1C1C32]">
        <div className="w-8 h-8 rounded-lg bg-[#C8FF00] flex items-center justify-center shrink-0">
          <Trophy size={16} className="text-[#07070F]" strokeWidth={2.5} />
        </div>
        <span className="hidden lg:block font-display font-extrabold text-xl tracking-widest text-[#E8E8FF] uppercase">
          Torneos
        </span>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 flex flex-col gap-1 px-2">
        {links.map(({ to, label, icon: Icon }) => {
          const active = to === '/'
            ? location.pathname === '/'
            : location.pathname.startsWith(to);

          return (
            <NavLink
              key={to}
              to={to}
              className={[
                'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-150 group relative',
                active
                  ? 'bg-[#1E2800] text-[#C8FF00]'
                  : 'text-[#4A4A70] hover:text-[#E8E8FF] hover:bg-[#0E0E1C]',
              ].join(' ')}
            >
              {active && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-[#C8FF00] rounded-r-full" />
              )}
              <Icon size={18} strokeWidth={active ? 2.5 : 2} className="shrink-0" />
              <span className="hidden lg:block text-sm font-medium">{label}</span>
              {active && <ChevronRight size={14} className="hidden lg:block ml-auto opacity-60" />}
            </NavLink>
          );
        })}
      </nav>

      {/* Footer badge */}
      <div className="hidden lg:flex items-center gap-2 px-4 py-4 border-t border-[#1C1C32]">
        <div className="w-2 h-2 rounded-full bg-[#00E87A] animate-pulse shrink-0" />
        <span className="text-xs text-[#4A4A70] font-mono">v1.0 Â· UI Demo</span>
      </div>
    </aside>
  );
}

