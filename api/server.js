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

// Exemple route pour récupérer agents
app.get("/agents", (req, res) => {
  res.json(agents);
});

// Exemple route pour ajouter un agent
app.post("/agents", (req, res) => {
  const newAgent = req.body;
  newAgent.id = agents.length ? agents[agents.length -1].id + 1 : 1;
  agents.push(newAgent);
  res.status(201).json(newAgent);
});

// Démarrage du serveur
app.listen(port, () => {
  console.log(`API server running on port ${port}`);
});

