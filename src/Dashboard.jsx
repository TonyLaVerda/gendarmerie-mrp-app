import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const interventions = [
  { unit: "GD", count: 12 },
  { unit: "PMO", count: 7 },
  { unit: "PSIG", count: 9 },
];

export default function Dashboard() {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* En-tête */}
      <header className="text-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-blue-900">Gendarmerie Nationale - Martinique RP</h1>
        <p className="text-gray-600">Notre Engagement, votre sécurité</p>
      </header>

      {/* Contenu principal */}
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
