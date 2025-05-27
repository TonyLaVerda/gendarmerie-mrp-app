import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="bg-blue-900 text-white shadow-md w-full">
      {/* Bandeau supérieur : logo + titre + accroche */}
      <div className="flex items-center justify-between px-6 py-4">
        {/* Logo + Titre */}
        <div className="flex items-center space-x-4">
          <img src="/logo-gn.png" alt="Logo GN" className="h-10 w-auto" />
          <h1 className="text-2xl font-bold">Gendarmerie MRP</h1>
        </div>

        {/* Phrase d’accroche */}
        <div className="text-sm italic text-gray-200">
          “Notre Engagement, votre sécurité”
        </div>
      </div>

      {/* Barre de navigation onglets */}
      <div className="bg-blue-800 flex justify-center flex-wrap space-x-6 py-2 text-sm font-medium border-t border-blue-700">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-white border-b-2 border-white pb-1"
              : "text-gray-200 hover:text-white"
          }
        >
          🏠 Accueil
        </NavLink>
        <NavLink
          to="/effectifs"
          className={({ isActive }) =>
            isActive
              ? "text-white border-b-2 border-white pb-1"
              : "text-gray-200 hover:text-white"
          }
        >
          👮 Effectifs
        </NavLink>
        <NavLink
          to="/bdsp"
          className={({ isActive }) =>
            isActive
              ? "text-white border-b-2 border-white pb-1"
              : "text-gray-200 hover:text-white"
          }
        >
          🚨 BDSP
        </NavLink>
        <NavLink
          to="/pulsar"
          className={({ isActive }) =>
            isActive
              ? "text-white border-b-2 border-white pb-1"
              : "text-gray-200 hover:text-white"
          }
        >
          📅 Pulsar
        </NavLink>
        <NavLink
          to="/stats"
          className={({ isActive }) =>
            isActive
              ? "text-white border-b-2 border-white pb-1"
              : "text-gray-200 hover:text-white"
          }
        >
          📊 Statistiques
        </NavLink>
      </div>
    </div>
  );
}
