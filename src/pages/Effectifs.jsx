import { useState, useEffect } from "react";
import './Effectifs.css';
import { getResource, postResource, updateResource } from "../api/api";

const grades = ["ELG", "Gnd", "Mdl/C", "ADJ", "Adj/C", "Maj", "Slt", "Lt", "Cpt", "Cen", "Lt Col", "Col"];
const unites = ["GD", "PMO", "PSIG"];
const specialites = ["FAGN", "GIC", "TICP", "ERI"];
const statuts = ["Indispo", "Disponible", "Congés"];

export default function Effectifs({ agents, setAgents }) {
  const [newAgent, setNewAgent] = useState({
    nom: "",
    grade: "",
    unite: "",
    specialites: [],
  });
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function fetchAgents() {
      try {
        const data = await getResource("agents");
        setAgents(data);
      } catch (e) {
        console.error("Erreur réseau lors du chargement des agents :", e);
        setErrorMessage("Erreur réseau lors du chargement des agents.");
      }
    }
    fetchAgents();
  }, [setAgents]);

  const handleSpecialiteChange = (e) => {
    const { value, checked } = e.target;
    setNewAgent((prev) => {
      const newSpecialites = checked
        ? [...prev.specialites, value]
        : prev.specialites.filter((s) => s !== value);
      return { ...prev, specialites: newSpecialites };
    });
  };

  const handleAddAgent = async () => {
    setErrorMessage("");
    if (!newAgent.nom || !newAgent.grade || !newAgent.unite) {
      setErrorMessage("Veuillez remplir au minimum le nom, le grade et l'unité.");
      return;
    }
    try {
      const agentToCreate = {
        ...newAgent,
        statut: "Indispo",
      };
      const createdAgent = await postResource("agents", agentToCreate);
      setAgents((prev) => [...prev, createdAgent]);
      setNewAgent({ nom: "", grade: "", unite: "", specialites: [] });
    } catch (e) {
      console.error("Erreur création agent :", e);
      setErrorMessage(e.message || "Erreur lors de la création de l'agent");
    }
  };

  const handleAgentUpdate = async (id, field, value) => {
    try {
      const updated = await updateResource("agents", id, { [field]: value });
      setAgents((prev) => prev.map((a) => (a.id === id ? updated : a)));
    } catch (e) {
      console.error("Erreur mise à jour de l'agent :", e);
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
          <div className="effectifs-checkbox-group">
            {specialites.map((s) => (
              <label key={s}>
                <input
                  type="checkbox"
                  value={s}
                  checked={newAgent.specialites.includes(s)}
                  onChange={handleSpecialiteChange}
                /> {s}
              </label>
            ))}
          </div>
          <button onClick={handleAddAgent} className="effectifs-button">
            💾 Enregistrer
          </button>
        </div>
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
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
                <p><strong>Unité :</strong> {agent.unite}</p>
                <p><strong>Spécialités :</strong></p>
                <div className="effectifs-badges">
                  {agent.specialites?.length > 0 ? (
                    agent.specialites.map((s, index) => (
                      <span key={index} className="badge-specialite">{s}</span>
                    ))
                  ) : (
                    <em>Aucune</em>
                  )}
                </div>
                <p>
                  <strong>Statut :</strong>
                  <select
                    value={agent.statut || "Indispo"}
                    onChange={(e) => handleAgentUpdate(agent.id, "statut", e.target.value)}
                    className={`effectifs-select effectifs-status-${(agent.statut || "Indispo").toLowerCase()}`}
                  >
                    {statuts.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
