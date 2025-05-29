import { useState, useEffect } from "react";
import './Effectifs.css';

const grades = ["ELG", "Gnd", "Mdl/C", "ADJ", "Adj/C", "Maj", "Slt", "Lt", "Cpt", "Cen", "Lt Col", "Col"];
const unites = ["GD", "PMO", "PSIG"];
const specialites = ["FAGN", "GIC", "TICP", "ERI"];

export default function Effectifs({ agents, setAgents }) {
  const [newAgent, setNewAgent] = useState({
    nom: "",
    grade: "",
    unite: "",
    specialite: "",
    statut: "Indispo",
  });

  useEffect(() => {
    async function fetchAgents() {
      try {
        const res = await fetch('/api/agents');
        if (res.ok) {
          const data = await res.json();
          setAgents(data);
        } else {
          console.error("Erreur lors du chargement des agents");
        }
      } catch (e) {
        console.error("Erreur réseau chargement agents", e);
      }
    }
    fetchAgents();
  }, [setAgents]);

  const handleAddAgent = async () => {
    if (!newAgent.nom || !newAgent.grade || !newAgent.unite) {
      alert("Veuillez remplir au minimum le nom, le grade et l'unité.");
      return;
    }
    try {
      const res = await fetch('/api/agents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newAgent),
      });
      if (res.ok) {
        const createdAgent = await res.json();
        setAgents(prev => [...prev, createdAgent]);
        setNewAgent({ nom: "", grade: "", unite: "", specialite: "", statut: "Indispo" });
      } else {
        alert("Erreur lors de la création de l'agent");
      }
    } catch (e) {
      console.error(e);
      alert("Erreur réseau");
    }
  };

  return (
    <div className="effectifs-container">
      <h1 className="effectifs-title">👮 Gestion des Effectifs</h1>

      <section className="effectifs-form-section">
        <h2>Ajouter un agent</h2>
        <div className="effectifs-form">
          <input
            type="text"
            placeholder="Nom"
            value={newAgent.nom}
            onChange={(e) => setNewAgent({ ...newAgent, nom: e.target.value })}
            className="effectifs-input"
          />
          <select
            value={newAgent.grade}
            onChange={(e) => setNewAgent({ ...newAgent, grade: e.target.value })}
            className="effectifs-select"
          >
            <option value="">Grade</option>
            {grades.map((g) => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>
          <select
            value={newAgent.unite}
            onChange={(e) => setNewAgent({ ...newAgent, unite: e.target.value })}
            className="effectifs-select"
          >
            <option value="">Unité</option>
            {unites.map((u) => (
              <option key={u} value={u}>{u}</option>
            ))}
          </select>
          <select
            value={newAgent.specialite}
            onChange={(e) => setNewAgent({ ...newAgent, specialite: e.target.value })}
            className="effectifs-select"
          >
            <option value="">Spécialité (optionnel)</option>
            {specialites.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          <select
            value={newAgent.statut}
            onChange={(e) => setNewAgent({ ...newAgent, statut: e.target.value })}
            className="effectifs-select"
          >
            <option value="Indispo">Indispo</option>
            <option value="Disponible">Disponible</option>
            <option value="Pause">Pause</option>
          </select>
          <button onClick={handleAddAgent} className="effectifs-button">
            💾 Enregistrer
          </button>
        </div>
      </section>

      <section className="effectifs-list">
        {agents.length === 0 ? (
          <p>Aucun agent enregistré.</p>
        ) : (
          <div className="effectifs-cards">
            {agents.map((agent, index) => (
              <div key={index} className="effectifs-card">
                <div className="effectifs-card-header">
                  <h3>{agent.nom}</h3>
                  <span className="effectifs-grade">{agent.grade}</span>
                </div>
                <p>
                  <strong>Unité :</strong>{" "}
                  <span className="effectifs-unit">{agent.unite}</span>
                </p>
                <p>
                  <strong>Spécialité :</strong> {agent.specialite || "Aucune"}
                </p>
                <p>
                  <strong>Statut :</strong>{" "}
                  <span className={`effectifs-status effectifs-status-${agent.statut.toLowerCase()}`}>
                    {agent.statut}
                  </span>
                </p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
