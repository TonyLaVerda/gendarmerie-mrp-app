import React, { useState, useMemo } from "react";

export default function Bdsp({ patrols = [] }) {
  const typesInterventions = [
    "Rixe",
    "ACR Matériel",
    "ACR",
    "Incendie",
    "Vol de VL",
    "Vol",
    "Cambriolage",
    "Effraction",
    "Incivilité",
    "Braquage",
    "Prise d'otage",
    "Tentative de suicide",
    "Découverte de cadavre",
  ];

  const patrolStatusOptions = ["Disponible", "Engagée", "ASL", "Fin d'intervention"];

  const [interventions, setInterventions] = useState([]);
  const [filtreType, setFiltreType] = useState("");
  const [form, setForm] = useState({
    type: "",
    lieu: "",
    date: "",
    patrouilleId: "",
    compteRendu: "",
  });
  const [editingId, setEditingId] = useState(null);

  const filteredInterventions = useMemo(() => {
    return filtreType
      ? interventions.filter((iv) => iv.type === filtreType)
      : interventions;
  }, [filtreType, interventions]);

  const assignPatrouille = (interventionId, patrouilleId) => {
    setInterventions((prev) =>
      prev.map((iv) =>
        iv.id === interventionId
          ? {
              ...iv,
              patrouilles: iv.patrouilles.some(p => p.idPatrol === patrouilleId)
                ? iv.patrouilles
                : [...iv.patrouilles, { idPatrol: patrouilleId, statut: "Disponible" }],
            }
          : iv
      )
    );
  };

  const removePatrouille = (interventionId, patrouilleId) => {
    setInterventions((prev) =>
      prev.map((iv) =>
        iv.id === interventionId
          ? {
              ...iv,
              patrouilles: iv.patrouilles.filter(p => p.idPatrol !== patrouilleId),
            }
          : iv
      )
    );
  };

  const updatePatrolStatus = (interventionId, patrolId, newStatus) => {
    setInterventions((prev) =>
      prev.map((iv) =>
        iv.id === interventionId
          ? {
              ...iv,
              patrouilles: iv.patrouilles.map((p) =>
                p.idPatrol === patrolId ? { ...p, statut: newStatus } : p
              ),
            }
          : iv
      )
    );
  };

  const updateCompteRendu = (interventionId, newText) => {
    setInterventions((prev) =>
      prev.map((iv) =>
        iv.id === interventionId ? { ...iv, compteRendu: newText } : iv
      )
    );
  };

  const handleAddOrUpdate = () => {
    const { type, lieu, date } = form;
    if (!type || !lieu || !date) {
      alert("Veuillez remplir au moins le type, lieu et date");
      return;
    }
    if (editingId !== null) {
      setInterventions((prev) =>
        prev.map((iv) =>
          iv.id === editingId
            ? {
                ...iv,
                type: form.type,
                lieu: form.lieu,
                date: form.date,
                compteRendu: form.compteRendu,
              }
            : iv
        )
      );
      setEditingId(null);
    } else {
      const newIntervention = {
        id: interventions.length ? Math.max(...interventions.map(iv => iv.id)) + 1 : 1,
        type: form.type,
        lieu: form.lieu,
        date: form.date,
        patrouilles: [],
        compteRendu: form.compteRendu,
      };
      setInterventions((prev) => [...prev, newIntervention]);
    }
    setForm({ type: "", lieu: "", date: "", patrouilleId: "", compteRendu: "" });
  };

  return (
    <div style={{ maxWidth: 900, margin: "auto", padding: 24, fontFamily: "Rubik, sans-serif", color: "#002654" }}>
      <h1>🚨 BDSP - Bloc de Sûreté Publique</h1>

      <div style={{ marginBottom: 24 }}>
        <select
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
          style={{ padding: 8, borderRadius: 6, border: "1px solid #ccc", marginRight: 8 }}
        >
          <option value="">Type d'intervention</option>
          {typesInterventions.map((t, i) => (
            <option key={i} value={t}>{t}</option>
          ))}
        </select>

        <input
          placeholder="Lieu"
          value={form.lieu}
          onChange={(e) => setForm({ ...form, lieu: e.target.value })}
          style={{ padding: 8, borderRadius: 6, border: "1px solid #ccc", marginRight: 8 }}
        />

        <input
          type="datetime-local"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
          style={{ padding: 8, borderRadius: 6, border: "1px solid #ccc", marginRight: 8 }}
        />

        <button onClick={handleAddOrUpdate} style={{ padding: "8px 16px", backgroundColor: "#002654", color: "white", borderRadius: 6, cursor: "pointer" }}>
          {editingId !== null ? "Modifier" : "Ajouter"}
        </button>
      </div>

      <div style={{ marginBottom: 24 }}>
        <label>Filtrer par type :</label>
        <select
          value={filtreType}
          onChange={(e) => setFiltreType(e.target.value)}
          style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #ccc", marginTop: 8 }}
        >
          <option value="">-- Toutes les interventions --</option>
          {typesInterventions.map((t, i) => (
            <option key={i} value={t}>{t}</option>
          ))}
        </select>
      </div>

      <div style={{ maxHeight: 600, overflowY: "auto" }}>
        {filteredInterventions.length === 0 ? (
          <p style={{ fontStyle: "italic", color: "#666", textAlign: "center" }}>Aucune intervention enregistrée.</p>
        ) : (
          filteredInterventions.map((iv) => (
            <div key={iv.id} style={{ borderLeft: "4px solid #1E3A8A", backgroundColor: "#f9fafb", padding: 16, borderRadius: 6, marginBottom: 24 }}>
              <h3>{iv.type}</h3>
              <p>
                Le {new Date(iv.date).toLocaleDateString()} à {new Date(iv.date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} - Lieu : {iv.lieu}
              </p>
              <p>{iv.compteRendu || "Aucun compte-rendu."}</p>

              <div>
                <strong>Patrouilles assignées :</strong>
                {iv.patrouilles.length === 0 && <p>Aucune patrouille assignée.</p>}
                <ul>
                  {iv.patrouilles.map(({ idPatrol, statut }) => {
                    const patrol = patrols.find((p) => p.id === idPatrol);
                    if (!patrol) return null;
                    return (
                      <li key={idPatrol} style={{ marginBottom: 8 }}>
                        {patrol.service} -{" "}
                        <select
                          value={statut}
                          onChange={(e) => updatePatrolStatus(iv.id, idPatrol, e.target.value)}
                          style={{ marginRight: 8, borderRadius: 6 }}
                        >
                          {patrolStatusOptions.map((status) => (
                            <option key={status} value={status}>{status}</option>
                          ))}
                        </select>
                        <button
                          onClick={() => removePatrouille(iv.id, idPatrol)}
                          title="Retirer cette patrouille"
                          style={{ color: "red", cursor: "pointer" }}
                        >
                          ✖️
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div>
                <label htmlFor={`cro-${iv.id}`}>Compte-rendu opérateur (CRO) :</label>
                <textarea
                  id={`cro-${iv.id}`}
                  value={iv.compteRendu}
                  onChange={(e) => updateCompteRendu(iv.id, e.target.value)}
                  rows={3}
                  style={{ width: "100%", borderRadius: 6, border: "1px solid #ccc", padding: 8 }}
                />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
