const express = require("express");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());          // Autorise toutes origines par défaut
app.use(express.json());  // Parse JSON, remplace body-parser

// Données en mémoire
let agents = [];
let patrols = [];
let interventions = [];

let assignments = {};
let patrolStatuses = {};
let patrolInterventions = {};

// Route racine pour test
app.get("/", (req, res) => {
  res.send("API Gendarmerie MR Projet - serveur actif");
});

// --- Agents ---
app.get("/api/agents", (req, res) => {
  res.json(agents);
});

app.post("/api/agents", (req, res) => {
  console.log("POST /api/agents - body:", req.body);
  try {
    const newAgent = req.body;
    if (!newAgent.nom || !newAgent.grade || !newAgent.unite) {
      return res.status(400).json({ error: "Champs obligatoires manquants (nom, grade, unite)" });
    }
    newAgent.id = agents.length ? agents[agents.length - 1].id + 1 : 1;
    agents.push(newAgent);
    console.log("Agent ajouté:", newAgent);
    res.status(201).json(newAgent);
  } catch (error) {
    console.error("Erreur POST /api/agents:", error);
    res.status(500).json({ error: "Erreur serveur lors de la création de l'agent" });
  }
});

// --- Patrouilles ---
app.get("/api/patrols", (req, res) => {
  res.json(patrols);
});

app.post("/api/patrols", (req, res) => {
  console.log("POST /api/patrols - body:", req.body);
  try {
    const newPatrol = req.body;
    if (!newPatrol.start || !newPatrol.end || !newPatrol.service || !newPatrol.type) {
      return res.status(400).json({ error: "Champs obligatoires manquants (start, end, service, type)" });
    }
    newPatrol.id = patrols.length ? patrols[patrols.length - 1].id + 1 : 1;
    patrols.push(newPatrol);
    console.log("Patrouille ajoutée:", newPatrol);
    res.status(201).json(newPatrol);
  } catch (error) {
    console.error("Erreur POST /api/patrols:", error);
    res.status(500).json({ error: "Erreur serveur lors de la création de la patrouille" });
  }
});

app.delete("/api/patrols/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = patrols.findIndex(p => p.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "Patrouille non trouvée" });
  }
  patrols.splice(index, 1);
  res.status(200).json({ message: "Patrouille supprimée" });
});

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

app.patch("/api/patrols/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = patrols.findIndex(p => p.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "Patrouille non trouvée" });
  }
  patrols[index] = { ...patrols[index], ...req.body };
  res.status(200).json(patrols[index]);
});

// --- Interventions ---
app.get("/api/interventions", (req, res) => {
  res.json(interventions);
});

app.post("/api/interventions", (req, res) => {
  console.log("POST /api/interventions - body:", req.body);
  try {
    const newIntervention = req.body;
    if (!newIntervention.type || !newIntervention.lieu || !newIntervention.date) {
      return res.status(400).json({ error: "Champs obligatoires manquants (type, lieu, date)" });
    }
    newIntervention.id = interventions.length ? Math.max(...interventions.map(i => i.id)) + 1 : 1;
    interventions.push(newIntervention);
    console.log("Intervention ajoutée:", newIntervention);
    res.status(201).json(newIntervention);
  } catch (error) {
    console.error("Erreur POST /api/interventions:", error);
    res.status(500).json({ error: "Erreur serveur lors de la création de l'intervention" });
  }
});

// --- Assignments ---
app.get("/api/assignments", (req, res) => {
  res.json(assignments);
});

app.post("/api/assignments", (req, res) => {
  console.log("POST /api/assignments - body:", req.body);
  assignments = req.body;
  res.status(200).json({ message: "Assignments updated" });
});

// --- Patrol statuses ---
app.get("/api/patrol-statuses", (req, res) => {
  res.json(patrolStatuses);
});

app.post("/api/patrol-statuses", (req, res) => {
  console.log("POST /api/patrol-statuses - body:", req.body);
  patrolStatuses = req.body;
  res.status(200).json({ message: "Patrol statuses updated" });
});

// --- Liaison patrouille -> intervention ---
app.get("/api/patrol-interventions", (req, res) => {
  res.json(patrolInterventions);
});

app.post("/api/patrol-interventions", (req, res) => {
  console.log("POST /api/patrol-interventions - body:", req.body);
  patrolInterventions = req.body;
  res.status(200).json({ message: "Patrol interventions updated" });
});

// Gestion des erreurs asynchrones non catchées
process.on('uncaughtException', (err) => {
  console.error('Erreur non catchée :', err);
});
process.on('unhandledRejection', (reason, promise) => {
  console.error('Promesse non gérée :', reason);
});

// Démarrage du serveur
app.listen(port, () => {
  console.log(`API server running on port ${port}`);
});
