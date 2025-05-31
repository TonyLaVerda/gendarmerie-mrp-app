import { useEffect, useState } from "react";

const gradeLabels = {
  "ELG": "Élève Gendarme",
  "Gnd": "Gendarme",
  "Mdl/C": "Maréchal des Logis Chef",
  "ADJ": "Adjudant",
  "Adj/C": "Adjudant-Chef",
  "Maj": "Major",
  "Slt": "🛡️ Sous-Lieutenant",
  "Lt": "🛡️ Lieutenant",
  "Cpt": "🛡️ Capitaine",
  "Cen": "🛡️ Commandant",
  "Lt Col": "🛡️ Lieutenant-Colonel",
  "Col": "🛡️ Colonel",
};

export default function Dashboard() {
  const [agent, setAgent] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);

    async function fetchAgent() {
      if (!storedUser) return;
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("/api/agents", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const agents = await res.json();
        const linked = agents.find(a => a.userId === storedUser.id);
        setAgent(linked);
      } catch (e) {
        console.error("Erreur chargement agent:", e);
      }
    }

    fetchAgent();
  }, []);

  return (
    <div className="text-blue-900 p-6">
      <h1 className="text-3xl font-bold mb-2">
        Bienvenue {agent?.nom || "Gendarme"}
      </h1>

      {agent && (
        <div className="mt-2 text-lg">
          <p>
            <strong>Grade :</strong>{" "}
            <span className="font-semibold">
              {gradeLabels[agent.grade] || agent.grade}
            </span>
          </p>
          <p>
            <strong>Qualité :</strong>{" "}
            {user?.role === "officier" ? "🛡️ Officier" : "👮 Gendarme"}
          </p>
        </div>
      )}

      <p className="mt-8 text-sm text-gray-600">
        Ce site est fictif, réalisé pour un serveur de jeu RP. En savoir plus sur{" "}
        <a
          href="https://martinique-roleplay.fr"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-700 underline"
        >
          martinique-roleplay.fr
        </a>
      </p>
    </div>
  );
}
