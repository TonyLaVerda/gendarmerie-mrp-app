import { Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import Effectifs from './pages/Effectifs';
import Bdsp from './pages/Bdsp';
import Navbar from './components/Navbar';

export default function MainLayout() {
  return (
    <div>
      <Navbar /> {/* Banniere horizontale */}
      <div className="p-4 mt-16"> {/* Contenu décalé vers le bas */}
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/effectifs" element={<Effectifs />} />
          <Route path="/bdsp" element={<Bdsp />} />
          {/* <Route path="/pulsar" element={<Pulsar />} /> */}
        </Routes>
      </div>
    </div>
  );
}
