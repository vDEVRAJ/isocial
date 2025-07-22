import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

function Layout({ toggleTheme }) {
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // 📱 Auto-hide navbar on scroll up/down
  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (currentY > lastScrollY) {
        setShowNavbar(false); // scroll down → hide navbar
      } else {
        setShowNavbar(true); // scroll up → show navbar
      }
      setLastScrollY(currentY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <div className="relative min-h-screen pb-20">
      {/* 📜 Main Page */}
      <main className="px-4 pt-4">
        <Outlet />
      </main>

      {/* 📌 Animated Bottom Navbar */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 transition-transform duration-300 ${
          showNavbar ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <Navbar toggleTheme={toggleTheme} />
      </div>
    </div>
  );
}

export default Layout;
