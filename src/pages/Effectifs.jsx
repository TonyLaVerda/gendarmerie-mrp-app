import { useState, useEffect } from "react";
import './Effectifs.css';
import { getResource, postResource } from "../api/api";

const grades = ["ELG", "Gnd", "Mdl/C", "ADJ", "Adj/C", "Maj", "Slt", "Lt", "Cpt", "Cen", "Lt Col", "Col"];
const unites = ["GD", "PMO", "PSIG"];
const specialites = ["FAGN", "GIC", "TICP", "ERI"];

export default function Effectifs({ agents, setAgents }) {
    console.log("Effectifs render - agents:", agents);
  const [newAgent, setNewAgent] = useState({
    nom: "",
    grade: "",
    unite: "",
    specialite: "",
    statut: "Indispo",
  });

  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function fetchAgents() {
      try {
        const data = await getResource("agents");
        setAgents(data);
      } catch (e) {
        console.error("Erreur réseau chargement agents", e);
        setErrorMessage("Erreur réseau lors du chargement des agents.");
      }
    }
    fetchAgents();
  }, [setAgents]);

  const handleAddAgent = async () => {
    setErrorMessage(""); // reset message erreur
    if (!newAgent.nom || !newAgent.grade || !newAgent.unite) {
      setErrorMessage("Veuillez remplir au minimum le nom, le grade et l'unité.");
      return;
    }
    try {
      const createdAgent = await postResource("agents", newAgent);
      setAgents(prev => [...prev, createdAgent]);
      setNewAgent({
        nom: "",
        grade: "",
        unite: "",
        specialite: "",
        statut: "Indispo",
      });
    } catch (e) {
      console.error("Erreur création agent :", e);
      const msg = e.message || "Erreur lors de la création de l'agent";
      setErrorMessage(msg);
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
        {errorMessage && (
          <p style={{ color: "red", marginTop: 10, fontWeight: "bold" }}>
            {errorMessage}
          </p>
        )}
      </section>

      <section className="effectifs-list">
        {!agents || agents.length === 0 ? (
          <p>Aucun agent enregistré.</p>
        ) : (
          <div className="effectifs-cards">
            {agents.map((agent) => (
              <div key={agent.id} className="effectifs-card">
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
