import './Pulsar.css'; // Ton CSS

const serviceOptions = [
  "PAM Fort de France", "PAM Trinité", "PAM Le Marin",
  "PAM 2 Fort de France", "PAM 2 Trinité", "PAM 2 Le Marin",
  "PSIG 1", "PSIG 2", "PSIG 3", "PMO 1", "PMO 2", "ERI",
  "HELICO", "BRIGADE NAUTIQUE", "BRIGADE NAUTIQUE 2",
  "GIC", "GIC 2", "DISR", "DIR 1", "DIR 2", "DIR 3",
];

const typeOptions = [
  "Prevention de proximité", "Police route véhicule sérigraphié",
  "Police route véhicule banalisé", "Patrouille pédestre",
  "Enquête judiciaire", "Évènement culturel ou sportif",
  "ORC", "OAD", "Surveillance aérienne",
];

export default function Pulsar({ patrols, setPatrols }) {
  const [formData, setFormData] = React.useState({
    start: "",
    end: "",
    service: "",
    type: "",
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAddPatrol = () => {
    const { start, end, service, type } = formData;
    if (!start || !end || !service || !type) {
      alert("Veuillez remplir tous les champs");
      return;
    }
    setPatrols(prev => [...prev, { id: prev.length + 1, ...formData }]);
    setFormData({ start: "", end: "", service: "", type: "" });
  };

  return (
    <div className="pulsar-container">
      <header className="pulsar-header">
        <h1>Pulsar Service</h1>
        <p>Organisation des patrouilles</p>
      </header>

      <section className="pulsar-form">
        <input
          type="datetime-local"
          name="start"
          value={formData.start}
          onChange={handleChange}
          placeholder="Début"
          className="pulsar-input"
        />
        <input
          type="datetime-local"
          name="end"
          value={formData.end}
          onChange={handleChange}
          placeholder="Fin"
          className="pulsar-input"
        />
        <select
          name="service"
          value={formData.service}
          onChange={handleChange}
          className="pulsar-select"
        >
          <option value="">Service</option>
          {serviceOptions.map(s => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="pulsar-select"
        >
          <option value="">Type de patrouille</option>
          {typeOptions.map(t => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
        <button onClick={handleAddPatrol} className="pulsar-button">
          Ajouter
        </button>
      </section>

      <section className="pulsar-table-container">
        <h2>Liste des patrouilles</h2>
        <table className="pulsar-table">
          <thead>
            <tr>
              <th>Début</th>
              <th>Fin</th>
              <th>Service</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
            {patrols.length === 0 && (
              <tr>
                <td colSpan="4" className="pulsar-empty">
                  Aucune patrouille enregistrée.
                </td>
              </tr>
            )}
            {patrols.map(({ id, start, end, service, type }) => (
              <tr key={id}>
                <td style={{ whiteSpace: "nowrap" }}>
                  {new Date(start).toLocaleString(undefined, {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </td>
                <td style={{ whiteSpace: "nowrap" }}>
                  {new Date(end).toLocaleString(undefined, {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </td>
                <td>{service}</td>
                <td>{type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
