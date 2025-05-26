import { useState } from "react";

export default function Bdsp() {
  const [interventions, setInterventions] = useState([]);
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

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-blue-900 mb-4">📑 BDSP - Interventions</h1>

      <div className="grid gap-3 mb-6 max-w-xl">
        <input
          placeholder="Type d’intervention"
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
          className="p-2 border rounded"
        />
        <input
          placeholder="Lieu"
          value={form.lieu}
          onChange={(e) => setForm({ ...form, lieu: e.target.value })}
          className="p-2 border rounded"
        />
        <input
          type="datetime-local"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
          className="p-2 border rounded"
        />
        <input
          placeholder="Agents présents"
          value={form.agents}
          onChange={(e) => setForm({ ...form, agents: e.target.value })}
          className="p-2 border rounded"
        />
        <textarea
          placeholder="Compte-rendu"
          value={form.compteRendu}
          onChange={(e) => setForm({ ...form, compteRendu: e.target.value })}
          className="p-2 border rounded"
        />
        <button onClick={handleAdd} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          ➕ Ajouter intervention
        </button>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold text-blue-900 mb-2">📂 Historique</h2>
        {interventions.length === 0 ? (
          <p className="text-gray-600">Aucune intervention enregistrée.</p>
        ) : (
          <ul className="space-y-4">
            {interventions.map((iv, index) => (
              <li key={index} className="bg-white rounded shadow p-4">
                <p><strong>Type :</strong> {iv.type}</p>
                <p><strong>Lieu :</strong> {iv.lieu}</p>
                <p><strong>Date :</strong> {iv.date}</p>
                <p><strong>Agents :</strong> {iv.agents}</p>
                <p><strong>Compte-rendu :</strong> {iv.compteRendu}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
