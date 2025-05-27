import { useState, useMemo } from "react";

export default function Bdsp({ patrols }) {
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

  // Structure d'intervention :
  // { id, type, lieu, date, patrouilles: [{idPatrol, statut}], compteRendu }

  const [interventions, setInterventions] = useState([]);
  const [filtreType, setFiltreType] = useState("");
  const [form, setForm] = useState({
    type: "",
    lieu: "",
    date: "",
    patrouilleId: "",
    compteRendu: "",
  });

  // Pour éditer une intervention existante (id), null sinon
  const [editingId, setEditingId] = useState(null);

  // Ajouter ou modifier une intervention
  const handleAddOrUpdate = () => {
    const { type, lieu, date } = form;
    if (!type || !lieu || !date) {
      alert("Veuillez remplir au moins le type, lieu et date");
      return;
    }

    if (editingId !== null) {
      // Modifier intervention existante
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
      // Ajouter nouvelle intervention
      const newIntervention = {
        id: interventions.length ? Math.max(...interventions.map((iv) => iv.id)) + 1 : 1,
        type: form.type,
        lieu: form.lieu,
        date: form.date,
        patrouilles: [], // patrouilles assignées
        compteRendu: form.compteRendu,
      };
      setInterventions((prev) => [...prev, newIntervention]);
    }

    setForm({ type: "", lieu: "", date: "", patrouilleId: "", compteRendu: "" });
  };

  // Assigner une patrouille à une intervention
  const assignPatrouille = (intervId, patrolId) => {
    setInterventions((prev) =>
      prev.map((iv) => {
        if (iv.id !== intervId) return iv;
        if (iv.patrouilles.find((p) => p.idPatrol === patrolId)) return iv; // déjà assignée
        return {
          ...iv,
          patrouilles: [...iv.patrouilles, { idPatrol: patrolId, statut: "Engagée" }],
        };
      })
    );
  };

  // Retirer une patrouille d’une intervention
  const removePatrouille = (intervId, patrolId) => {
    setInterventions((prev) =>
      prev.map((iv) =>
        iv.id === intervId
          ? { ...iv, patrouilles: iv.patrouilles.filter((p) => p.idPatrol !== patrolId) }
          : iv
      )
    );
  };

  // Modifier le statut d’une patrouille assignée
  const updatePatrolStatus = (intervId, patrolId, newStatus) => {
    setInterventions((prev) =>
      prev.map((iv) => {
        if (iv.id !== intervId) return iv;
        return {
          ...iv,
          patrouilles: iv.patrouilles.map((p) =>
            p.idPatrol === patrolId ? { ...p, statut: newStatus } : p
          ),
        };
      })
    );
  };

  // Modifier le compte rendu d'une intervention
  const updateCompteRendu = (intervId, newCRO) => {
    setInterventions((prev) =>
      prev.map((iv) => (iv.id === intervId ? { ...iv, compteRendu: newCRO } : iv))
    );
  };

  // Filtrer les interventions selon type
  const filteredInterventions = interventions.filter(
    (iv) => !filtreType || iv.type === filtreType
  );

  return (
    <div className="bdsp-container">
      <h1 className="bdsp-title">🚨 BDSP - Interventions</h1>

      {/* Formulaire ajout/modification */}
      <div className="bdsp-card">
        <div className="section-title">➕ {editingId !== null ? "Modifier" : "Nouvelle"} intervention</div>
        <div className="bdsp-form">
          <select
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
            className="bdsp-select"
          >
            <option value="">-- Sélectionner un type d’intervention --</option>
            {typesInterventions.map((t, i) => (
              <option key={i} value={t}>
                {t}
              </option>
            ))}
          </select>

          <input
            placeholder="Lieu"
            value={form.lieu}
            onChange={(e) => setForm({ ...form, lieu: e.target.value })}
            className="bdsp-input"
          />

          <input
            type="datetime-local"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            className="bdsp-input"
          />

          {/* Remplacement "Agent présent" par choix patrouille */}
          <select
            value={form.patrouilleId}
            onChange={(e) => setForm({ ...form, patrouilleId: e.target.value })}
            className="bdsp-select"
          >
            <option value="">Ajouter une patrouille à l'intervention</option>
            {patrols.map((patrol) => (
              <option key={patrol.id} value={patrol.id}>
                {patrol.service} ({patrol.type})
              </option>
            ))}
          </select>

          <textarea
            placeholder="Compte-rendu opérateur (CRO)"
            value={form.compteRendu}
            onChange={(e) => setForm({ ...form, compteRendu: e.target.value })}
            className="bdsp-textarea"
          />

          <button
            onClick={() => {
              handleAddOrUpdate();
              // Si patrouille sélectionnée dans le select, assigner directement
              if (form.patrouilleId) {
                assignPatrouille(editingId ?? (interventions.length + 1), Number(form.patrouilleId));
              }
              setForm((f) => ({ ...f, patrouilleId: "" }));
            }}
            className="bdsp-button"
          >
            {editingId !== null ? "Modifier l'intervention" : "Ajouter l'intervention"}
          </button>
        </div>
      </div>

      {/* Filtre */}
      <div className="bdsp-card">
        <div className="section-title">🔎 Filtrer les interventions</div>
        <div className="pt-4">
          <select
            value={filtreType}
            onChange={(e) => setFiltreType(e.target.value)}
            className="bdsp-select full-width"
          >
            <option value="">-- Toutes les interventions --</option>
            {typesInterventions.map((t, i) => (
              <option key={i} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Liste des interventions avec fiche détaillée */}
      <div className="bdsp-card">
        <div className="section-title">📂 Historique des interventions</div>
        <div className="pt-4 space-y-6 max-h-[600px] overflow-y-auto">
          {filteredInterventions.length === 0 ? (
            <p className="bdsp-empty">Aucune intervention enregistrée.</p>
          ) : (
            filteredInterventions.map((iv) => (
              <div key={iv.id} className="bdsp-intervention">
                <h3>{iv.type}</h3>
                <p>
                  Le {new Date(iv.date).toLocaleDateString()} à{" "}
                  {new Date(iv.date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} -{" "}
                  Lieu : {iv.lieu}
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
                        <li key={idPatrol}>
                          {patrol.service} -{" "}
                          <select
                            value={statut}
                            onChange={(e) => updatePatrolStatus(iv.id, idPatrol, e.target.value)}
                          >
                            {patrolStatusOptions.map((status) => (
                              <option key={status} value={status}>
                                {status}
                              </option>
                            ))}
                          </select>
                          <button
                            style={{ marginLeft: 8, color: "red", cursor: "pointer" }}
                            onClick={() => removePatrouille(iv.id, idPatrol)}
                            title="Retirer cette patrouille"
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
                    className="bdsp-textarea"
                    rows={3}
                  />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
