import { useState, useEffect } from "react";
import './Commandement.css';

const gradesOrder = ["Col", "Lt Col", "Cen", "Cpt", "Lt", "Slt", "Maj", "Adj/C", "ADJ", "Mdl/C", "Gnd", "ELG"];
const patrolStatusOptions = ["Disponible", "Engagée", "ASL", "Fin d'intervention"];

export default function Commandement({ agents = [], setAgents, patrols = [], setPatrols, interventions = [] }) {
  const [assignments, setAssignments] = useState({});
  const [patrolStatuses, setPatrolStatuses] = useState({});
  const [patrolInterventions, setPatrolInterventions] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const sortedAgents = [...agents].sort(
    (a, b) => gradesOrder.indexOf(a.grade) - gradesOrder.indexOf(b.grade)
  );

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setErrorMessage("");
      try {
        const [agentsRes, patrolsRes, assignRes, statusRes, linkRes] = await Promise.all([
          fetch("http://localhost:3001/api/agents"),
          fetch("http://localhost:3001/api/patrols"),
          fetch("http://localhost:3001/api/assignments"),
          fetch("http://localhost:3001/api/patrol-statuses"),
          fetch("http://localhost:3001/api/patrol-interventions"),
        ]);

        const [agentsData, patrolsData, assignData, statusData, linkData] = await Promise.all([
          agentsRes.json(),
          patrolsRes.json(),
          assignRes.json(),
          statusRes.json(),
          linkRes.json(),
        ]);

        setAgents(agentsData);
        setPatrols(patrolsData);
        setAssignments(assignData);
        setPatrolStatuses(statusData);
        setPatrolInterventions(linkData);
      } catch (error) {
        console.error("Erreur chargement données commandement :", error);
        setErrorMessage("Erreur lors du chargement des données.");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [setAgents, setPatrols]);

  const saveToBackend = async (endpoint, data) => {
    try {
      await fetch(`http://localhost:3001/api/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    } catch (error) {
      console.error(`Erreur sauvegarde ${endpoint}`, error);
      setErrorMessage(`Erreur lors de la sauvegarde (${endpoint})`);
    }
  };

  const handleStatusChange = (patrolId, newStatus) => {
    const newStatuses = { ...patrolStatuses, [patrolId]: newStatus };
    setPatrolStatuses(newStatuses);
    saveToBackend("patrol-statuses", newStatuses);
  };

  const handleInterventionChange = (patrolId, interventionId) => {
    const newMap = { ...patrolInterventions, [patrolId]: interventionId };
    setPatrolInterventions(newMap);
    saveToBackend("patrol-interventions", newMap);
  };

  const handleAssignAgent = (patrolId, agentNom) => {
    const current = assignments[patrolId] || [];
    if (!current.includes(agentNom)) {
      const newAssign = { ...assignments, [patrolId]: [...current, agentNom] };
      setAssignments(newAssign);
      saveToBackend("assignments", newAssign);
    }
  };

  const handleRemoveAgent = (patrolId, agentNom) => {
    const current = assignments[patrolId] || [];
    const newAssign = { ...assignments, [patrolId]: current.filter(nom => nom !== agentNom) };
    setAssignments(newAssign);
    saveToBackend("assignments", newAssign);
  };

  const getPatrolStatus = (patrolId) => {
    if (patrolStatuses[patrolId]) return patrolStatuses[patrolId];
    if (assignments[patrolId]?.length > 0) return "Engagée";
    return "Disponible";
  };

  return (
    <div className="commandement-container" style={{ maxWidth: "1000px", margin: "0 auto" }}>
      <h1>🛡 Commandement</h1>
      {errorMessage && <p style={{ color: "red", fontWeight: "bold" }}>{errorMessage}</p>}

      <div className="commandement-content">
        <aside className="commandement-agents">
          <h2>Effectifs</h2>
          {loading && <p>Chargement en cours...</p>}
          {!loading && sortedAgents.length === 0 && <p>Aucun agent enregistré.</p>}
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
          {loading && <p>Chargement en cours...</p>}
          {!loading && patrols.length === 0 && <p>Aucune patrouille en cours.</p>}

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
                    ))}
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

                <label>Intervention BDSP :</label>
                <select
                  value={interventionId || ""}
                  onChange={(e) => handleInterventionChange(patrol.id, e.target.value ? Number(e.target.value) : null)}
                >
                  <option value="">Aucune intervention liée</option>
                  {interventions.filter(iv => !iv.archived).map(iv => (
                    <option key={iv.id} value={iv.id}>
                      {iv.type} - {new Date(iv.date).toLocaleDateString()} - {iv.lieu}
                    </option>
                  ))}
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
