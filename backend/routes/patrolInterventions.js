// backend/routes/patrolInterventions.js
import express from "express";
import fs from "fs";
import path from "path";

const router = express.Router();
const filePath = path.join("data", "patrolInterventions.json");

// GET /api/patrol-interventions
router.get("/", (req, res) => {
  try {
    if (!fs.existsSync(filePath)) return res.json({});
    const data = fs.readFileSync(filePath, "utf-8");
    res.json(JSON.parse(data));
  } catch (err) {
    res.status(500).json({ error: "Erreur chargement liaisons patrouilles-interventions" });
  }
});

// POST /api/patrol-interventions
router.post("/", (req, res) => {
  try {
    fs.writeFileSync(filePath, JSON.stringify(req.body, null, 2));
    res.json({ message: "Liaisons mises à jour" });
  } catch (err) {
    res.status(500).json({ error: "Erreur sauvegarde liaisons" });
  }
});

export default router;
