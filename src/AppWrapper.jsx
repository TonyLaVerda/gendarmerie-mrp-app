// src/AppWrapper.jsx
import './index.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './MainLayout';
import Login from './pages/Login'; // ✅ Page de connexion avec champ email + mot de passe

// ✅ Middleware d'authentification
function RequireAuth({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" replace />;
}

// ✅ App principale
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
