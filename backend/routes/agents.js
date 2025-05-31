import express from "express";
import Agent from "../models/Agent.js";

const router = express.Router();

// GET all agents
router.get("/", async (req, res) => {
  const agents = await Agent.find();
  res.json(agents);
});

// POST new agent
router.post("/", async (req, res) => {
  try {
    const newAgent = new Agent({
      nom: req.body.nom,
      grade: req.body.grade,
      unite: req.body.unite,
      specialites: req.body.specialites || [],
      statut: req.body.statut || "Indispo"
    });
    const saved = await newAgent.save();
    res.status(201).json(saved);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// PATCH agent by ID
router.patch("/:id", async (req, res) => {
  try {
    const updated = await Agent.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// DELETE agent
router.delete("/:id", async (req, res) => {
  try {
    await Agent.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

export default router;
