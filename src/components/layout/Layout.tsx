import { Outlet, useLocation } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import TopNav from './TopNav';
import Sidebar from './Sidebar';
import BottomNav from './BottomNav';

export default function Layout() {
  const location = useLocation();
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (mainRef.current) {
      mainRef.current.classList.remove('page-enter');
      void mainRef.current.offsetWidth;
      mainRef.current.classList.add('page-enter');
    }
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col pb-20 md:pb-0">
      <TopNav />
      <div className="flex flex-1">
        <Sidebar />
        <main ref={mainRef} className="flex-1 overflow-x-hidden">
          <Outlet />
        </main>
      </div>
      <BottomNav />
    </div>
  );
}
