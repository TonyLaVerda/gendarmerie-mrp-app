import express from "express";
import jwt from "jsonwebtoken";
import user from "../models/user.js";

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "dev-secret"; // À remplacer en production

// 🔐 Génère un token JWT pour un utilisateur
function generateToken(user) {
  return jwt.sign(
    { id: user._id, role: user.role },
    JWT_SECRET,
    { expiresIn: "7d" }
  );
}

// ✅ POST /api/auth/register
router.post("/register", async (req, res) => {
  try {
    const { email, password, role } = req.body;

    // Vérifie que tous les champs sont fournis
    if (!email || !password) {
      return res.status(400).json({ error: "Email et mot de passe requis." });
    }

    // Vérifie si un utilisateur avec cet email existe déjà
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ error: "Email déjà utilisé." });
    }

    const user = new User({ email, password, role });
    await user.save();

    res.status(201).json({ message: "Utilisateur créé avec succès." });
  } catch (err) {
    console.error("Erreur register :", err);
    res.status(400).json({ error: err.message });
  }
});

// ✅ POST /api/auth/login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Champs requis." });
    }

    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: "Email ou mot de passe incorrect." });
    }

    const token = generateToken(user);

    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    console.error("Erreur login :", err);
    res.status(500).json({ error: "Erreur interne." });
  }
});

// ✅ GET /api/auth/me (récupérer les infos de l'utilisateur connecté)
router.get("/me", async (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Non autorisé" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");

    if (!user) return res.status(404).json({ error: "Utilisateur non trouvé." });

    res.json(user);
  } catch (err) {
    res.status(401).json({ error: "Token invalide." });
  }
});

export default router;
