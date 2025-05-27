import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="w-full bg-blue-900 text-white">
      {/* Bandeau haut : Logo + Titre + Accroche */}
      <div className="flex flex-col md:flex-row justify-between items-center px-6 py-3">
        <div className="flex items-center space-x-3">
          <img
  src="/logo-gn.png"
  alt="Logo GN"
  className="h-10 w-10 object-contain"
  style={{ maxWidth: '40px', maxHeight: '40px' }}
/>
          <h1 className="text-xl md:text-2xl font-bold">Gendarmerie MRP</h1>
        </div>
        <div className="text-sm italic text-gray-200 mt-2 md:mt-0 text-center md:text-right">
          “Notre Engagement, votre sécurité”
        </div>
      </div>

      {/* Barre de navigation */}
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
