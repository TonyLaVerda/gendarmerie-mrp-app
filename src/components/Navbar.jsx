import { NavLink } from "react-router-dom";
import './Navbar.css';

const links = [
  { to: "/", label: "🏠 Accueil" },
  { to: "/effectifs", label: "👮 Effectifs" },
  { to: "/bdsp", label: "🚨 BDSP" },
  { to: "/pulsar", label: "📅 Pulsar" },
  { to: "/stats", label: "📊 Statistiques" },
];

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-header">
        <div className="navbar-logo-title">
          <img src="/logo-gn.png" alt="Logo GN" className="navbar-logo" />
          <h1 className="navbar-title">Gendarmerie MRP</h1>
        </div>
        <p className="navbar-tagline">“Notre Engagement, votre sécurité”</p>
      </div>

      <nav className="navbar-menu">
        <ul>
          {links.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
