import { useState } from "react";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Select, SelectItem } from "../../components/ui/select";
import { Dialog, DialogTrigger, DialogContent } from "../../components/ui/dialog";

const grades = ["ELG", "Gnd", "Mdl/C", "ADJ", "Adj/C", "Maj", "Slt", "Lt", "Cpt", "Cen", "Lt Col", "Col"];
const unites = ["GD", "PMO", "PSIG"];
const specialites = ["FAGN", "GIC", "TICP", "ERI"];

export default function Effectifs() {
  const [agents, setAgents] = useState([]);
  const [newAgent, setNewAgent] = useState({
    nom: "",
    grade: "",
    unite: "",
    specialite: "",
    statut: "Indispo",
  });

  const handleAddAgent = () => {
    if (newAgent.nom && newAgent.grade && newAgent.unite) {
      setAgents([...agents, { ...newAgent }]);
      setNewAgent({ nom: "", grade: "", unite: "", specialite: "", statut: "Indispo" });
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-blue-900">Gestion des Effectifs</h1>

      <Dialog>
        <DialogTrigger asChild>
          <Button className="mb-4">Ajouter un agent</Button>
        </DialogTrigger>
        <DialogContent>
          <h2 className="text-xl font-semibold mb-2">Nouvel agent</h2>
          <Input
            placeholder="Nom"
            value={newAgent.nom}
            onChange={(e) => setNewAgent({ ...newAgent, nom: e.target.value })}
            className="mb-2"
          />
          <Select
            value={newAgent.grade}
            onValueChange={(value) => setNewAgent({ ...newAgent, grade: value })}
            className="mb-2"
          >
            {grades.map((g) => (
              <SelectItem key={g} value={g}>{g}</SelectItem>
            ))}
          </Select>
          <Select
            value={newAgent.unite}
            onValueChange={(value) => setNewAgent({ ...newAgent, unite: value })}
            className="mb-2"
          >
            {unites.map((u) => (
              <SelectItem key={u} value={u}>{u}</SelectItem>
            ))}
          </Select>
          <Select
            value={newAgent.specialite}
            onValueChange={(value) => setNewAgent({ ...newAgent, specialite: value })}
            className="mb-2"
          >
            {specialites.map((s) => (
              <SelectItem key={s} value={s}>{s}</SelectItem>
            ))}
          </Select>
          <Button onClick={handleAddAgent}>Enregistrer</Button>
        </DialogContent>
      </Dialog>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {agents.map((agent, index) => (
          <Card key={index}>
            <CardContent>
              <h3 className="text-lg font-semibold">{agent.nom}</h3>
              <p>Grade : {agent.grade}</p>
              <p>Unité : {agent.unite}</p>
              <p>Spécialité : {agent.specialite || "N/A"}</p>
              <p>Statut : {agent.statut}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
