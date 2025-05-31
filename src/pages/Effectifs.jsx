import { useState, useEffect } from "react";
import './Effectifs.css';
import { getResource, postResource, updateResource, deleteResource } from "../api/api";

// Définition des données
const grades = [
  { abbr: "ELG", full: "Élève Gendarme" },
  { abbr: "Gnd", full: "Gendarme" },
  { abbr: "Mdl/C", full: "Maréchal des Logis Chef" },
  { abbr: "ADJ", full: "Adjudant" },
  { abbr: "Adj/C", full: "Adjudant-Chef" },
  { abbr: "Maj", full: "Major" },
  { abbr: "Slt", full: "🛡️ Sous-Lieutenant" },
  { abbr: "Lt", full: "🛡️ Lieutenant" },
  { abbr: "Cpt", full: "🛡️ Capitaine" },
  { abbr: "Cen", full: "🛡️ Commandant" },
  { abbr: "Lt Col", full: "🛡️ Lieutenant-Colonel" },
  { abbr: "Col", full: "🛡️ Colonel" },
];

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
        console.error("Erreur réseau :", e);
        setErrorMessage("Erreur réseau lors du chargement.");
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
      setErrorMessage("Remplir nom, grade, unité.");
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
      setErrorMessage(e.message || "Erreur création");
    }
  };

  const handleAgentUpdate = async (id, field, value) => {
    try {
      const updated = await updateResource("agents", id, { [field]: value });
      setAgents((prev) => prev.map((a) => (a.id === id ? updated : a)));
    } catch (e) {
      console.error("Erreur mise à jour :", e);
    }
  };

  const handleDeleteAgent = async (id) => {
    if (!confirm("Supprimer cet agent ?")) return;
    try {
      await deleteResource("agents", id);
      setAgents((prev) => prev.filter((a) => a.id !== id));
    } catch (e) {
      console.error("Erreur suppression :", e);
    }
  };

  // Fonction utilitaire : obtenir le libellé complet d’un grade
  const getGradeLabel = (abbr) => {
    const found = grades.find((g) => g.abbr === abbr);
    return found ? found.full : abbr;
  };

  const isOfficier = (grade) => ["Slt", "Lt", "Cpt", "Cen", "Lt Col", "Col"].includes(grade);

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
              <option key={g.abbr} value={g.abbr}>{g.full}</option>
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
                  <span className="effectifs-grade">{getGradeLabel(agent.grade)}</span>
                </div>
                <p><strong>Unité :</strong> {agent.unite}</p>

                <p><strong>Grade :</strong></p>
                <select
                  value={agent.grade}
                  onChange={(e) => handleAgentUpdate(agent.id, "grade", e.target.value)}
                  disabled={!isOfficier(agent.grade)}
                  className="effectifs-select"
                >
                  {grades.map((g) => (
                    <option key={g.abbr} value={g.abbr}>{g.full}</option>
                  ))}
                </select>

                <p><strong>Unité :</strong></p>
                <select
                  value={agent.unite}
                  onChange={(e) => handleAgentUpdate(agent.id, "unite", e.target.value)}
                  disabled={!isOfficier(agent.grade)}
                  className="effectifs-select"
                >
                  {unites.map((u) => (
                    <option key={u} value={u}>{u}</option>
                  ))}
                </select>

                <p><strong>Spécialités :</strong></p>
                <div className="effectifs-checkbox-group">
                  {specialites.map((s) => (
                    <label key={s}>
                      <input
                        type="checkbox"
                        value={s}
                        checked={agent.specialites?.includes(s)}
                        onChange={(e) => {
                          if (!isOfficier(agent.grade)) return;
                          const updatedSpecialites = e.target.checked
                            ? [...(agent.specialites || []), s]
                            : agent.specialites.filter((sp) => sp !== s);
                          handleAgentUpdate(agent.id, "specialites", updatedSpecialites);
                        }}
                        disabled={!isOfficier(agent.grade)}
                      /> {s}
                    </label>
                  ))}
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

                <button onClick={() => handleDeleteAgent(agent.id)} className="effectifs-button" style={{ backgroundColor: "darkred", marginTop: "0.5rem" }}>
                  🗑️ Supprimer
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
