// backend/index.js
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import agentsRoutes from "./routes/agents.js";
import patrolsRoutes from "./routes/patrols.js";
import interventionsRoutes from "./routes/interventions.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes API
app.use("/api/agents", agentsRoutes);
app.use("/api/patrols", patrolsRoutes);
app.use("/api/interventions", interventionsRoutes);

// Connexion MongoDB + lancement serveur
const PORT = process.env.PORT || 3001;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Connecté à MongoDB");
    app.listen(PORT, () => {
      console.log(`🚓 Serveur API Gendarmerie lancé sur http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.error("❌ Erreur MongoDB :", err));
