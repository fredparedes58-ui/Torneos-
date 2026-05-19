import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Trophy, Users, PlusCircle } from 'lucide-react';

const links = [
  { to: '/',         label: 'Hub',      icon: LayoutDashboard, end: true },
  { to: '/torneos',  label: 'Torneos',  icon: Trophy },
  { to: '/equipos',  label: 'Cantera',  icon: Users },
  { to: '/nuevo',    label: 'Nuevo',    icon: PlusCircle },
];

export default function BottomNav() {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-3 py-2 bg-[#0A0F00] border-t border-[#7A8A55] backdrop-blur-md">
      {links.map(({ to, label, icon: Icon, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          className={({ isActive }) =>
            [
              'flex flex-col items-center justify-center rounded-lg px-3 py-1 transition-all duration-200',
              isActive ? 'bg-[#D4FF1F] text-[#0F1408] scale-95' : 'text-[#D5DBB8] hover:text-white',
            ].join(' ')
          }
        >
          <Icon size={20} />
          <span className="label-caps text-[10px] mt-1">{label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
