import { Link } from 'react-router-dom';
import { Bell, Trophy } from 'lucide-react';

export default function TopNav() {
  return (
    <nav className="sticky top-0 z-50 flex justify-between items-center w-full px-4 md:px-8 h-16 bg-[#111508]/90 backdrop-blur-md border-b border-[#434933]">
      <Link to="/" className="flex items-center gap-3">
        <div className="w-10 h-10 bg-[#C8FF00] flex items-center justify-center rounded-lg glow-green">
          <Trophy size={20} className="text-[#161F00]" strokeWidth={2.5} />
        </div>
        <span className="font-display font-extrabold text-2xl text-white tracking-tight uppercase">
          Cantera Hub
        </span>
      </Link>

      <div className="flex items-center gap-3">
        <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#282C1D] transition-transform active:scale-95 duration-150">
          <Bell size={20} className="text-[#C4CAAC]" />
        </button>
        <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-[#C8FF00] bg-gradient-to-br from-[#282C1D] to-[#191D10] flex items-center justify-center label-caps text-[#C8FF00]">
          FP
        </div>
      </div>
    </nav>
  );
}
