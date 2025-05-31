import { useState, useEffect } from "react";
import './Pulsar.css';

export default function Pulsar({ patrols = [], setPatrols }) {
  const [serviceOptions] = useState([
    "PAM Fort de France", "PAM Trinité", "PAM Le Marin", "PAM 2 Fort de France", "PAM 2 Trinité", "PAM 2 Le Marin",
    "PSIG 1", "PSIG 2", "PSIG 3", "PMO 1", "PMO 2", "ERI", "HELICO", "BRIGADE NAUTIQUE", "BRIGADE NAUTIQUE 2",
    "GIC", "GIC 2", "DISR", "DIR 1", "DIR 2", "DIR 3"
  ]);

  const [typeOptions] = useState([
    "Prevention de proximité", "Police route véhicule sérigraphié", "Police route véhicule banalisé",
    "Patrouille pédestre", "Enquête judiciaire", "Évènement culturel ou sportif", "ORC", "OAD", "Surveillance aérienne"
  ]);

  const [formData, setFormData] = useState({
    id: null,
    start: "",
    end: "",
    service: "",
    type: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchPatrols() {
      try {
        const response = await fetch("http://localhost:3001/api/patrols");
        const data = await response.json();
        setPatrols(data);
      } catch (e) {
        console.error("Erreur réseau chargement patrouilles", e);
        setErrorMessage("Erreur réseau lors du chargement des patrouilles.");
      }
    }
    fetchPatrols();
  }, [setPatrols]);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAddOrUpdatePatrol = async () => {
    setErrorMessage("");
    const { id, start, end, service, type } = formData;
    if (!start || !end || !service || !type) {
      setErrorMessage("Veuillez remplir tous les champs.");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3001/api/patrols", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const newPatrol = await response.json();

      if (id !== null) {
        setPatrols(prev => prev.map(p => p.id === id ? newPatrol : p));
      } else {
        setPatrols(prev => [...prev, newPatrol]);
      }
      setFormData({ id: null, start: "", end: "", service: "", type: "" });
    } catch (e) {
      console.error(e);
      setErrorMessage("Erreur lors de la sauvegarde");
    }
    setLoading(false);
  };

  const handleEdit = (patrol) => {
    setFormData(patrol);
    setErrorMessage("");
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Voulez-vous vraiment supprimer cette patrouille ?")) return;
    setErrorMessage("");
    setLoading(true);
    try {
      await fetch(`http://localhost:3001/api/patrols/${id}`, { method: "DELETE" });
      setPatrols(prev => prev.filter(p => p.id !== id));
      if (formData.id === id) {
        setFormData({ id: null, start: "", end: "", service: "", type: "" });
      }
    } catch (e) {
      console.error(e);
      setErrorMessage("Erreur lors de la suppression");
    }
    setLoading(false);
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
          disabled={loading}
        />
        <input
          type="datetime-local"
          name="end"
          value={formData.end}
          onChange={handleChange}
          placeholder="Fin"
          className="pulsar-input"
          disabled={loading}
        />
        <select
          name="service"
          value={formData.service}
          onChange={handleChange}
          className="pulsar-select"
          disabled={loading}
        >
          <option value="">Service</option>
          {serviceOptions.map(service => (
            <option key={service} value={service}>{service}</option>
          ))}
        </select>
        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="pulsar-select"
          disabled={loading}
        >
          <option value="">Type de patrouille</option>
          {typeOptions.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
        <button
          onClick={handleAddOrUpdatePatrol}
          className="pulsar-button"
          disabled={loading}
          style={{ cursor: loading ? "wait" : "pointer" }}
        >
          {formData.id !== null ? "Modifier" : "Ajouter"}
        </button>
        {errorMessage && <p style={{ color: "red", marginTop: 10, fontWeight: "bold" }}>{errorMessage}</p>}
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
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {patrols.length === 0 ? (
              <tr>
                <td colSpan="5" className="pulsar-empty">Aucune patrouille enregistrée.</td>
              </tr>
            ) : (
              patrols.map(({ id, start, end, service, type }) => (
                <tr key={id}>
                  <td style={{ whiteSpace: "nowrap" }}>
                    {new Date(start).toLocaleString("fr-FR", {
                      year: "numeric", month: "2-digit", day: "2-digit",
                      hour: "2-digit", minute: "2-digit"
                    })}
                  </td>
                  <td style={{ whiteSpace: "nowrap" }}>
                    {new Date(end).toLocaleString("fr-FR", {
                      year: "numeric", month: "2-digit", day: "2-digit",
                      hour: "2-digit", minute: "2-digit"
                    })}
                  </td>
                  <td>{service}</td>
                  <td>{type}</td>
                  <td>
                    <button onClick={() => handleEdit({ id, start, end, service, type })} disabled={loading}>✏️</button>
                    <button onClick={() => handleDelete(id)} style={{ marginLeft: "8px", color: "red" }} disabled={loading}>🗑️</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </section>
    </div>
  );
}
