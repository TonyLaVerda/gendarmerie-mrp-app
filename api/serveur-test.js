const express = require('express');
const app = express();
const port = 3001;

app.get('/', (req, res) => {
  res.send('Serveur minimal OK');
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Serveur démarré sur le port ${port}`);
});
