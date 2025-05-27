import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const interventions = [
  { unit: "GD", count: 12 },
  { unit: "PMO", count: 7 },
  { unit: "PSIG", count: 9 },
];

export default function Dashboard() {
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);

  const handleLogin = () => {
    if (password === "gendarmerie2025") {
      setAuthenticated(true);
    } else {
      alert("Mot de passe incorrect");
    }
  };

  if (!authenticated) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-blue-900 text-white">
        <h1 className="text-2xl font-bold mb-4">Accès sécurisé - Gendarmerie MRP</h1>
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="px-4 py-2 rounded text-black"
        />
        <button
          onClick={handleLogin}
          className="mt-4 px-4 py-2 bg-white text-blue-900 font-semibold rounded hover:bg-gray-200"
        >
          Se connecter
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* En-tête */}
      <header className="text-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-blue-900">Gendarmerie Nationale - Martinique RP</h1>
        <p className="text-gray-600">Notre Engagement, votre sécurité</p>
      </header>

      {/* Contenu */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 shadow rounded">
          <h2 className="text-lg font-bold mb-2">Effectifs</h2>
          <p>Gestion des membres par unité, grade et spécialité</p>
        </div>
        <div className="bg-white p-4 shadow rounded">
          <h2 className="text-lg font-bold mb-2">BDSP</h2>
          <p>Gestion des interventions</p>
        </div>
        <div className="bg-white p-4 shadow rounded">
          <h2 className="text-lg font-bold mb-2">Pulsar</h2>
          <p>Organisation des patrouilles</p>
        </div>
        <div className="bg-white p-4 shadow rounded">
          <h2 className="text-lg font-bold mb-4">Statistiques par unité</h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={interventions}>
              <XAxis dataKey="unit" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#1e3a8a" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
