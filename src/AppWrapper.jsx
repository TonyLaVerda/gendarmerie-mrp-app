import './index.css';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import MainLayout from './MainLayout'; // ✅ Nouveau layout importé

// 🔐 Page de connexion
function Login() {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (input === "gendarmerie2025") {
      localStorage.setItem("auth", "true");
      navigate("/", { replace: true });  // remplace historique pour éviter retour page login
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
            if (error) setError("");  // reset erreur à la saisie
          }}
          className="border p-2 rounded w-full mb-4"
          autoFocus
          onKeyDown={e => { if (e.key === 'Enter') handleLogin(); }} // login au Enter
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

// 🔒 Composant de protection des routes
function RequireAuth({ children }) {
  const isAuth = localStorage.getItem("auth") === "true";
  return isAuth ? children : <Navigate to="/login" replace />;
}

// 🌐 Application principale avec redirection sécurisée
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
