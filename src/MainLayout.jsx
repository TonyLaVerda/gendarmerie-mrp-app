export default function MainLayout() {
  // ... tes états et imports

  return (
    <div className="flex flex-col min-h-screen">
      {/* Barre de navigation */}
      <header className="bg-blue-900 text-white shadow">
        <Navbar />
      </header>

      {/* Contenu principal */}
      <main className="flex-1 bg-gray-50 px-4 py-6 max-w-5xl w-full mx-auto"> {/* max-w-5xl et centré */}
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/effectifs" element={<Effectifs agents={agents} setAgents={setAgents} />} />
          <Route path="/bdsp" element={<Bdsp />} />
          <Route path="/pulsar" element={<Pulsar patrols={patrols} setPatrols={setPatrols} />} />
          <Route
            path="/commandement"
            element={
              <Commandement
                agents={agents}
                setAgents={setAgents}
                patrols={patrols}
                setPatrols={setPatrols}
              />
            }
          />
          <Route path="/stats" element={<Stats />} />
        </Routes>
      </main>

      {/* Pied de page */}
      <div className="footer-wrapper">
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
    </div>
  );
}
