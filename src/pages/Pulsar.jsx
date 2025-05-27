import { useState } from "react";

const initialPatrols = [
  {
    id: 1,
    start: "2025-06-01T08:00",
    end: "2025-06-01T12:00",
    service: "PAM Fort de France",
    type: "Police route véhicule sérigraphié",
  },
  {
    id: 2,
    start: "2025-06-01T14:00",
    end: "2025-06-01T18:00",
    service: "PSIG 2",
    type: "Patrouille pédestre",
  },
];

const serviceOptions = [
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
];

const typeOptions = [
  "Prevention de proximité",
  "Police route véhicule sérigraphié",
  "Police route véhicule banalisé",
  "Patrouille pédestre",
  "Enquête judiciaire",
  "Évènement culturel ou sportif",
  "ORC",
  "OAD",
  "Surveillance aérienne",
];

const inputStyle = {
  padding: "8px",
  borderRadius: "6px",
  border: "1px solid #ccc",
  width: "100%",
  boxSizing: "border-box",
};

const buttonStyle = {
  marginTop: "16px",
  padding: "12px 24px",
  backgroundColor: "#002654",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  display: "block",
  marginLeft: "auto",
  marginRight: "auto",
};

const tableContainerStyle = {
  maxWidth: "95vw",
  margin: "0 auto",
  overflowX: "auto",
  backgroundColor: "white",
  border: "1px solid #ccc",
  borderRadius: "8px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
};

const tableStyle = {
  minWidth: "900px",
  width: "100%",
  borderCollapse: "collapse",
};

const thTdStyle = {
  padding: "12px 20px",
  borderBottom: "2px solid #004080",
  textAlign: "left",
};

const thStyle = {
  ...thTdStyle,
  backgroundColor: "#002654",
  color: "white",
};

const trHoverStyle = {
  backgroundColor: "#e6f0ff",
};

export default function Pulsar() {
  const [patrols, setPatrols] = useState(initialPatrols);
  const [formData, setFormData] = useState({
    start: "",
    end: "",
    service: "",
    type: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAddPatrol = () => {
    const { start, end, service, type } = formData;
    if (!start || !end || !service || !type) {
      alert("Veuillez remplir tous les champs");
      return;
    }
    setPatrols((prev) => [...prev, { id: prev.length + 1, ...formData }]);
    setFormData({ start: "", end: "", service: "", type: "" });
  };

  return (
    <div style={{ padding: "24px", backgroundColor: "#f0f4f9", minHeight: "100vh" }}>
      <header style={{ maxWidth: "800px", margin: "0 auto 24px auto", textAlign: "center" }}>
        <h1 style={{ color: "#002654", fontSize: "28px", marginBottom: "8px" }}>Pulsar Service</h1>
        <p style={{ color: "#555" }}>Organisation des patrouilles</p>
      </header>

      <section style={{ maxWidth: "800px", margin: "0 auto 32px auto" }}>
        <h2 style={{ fontWeight: "600", marginBottom: "12px" }}>Ajouter une patrouille</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "16px" }}>
          <input
            type="datetime-local"
            name="start"
            value={formData.start}
            onChange={handleChange}
            placeholder="Début"
            style={inputStyle}
          />
          <input
            type="datetime-local"
            name="end"
            value={formData.end}
            onChange={handleChange}
            placeholder="Fin"
            style={inputStyle}
          />
          <select
            name="service"
            value={formData.service}
            onChange={handleChange}
            style={inputStyle}
          >
            <option value="">Service</option>
            {serviceOptions.map((service) => (
              <option key={service} value={service}>
                {service}
              </option>
            ))}
          </select>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            style={inputStyle}
          >
            <option value="">Type de patrouille</option>
            {typeOptions.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <button onClick={handleAddPatrol} style={buttonStyle}>
          Ajouter
        </button>
      </section>

      <section style={{ maxWidth: "95vw", margin: "0 auto" }}>
        <h2 style={{ fontWeight: "600", marginBottom: "16px", fontSize: "18px", textAlign: "center" }}>
          Liste des patrouilles
        </h2>
        <div style={tableContainerStyle}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Début</th>
                <th style={thStyle}>Fin</th>
                <th style={thStyle}>Service</th>
                <th style={thStyle}>Type</th>
              </tr>
            </thead>
            <tbody>
              {patrols.length === 0 && (
                <tr>
                  <td colSpan="4" style={{ textAlign: "center", padding: "32px", color: "#777" }}>
                    Aucune patrouille enregistrée.
                  </td>
                </tr>
              )}
              {patrols.map(({ id, start, end, service, type }) => (
                <tr
                  key={id}
                  style={{ cursor: "default" }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#e6f0ff")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                >
                  <td style={{ ...thTdStyle, whiteSpace: "nowrap" }}>
                    {new Date(start).toLocaleString(undefined, {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  <td style={{ ...thTdStyle, whiteSpace: "nowrap" }}>
                    {new Date(end).toLocaleString(undefined, {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  <td style={thTdStyle}>{service}</td>
                  <td style={thTdStyle}>{type}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
