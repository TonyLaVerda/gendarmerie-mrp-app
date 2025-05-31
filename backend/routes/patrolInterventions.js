// backend/routes/patrolInterventions.js
import express from "express";
import fs from "fs";
import path from "path";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();
const filePath = path.join("data", "patrolInterventions.json");

// ✅ GET /api/patrol-interventions (authentifié)
router.get("/", authMiddleware, (req, res) => {
  try {
    if (!fs.existsSync(filePath)) {
      return res.json([]);
    }

    const data = fs.readFileSync(filePath, "utf-8");
    const parsed = JSON.parse(data);
    res.json(parsed);
  } catch (err) {
    res.status(500).json({ error: "Erreur chargement liaisons patrouille-intervention." });
  }
});

// ✅ POST /api/patrol-interventions (authentifié)
router.post("/", authMiddleware, (req, res) => {
  try {
    const content = req.body;
    fs.writeFileSync(filePath, JSON.stringify(content, null, 2));
    res.json({ message: "Liaisons mises à jour avec succès." });
  } catch (err) {
    res.status(500).json({ error: "Erreur sauvegarde liaisons patrouille-intervention." });
  }
});

export default router;
