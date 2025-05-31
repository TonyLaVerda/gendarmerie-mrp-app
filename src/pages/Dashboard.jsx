// src/pages/Dashboard.jsx
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  if (!user) return <p>Chargement...</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Bienvenue {user.nom}</h1>
      <p>Grade : {user.role === "officier" ? "🛡️ Officier" : "Gendarme"}</p>
    </div>
  );
}
