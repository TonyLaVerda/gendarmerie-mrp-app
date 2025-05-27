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
    <div className="p-6 bg-gray-50 min-h-screen">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-blue-900">Pulsar Service</h1>
        <p className="text-gray-600">Organisation des patrouilles</p>
      </header>

      <section className="mb-6">
        <h2 className="font-semibold mb-2">Ajouter une patrouille</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          <input
            type="datetime-local"
            name="start"
            value={formData.start}
            onChange={handleChange}
            className="border rounded px-3 py-2"
            placeholder="Début"
          />
          <input
            type="datetime-local"
            name="end"
            value={formData.end}
            onChange={handleChange}
            className="border rounded px-3 py-2"
            placeholder="Fin"
          />
          <select
            name="service"
            value={formData.service}
            onChange={handleChange}
            className="border rounded px-3 py-2"
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
            className="border rounded px-3 py-2"
          >
            <option value="">Type de patrouille</option>
            {typeOptions.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={handleAddPatrol}
          className="mt-4 px-4 py-2 bg-blue-900 text-white rounded hover:bg-blue-800 block mx-auto"
        >
          Ajouter
        </button>
      </section>

      <section>
        <h2 className="font-semibold mb-4 text-lg text-center">Liste des patrouilles</h2>
        <div className="max-w-[90vw] mx-auto overflow-x-auto rounded-lg shadow-lg border border-gray-300 bg-white">
          <table className="min-w-[700px] w-full table-auto border-collapse">
            <thead>
              <tr className="bg-blue-900 text-white">
                <th className="border-b border-blue-700 px-8 py-4 text-left">Début</th>
                <th className="border-b border-blue-700 px-8 py-4 text-left">Fin</th>
                <th className="border-b border-blue-700 px-8 py-4 text-left">Service</th>
                <th className="border-b border-blue-700 px-8 py-4 text-left">Type</th>
              </tr>
            </thead>
            <tbody>
              {patrols.map(({ id, start, end, service, type }) => (
                <tr
                  key={id}
                  className="border-b border-gray-200 hover:bg-blue-50 transition-colors"
                  style={{ lineHeight: "2rem", fontSize: "1.05rem" }}
                >
                  <td className="px-8 py-4 align-middle whitespace-nowrap">
                    {new Date(start).toLocaleString(undefined, {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  <td className="px-8 py-4 align-middle whitespace-nowrap">
                    {new Date(end).toLocaleString(undefined, {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  <td className="px-8 py-4 align-middle">{service}</td>
                  <td className="px-8 py-4 align-middle">{type}</td>
                </tr>
              ))}
              {patrols.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center py-8 text-gray-500">
                    Aucune patrouille enregistrée.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
