// backend/routes/patrols.js
import express from "express";
import Patrol from "../models/Patrol.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Obtenir toutes les patrouilles
router.get("/", authMiddleware, async (req, res) => {
  const patrols = await Patrol.find();
  res.json(patrols);
});

// Créer une nouvelle patrouille
router.post("/", authMiddleware, async (req, res) => {
  const patrol = new Patrol(req.body);
  await patrol.save();
  res.status(201).json(patrol);
});

export default router;
