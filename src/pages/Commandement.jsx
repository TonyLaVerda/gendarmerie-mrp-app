import { useState } from "react";
import './Commandement.css';

// Grades classés du plus haut au plus bas pour tri
const gradesOrder = ["Col", "Lt Col", "Cen", "Cpt", "Lt", "Slt", "Maj", "Adj/C", "ADJ", "Mdl/C", "Gnd", "ELG"];

// Statuts possibles pour patrouille
const patrolStatusOptions = ["Disponible", "Engagée", "ASL", "Fin d'intervention"];

export default function Commandement({ agents, setAgents, patrols, setPatrols }) {
  // Assignations : { [patrolId]: [agentNom, ...] }
  const [assignments, setAssignments] = useState({});

  // Statuts par patrouille : { [patrolId]: statut }
  const [patrolStatuses, setPatrolStatuses] = useState({});

  // Trier agents par grade (du plus gradé au moins gradé)
  const sortedAgents = [...agents].sort(
    (a, b) => gradesOrder.indexOf(a.grade) - gradesOrder.indexOf(b.grade)
  );

  // Ajouter un agent à une patrouille (sans doublon)
  const handleAssignAgent = (patrolId, agentNom) => {
    setAssignments(prev => {
      const current = prev[patrolId] || [];
      if (!current.includes(agentNom)) {
        return { ...prev, [patrolId]: [...current, agentNom] };
      }
      return prev;
    });
  };

  // Supprimer un agent assigné d'une patrouille
  const handleRemoveAgent = (patrolId, agentNom) => {
    setAssignments(prev => {
      const current = prev[patrolId] || [];
      return {
        ...prev,
        [patrolId]: current.filter(nom => nom !== agentNom)
      };
    });
  };

  // Modifier le statut d'une patrouille
  const handleStatusChange = (patrolId, newStatus) => {
    setPatrolStatuses(prev => ({
      ...prev,
      [patrolId]: newStatus
    }));
  };

  // Statut affiché (priorité à celui modifié, sinon défaut)
  const getPatrolStatus = (patrolId) => {
    if (patrolStatuses[patrolId]) return patrolStatuses[patrolId];
    if (assignments[patrolId] && assignments[patrolId].length > 0) return "Engagée";
    return "Disponible";
  };

  return (
    <div className="commandement-container" style={{ maxWidth: "1000px", margin: "0 auto" }}>
      <h1>🛡 Commandement</h1>

      <div className="commandement-content">

        {/* Colonne agents */}
        <aside className="commandement-agents">
          <h2>Effectifs</h2>
          {sortedAgents.length === 0 && <p>Aucun agent enregistré.</p>}
          <ul>
            {sortedAgents.map((agent, idx) => (
              <li key={idx}>
                {agent.nom} - {agent.grade} - {agent.unite} - {agent.specialite || "Aucune"} - <strong>{agent.statut}</strong>
              </li>
            ))}
          </ul>
        </aside>

        {/* Colonne patrouilles */}
        <section className="commandement-patrols">
          <h2>Patrouilles en cours</h2>
          {patrols.length === 0 && <p>Aucune patrouille en cours.</p>}

          {patrols.map((patrol) => (
            <div key={patrol.id} className="patrol-card">
              <h3>{patrol.service}</h3>
              <p><strong>Début:</strong> {new Date(patrol.start).toLocaleString()}</p>
              <p><strong>Fin:</strong> {new Date(patrol.end).toLocaleString()}</p>
              <p><strong>Type:</strong> {patrol.type}</p>

              <label>Effectifs assignés :</label>
              <ul>
                {(assignments[patrol.id] || []).length === 0 ? (
                  <li>Aucun agent assigné</li>
                ) : (
                  assignments[patrol.id].map((nom, i) => (
                    <li key={i}>
                      {nom}{" "}
                      <button
                        style={{ marginLeft: "8px", color: "red", cursor: "pointer" }}
                        onClick={() => handleRemoveAgent(patrol.id, nom)}
                        title="Retirer cet agent"
                      >
                        ✖️
                      </button>
                    </li>
                  ))
                )}
              </ul>

              <label>Ajouter un agent :</label>
              <select
                onChange={(e) => {
                  if (e.target.value !== "") {
                    handleAssignAgent(patrol.id, e.target.value);
                    e.target.value = "";
                  }
                }}
                defaultValue=""
              >
                <option value="" disabled>Choisir un agent</option>
                {sortedAgents
                  .filter(agent => !(assignments[patrol.id]?.includes(agent.nom)))
                  .map((agent, i) => (
                    <option key={i} value={agent.nom}>
                      {agent.nom}
                    </option>
                  ))
                }
              </select>

              <label>Statut :</label>
              <select
                value={getPatrolStatus(patrol.id)}
                onChange={(e) => handleStatusChange(patrol.id, e.target.value)}
              >
                {patrolStatusOptions.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
