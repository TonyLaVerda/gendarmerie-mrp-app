import { useState, useMemo } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";
import './Bdsp.css';

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
    } else {
      alert("Veuillez remplir au minimum le type, le lieu et la date.");
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
    <div className="bdsp-container">
      <h1 className="bdsp-title">🚨 BDSP - Interventions</h1>

      <section className="bdsp-card">
        <div className="section-title">➕ Nouvelle intervention</div>
        <div className="bdsp-form">
          <select
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
            className="bdsp-select"
          >
            <option value="">-- Sélectionner un type d’intervention --</option>
            {typesInterventions.map((type, idx) => (
              <option key={idx} value={type}>{type}</option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Lieu"
            value={form.lieu}
            onChange={(e) => setForm({ ...form, lieu: e.target.value })}
            className="bdsp-input"
          />
          <input
            type="datetime-local"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            className="bdsp-input"
          />
          <input
            type="text"
            placeholder="Agents présents"
            value={form.agents}
            onChange={(e) => setForm({ ...form, agents: e.target.value })}
            className="bdsp-input"
          />
          <textarea
            placeholder="Compte-rendu"
            value={form.compteRendu}
            onChange={(e) => setForm({ ...form, compteRendu: e.target.value })}
            className="bdsp-textarea"
          />
          <button onClick={handleAdd} className="bdsp-button">
            ➕ Ajouter l’intervention
          </button>
        </div>
      </section>

      <section className="bdsp-card">
        <div className="section-title">🔎 Filtrer les interventions</div>
        <select
          value={filtreType}
          onChange={(e) => setFiltreType(e.target.value)}
          className="bdsp-select full-width"
        >
          <option value="">-- Toutes les interventions --</option>
          {typesInterventions.map((type, idx) => (
            <option key={idx} value={type}>{type}</option>
          ))}
        </select>
      </section>

      <section className="bdsp-card">
        <div className="section-title">📂 Historique des interventions</div>
        <div className="bdsp-history">
          {interventions.filter(iv => !filtreType || iv.type === filtreType).length === 0 ? (
            <p className="bdsp-empty">Aucune intervention enregistrée.</p>
          ) : (
            interventions
              .filter(iv => !filtreType || iv.type === filtreType)
              .map((iv, index) => (
                <div key={index} className="bdsp-intervention">
                  <p><strong>📍 Type :</strong> {iv.type}</p>
                  <p><strong>📌 Lieu :</strong> {iv.lieu}</p>
                  <p><strong>🕒 Date :</strong> <span className="bdsp-date">{new Date(iv.date).toLocaleString()}</span></p>
                  <p><strong>👮 Agents :</strong> {iv.agents}</p>
                  <p><strong>📝 Compte-rendu :</strong> {iv.compteRendu}</p>
                </div>
              ))
          )}
        </div>
      </section>

      <section className="bdsp-card">
        <div className="section-title">📊 Statistiques - Interventions par jour</div>
        <div className="bdsp-chart">
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={dataStatistiques}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#1E3A8A" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>
    </div>
  );
}
