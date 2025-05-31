import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

// Import des routes
import agentRoutes from "./routes/agents.js";
import authRoutes from "./routes/auth.js";
import interventionRoutes from "./routes/interventions.js";
import patrolRoutes from "./routes/patrols.js";

// Charger les variables d'environnement
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares globaux
app.use(cors());
app.use(express.json());

// Définition des routes
app.use("/api/agents", agentRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/interventions", interventionRoutes);
app.use("/api/patrols", patrolRoutes);

// ➕ Tu pourras activer ces routes plus tard si tu les ajoutes
// import assignmentRoutes from "./routes/assignments.js";
// import patrolStatusRoutes from "./routes/patrolStatuses.js";
// import patrolInterventionRoutes from "./routes/patrolInterventions.js";
// app.use("/api/assignments", assignmentRoutes);
// app.use("/api/patrol-statuses", patrolStatusRoutes);
// app.use("/api/patrol-interventions", patrolInterventionRoutes);

// Route de test (facultative)
app.get("/", (req, res) => {
  res.send("✅ API Gendarmerie opérationnelle");
});

// Connexion MongoDB et lancement du serveur
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
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
