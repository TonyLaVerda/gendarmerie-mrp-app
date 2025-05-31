// backend/routes/agents.js
import express from "express";
import Agent from "../models/Agent.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// GET all agents (public)
router.get("/", async (req, res) => {
  const agents = await Agent.find();
  res.json(agents);
});

// POST new agent (utilisateur authentifié)
router.post("/", authMiddleware, async (req, res) => {
  try {
    const agent = new Agent({ ...req.body, userId: req.user.id });
    const saved = await agent.save();
    res.status(201).json(saved);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// PATCH update (seul l’agent concerné OU un officier peut modifier)
router.patch("/:id", authMiddleware, async (req, res) => {
  try {
    const agent = await Agent.findById(req.params.id);
    if (!agent) return res.status(404).json({ error: "Agent introuvable" });

    const isOwner = agent.userId?.toString() === req.user.id;
    const isOfficer = req.user.role === "officier";

    if (!isOwner && !isOfficer) {
      return res.status(403).json({ error: "Accès interdit" });
    }

    const updated = await Agent.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// DELETE (officier uniquement)
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "officier") {
      return res.status(403).json({ error: "Réservé aux officiers" });
    }

    await Agent.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

export default router;
