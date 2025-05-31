// backend/middleware/authMiddleware.js
import jwt from "jsonwebtoken";

export function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1]; // Format: Bearer TOKEN

  if (!token) return res.status(401).json({ error: "Accès refusé. Token requis." });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: "Token invalide." });
    req.user = user; // On ajoute l'objet user (id, role, etc.) dans la requête
    next();
  });
}

export function authorizeRoles(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ error: "Accès interdit. Rôle insuffisant." });
    }
    next();
  };
}
