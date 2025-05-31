// src/AppWrapper.jsx
import './index.css';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import MainLayout from './MainLayout'; // ✅ Layout principal

// 🔐 Composant de connexion
function Login() {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    // ⚠️ Version simplifiée (à remplacer plus tard par un appel API réel)
    if (input === "gendarmerie2025") {
      const fakeUser = {
        nom: "Tony La Verda",
        role: "officier",
        id: "FAKE-ID-001"
      };
      localStorage.setItem("token", "fake-token"); // ✅ future API: token réel
      localStorage.setItem("user", JSON.stringify(fakeUser));
      navigate("/", { replace: true });
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
          onChange={(e) => {
            setInput(e.target.value);
            if (error) setError("");
          }}
          className="border p-2 rounded w-full mb-4"
          autoFocus
          onKeyDown={e => { if (e.key === 'Enter') handleLogin(); }}
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

// 🔒 Middleware de protection de route
function RequireAuth({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" replace />;
}

// 🧠 Application principale avec redirection sécurisée
export default function AppWrapper() {
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
