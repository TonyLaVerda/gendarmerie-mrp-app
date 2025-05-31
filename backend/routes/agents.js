import express from "express";
import Agent from "../models/Agent.js";
import authMiddleware from "../middleware/authMiddleware.js";
import isOfficierOnly from "../middleware/isOfficierOnly.js";

const router = express.Router();

// 🔐 Toutes les routes protégées
router.use(authMiddleware);

// 📄 Récupérer tous les agents (officiers seulement ? → sinon à restreindre)
router.get("/", async (req, res) => {
  try {
    const agents = await Agent.find();
    res.json(agents);
  } catch (err) {
    res.status(500).json({ error: "Erreur serveur : " + err.message });
  }
});

// 🙋 Récupérer l'agent lié à l'utilisateur connecté
router.get("/me", async (req, res) => {
  try {
    const agent = await Agent.findOne({ userId: req.user.id });
    if (!agent) {
      return res.status(404).json({ error: "Aucun agent lié à ce compte." });
    }
    res.json(agent);
  } catch (err) {
    res.status(500).json({ error: "Erreur serveur : " + err.message });
  }
});

// ➕ Créer un agent (officier uniquement)
router.post("/", isOfficierOnly, async (req, res) => {
  try {
    const agent = new Agent(req.body);
    await agent.save();
    res.status(201).json(agent);
  } catch (err) {
    res.status(400).json({ error: "Création échouée : " + err.message });
  }
});

// ✏️ Modifier complètement un agent (officier uniquement)
router.put("/:id", isOfficierOnly, async (req, res) => {
  try {
    const updated = await Agent.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated) {
      return res.status(404).json({ error: "Agent non trouvé" });
    }
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: "Mise à jour échouée : " + err.message });
  }
});

// 🔄 Modifier partiellement un agent
router.patch("/:id", async (req, res) => {
  try {
    const agent = await Agent.findById(req.params.id);
    if (!agent) return res.status(404).json({ error: "Agent non trouvé" });

    const isOwner = agent.userId?.toString() === req.user.id;
    const isOfficier = req.user.role === "officier";

    if (!isOwner && !isOfficier) {
      return res.status(403).json({ error: "Accès refusé" });
    }

    if (!isOfficier) {
      // Le gendarme ne peut modifier que son statut
      if (typeof req.body.statut === "string") {
        agent.statut = req.body.statut;
      } else {
        return res.status(400).json({ error: "Seul le champ 'statut' est modifiable." });
      }
    } else {
      // L’officier peut tout modifier
      Object.assign(agent, req.body);
    }

    await agent.save();
    res.json(agent);
  } catch (err) {
    res.status(400).json({ error: "Échec de la modification : " + err.message });
  }
});

// 🗑️ Supprimer un agent (officier uniquement)
router.delete("/:id", isOfficierOnly, async (req, res) => {
  try {
    const deleted = await Agent.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Agent non trouvé" });
    res.status(204).end();
  } catch (err) {
    res.status(400).json({ error: "Suppression échouée : " + err.message });
  }
});

export default router;
