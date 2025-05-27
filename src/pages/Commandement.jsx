import { useState, useEffect } from "react";
import './Commandement.css';

// Grades classés du plus haut au plus bas pour tri
const gradesOrder = ["Col", "Lt Col", "Cen", "Cpt", "Lt", "Slt", "Maj", "Adj/C", "ADJ", "Mdl/C", "Gnd", "ELG"];

export default function Commandement({ agents, setAgents, patrols, setPatrols }) {
  // Pour associer agents aux patrouilles (id patrouille -> liste d’agents)
  const [assignments, setAssignments] = useState({});

  // Trier agents par grade
  const sortedAgents = [...agents].sort((a, b) => {
    return gradesOrder.indexOf(a.grade) - gradesOrder.indexOf(b.grade);
  });

  // Ajout d’un agent à une patrouille
  const handleAssignAgent = (patrolId, agentNom) => {
    setAssignments((prev) => {
      const current = prev[patrolId] || [];
      if (!current.includes(agentNom)) {
        return {...prev, [patrolId]: [...current, agentNom]};
      }
      return prev;
    });
  };

  // Liste des patrouilles "en cours" = toutes ici par défaut (ou filtrer si tu as un champ)
  const ongoingPatrols = patrols;

  return (
    <div className="commandement-container">
      <h1>🛡 Commandement</h1>
      <div className="commandement-content">
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

        <section className="commandement-patrols">
          <h2>Patrouilles en cours</h2>
          {ongoingPatrols.length === 0 && <p>Aucune patrouille en cours.</p>}

          {ongoingPatrols.map((patrol) => (
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
                {sortedAgents.map((agent, i) => (
                  <option key={i} value={agent.nom}>{agent.nom} ({agent.grade})</option>
                ))}
              </select>

              <p>
                <strong>Statut :</strong> {/* Ici tu peux ajouter la logique pour le statut */}
                Disponible / Occupée / Engagée
              </p>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
