import { Outlet, useLocation } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import Sidebar from './Sidebar';

export default function Layout() {
  const location = useLocation();
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (mainRef.current) {
      mainRef.current.classList.remove('page-enter');
      void mainRef.current.offsetWidth; // reflow
      mainRef.current.classList.add('page-enter');
    }
  }, [location.pathname]);

  return (
    <div className="flex h-screen overflow-hidden bg-[#07070F]">
      <Sidebar />
      <main
        ref={mainRef}
        className="flex-1 overflow-y-auto"
        style={{ scrollbarWidth: 'thin' }}
      >
        <Outlet />
      </main>
    </div>
  );
}

