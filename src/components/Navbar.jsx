import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="flex h-screen">
      <nav className="w-64 bg-blue-900 text-white p-6 space-y-4">
        <h1 className="text-2xl font-bold mb-6">Gendarmerie MRP</h1>

        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "block bg-blue-700 px-4 py-2 rounded" : "block px-4 py-2 hover:bg-blue-800 rounded"
          }
        >
          🏠 Accueil
        </NavLink>

        <NavLink
          to="/effectifs"
          className={({ isActive }) =>
            isActive ? "block bg-blue-700 px-4 py-2 rounded" : "block px-4 py-2 hover:bg-blue-800 rounded"
          }
        >
          👮 Effectifs
        </NavLink>

        <NavLink
          to="/bdsp"
          className={({ isActive }) =>
            isActive ? "block bg-blue-700 px-4 py-2 rounded" : "block px-4 py-2 hover:bg-blue-800 rounded"
          }
        >
          🚨 BDSP
        </NavLink>

        <NavLink
          to="/pulsar"
          className={({ isActive }) =>
            isActive ? "block bg-blue-700 px-4 py-2 rounded" : "block px-4 py-2 hover:bg-blue-800 rounded"
          }
        >
          📅 Pulsar
        </NavLink>
      </nav>

      <div className="flex-1 overflow-y-auto">
        {/* Le contenu de la page s'affichera ici */}
      </div>
    </div>
  );
}
