import { useState } from "react";
import './Commandement.css';

// Grades classés du plus haut au plus bas pour tri
const gradesOrder = ["Col", "Lt Col", "Cen", "Cpt", "Lt", "Slt", "Maj", "Adj/C", "ADJ", "Mdl/C", "Gnd", "ELG"];

export default function Commandement({ agents, setAgents, patrols, setPatrols }) {
  // Assignations : { [patrolId]: [agentNom, ...] }
  const [assignments, setAssignments] = useState({});

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

  // Exemple simple de calcul du statut d’une patrouille (à adapter)
  const getPatrolStatus = (patrolId) => {
    // Ici on pourrait récupérer le statut réel, pour l'instant fixe
    // Exemple : si assigné => Engagée, sinon Disponible
    if (assignments[patrolId] && assignments[patrolId].length > 0) return "Engagée";
    return "Disponible";
  };

  return (
    <div className="commandement-container">
      <h1>🛡 Commandement</h1>

      <div className="commandement-content">

        {/* Colonne agents */}
        <aside className="commandement-agents">
          <h2>Effectifs (du plus gradé au moins gradé)</h2>
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
                {(assignments[patrol.id] || []).map((nom, i) => (
                  <li key={i}>{nom}</li>
                ))}
                {(!assignments[patrol.id] || assignments[patrol.id].length === 0) && <li>Aucun agent assigné</li>}
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
                  // Filtrer les agents déjà assignés à cette patrouille
                  .filter(agent => !(assignments[patrol.id]?.includes(agent.nom)))
                  .map((agent, i) => (
                    <option key={i} value={agent.nom}>
                      {agent.nom} ({agent.grade})
                    </option>
                  ))
                }
              </select>

              <p>
                <strong>Statut :</strong> {getPatrolStatus(patrol.id)}
              </p>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
