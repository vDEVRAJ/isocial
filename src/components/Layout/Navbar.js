import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaHome,
  FaLock,
  FaYinYang,
  FaSearch,
  FaUser,
} from "react-icons/fa";
import { auth } from "../../firebase/firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";

function Navbar() {
  const location = useLocation();
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(window.scrollY);
  const [user, loading] = useAuthState(auth);

  // 🌟 Use a safe soul handle (avoid generating wrong URL before displayName is ready)
  const soulHandle = !loading && user?.displayName
    ? user.displayName.toLowerCase().replace(/\s+/g, "")
    : null;

  const navItems = [
    { to: "/", icon: <FaHome />, label: "Home" },
    { to: "/vault", icon: <FaLock />, label: "Vault" },
    { to: "/soul", icon: <FaYinYang />, label: "Soul" },
    { to: "/search", icon: <FaSearch />, label: "Search" },
    // ❗ Only add profile link if handle is valid
    soulHandle && { to: `/soul/${soulHandle}`, icon: <FaUser />, label: "Profile" },
  ].filter(Boolean); // removes nulls

  // 🎯 Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setVisible(currentY < lastScrollY || currentY < 10);
      setLastScrollY(currentY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <nav
      className={`fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-black border-t border-zinc-300 dark:border-zinc-700 px-4 py-2 flex justify-around items-center text-zinc-700 dark:text-white transition-transform duration-300 ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      {navItems.map((item) => (
        <Link
          key={item.to}
          to={item.to}
          className={`flex flex-col items-center text-xs transition ${
            location.pathname === item.to ? "text-purple-500" : ""
          }`}
        >
          <div className="text-xl">{item.icon}</div>
        </Link>
      ))}
    </nav>
  );
}

export default Navbar;
