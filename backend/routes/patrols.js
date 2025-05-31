// backend/routes/patrols.js
import express from "express";
import Patrol from "../models/Patrol.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Toutes les routes nécessitent une authentification
router.use(authMiddleware);

// 📄 GET /api/patrols — Liste des patrouilles
router.get("/", async (req, res) => {
  try {
    const patrols = await Patrol.find();
    res.json(patrols);
  } catch (err) {
    res.status(500).json({ error: "Erreur serveur lors du chargement des patrouilles." });
  }
});

// ➕ POST /api/patrols — Créer une nouvelle patrouille
router.post("/", async (req, res) => {
  try {
    const patrol = new Patrol(req.body);
    await patrol.save();
    res.status(201).json(patrol);
  } catch (err) {
    res.status(400).json({ error: "Erreur lors de la création de la patrouille : " + err.message });
  }
});

export default router;
