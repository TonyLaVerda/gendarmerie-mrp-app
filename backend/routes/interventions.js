// backend/routes/interventions.js
import express from "express";
import Intervention from "../models/Intervention.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ Obtenir toutes les interventions (authentifié)
router.get("/", authMiddleware, async (req, res) => {
  try {
    const interventions = await Intervention.find().sort({ createdAt: -1 });
    res.json(interventions);
  } catch (err) {
    res.status(500).json({ error: "Erreur lors du chargement des interventions." });
  }
});

// ✅ Créer une nouvelle intervention (authentifié)
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { titre, type, unite, date, heure, agents, description } = req.body;

    if (!titre || !type || !unite || !date || !heure) {
      return res.status(400).json({ error: "Champs requis manquants." });
    }

    const intervention = new Intervention({
      titre,
      type,
      unite,
      date,
      heure,
      agents,
      description
    });

    await intervention.save();
    res.status(201).json(intervention);
  } catch (err) {
    res.status(400).json({ error: "Erreur lors de la création : " + err.message });
  }
});

export default router;
