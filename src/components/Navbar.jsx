import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="w-full bg-blue-900 text-white">
      {/* Bandeau haut : Logo + Titre + Accroche */}
      <div className="flex flex-col md:flex-row justify-between items-center px-6 py-4">
        <div className="flex items-center space-x-4">
          <img
            src="/logo-gn.png"
            alt="Logo GN"
            className="h-12 w-auto object-contain"
          />
          <h1 className="text-2xl font-bold">Gendarmerie MRP</h1>
        </div>
        <p className="text-sm italic text-gray-200 mt-2 md:mt-0">
          “Notre Engagement, votre sécurité”
        </p>
      </div>

      {/* Barre de navigation */}
      <nav className="bg-blue-800 border-t border-blue-700">
        <ul className="flex justify-center space-x-8 py-3 text-sm font-medium">
          {[
            { to: "/", label: "🏠 Accueil" },
            { to: "/effectifs", label: "👮 Effectifs" },
            { to: "/bdsp", label: "🚨 BDSP" },
            { to: "/pulsar", label: "📅 Pulsar" },
            { to: "/stats", label: "📊 Statistiques" }
          ].map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                className={({ isActive }) =>
                  isActive
                    ? "text-white border-b-2 border-white pb-1"
                    : "text-gray-200 hover:text-white transition"
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
