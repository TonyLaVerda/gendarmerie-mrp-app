// src/pages/Effectifs.jsx
import { useState, useEffect } from "react";
import './Effectifs.css';
import { getResource, postResource, updateResource, deleteResource } from "../api/api";

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

  const storedUser = JSON.parse(localStorage.getItem("user"));
  const userId = storedUser?.id;
  const isUserOfficer = storedUser?.role === "officier";

  useEffect(() => {
    async function fetchAgents() {
      try {
        const data = await getResource("agents");
        setAgents(data);
      } catch (e) {
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
    if (!storedUser || !newAgent.nom || !newAgent.grade || !newAgent.unite) {
      setErrorMessage("Remplissez tous les champs et connectez-vous.");
      return;
    }

    try {
      const agentToCreate = {
        ...newAgent,
        statut: "Indispo",
        userId: storedUser.id,
      };
      const createdAgent = await postResource("agents", agentToCreate);
      setAgents((prev) => [...prev, createdAgent]);
      setNewAgent({ nom: "", grade: "", unite: "", specialites: [] });
    } catch (e) {
      setErrorMessage(e.message || "Erreur création agent.");
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

  const getGradeLabel = (abbr) => {
    const found = grades.find((g) => g.abbr === abbr);
    return found ? found.full : abbr;
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
          />
          <select
            value={newAgent.grade}
            onChange={(e) => setNewAgent({ ...newAgent, grade: e.target.value })}
          >
            <option value="">Grade</option>
            {grades.map((g) => (
              <option key={g.abbr} value={g.abbr}>{g.full}</option>
            ))}
          </select>
          <select
            value={newAgent.unite}
            onChange={(e) => setNewAgent({ ...newAgent, unite: e.target.value })}
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
          <button onClick={handleAddAgent}>💾 Enregistrer</button>
        </div>
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      </section>

      <section className="effectifs-list">
        {agents.length === 0 ? (
          <p>Aucun agent enregistré.</p>
        ) : (
          <div className="effectifs-cards">
            {agents.map((agent) => {
              const isSelf = agent.userId === userId;
              const canEdit = isUserOfficer || isSelf;

              return (
                <div key={agent.id} className="effectifs-card">
                  <h3>{agent.nom}</h3>
                  <p><strong>Grade :</strong></p>
                  <select
                    value={agent.grade}
                    onChange={(e) => handleAgentUpdate(agent.id, "grade", e.target.value)}
                    disabled={!canEdit}
                  >
                    {grades.map((g) => (
                      <option key={g.abbr} value={g.abbr}>{g.full}</option>
                    ))}
                  </select>

                  <p><strong>Unité :</strong></p>
                  <select
                    value={agent.unite}
                    onChange={(e) => handleAgentUpdate(agent.id, "unite", e.target.value)}
                    disabled={!canEdit}
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
                            if (!canEdit) return;
                            const updatedSpecialites = e.target.checked
                              ? [...(agent.specialites || []), s]
                              : agent.specialites.filter((sp) => sp !== s);
                            handleAgentUpdate(agent.id, "specialites", updatedSpecialites);
                          }}
                          disabled={!canEdit}
                        /> {s}
                      </label>
                    ))}
                  </div>

                  <p><strong>Statut :</strong></p>
                  <select
                    value={agent.statut || "Indispo"}
                    onChange={(e) => handleAgentUpdate(agent.id, "statut", e.target.value)}
                    disabled={!canEdit && !isSelf}
                  >
                    {statuts.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>

                  {isUserOfficer && (
                    <button onClick={() => handleDeleteAgent(agent.id)} style={{ background: "darkred", color: "white", marginTop: "0.5rem" }}>
                      🗑️ Supprimer
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
