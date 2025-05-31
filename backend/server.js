// backend/server.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import agentRoutes from "./routes/agents.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/agents", agentRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("✅ Connecté à MongoDB");
  app.listen(PORT, () => console.log(`🚀 Serveur lancé sur le port ${PORT}`));
})
.catch((err) => console.error("❌ Erreur de connexion MongoDB:", err));
