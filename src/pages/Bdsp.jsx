import { useState, useMemo } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";

const typesInterventions = [
  "Rixe",
  "ACR Matériel",
  "ACR",
  "Incendie",
  "Vol de VL",
  "Vol",
  "Cambriolage",
  "Effraction",
  "Incivilité",
  "Braquage",
  "Prise d'otage",
  "Tentative de suicide",
  "Découverte de cadavre"
];

export default function Bdsp() {
  const [interventions, setInterventions] = useState([]);
  const [filtreType, setFiltreType] = useState("");
  const [form, setForm] = useState({
    type: "",
    lieu: "",
    date: "",
    agents: "",
    compteRendu: ""
  });

  const handleAdd = () => {
    if (form.type && form.lieu && form.date) {
      setInterventions([...interventions, { ...form }]);
      setForm({ type: "", lieu: "", date: "", agents: "", compteRendu: "" });
    }
  };

  const dataStatistiques = useMemo(() => {
    const counts = {};
    interventions.forEach((iv) => {
      const day = iv.date.split("T")[0];
      counts[day] = (counts[day] || 0) + 1;
    });
    return Object.entries(counts).map(([date, count]) => ({ date, count }));
  }, [interventions]);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-blue-900 mb-6">🚨 BDSP - Interventions</h1>

      <div className="card mb-8">
        <div className="section-title">➕ Nouvelle intervention</div>
        <div className="grid gap-4 pt-4">
          <select
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
            className="p-2 border rounded"
          >
            <option value="">-- Sélectionner un type d’intervention --</option>
            {typesInterventions.map((type, idx) => (
              <option key={idx} value={type}>{type}</option>
            ))}
          </select>

          <input
            placeholder="Lieu"
            value={form.lieu}
            onChange={(e) => setForm({ ...form, lieu: e.target.value })}
          />
          <input
            type="datetime-local"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
          />
          <input
            placeholder="Agents présents"
            value={form.agents}
            onChange={(e) => setForm({ ...form, agents: e.target.value })}
          />
          <textarea
            placeholder="Compte-rendu"
            value={form.compteRendu}
            onChange={(e) => setForm({ ...form, compteRendu: e.target.value })}
          />
          <button onClick={handleAdd}>➕ Ajouter l’intervention</button>
        </div>
      </div>

      <div className="card mb-6">
        <div className="section-title">🔎 Filtrer les interventions</div>
        <div className="pt-4">
          <select
            value={filtreType}
            onChange={(e) => setFiltreType(e.target.value)}
            className="p-2 border rounded w-full"
          >
            <option value="">-- Toutes les interventions --</option>
            {typesInterventions.map((type, idx) => (
              <option key={idx} value={type}>{type}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="card">
        <div className="section-title">📂 Historique des interventions</div>
        <div className="pt-4 space-y-4">
          {interventions.filter(iv => !filtreType || iv.type === filtreType).length === 0 ? (
            <p className="text-gray-600">Aucune intervention enregistrée.</p>
          ) : (
            interventions
              .filter(iv => !filtreType || iv.type === filtreType)
              .map((iv, index) => (
                <div key={index} className="bg-gray-50 border-l-4 border-blue-800 p-4 rounded">
                  <p><strong>📍 Type :</strong> {iv.type}</p>
                  <p><strong>📌 Lieu :</strong> {iv.lieu}</p>
                  <p><strong>🕒 Date :</strong> <span className="text-sm bg-blue-100 px-2 py-1 rounded">{iv.date}</span></p>
                  <p><strong>👮 Agents :</strong> {iv.agents}</p>
                  <p><strong>📝 Compte-rendu :</strong> {iv.compteRendu}</p>
                </div>
              ))
          )}
        </div>
      </div>

      <div className="card mt-6">
        <div className="section-title">📊 Statistiques - Interventions par jour</div>
        <div className="h-64 pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={dataStatistiques}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#1E3A8A" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
