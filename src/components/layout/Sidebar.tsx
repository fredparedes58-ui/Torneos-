import { NavLink } from 'react-router-dom';
import { Trophy, LayoutDashboard, Users, PlusCircle } from 'lucide-react';

const links = [
  { to: '/',         label: 'Dashboard',  icon: LayoutDashboard },
  { to: '/torneos',  label: 'Torneos',    icon: Trophy },
  { to: '/equipos',  label: 'Cantera',    icon: Users },
];

export default function Sidebar() {
  return (
    <aside className="hidden md:flex flex-col w-64 h-[calc(100vh-64px)] sticky top-16 bg-[#0C0F04]/60 backdrop-blur-xl border-r border-[#434933] p-4 gap-2">
      {links.map(({ to, label, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          end={to === '/'}
          className={({ isActive }) =>
            [
              'flex items-center gap-4 rounded-lg px-3 py-3 transition-all duration-200 label-caps',
              isActive
                ? 'bg-[#C8FF00] text-[#161F00]'
                : 'text-[#C4CAAC] hover:bg-[#282C1D] hover:text-white',
            ].join(' ')
          }
        >
          <Icon size={20} strokeWidth={2} />
          <span>{label}</span>
        </NavLink>
      ))}

      <div className="mt-auto border-t border-[#434933] pt-4">
        <NavLink
          to="/nuevo"
          className="w-full bg-[#C8FF00] text-[#161F00] font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform glow-green-lg label-caps"
        >
          <PlusCircle size={18} />
          <span>Nuevo Torneo</span>
        </NavLink>
      </div>
    </aside>
  );
}
