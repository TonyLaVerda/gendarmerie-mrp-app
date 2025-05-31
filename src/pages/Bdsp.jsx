import React, { useMemo, useState, useEffect } from "react";

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
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchInterventions() {
      try {
        const response = await fetch("http://localhost:3001/api/interventions");
        const data = await response.json();
        setInterventions(data);
      } catch (e) {
        console.error("Erreur chargement interventions", e);
        setErrorMessage("Erreur réseau lors du chargement des interventions.");
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
    setErrorMessage("");
    const { type, lieu, date } = form;
    if (!type || !lieu || !date) {
      setErrorMessage("Veuillez remplir le type, lieu et date.");
      return;
    }
    setLoading(true);
    try {
      const payload = editingId !== null ? { id: editingId, ...form } : form;
      const response = await fetch("http://localhost:3001/api/interventions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const updatedOrCreated = await response.json();

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
      setErrorMessage("Erreur lors de la sauvegarde");
    }
    setLoading(false);
  };

  const updatePatrouilles = async (interventionId, patrouilles) => {
    try {
      const iv = interventions.find(i => i.id === interventionId);
      if (!iv) return;
      const updated = { ...iv, patrouilles };

      const response = await fetch("http://localhost:3001/api/interventions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated),
      });
      const updatedIntervention = await response.json();

      setInterventions(prev =>
        prev.map(i => (i.id === interventionId ? updatedIntervention : i))
      );
    } catch (e) {
      console.error(e);
      setErrorMessage("Erreur mise à jour patrouilles");
    }
  };

  const addPatrouilleToIntervention = async (interventionId, patrolId) => {
    const iv = interventions.find(i => i.id === interventionId);
    if (!iv) return;
    if (iv.patrouilles && iv.patrouilles.some(p => p.idPatrol === patrolId)) return;

    const updatedPatrouilles = [
      ...(iv.patrouilles || []),
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

      const response = await fetch("http://localhost:3001/api/interventions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated),
      });
      const updatedIntervention = await response.json();

      setInterventions(prev =>
        prev.map(i => (i.id === interventionId ? updatedIntervention : i))
      );
    } catch (e) {
      console.error(e);
      setErrorMessage("Erreur lors de la clôture");
    }
  };

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: 24, fontFamily: "'Rubik', sans-serif", color: "#002654" }}>
      <h1 style={{ fontSize: 36, fontWeight: 700, marginBottom: 24, textAlign: "center" }}>BDSP - Interventions</h1>
      {/* (le reste du composant reste inchangé) */}
      {/* ... Tu peux laisser le reste de ton JSX identique car il est déjà très bien structuré */}
    </div>
  );
}
