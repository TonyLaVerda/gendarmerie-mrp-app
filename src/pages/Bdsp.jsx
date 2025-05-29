import React, { useMemo, useState, useEffect } from "react";
import { getResource, postResource } from "../api/api";  // ajuste le chemin si besoin

const typesInterventions = [
  "Rixe", "ACR Matériel", "ACR", "Incendie", "Vol de VL", "Vol", "Cambriolage",
  "Effraction", "Incivilité", "Braquage", "Prise d'otage", "Tentative de suicide", "Découverte de cadavre",
];

const patrolStatusOptions = ["Engagée", "ASL", "Fin d'intervention"];

export default function Bdsp({ patrols = [], interventions, setInterventions }) {
  const [filtreType, setFiltreType] = useState("");
  const [form, setForm] = useState({
    type: "",
    lieu: "",
    date: "",
    compteRendu: "",
  });
  const [editingId, setEditingId] = useState(null);

  // Charger interventions au montage avec la fonction getResource
  useEffect(() => {
    async function fetchInterventions() {
      try {
        const data = await getResource("interventions");
        setInterventions(data);
      } catch (e) {
        console.error("Erreur chargement interventions", e);
      }
    }
    fetchInterventions();
  }, [setInterventions]);

  const filteredInterventions = useMemo(() => {
    return interventions.filter(
      (iv) => !iv.archived && (filtreType ? iv.type === filtreType : true)
    );
  }, [interventions, filtreType]);

  const handleAddOrUpdate = async () => {
    const { type, lieu, date } = form;
    if (!type || !lieu || !date) {
      alert("Veuillez remplir le type, lieu et date");
      return;
    }

    try {
      // Ici on simule update avec POST (à améliorer côté backend)
      const payload = editingId !== null ? { id: editingId, ...form } : form;
      const updatedOrCreated = await postResource("interventions", payload);

      setInterventions(prev => {
        if (editingId !== null) {
          return prev.map(iv => iv.id === editingId ? updatedOrCreated : iv);
        } else {
          return [...prev, updatedOrCreated];
        }
      });
      setEditingId(null);
      setForm({ type: "", lieu: "", date: "", compteRendu: "" });
    } catch (e) {
      console.error(e);
      alert("Erreur lors de la sauvegarde");
    }
  };

  const updatePatrouilles = async (interventionId, patrouilles) => {
    try {
      const iv = interventions.find(i => i.id === interventionId);
      if (!iv) return;
      const updated = { ...iv, patrouilles };
      const updatedIntervention = await postResource("interventions", updated);
      setInterventions(prev =>
        prev.map(i => (i.id === interventionId ? updatedIntervention : i))
      );
    } catch (e) {
      console.error(e);
      alert("Erreur mise à jour patrouilles");
    }
  };

  const addPatrouilleToIntervention = async (interventionId, patrolId) => {
    const iv = interventions.find(i => i.id === interventionId);
    if (!iv) return;
    if (iv.patrouilles.some(p => p.idPatrol === patrolId)) return;

    const updatedPatrouilles = [
      ...iv.patrouilles,
      { idPatrol: patrolId, statut: "Engagée", timestamp: new Date().toISOString() },
    ];

    await updatePatrouilles(interventionId, updatedPatrouilles);
  };

  const updatePatrolStatus = async (interventionId, patrolId, newStatus) => {
    const iv = interventions.find(i => i.id === interventionId);
    if (!iv) return;

    const updatedPatrouilles = iv.patrouilles.map(p =>
      p.idPatrol === patrolId ? { ...p, statut: newStatus } : p
    );

    await updatePatrouilles(interventionId, updatedPatrouilles);
  };

  const removePatrouille = async (interventionId, patrolId) => {
    const iv = interventions.find(i => i.id === interventionId);
    if (!iv) return;

    const updatedPatrouilles = iv.patrouilles.filter(p => p.idPatrol !== patrolId);

    await updatePatrouilles(interventionId, updatedPatrouilles);
  };

  const closeIntervention = async (interventionId) => {
    try {
      const iv = interventions.find(i => i.id === interventionId);
      if (!iv) return;

      const updated = { ...iv, archived: true };
      const updatedIntervention = await postResource("interventions", updated);
      setInterventions(prev =>
        prev.map(i => (i.id === interventionId ? updatedIntervention : i))
      );
    } catch (e) {
      console.error(e);
      alert("Erreur lors de la clôture");
    }
  };

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: 24, fontFamily: "'Rubik', sans-serif", color: "#002654" }}>
      <h1 style={{ fontSize: 36, fontWeight: 700, marginBottom: 24, textAlign: "center" }}>BDSP - Interventions</h1>

      {/* Formulaire */}
      <div style={{ marginBottom: 24 }}>
        <select
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
          style={{ width: "100%", marginBottom: 12, padding: 8, borderRadius: 6, border: "1px solid #ccc" }}
        >
          <option value="">Type d'intervention</option>
          {typesInterventions.map((t, i) => <option key={i} value={t}>{t}</option>)}
        </select>

        <input
          type="text"
          placeholder="Lieu"
          value={form.lieu}
          onChange={(e) => setForm({ ...form, lieu: e.target.value })}
          style={{ width: "100%", marginBottom: 12, padding: 8, borderRadius: 6, border: "1px solid #ccc" }}
        />

        <input
          type="datetime-local"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
          style={{ width: "100%", marginBottom: 12, padding: 8, borderRadius: 6, border: "1px solid #ccc" }}
        />

        <textarea
          placeholder="Compte Rendu Opérationnel (CRO)"
          value={form.compteRendu}
          onChange={(e) => setForm({ ...form, compteRendu: e.target.value })}
          rows={4}
          style={{ width: "100%", marginBottom: 12, padding: 8, borderRadius: 6, border: "1px solid #ccc", resize: "vertical" }}
        />

        <button
          onClick={handleAddOrUpdate}
          style={{ backgroundColor: "#002654", color: "white", padding: "10px 16px", borderRadius: 6, cursor: "pointer" }}
        >
          {editingId !== null ? "Modifier l'intervention" : "Ajouter l'intervention"}
        </button>
      </div>

      {/* Filtrer */}
      <div style={{ marginBottom: 24 }}>
        <label>Filtrer par type :</label>
        <select
          value={filtreType}
          onChange={(e) => setFiltreType(e.target.value)}
          style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #ccc" }}
        >
          <option value="">-- Toutes les interventions --</option>
          {typesInterventions.map((t, i) => <option key={i} value={t}>{t}</option>)}
        </select>
      </div>

      {/* Liste interventions */}
      <div style={{ maxHeight: 600, overflowY: "auto" }}>
        {filteredInterventions.length === 0 ? (
          <p style={{ fontStyle: "italic", color: "#666", textAlign: "center" }}>Aucune intervention enregistrée.</p>
        ) : (
          filteredInterventions.map((iv) => (
            <div
              key={iv.id}
              style={{ backgroundColor: "#f9fafb", borderLeft: "4px solid #1E3A8A", padding: 16, borderRadius: 6, marginBottom: 24 }}
            >
              <h3>{iv.type}</h3>
              <p>
                Le {new Date(iv.date).toLocaleDateString()} à{" "}
                {new Date(iv.date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} - Lieu : {iv.lieu}
              </p>
              <p><em>{iv.compteRendu || "Aucun compte-rendu opérationnel (CRO)."}</em></p>

              <div>
                <strong>Patrouilles engagées :</strong>
                {iv.patrouilles.length === 0 && <p>Aucune patrouille assignée.</p>}
                <ul>
                  {iv.patrouilles.map(({ idPatrol, statut, timestamp }) => {
                    const patrol = patrols.find((p) => p.id === idPatrol);
                    if (!patrol) return null;
                    return (
                      <li key={idPatrol} style={{ marginBottom: 8 }}>
                        <span style={{ fontWeight: "bold" }}>
                          {new Date(timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </span>{" "}
                        {patrol.service} -{" "}
                        <select
                          value={statut}
                          onChange={(e) => updatePatrolStatus(iv.id, idPatrol, e.target.value)}
                          style={{ marginLeft: 8, marginRight: 8, borderRadius: 6 }}
                        >
                          {patrolStatusOptions.map((option) => (
                            <option key={option} value={option}>{option}</option>
                          ))}
                        </select>
                        <button
                          onClick={() => removePatrouille(iv.id, idPatrol)}
                          style={{ color: "red", cursor: "pointer" }}
                          title="Retirer cette patrouille"
                        >
                          ✖️
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div style={{ marginTop: 12 }}>
                <select
                  onChange={(e) => {
                    if (e.target.value) {
                      addPatrouilleToIntervention(iv.id, Number(e.target.value));
                      e.target.value = "";
                    }
                  }}
                  defaultValue=""
                  style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #ccc" }}
                >
                  <option value="">Ajouter une patrouille engagée</option>
                  {patrols
                    .filter((p) => !iv.patrouilles.some((pa) => pa.idPatrol === p.id))
                    .map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.service} - {p.type}
                      </option>
                    ))}
                </select>
              </div>

              <div style={{ marginTop: 16 }}>
                <button
                  onClick={() => closeIntervention(iv.id)}
                  style={{ backgroundColor: "#b91c1c", color: "white", padding: "8px 12px", borderRadius: 6, cursor: "pointer" }}
                >
                  Clôturer la fiche (archiver)
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
