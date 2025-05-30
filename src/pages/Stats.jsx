import './Stats.css';

export default function Stats({ agents = [], patrols = [], interventions = [] }) {
  return (
    <div className="stats-container">
      <h2 className="stats-title">Statistiques</h2>

      <div className="stats-summary">
        <div className="stats-item">
          <strong>Agents enregistrés :</strong> {agents.length}
        </div>
        <div className="stats-item">
          <strong>Patrouilles en cours :</strong> {patrols.length}
        </div>
        <div className="stats-item">
          <strong>Interventions enregistrées :</strong> {interventions.length}
        </div>
      </div>

      {agents.length === 0 && patrols.length === 0 && interventions.length === 0 && (
        <p className="stats-message">Aucune donnée disponible pour le moment.</p>
      )}
    </div>
  );
}
