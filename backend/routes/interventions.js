// backend/routes/interventions.js
import express from "express";
import Intervention from "../models/Intervention.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Obtenir toutes les interventions
router.get("/", authMiddleware, async (req, res) => {
  const interventions = await Intervention.find();
  res.json(interventions);
});

// Créer une nouvelle intervention
router.post("/", authMiddleware, async (req, res) => {
  const intervention = new Intervention(req.body);
  await intervention.save();
  res.status(201).json(intervention);
});

export default router;
