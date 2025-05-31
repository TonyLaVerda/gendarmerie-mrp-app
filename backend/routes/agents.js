// backend/routes/agents.js
import express from "express";
import Agent from "../models/Agent.js";
import { authenticateToken, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

// GET all agents (accessible à tous les utilisateurs connectés)
router.get("/", authenticateToken, async (req, res) => {
  const agents = await Agent.find();
  res.json(agents);
});

// POST new agent (officier uniquement)
router.post("/", authenticateToken, authorizeRoles("officier"), async (req, res) => {
  try {
    const newAgent = new Agent(req.body);
    const saved = await newAgent.save();
    res.status(201).json(saved);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// PATCH agent (officier uniquement pour modifier fiche)
router.patch("/:id", authenticateToken, async (req, res) => {
  const { role, id: userId } = req.user;
  const updatedFields = req.body;

  // 🛡️ Si non-officier, ne peut modifier que son statut
  if (role !== "officier") {
    if (Object.keys(updatedFields).length > 1 || !("statut" in updatedFields)) {
      return res.status(403).json({ error: "Seul un officier peut modifier cette fiche." });
    }
  }

  try {
    const updated = await Agent.findByIdAndUpdate(req.params.id, updatedFields, { new: true });
    res.json(updated);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// DELETE agent (officier uniquement)
router.delete("/:id", authenticateToken, authorizeRoles("officier"), async (req, res) => {
  try {
    await Agent.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

export default router;
