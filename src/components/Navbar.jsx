import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-[#002654] text-white px-6 py-4 shadow">
      <ul className="flex gap-6 items-center text-lg">
        <li><Link to="/" className="hover:underline">🏠 Accueil</Link></li>
        <li><Link to="/effectifs" className="hover:underline">👮 Effectifs</Link></li>
        <li><Link to="/bdsp" className="hover:underline">🚨 BDSP</Link></li>
        <li><Link to="/pulsar" className="hover:underline">📅 Pulsar</Link></li>
      </ul>
    </nav>
  );
}
