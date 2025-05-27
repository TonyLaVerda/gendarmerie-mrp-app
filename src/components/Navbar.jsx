import { NavLink } from "react-router-dom";

const links = [
  { to: "/", label: "🏠 Accueil" },
  { to: "/effectifs", label: "👮 Effectifs" },
  { to: "/bdsp", label: "🚨 BDSP" },
  { to: "/pulsar", label: "📅 Pulsar" },
  { to: "/stats", label: "📊 Statistiques" },
];

export default function Navbar() {
  return (
    <header className="w-full bg-[#0c1e57] text-white shadow">
      {/* Bandeau logo + titre + accroche */}
      <div className="flex flex-col md:flex-row items-center justify-between px-6 py-4 max-w-screen-xl mx-auto">
        <div className="flex items-center space-x-4">
          <img src="/logo-gn.png" alt="Logo GN" className="h-9 w-auto object-contain" />
          <h1 className="text-2xl font-bold whitespace-nowrap">Gendarmerie MRP</h1>
        </div>
        <p className="text-sm italic text-gray-300 mt-2 md:mt-0">
          “Notre Engagement, votre sécurité”
        </p>
      </div>

      {/* Menu onglets */}
      <nav className="bg-[#0a184b] border-t border-[#072746]">
        <ul className="flex justify-center space-x-14 py-4 max-w-screen-xl mx-auto text-base font-semibold">
          {links.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                className={({ isActive }) =>
                  isActive
                    ? "text-white border-b-4 border-white pb-1"
                    : "text-gray-300 hover:text-white transition-colors duration-300"
                }
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
