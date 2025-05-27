import { useState } from "react";

const unites = ["GD", "PMO", "PSIG"];
const types = ["Surveillance générale", "Contrôle routier", "Intervention ciblée", "Patrouille mixte", "Appui PSIG"];

export default function Pulsar() {
  const [patrouilles, setPatrouilles] = useState([]);
  const [form, setForm] = useState({
    date: "",
    heureDebut: "",
    heureFin: "",
    unite: "",
    type: "",
    lieu: "",
    statut: "Prévu"
  });

  const handleAdd = () => {
    if (form.date && form.heureDebut && form.heureFin && form.unite && form.type) {
      setPatrouilles([...patrouilles, { ...form }]);
      setForm({
        date: "",
        heureDebut: "",
        heureFin: "",
        unite: "",
        type: "",
        lieu: "",
        statut: "Prévu"
      });
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-blue-900 mb-6">📅 Pulsar Service</h1>

      <div className="card mb-8">
        <div className="section-title">➕ Nouveau créneau</div>
        <div className="grid gap-4 pt-4">
          <input
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            className="p-2 border rounded"
          />
          <div className="flex gap-2">
            <input
              type="time"
              value={form.heureDebut}
              onChange={(e) => setForm({ ...form, heureDebut: e.target.value })}
              className="p-2 border rounded w-full"
              placeholder="Début"
            />
            <input
              type="time"
              value={form.heureFin}
              onChange={(e) => setForm({ ...form, heureFin: e.target.value })}
              className="p-2 border rounded w-full"
              placeholder="Fin"
            />
          </div>
          <select
            value={form.unite}
            onChange={(e) => setForm({ ...form, unite: e.target.value })}
            className="p-2 border rounded"
          >
            <option value="">-- Sélectionner l’unité --</option>
            {unites.map((u, i) => (
              <option key={i} value={u}>{u}</option>
            ))}
          </select>
          <select
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
            className="p-2 border rounded"
          >
            <option value="">-- Type de patrouille --</option>
            {types.map((t, i) => (
              <option key={i} value={t}>{t}</option>
            ))}
          </select>
          <input
            placeholder="Lieu ou secteur"
            value={form.lieu}
            onChange={(e) => setForm({ ...form, lieu: e.target.value })}
            className="p-2 border rounded"
          />
          <button
            onClick={handleAdd}
            className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            💾 Ajouter la patrouille
          </button>
        </div>
      </div>

      <div className="card">
        <div className="section-title">📋 Patrouilles planifiées</div>
        <div className="pt-4 space-y-4">
          {patrouilles.length === 0 ? (
            <p className="text-gray-600">Aucun créneau enregistré.</p>
          ) : (
            patrouilles.map((p, index) => (
              <div key={index} className="bg-gray-50 border-l-4 border-blue-800 p-4 rounded">
                <p><strong>📅 Date :</strong> {p.date}</p>
                <p><strong>🕒 Heure :</strong> {p.heureDebut} - {p.heureFin}</p>
                <p><strong>👮 Unité :</strong> {p.unite}</p>
                <p><strong>🚓 Type :</strong> {p.type}</p>
                <p><strong>📍 Lieu :</strong> {p.lieu}</p>
                <p><strong>📌 Statut :</strong> {p.statut}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
