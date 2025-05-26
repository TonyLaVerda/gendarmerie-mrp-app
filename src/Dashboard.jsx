import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const interventions = [
  { unit: "GD", count: 12 },
  { unit: "PMO", count: 7 },
  { unit: "PSIG", count: 9 },
];

export default function Dashboard() {
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);

  const handleLogin = () => {
    if (password === "gendarmerie2025") {
      setAuthenticated(true);
    } else {
      alert("Mot de passe incorrect");
    }
  };

  if (!authenticated) {
    return (
      <div style={{ textAlign: "center", padding: "2rem", backgroundColor: "#1e3a8a", height: "100vh", color: "white" }}>
        <h1>Accès sécurisé - Gendarmerie MRP</h1>
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ padding: "0.5rem", margin: "1rem" }}
        />
        <button onClick={handleLogin}>Se connecter</button>
      </div>
    );
  }

  return (
    <div style={{ padding: "2rem" }}>
      <header style={{ textAlign: "center", marginBottom: "2rem" }}>
        <h1 style={{ color: "#1e3a8a" }}>Gendarmerie Nationale - Martinique RP</h1>
        <p>Notre Engagement, votre sécurité</p>
      </header>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
        <div style={{ border: "1px solid #ccc", padding: "1rem", backgroundColor: "#fff" }}>
          <h2>Effectifs</h2>
          <p>Gestion des membres par unité, grade et spécialité</p>
        </div>
        <div style={{ border: "1px solid #ccc", padding: "1rem", backgroundColor: "#fff" }}>
          <h2>BDSP</h2>
          <p>Gestion des interventions</p>
        </div>
        <div style={{ border: "1px solid #ccc", padding: "1rem", backgroundColor: "#fff" }}>
          <h2>Planning</h2>
          <p>Organisation des patrouilles</p>
        </div>
        <div style={{ border: "1px solid #ccc", padding: "1rem", backgroundColor: "#fff" }}>
          <h2>Statistiques par unité</h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={interventions}>
              <XAxis dataKey="unit" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#1e3a8a" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
