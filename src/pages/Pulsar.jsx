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
        }
      } catch (e) {
        console.error("Erreur chargement patrouilles", e);
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
      let res;
      if (id !== null) {
        // Modifier : on pourrait faire PUT /api/patrols/:id mais on garde POST simplifié
        // Ici on simule suppression + ajout, ou remplacer dans API selon implémentation
        res = await fetch('/api/patrols', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(formData),
        });
      } else {
        // Ajouter
        res = await fetch('/api/patrols', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(formData),
        });
      }
      if (res.ok) {
        const newPatrol = await res.json();
        // Mise à jour locale
        setPatrols(prev => {
          if (id !== null) {
            return prev.map(p => p.id === id ? newPatrol : p);
          } else {
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
      // Créer une route DELETE /api/patrols/:id côté API pour cela
      const res = await fetch(`/api/patrols/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setPatrols(prev => prev.filter(p => p.id !== id));
        if (formData.id === id) {
          setFormData({ id: null, start: "", end: "", service: "", type: "" });
        }
      } else {
        alert("Erreur suppression");
      }
    } catch (e) {
      console.error(e);
      alert("Erreur réseau");
    }
  };

  // Reste inchangé pour la partie admin ajout services/types

  return (
    <div className="pulsar-container">
      {/* ... même JSX que ton précédent code ... */}
      {/* Formulaire, admin et table */}
    </div>
  );
}
