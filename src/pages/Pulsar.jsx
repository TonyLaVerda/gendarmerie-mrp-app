import { useState, useEffect } from "react";
import './Pulsar.css';

export default function Pulsar({ patrols, setPatrols }) {
  const [serviceOptions, setServiceOptions] = useState([
    "PAM Fort de France",
    "PAM Trinité",
    "PAM Le Marin",
    "PAM 2 Fort de France",
    "PAM 2 Trinité",
    "PAM 2 Le Marin",
    "PSIG 1",
    "PSIG 2",
    "PSIG 3",
    "PMO 1",
    "PMO 2",
    "ERI",
    "HELICO",
    "BRIGADE NAUTIQUE",
    "BRIGADE NAUTIQUE 2",
    "GIC",
    "GIC 2",
    "DISR",
    "DIR 1",
    "DIR 2",
    "DIR 3",
  ]);
  
  const [typeOptions, setTypeOptions] = useState([
    "Prevention de proximité",
    "Police route véhicule sérigraphié",
    "Police route véhicule banalisé",
    "Patrouille pédestre",
    "Enquête judiciaire",
    "Évènement culturel ou sportif",
    "ORC",
    "OAD",
    "Surveillance aérienne",
  ]);

  const [formData, setFormData] = useState({
    id: null,
    start: "",
    end: "",
    service: "",
    type: "",
  });

  useEffect(() => {
    // Charger patrouilles depuis API au montage
    async function fetchPatrols() {
      try {
        const res = await fetch('/api/patrols');
        if (res.ok) {
          const data = await res.json();
          setPatrols(data);
        } else {
          console.error("Erreur lors du chargement des patrouilles");
        }
      } catch (e) {
        console.error("Erreur réseau chargement patrouilles", e);
      }
    }
    fetchPatrols();
  }, [setPatrols]);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAddOrUpdatePatrol = async () => {
    const { id, start, end, service, type } = formData;
    if (!start || !end || !service || !type) {
      alert("Veuillez remplir tous les champs");
      return;
    }
    try {
      const res = await fetch('/api/patrols', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        const newPatrol = await res.json();
        setPatrols(prev => {
          if (id !== null) {
            // Mise à jour locale de la patrouille modifiée
            return prev.map(p => p.id === id ? newPatrol : p);
          } else {
            // Ajout local
            return [...prev, newPatrol];
          }
        });
        setFormData({ id: null, start: "", end: "", service: "", type: "" });
      } else {
        alert("Erreur lors de la sauvegarde");
      }
    } catch (e) {
      console.error(e);
      alert("Erreur réseau");
    }
  };

  const handleEdit = (patrol) => {
    setFormData(patrol);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Voulez-vous vraiment supprimer cette patrouille ?")) return;
    try {
      // Crée la route DELETE /api/patrols/:id côté serveur pour que ça fonctionne
      const res = await fetch(`/api/patrols/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setPatrols(prev => prev.filter(p => p.id !== id));
        if (formData.id === id) {
          setFormData({ id: null, start: "", end: "", service: "", type: "" });
        }
      } else {
        alert("Erreur lors de la suppression");
      }
    } catch (e) {
      console.error(e);
      alert("Erreur réseau");
    }
  };

  // Admin: gestion services/types reste inchangée, tu peux la remettre ici si besoin

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
          {serviceOptions.map(service => (
            <option key={service} value={service}>{service}</option>
          ))}
        </select>
        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="pulsar-select"
        >
          <option value="">Type de patrouille</option>
          {typeOptions.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
        <button onClick={handleAddOrUpdatePatrol} className="pulsar-button">
          {formData.id !== null ? "Modifier" : "Ajouter"}
        </button>
      </section>

      {/* Ajoute ici la partie admin si besoin */}

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
            {patrols.length === 0 && (
              <tr>
                <td colSpan="5" className="pulsar-empty">
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
                <td>
                  <button onClick={() => handleEdit({ id, start, end, service, type })}>✏️</button>
                  <button onClick={() => handleDelete(id)} style={{ marginLeft:"8px", color:"red" }}>🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
