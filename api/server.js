const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

let agents = [];
let patrols = [];
let interventions = [];

// Pour simplifier, voici une structure pour les assignations (patrolId => [agentNoms])
let assignments = {};

// Statuts des patrouilles (patrolId => statut)
let patrolStatuses = {};

// Liaison patrouille -> intervention (patrolId => interventionId)
let patrolInterventions = {};

// Route racine simple pour tester le serveur
app.get("/", (req, res) => {
  res.send("API Gendarmerie MR Projet - serveur actif");
});

// Routes API

// Agents
app.get("/api/agents", (req, res) => {
  res.json(agents);
});

app.post("/api/agents", (req, res) => {
  const newAgent = req.body;
  newAgent.id = agents.length ? agents[agents.length - 1].id + 1 : 1;
  agents.push(newAgent);
  res.status(201).json(newAgent);
});

// Patrouilles
app.get("/api/patrols", (req, res) => {
  res.json(patrols);
});

app.post("/api/patrols", (req, res) => {
  const newPatrol = req.body;
  newPatrol.id = patrols.length ? patrols[patrols.length - 1].id + 1 : 1;
  patrols.push(newPatrol);
  res.status(201).json(newPatrol);
});

// DELETE patrouille
app.delete("/api/patrols/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = patrols.findIndex(p => p.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "Patrouille non trouvée" });
  }
  patrols.splice(index, 1);
  res.status(200).json({ message: "Patrouille supprimée" });
});

// PUT (remplacement complet) patrouille
app.put("/api/patrols/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = patrols.findIndex(p => p.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "Patrouille non trouvée" });
  }
  const updatedPatrol = { ...req.body, id };
  patrols[index] = updatedPatrol;
  res.status(200).json(updatedPatrol);
});

// PATCH (mise à jour partielle) patrouille
app.patch("/api/patrols/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = patrols.findIndex(p => p.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "Patrouille non trouvée" });
  }
  patrols[index] = { ...patrols[index], ...req.body };
  res.status(200).json(patrols[index]);
});

// Interventions
app.get("/api/interventions", (req, res) => {
  res.json(interventions);
});

app.post("/api/interventions", (req, res) => {
  const newIntervention = req.body;
  newIntervention.id = interventions.length ? Math.max(...interventions.map(i => i.id)) + 1 : 1;
  interventions.push(newIntervention);
  res.status(201).json(newIntervention);
});

// Assignments (patrolId => [agentNom])
app.get("/api/assignments", (req, res) => {
  res.json(assignments);
});

app.post("/api/assignments", (req, res) => {
  assignments = req.body;
  res.status(200).json({ message: "Assignments updated" });
});

// Patrol statuses (patrolId => statut)
app.get("/api/patrol-statuses", (req, res) => {
  res.json(patrolStatuses);
});

app.post("/api/patrol-statuses", (req, res) => {
  patrolStatuses = req.body;
  res.status(200).json({ message: "Patrol statuses updated" });
});

// Liaison patrouille -> intervention (patrolId => interventionId)
app.get("/api/patrol-interventions", (req, res) => {
  res.json(patrolInterventions);
});

app.post("/api/patrol-interventions", (req, res) => {
  patrolInterventions = req.body;
  res.status(200).json({ message: "Patrol interventions updated" });
});

// Démarrage du serveur
app.listen(port, () => {
  console.log(`API server running on port ${port}`);
});
