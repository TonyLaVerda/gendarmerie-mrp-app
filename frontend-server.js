// frontend-server.js
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const port = 4173;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Sert le dossier dist/ comme frontend
app.use(express.static(path.join(__dirname, 'dist')));

// Redirige toutes les autres routes vers index.html (React Router)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, '0.0.0.0', () => {
  console.log(`🌐 Frontend en ligne sur http://localhost:${port}`);
});
