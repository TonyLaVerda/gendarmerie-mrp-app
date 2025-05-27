import React from 'react';
import ReactDOM from 'react-dom/client';
import AppWrapper from './AppWrapper.jsx'; // ✅ Ajout de l'extension exacte
// La ligne ci-dessous est inutile ici si tu ne l’utilises pas :
/* import Effectifs from "./pages/Effectifs"; */

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>
);
