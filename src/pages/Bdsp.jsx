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
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-blue-900 mb-6">🚨 BDSP - Interventions</h1>

      <div className="card mb-8">
        <div className="section-title">➕ Nouvelle intervention</div>
        <div className="grid gap-4 pt-4">
          <input
            placeholder="Type d’intervention"
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
          />
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

      <div className="card">
        <div className="section-title">📂 Historique des interventions</div>
        <div className="pt-4 space-y-4">
          {interventions.length === 0 ? (
            <p c
