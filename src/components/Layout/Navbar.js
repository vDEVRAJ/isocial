import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-black text-white py-4 px-6 flex justify-between items-center">
      <h1 className="text-xl font-bold">iSocial 🔱</h1>
      <div className="space-x-4">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/shouts" className="hover:underline">Shouts</Link>
        <Link to="/vault" className="hover:underline">Vault</Link>
        <Link to="/soulmirror" className="hover:underline">SoulMirror</Link>
      </div>
    </nav>
  );
}

export default Navbar;
