import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="w-full bg-blue-900 text-white flex items-center px-6 h-16 shadow">
      <h1 className="text-xl font-bold mr-10">Gendarmerie MRP</h1>

      <div className="flex space-x-6">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "font-semibold bg-blue-700 px-3 py-1 rounded"
              : "hover:bg-blue-800 px-3 py-1 rounded"
          }
        >
          🏠 Accueil
        </NavLink>

        <NavLink
          to="/effectifs"
          className={({ isActive }) =>
            isActive
              ? "font-semibold bg-blue-700 px-3 py-1 rounded"
              : "hover:bg-blue-800 px-3 py-1 rounded"
          }
        >
          👮 Effectifs
        </NavLink>

        <NavLink
          to="/bdsp"
          className={({ isActive }) =>
            isActive
              ? "font-semibold bg-blue-700 px-3 py-1 rounded"
              : "hover:bg-blue-800 px-3 py-1 rounded"
          }
        >
          🚨 BDSP
        </NavLink>

        <NavLink
          to="/pulsar"
          className={({ isActive }) =>
            isActive
              ? "font-semibold bg-blue-700 px-3 py-1 rounded"
              : "hover:bg-blue-800 px-3 py-1 rounded"
          }
        >
          📅 Pulsar
        </NavLink>
      </div>
    </nav>
  );
}
