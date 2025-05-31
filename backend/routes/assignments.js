// backend/routes/assignments.js
import express from "express";
import fs from "fs";
import path from "path";

const router = express.Router();
const filePath = path.join("data", "assignments.json");

// GET /api/assignments
router.get("/", (req, res) => {
  try {
    if (!fs.existsSync(filePath)) return res.json({});
    const data = fs.readFileSync(filePath, "utf-8");
    res.json(JSON.parse(data));
  } catch (err) {
    res.status(500).json({ error: "Erreur chargement assignations" });
  }
});

// POST /api/assignments
router.post("/", (req, res) => {
  try {
    fs.writeFileSync(filePath, JSON.stringify(req.body, null, 2));
    res.json({ message: "Assignations mises à jour" });
  } catch (err) {
    res.status(500).json({ error: "Erreur sauvegarde assignations" });
  }
});

export default router;
