import { useState, useMemo } from "react";

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

export default function Bdsp({ patrols }) {
  // Interventions : { id, type, lieu, date, patrouilles: [{idPatrol, statut}], compteRendu }
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

  // Filtrage des interventions
  const filteredInterventions = useMemo(() => {
    if (!filtreType) return interventions;
    return interventions.filter(iv => iv.type === filtreType);
  }, [interventions, filtreType]);

  // Ajouter ou modifier une intervention
  const handleAddOrUpdate = () => {
    const { type, lieu, date } = form;
    if (!type || !lieu || !date) {
      alert("Veuillez remplir au moins le type, lieu et date");
      return;
    }

    if (editingId !== null) {
      // Modifier intervention existante
      setInterventions(prev =>
        prev.map(iv =>
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
        id: interventions.length ? Math.max(...interventions.map(iv => iv.id)) + 1 : 1,
        type: form.type,
        lieu: form.lieu,
        date: form.date,
        patrouilles: [], // patrouilles assignées
        compteRendu: form.compteRendu,
      };
      setInterventions(prev => [...prev, newIntervention]);
    }

    setForm({ type: "", lieu: "", date: "", patrouilleId: "", compteRendu: "" });
  };

  // Assigner une patrouille à une intervention
  const assignPatrouille = (interventionId, patrouilleId) => {
    setInterventions(prev =>
      prev.map(iv => {
        if (iv.id !== interventionId) return iv;
        if (iv.patrouilles.find(p => p.idPatrol === patrouilleId)) return iv; // déjà assignée
        return {
          ...iv,
          patrouilles: [...iv.patrouilles, { idPatrol: patrouilleId, statut: "Disponible" }],
        };
      })
    );
  };

  // Mettre à jour le statut d'une patrouille assignée
  const updatePatrolStatus = (interventionId, patrouilleId, newStatus) => {
    setInterventions(prev =>
      prev.map(iv => {
        if (iv.id !== interventionId) return iv;
        return {
          ...iv,
          patrouilles: iv.patrouilles.map(p =>
            p.idPatrol === patrouilleId ? { ...p, statut: newStatus } : p
          ),
        };
      })
    );
  };

  // Retirer une patrouille d'une intervention
  const removePatrouille = (interventionId, patrouilleId) => {
    setInterventions(prev =>
      prev.map(iv => {
        if (iv.id !== interventionId) return iv;
        return {
          ...iv,
          patrouilles: iv.patrouilles.filter(p => p.idPatrol !== patrouilleId),
        };
      })
    );
  };

  // Mettre à jour le compte-rendu opérateur (CRO)
  const updateCompteRendu = (interventionId, newCRO) => {
    setInterventions(prev =>
      prev.map(iv => (iv.id === interventionId ? { ...iv, compteRendu: newCRO } : iv))
    );
  };

  // Charger intervention pour édition
  const handleEdit = (intervention) => {
    setEditingId(intervention.id);
    setForm({
      type: intervention.type,
      lieu: intervention.lieu,
      date: intervention.date,
      patrouilleId: "",
      compteRendu: intervention.compteRendu || "",
    });
  };

  // Supprimer une intervention
  const handleDelete = (id) => {
    if (window.confirm("Supprimer cette intervention ?")) {
      setInterventions(prev => prev.filter(iv => iv.id !== id));
      if (editingId === id) {
        setEditingId(null);
        setForm({ type: "", lieu: "", date: "", patrouilleId: "", compteRendu: "" });
      }
    }
  };

  return (
    <div className="bdsp-container">
      <h1 className="bdsp-title">🚨 BDSP - Gestion des interventions</h1>

      {/* Formulaire d'ajout / modification */}
      <div className="bdsp-card">
        <div className="section-title">{editingId !== null ? "Modifier une intervention" : "Nouvelle intervention"}</div>
        <div className="bdsp-form">
          <select
            value={form.type}
            onChange={e => setForm({ ...form, type: e.target.value })}
            className="bdsp-select"
          >
            <option value="">Type d'intervention</option>
            {typesInterventions.map((t, i) => (
              <option key={i} value={t}>{t}</option>
            ))}
          </select>

          <input
            placeholder="Lieu"
            value={form.lieu}
            onChange={e => setForm({ ...form, lieu: e.target.value })}
            className="bdsp-input"
          />

          <input
            type="datetime-local"
            value={form.date}
            onChange={e => setForm({ ...form, date: e.target.value })}
            className="bdsp-input"
          />

          <select
            value={form.patrouilleId}
            onChange={e => setForm({ ...form, patrouilleId: e.target.value })}
            className="bdsp-select"
          >
            <option value="">Ajouter une patrouille à l'intervention</option>
            {patrols.map(patrol => (
              <option key={patrol.id} value={patrol.id}>
                {patrol.service} ({patrol.type})
              </option>
            ))}
          </select>

          <textarea
            placeholder="Compte-rendu opérateur (CRO)"
            value={form.compteRendu}
            onChange={e => setForm({ ...form, compteRendu: e.target.value })}
            className="bdsp-textarea"
          />

          <button
            onClick={() => {
              handleAddOrUpdate();
              if (form.patrouilleId) {
                assignPatrouille(editingId ?? (interventions.length ? Math.max(...interventions.map(iv => iv.id)) + 1 : 1), Number(form.patrouilleId));
              }
              setForm(f => ({ ...f, patrouilleId: "" }));
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
            onChange={e => setFiltreType(e.target.value)}
            className="bdsp-select full-width"
          >
            <option value="">-- Toutes les interventions --</option>
            {typesInterventions.map((t, i) => (
              <option key={i} value={t}>{t}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Liste des interventions */}
      <div className="bdsp-card">
        <div className="section-title">📂 Historique des interventions</div>
        <div className="pt-4 space-y-6 max-h-[600px] overflow-y-auto">
          {filteredInterventions.length === 0 ? (
            <p className="bdsp-empty">Aucune intervention enregistrée.</p>
          ) : (
            filteredInterventions.map(iv => (
              <div key={iv.id} className="bdsp-intervention">
                <h3>{iv.type}</h3>
                <p>
                  Le {new Date(iv.date).toLocaleDateString()} à{" "}
                  {new Date(iv.date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} -{" "}
                  Lieu : {iv.lieu}
                </p>

                <div>
                  <strong>Patrouilles assignées :</strong>
                  {iv.patrouilles.length === 0 && <p>Aucune patrouille assignée.</p>}
                  <ul>
                    {iv.patrouilles.map(({ idPatrol, statut }) => {
                      const patrol = patrols.find(p => p.id === idPatrol);
                      if (!patrol) return null;
                      return (
                        <li key={idPatrol}>
                          {patrol.service} -{" "}
                          <select
                            value={statut}
                            onChange={e => updatePatrolStatus(iv.id, idPatrol, e.target.value)}
                          >
                            {patrolStatusOptions.map(status => (
                              <option key={status} value={status}>{status}</option>
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
                    onChange={e => updateCompteRendu(iv.id, e.target.value)}
                    className="bdsp-textarea"
                    rows={3}
                  />
                </div>

                <div style={{ marginTop: 8 }}>
                  <button
                    onClick={() => handleEdit(iv)}
                    style={{ marginRight: 8 }}
                    className="bdsp-button"
                  >
                    Modifier
                  </button>
                  <button
                    onClick={() => handleDelete(iv.id)}
                    style={{ backgroundColor: "red" }}
                    className="bdsp-button"
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
