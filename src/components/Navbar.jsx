import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="w-full bg-[#0c1e57] text-white">
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
        <p className="text-sm italic text-gray-300 mt-2 md:mt-0">
          “Notre Engagement, votre sécurité”
        </p>
      </div>

      {/* Barre de navigation */}
      <nav className="bg-[#0a184b] border-t border-[#072746]">
        <ul className="flex justify-center space-x-12 py-4 text-base font-semibold">
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
                    ? "text-white border-b-4 border-white pb-1 transition"
                    : "text-gray-300 hover:text-white transition"
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
