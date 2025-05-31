// backend/routes/patrolStatuses.js
import express from "express";
import fs from "fs";
import path from "path";

const router = express.Router();
const filePath = path.join("data", "patrolStatuses.json");

// GET /api/patrol-statuses
router.get("/", (req, res) => {
  try {
    if (!fs.existsSync(filePath)) return res.json({});
    const data = fs.readFileSync(filePath, "utf-8");
    res.json(JSON.parse(data));
  } catch (err) {
    res.status(500).json({ error: "Erreur chargement statuts" });
  }
});

// POST /api/patrol-statuses
router.post("/", (req, res) => {
  try {
    fs.writeFileSync(filePath, JSON.stringify(req.body, null, 2));
    res.json({ message: "Statuts mis à jour" });
  } catch (err) {
    res.status(500).json({ error: "Erreur sauvegarde statuts" });
  }
});

export default router;
