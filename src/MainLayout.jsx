import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Effectifs from './pages/Effectifs';
import Bdsp from './pages/Bdsp';
import Pulsar from './pages/Pulsar';
import Commandement from './pages/Commandement';
import Stats from './pages/Stats';

export default function MainLayout() {
  const [agents, setAgents] = useState([]);
  const [patrols, setPatrols] = useState([]);
  const [interventions, setInterventions] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const [agentsRes, patrolsRes, interventionsRes] = await Promise.all([
          fetch('/api/agents'),
          fetch('/api/patrols'),
          fetch('/api/interventions'),
        ]);

        if (!agentsRes.ok || !patrolsRes.ok || !interventionsRes.ok) {
          throw new Error('Erreur lors du chargement des données');
        }

        const [agentsData, patrolsData, interventionsData] = await Promise.all([
          agentsRes.json(),
          patrolsRes.json(),
          interventionsRes.json(),
        ]);

        setAgents(agentsData);
        setPatrols(patrolsData);
        setInterventions(interventionsData);
      } catch (error) {
        console.error('Erreur fetch data:', error);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="flex flex-col min-h-screen relative">
      {/* Barre de navigation */}
      <header className="bg-blue-900 text-white shadow">
        <Navbar />
      </header>

      {/* Contenu principal */}
      <main className="flex-1 bg-gray-50 px-4 py-6 max-w-5xl w-full mx-auto">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/effectifs" element={<Effectifs agents={agents} setAgents={setAgents} />} />
          <Route path="/bdsp" element={
            <Bdsp
              patrols={patrols}
              interventions={interventions}
              setInterventions={setInterventions}
            />
          } />
          <Route path="/pulsar" element={<Pulsar patrols={patrols} setPatrols={setPatrols} />} />
          <Route path="/commandement" element={
            <Commandement
              agents={agents}
              setAgents={setAgents}
              patrols={patrols}
              setPatrols={setPatrols}
              interventions={interventions}
            />
          } />
          <Route path="/stats" element={<Stats />} />
        </Routes>
      </main>

      {/* Pied de page */}
      <footer className="text-center text-sm text-gray-500 py-2 bg-gray-100 border-t max-w-5xl mx-auto">
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
