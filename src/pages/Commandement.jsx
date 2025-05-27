import { useState, useEffect } from "react";
import './Commandement.css';

const gradesOrder = ["Col", "Lt Col", "Cen", "Cpt", "Lt", "Slt", "Maj", "Adj/C", "ADJ", "Mdl/C", "Gnd", "ELG"];
const patrolStatusOptions = ["Disponible", "Engagée", "ASL", "Fin d'intervention"];

export default function Commandement({ agents, setAgents, patrols, setPatrols, interventions = [] }) {
  const [assignments, setAssignments] = useState({});
  const [patrolStatuses, setPatrolStatuses] = useState({});

  // Ajout : associer intervention ID par patrouille ID
  const [patrolInterventions, setPatrolInterventions] = useState({});

  // Trier agents par grade (du plus gradé au moins gradé)
  const sortedAgents = [...agents].sort(
    (a, b) => gradesOrder.indexOf(a.grade) - gradesOrder.indexOf(b.grade)
  );

  // Charger assignments et statuses depuis l'API au chargement du composant
  useEffect(() => {
    async function fetchData() {
      try {
        const resAssignments = await fetch('/api/assignments');
        if (resAssignments.ok) {
          const data = await resAssignments.json();
          setAssignments(data);
        }
        const resStatuses = await fetch('/api/patrol-statuses');
        if (resStatuses.ok) {
          const data = await resStatuses.json();
          setPatrolStatuses(data);
        }
        // Hypothèse : fetch liaison patrouille->intervention
        const resPatrolInterv = await fetch('/api/patrol-interventions');
        if (resPatrolInterv.ok) {
          const data = await resPatrolInterv.json();
          setPatrolInterventions(data);
        }
      } catch (error) {
        console.error("Erreur chargement données commandement :", error);
      }
    }
    fetchData();
  }, []);

  // Sauvegarder assignments via API
  const saveAssignments = async (newAssignments) => {
    try {
      const res = await fetch('/api/assignments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newAssignments),
      });
      if (!res.ok) throw new Error("Erreur sauvegarde assignations");
    } catch (error) {
      console.error(error);
    }
  };

  // Sauvegarder patrol statuses via API
  const savePatrolStatuses = async (newStatuses) => {
    try {
      const res = await fetch('/api/patrol-statuses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newStatuses),
      });
      if (!res.ok) throw new Error("Erreur sauvegarde statuts");
    } catch (error) {
      console.error(error);
    }
  };

  // Sauvegarder liaison patrouille -> intervention
  const savePatrolInterventions = async (newMap) => {
    try {
      const res = await fetch('/api/patrol-interventions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newMap),
      });
      if (!res.ok) throw new Error("Erreur sauvegarde liaison patrouille-intervention");
    } catch (error) {
      console.error(error);
    }
  };

  // Ajouter un agent à une patrouille
  const handleAssignAgent = (patrolId, agentNom) => {
    setAssignments(prev => {
      const current = prev[patrolId] || [];
      if (!current.includes(agentNom)) {
        const newAssign = { ...prev, [patrolId]: [...current, agentNom] };
        saveAssignments(newAssign);
        return newAssign;
      }
      return prev;
    });
  };

  // Supprimer un agent d'une patrouille
  const handleRemoveAgent = (patrolId, agentNom) => {
    setAssignments(prev => {
      const current = prev[patrolId] || [];
      const newAssign = { ...prev, [patrolId]: current.filter(nom => nom !== agentNom) };
      saveAssignments(newAssign);
      return newAssign;
    });
  };

  // Modifier le statut d'une patrouille
  const handleStatusChange = (patrolId, newStatus) => {
    setPatrolStatuses(prev => {
      const newStatuses = { ...prev, [patrolId]: newStatus };
      savePatrolStatuses(newStatuses);
      return newStatuses;
    });
  };

  // Modifier liaison intervention de patrouille
  const handleInterventionChange = (patrolId, interventionId) => {
    setPatrolInterventions(prev => {
      const newMap = { ...prev, [patrolId]: interventionId };
      savePatrolInterventions(newMap);
      return newMap;
    });
  };

  // Récupérer le statut affiché
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

          {patrols.map((patrol) => {
            const interventionId = patrolInterventions[patrol.id];
            const intervention = interventions.find(iv => iv.id === interventionId);

            return (
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

                {/* Nouveau menu intervention BDSP */}
                <label>Intervention BDSP :</label>
                <select
                  value={interventionId || ""}
                  onChange={(e) => handleInterventionChange(patrol.id, e.target.value ? Number(e.target.value) : null)}
                >
                  <option value="">Aucune intervention liée</option>
                  {interventions
                    .filter(iv => !iv.archived)
                    .map(iv => (
                      <option key={iv.id} value={iv.id}>
                        {iv.type} - {new Date(iv.date).toLocaleDateString()} - {iv.lieu}
                      </option>
                    ))
                  }
                </select>

                {intervention && (
                  <p style={{ marginTop: "8px", fontStyle: "italic", color: "#004080" }}>
                    Intervention BDSP: {intervention.type} - {new Date(intervention.date).toLocaleString()} - {intervention.lieu}
                  </p>
                )}
              </div>
            );
          })}
        </section>
      </div>
    </div>
  );
}
