import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="w-64 bg-blue-900 text-white p-6 flex flex-col space-y-4">
      <h1 className="text-2xl font-bold mb-6">Gendarmerie MRP</h1>

      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive
            ? "block bg-blue-700 px-4 py-2 rounded font-semibold"
            : "block px-4 py-2 rounded hover:bg-blue-800"
        }
      >
        🏠 Accueil
      </NavLink>

      <NavLink
        to="/effectifs"
        className={({ isActive }) =>
          isActive
            ? "block bg-blue-700 px-4 py-2 rounded font-semibold"
            : "block px-4 py-2 rounded hover:bg-blue-800"
        }
      >
        👮 Effectifs
      </NavLink>

      <NavLink
        to="/bdsp"
        className={({ isActive }) =>
          isActive
            ? "block bg-blue-700 px-4 py-2 rounded font-semibold"
            : "block px-4 py-2 rounded hover:bg-blue-800"
        }
      >
        🚨 BDSP
      </NavLink>

      <NavLink
        to="/pulsar"
        className={({ isActive }) =>
          isActive
            ? "block bg-blue-700 px-4 py-2 rounded font-semibold"
            : "block px-4 py-2 rounded hover:bg-blue-800"
        }
      >
        📅 Pulsar
      </NavLink>
    </nav>
  );
}
