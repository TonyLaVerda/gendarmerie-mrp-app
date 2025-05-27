import { Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import Effectifs from './pages/Effectifs';
import Bdsp from './pages/Bdsp';
import Pulsar from './pages/Pulsar';
import Navbar from './components/Navbar';
import Stats from './pages/Stats'; // Assure-toi d’avoir ce fichier ou crée un placeholder

export default function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Barre de navigation */}
      <header className="bg-blue-900 text-white shadow">
        <Navbar />
      </header>

      {/* Contenu principal */}
      <main className="flex-1 bg-gray-50 px-4 py-6">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/effectifs" element={<Effectifs />} />
          <Route path="/bdsp" element={<Bdsp />} />
          <Route path="/pulsar" element={<Pulsar />} />
          <Route path="/stats" element={<Stats />} />
        </Routes>
      </main>

      {/* Pied de page */}
      <footer className="text-center text-sm text-gray-500 py-2 bg-gray-100 border-t">
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
