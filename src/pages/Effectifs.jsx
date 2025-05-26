import { useState } from "react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Select, SelectItem } from "../components/ui/select";
import { Dialog, DialogTrigger, DialogContent } from "../components/ui/dialog";

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
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-blue-900">👮 Gestion des Effectifs</h1>

      <Dialog>
        <DialogTrigger asChild>
          <Button className="mb-4">➕ Ajouter un agent</Button>
        </DialogTrigger>
        <DialogContent>
          <h2 className="text-xl font-semibold mb-4">Nouvel agent</h2>
          <div className="space-y-3">
            <Input placeholder="Nom" value={newAgent.nom} onChange={(e) => setNewAgent({ ...newAgent, nom: e.target.value })} />
            <Select value={newAgent.grade} onValueChange={(value) => setNewAgent({ ...newAgent, grade: value })}>
              {grades.map((g) => <SelectItem key={g} value={g}>{g}</SelectItem>)}
            </Select>
            <Select value={newAgent.unite} onValueChange={(value) => setNewAgent({ ...newAgent, unite: value })}>
              {unites.map((u) => <SelectItem key={u} value={u}>{u}</SelectItem>)}
            </Select>
            <Select value={newAgent.specialite} onValueChange={(value) => setNewAgent({ ...newAgent, specialite: value })}>
              {specialites.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
            </Select>
            <Button onClick={handleAddAgent}>💾 Enregistrer</Button>
          </div>
        </DialogContent>
      </Dialog>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {agents.map((agent, index) => (
          <Card key={index}>
            <CardContent>
              <h3 className="text-xl font-semibold mb-2">{agent.nom}</h3>
              <p><strong>Grade :</strong> {agent.grade}</p>
              <p><strong>Unité :</strong> {agent.unite}</p>
              <p><strong>Spécialité :</strong> {agent.specialite || "Aucune"}</p>
              <p><strong>Statut :</strong> {agent.statut}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
