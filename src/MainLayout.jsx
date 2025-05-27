import { Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import Effectifs from './pages/Effectifs';
import Bdsp from './pages/Bdsp';
import Pulsar from './pages/Pulsar';
import Navbar from './components/Navbar';

export default function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Barre de navigation */}
      <header className="bg-blue-900 text-white shadow">
        <Navbar />
      </header>

      {/* Contenu principal */}
      <main className="flex-1 overflow-y-auto p-4 bg-gray-50">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/effectifs" element={<Effectifs />} />
          <Route path="/bdsp" element={<Bdsp />} />
          <Route path="/pulsar" element={<Pulsar />} />
        </Routes>
      </main>

      {/* Pied de page */}
      <footer className="text-center text-sm text-gray-500 py-2">
        Ce site est fictif, réalisé pour un serveur de jeu RP. En savoir plus sur{' '}
        <a
          href="https://martinique-roleplay.fr/"
          className="text-blue-700 underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          martinique-roleplay.fr
        </a>
      </footer>
    </div>
  );
}
