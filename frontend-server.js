// frontend-server.js
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const port = process.env.PORT || 3001; // 🟢 Port standard configurable

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Sert les fichiers statiques du dossier "dist"
app.use(express.static(path.join(__dirname, 'dist')));

// Redirige toutes les routes vers "index.html" (React Router)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Démarre le serveur sur toutes les interfaces (utile en VM)
app.listen(port, '0.0.0.0', () => {
  console.log(`🌐 Frontend en ligne sur http://localhost:${port}`);
});
