// backend/server.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Pour les chemins absolus si besoin (avec ESModules)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Chargement des variables d’environnement
dotenv.config();

if (!process.env.MONGO_URI || !process.env.JWT_SECRET) {
  console.error("❌ Variables d’environnement manquantes (MONGO_URI ou JWT_SECRET)");
  process.exit(1);
}

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares globaux
app.use(cors());
app.use(express.json());

// Routes principales
import agentRoutes from "./routes/agents.js";
import authRoutes from "./routes/auth.js";
import interventionRoutes from "./routes/interventions.js";
import patrolRoutes from "./routes/patrols.js";

// Routes pour Commandement
import assignmentRoutes from "./routes/assignments.js";
import patrolStatusRoutes from "./routes/patrolStatuses.js";
import patrolInterventionRoutes from "./routes/patrolInterventions.js";

// Routes API
app.use("/api/agents", agentRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/interventions", interventionRoutes);
app.use("/api/patrols", patrolRoutes);
app.use("/api/assignments", assignmentRoutes);
app.use("/api/patrol-statuses", patrolStatusRoutes);
app.use("/api/patrol-interventions", patrolInterventionRoutes);

// Route de test
app.get("/", (req, res) => {
  res.send("✅ API Gendarmerie opérationnelle");
});

// Connexion MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("✅ Connecté à MongoDB");
  app.listen(PORT, () =>
    console.log(`🚓 Serveur API Gendarmerie lancé sur http://localhost:${PORT}`)
  );
})
.catch((err) => {
  console.error("❌ Erreur de connexion MongoDB:", err.message);
});
