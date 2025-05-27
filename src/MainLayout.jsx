import { Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import Effectifs from './pages/Effectifs';
import Bdsp from './pages/Bdsp';
import Pulsar from './pages/Pulsar';
import Navbar from './components/Navbar';

export default function MainLayout() {
  return (
    <div className="flex flex-col h-screen">
      <header className="bg-blue-900 text-white shadow">
        <Navbar />
      </header>

      <main className="flex-1 overflow-y-auto p-4 bg-gray-50">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/effectifs" element={<Effectifs />} />
          <Route path="/bdsp" element={<Bdsp />} />
          <Route path="/pulsar" element={<Pulsar />} />
        </Routes>
      </main>
    </div>
  );
}
