import express from "express";
import Agent from "../models/Agent.js";
import authMiddleware from "../middleware/authMiddleware.js";
import isOfficierOnly from "../middleware/isOfficierOnly.js";

const router = express.Router();

// Toutes les routes nécessitent une authentification
router.use(authMiddleware);

// 📄 GET tous les agents
router.get("/", async (req, res) => {
  try {
    const agents = await Agent.find();
    res.json(agents);
  } catch (err) {
    res.status(500).json({ error: "Erreur serveur : " + err.message });
  }
});

// 🧍 GET agent lié au user connecté
router.get("/me", async (req, res) => {
  try {
    const agent = await Agent.findOne({ userId: req.user.id });
    if (!agent) return res.status(404).json({ error: "Aucun agent lié à ce compte." });
    res.json(agent);
  } catch (err) {
    res.status(500).json({ error: "Erreur serveur : " + err.message });
  }
});

// ➕ POST (officier uniquement)
router.post("/", isOfficierOnly, async (req, res) => {
  try {
    const agent = new Agent(req.body);
    await agent.save();
    res.status(201).json(agent);
  } catch (err) {
    res.status(400).json({ error: "Création échouée : " + err.message });
  }
});

// ✏️ PUT (officier uniquement)
router.put("/:id", isOfficierOnly, async (req, res) => {
  try {
    const updated = await Agent.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: "Mise à jour échouée : " + err.message });
  }
});

// 🔄 PATCH (modification partielle, autorisé au gendarme uniquement sur lui-même)
router.patch("/:id", async (req, res) => {
  try {
    const agent = await Agent.findById(req.params.id);
    if (!agent) return res.status(404).json({ error: "Agent non trouvé" });

    // Seul l'agent lié peut modifier son statut (hors officier)
    const isOwner = agent.userId?.toString() === req.user.id;
    const isOfficier = req.user.role === "officier";

    if (!isOwner && !isOfficier) {
      return res.status(403).json({ error: "Accès refusé" });
    }

    // Officiers peuvent tout modifier, gendarmes uniquement leur statut
    if (!isOfficier) {
      agent.statut = req.body.statut;
    } else {
      Object.assign(agent, req.body);
    }

    await agent.save();
    res.json(agent);
  } catch (err) {
    res.status(400).json({ error: "Échec de la modification : " + err.message });
  }
});

// ❌ DELETE (officier uniquement)
router.delete("/:id", isOfficierOnly, async (req, res) => {
  try {
    await Agent.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) {
    res.status(400).json({ error: "Suppression échouée : " + err.message });
  }
});

export default router;
