import './index.css';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Dashboard from './Dashboard';
import Effectifs from './pages/Effectifs';
import Bdsp from './pages/Bdsp';
import Pulsar from './pages/Pulsar'; // ✅ ajout du module
import Navbar from "./components/Navbar";
import { useState } from 'react';

// 🔐 Page de connexion
function Login() {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (input === "gendarmerie2025") {
      localStorage.setItem("auth", "true");
      navigate("/");
    } else {
      setError("Mot de passe incorrect.");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow p-6 rounded w-full max-w-sm">
        <h1 className="text-xl font-bold mb-4 text-blue-900">🔐 Accès Gendarmerie</h1>
        <input
          type="password"
          placeholder="Mot de passe"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="border p-2 rounded w-full mb-4"
        />
        <button
          onClick={handleLogin}
          className="bg-blue-700 text-white py-2 px-4 rounded w-full"
        >
          Se connecter
        </button>
        {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
      </div>
    </div>
  );
}

// 🔒 Protection
function RequireAuth({ children }) {
  const isAuth = localStorage.getItem("auth") === "true";
  return isAuth ? children : <Navigate to="/login" />;
}

// 🧭 Layout global
function MainLayout() {
  return (
    <div className="flex h-screen">
      <Navbar />
      <div className="flex-1 p-4 overflow-y-auto">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/effectifs" element={<Effectifs />} />
          <Route path="/bdsp" element={<Bdsp />} />
          <Route path="/pulsar" element={<Pulsar />} /> {/* ✅ Route ajoutée */}
        </Routes>
      </div>
    </div>
  );
}

// 🌐 App principale
function AppWrapper() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/*"
          element={
            <RequireAuth>
              <MainLayout />
            </RequireAuth>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default AppWrapper;
