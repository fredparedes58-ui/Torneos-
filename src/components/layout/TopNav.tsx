import { Link } from 'react-router-dom';
import { Bell, Search, Trophy } from 'lucide-react';
import Avatar from '../effects/Avatar';

export default function TopNav() {
  return (
    <nav className="sticky top-0 z-50 flex justify-between items-center w-full px-4 md:px-8 h-16 bg-[#0F1408]/85 backdrop-blur-xl border-b border-[#5A6644]">
      <Link to="/" className="flex items-center gap-3 group">
        <div className="relative w-10 h-10 bg-[#D4FF1F] flex items-center justify-center rounded-lg glow-green transition-transform group-hover:scale-105">
          <Trophy size={20} className="text-[#0F1408]" strokeWidth={2.6} />
          <span className="absolute -bottom-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#4DFFA0] border-2 border-[#0F1408] pulse-dot" />
        </div>
        <span className="font-display font-extrabold text-2xl text-white tracking-tight uppercase">
          Torneos<span className="text-[#D4FF1F]">.</span>
        </span>
      </Link>

      <div className="flex items-center gap-2">
        <button className="hidden md:flex w-10 h-10 items-center justify-center rounded-full hover:bg-[#2A3320] transition-colors text-[#A5B084] hover:text-white">
          <Search size={18} />
        </button>
        <button className="relative w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#2A3320] transition-colors text-[#A5B084] hover:text-white">
          <Bell size={18} />
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#D4FF1F] pulse-dot" />
        </button>
        <Avatar seed={42} size={36} ring="lime" />
      </div>
    </nav>
  );
}
