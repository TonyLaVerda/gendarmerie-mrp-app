// backend/routes/patrolStatuses.js
import express from "express";
import fs from "fs";
import path from "path";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();
const filePath = path.join("data", "patrolStatuses.json");

// ✅ GET /api/patrol-statuses (authentifié)
router.get("/", authMiddleware, (req, res) => {
  try {
    if (!fs.existsSync(filePath)) {
      return res.json([]);
    }

    const data = fs.readFileSync(filePath, "utf-8");
    res.json(JSON.parse(data));
  } catch (err) {
    res.status(500).json({ error: "Erreur lors du chargement des statuts de patrouille." });
  }
});

// ✅ POST /api/patrol-statuses (authentifié)
router.post("/", authMiddleware, (req, res) => {
  try {
    const content = req.body;
    fs.writeFileSync(filePath, JSON.stringify(content, null, 2));
    res.json({ message: "Statuts de patrouille mis à jour avec succès." });
  } catch (err) {
    res.status(500).json({ error: "Erreur lors de la sauvegarde des statuts de patrouille." });
  }
});

export default router;
