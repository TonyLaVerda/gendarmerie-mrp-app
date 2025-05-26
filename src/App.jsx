import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import Effectifs from './pages/Effectifs';
import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
       <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />         {/* Page d'accueil */}
        <Route path="/effectifs" element={<Effectifs />} /> {/* Page Effectifs */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
