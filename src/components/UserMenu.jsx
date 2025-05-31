// src/components/UserMenu.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./UserMenu.css";

export default function UserMenu() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setUser(storedUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (!user) return null;

  return (
    <div className="user-menu">
      <p>👤 {user.nom} ({user.role})</p>
      <button onClick={handleLogout}>Se déconnecter</button>
    </div>
  );
}

.user-menu {
  margin-top: 0.5rem;
}
