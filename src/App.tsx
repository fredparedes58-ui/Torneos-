import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import TorneosList from './pages/TorneosList';
import TorneoDetail from './pages/TorneoDetail';
import Equipos from './pages/Equipos';
import RegistroScout from './pages/RegistroScout';
import PortalScout from './pages/PortalScout';
import JugadorDetail from './pages/JugadorDetail';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="torneos" element={<TorneosList />} />
          <Route path="torneos/:id" element={<TorneoDetail />} />
          <Route path="equipos" element={<Equipos />} />
          <Route path="jugador/:seed" element={<JugadorDetail />} />
          <Route path="registro" element={<RegistroScout />} />
          <Route path="portal" element={<PortalScout />} />
          {/* aliases legacy */}
          <Route path="nuevo" element={<Navigate to="/registro" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
