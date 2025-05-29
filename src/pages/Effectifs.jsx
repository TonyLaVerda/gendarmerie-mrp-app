import { useState, useEffect } from "react";
import './Effectifs.css';

const grades = ["ELG", "Gnd", "Mdl/C", "ADJ", "Adj/C", "Maj", "Slt", "Lt", "Cpt", "Cen", "Lt Col", "Col"];
const unites = ["GD", "PMO", "PSIG"];
const specialites = ["FAGN", "GIC", "TICP", "ERI"];

export default function Effectifs({ agents, setAgents }) {
  const [newAgent, setNewAgent] = useState({
    nom: "",
    grade: "",
    unite: "",
    specialite: "",
    statut: "Indispo",
  });

  useEffect(() => {
    async function fetchAgents() {
      try {
        const res = await fetch('/api/agents');
        if (res.ok) {
          const data = await res.json();
          setAgents(data);
        }
      } catch (e) {
        console.error("Erreur chargement agents", e);
      }
    }
    fetchAgents();
  }, [setAgents]);

  const handleAddAgent = async () => {
    if (newAgent.nom && newAgent.grade && newAgent.unite) {
      try {
        const res = await fetch('/api/agents', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newAgent),
        });
        if (res.ok) {
          const createdAgent = await res.json();
          setAgents(prev => [...prev, createdAgent]);
          setNewAgent({ nom: "", grade: "", unite: "", specialite: "", statut: "Indispo" });
        } else {
          alert("Erreur lors de la création de l'agent");
        }
      } catch (e) {
        console.error(e);
        alert("Erreur réseau");
      }
    } else {
      alert("Veuillez remplir au minimum le nom, le grade et l'unité.");
    }
  };

  return (
    <div className="effectifs-container">
      {/* ... même JSX que ton précédent code ... */}
      {/* Formulaire et liste */}
    </div>
  );
}
