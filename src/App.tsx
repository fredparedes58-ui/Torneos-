import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import TorneosList from './pages/TorneosList';
import TorneoDetail from './pages/TorneoDetail';
import Equipos from './pages/Equipos';
import NuevoTorneo from './pages/NuevoTorneo';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="torneos" element={<TorneosList />} />
          <Route path="torneos/:id" element={<TorneoDetail />} />
          <Route path="equipos" element={<Equipos />} />
          <Route path="nuevo" element={<NuevoTorneo />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

