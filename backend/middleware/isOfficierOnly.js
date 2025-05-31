// backend/middleware/isOfficierOnly.js

export default function isOfficierOnly(req, res, next) {
  if (!req.user || req.user.role !== "officier") {
    return res.status(403).json({ error: "Accès réservé aux officiers" });
  }
  next();
}
