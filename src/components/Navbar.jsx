import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="bg-blue-900 text-white shadow-md w-full fixed top-0 z-50">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Logo GN + titre */}
        <div className="flex items-center space-x-4">
          <img src="/logo-gn.png" alt="Logo GN" className="h-10 w-auto" />
          <h1 className="text-2xl font-bold">Gendarmerie MRP</h1>
        </div>

        {/* Phrase d’accroche */}
        <div className="text-sm italic text-gray-200">
          “Notre Engagement, votre sécurité”
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-blue-800 flex justify-center space-x-8 py-2 text-sm font-medium">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-white border-b-2 border-white pb-1"
              : "hover:text-gray-200"
          }
        >
          🏠 Accueil
        </NavLink>
        <NavLink
          to="/effectifs"
          className={({ isActive }) =>
            isActive
              ? "text-white border-b-2 border-white pb-1"
              : "hover:text-gray-200"
          }
        >
          👮 Effectifs
        </NavLink>
        <NavLink
          to="/bdsp"
          className={({ isActive }) =>
            isActive
              ? "text-white border-b-2 border-white pb-1"
              : "hover:text-gray-200"
          }
        >
          🚨 BDSP
        </NavLink>
        <NavLink
          to="/pulsar"
          className={({ isActive }) =>
            isActive
              ? "text-white border-b-2 border-white pb-1"
              : "hover:text-gray-200"
          }
        >
          📅 Pulsar
        </NavLink>
      </div>
    </div>
  );
}
