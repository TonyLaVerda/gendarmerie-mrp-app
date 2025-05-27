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
    setPatrols((prev) => [
      ...prev,
      { id: prev.length + 1, ...formData },
    ]);
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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-4xl">
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
          className="mt-4 px-4 py-2 bg-blue-900 text-white rounded hover:bg-blue-800"
        >
          Ajouter
        </button>
      </section>

      <section>
        <h2 className="font-semibold mb-2">Liste des patrouilles</h2>
        <div className="max-w-4xl overflow-x-auto">
          <table className="w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr className="bg-blue-900 text-white">
                <th className="border border-gray-300 px-3 py-1">Début</th>
                <th className="border border-gray-300 px-3 py-1">Fin</th>
                <th className="border border-gray-300 px-3 py-1">Service</th>
                <th className="border border-gray-300 px-3 py-1">Type</th>
              </tr>
            </thead>
            <tbody>
              {patrols.map(({ id, start, end, service, type }) => (
                <tr key={id} className="text-center">
                  <td className="border border-gray-300 px-3 py-1">{new Date(start).toLocaleString()}</td>
                  <td className="border border-gray-300 px-3 py-1">{new Date(end).toLocaleString()}</td>
                  <td className="border border-gray-300 px-3 py-1">{service}</td>
                  <td className="border border-gray-300 px-3 py-1">{type}</td>
                </tr>
              ))}
              {patrols.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center py-4 text-gray-500">
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
