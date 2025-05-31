import express from "express";
import fs from "fs";
import path from "path";

const router = express.Router();
const dataDir = path.join(process.cwd(), "data");
const filePath = path.join(dataDir, "assignments.json");

// 🔄 GET /api/assignments
router.get("/", (req, res) => {
  try {
    if (!fs.existsSync(filePath)) return res.json({});

    const data = fs.readFileSync(filePath, "utf-8");
    const parsed = JSON.parse(data);
    res.json(parsed);
  } catch (err) {
    console.error("Erreur lecture assignations:", err);
    res.status(500).json({ error: "Erreur chargement assignations" });
  }
});

// 💾 POST /api/assignments
router.post("/", (req, res) => {
  try {
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    // Vérifier que req.body est un objet JSON valide
    if (typeof req.body !== "object" || Array.isArray(req.body)) {
      return res.status(400).json({ error: "Données invalides. Un objet JSON est requis." });
    }

    fs.writeFileSync(filePath, JSON.stringify(req.body, null, 2), "utf-8");
    res.json({ message: "Assignations mises à jour avec succès" });
  } catch (err) {
    console.error("Erreur sauvegarde assignations:", err);
    res.status(500).json({ error: "Erreur sauvegarde assignations" });
  }
});

export default router;
