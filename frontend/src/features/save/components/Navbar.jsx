import React, { useEffect, useState } from "react";
import { Link } from "react-router";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.body.setAttribute("data-theme", darkMode ? "dark" : "light");
  }, [darkMode]);
  return (
    <>
      <header className="top-nav">
        <div className="top-nav__inner">
          <button
            className="top-nav__hamburger"
            onClick={() => setMenuOpen(true)}
          >
            <span className="material-symbols-outlined">menu</span>
          </button>

          <span className="top-nav__brand">Memora</span>


          <nav className="top-nav__nav desktop-only">
            <Link className="active" to={"/dashboard"}>Dashboard</Link>
            <Link to={"/dashboard/graph"}>Analytics</Link>
          </nav>

          <div className="top-nav__actions">

            <button className="top-nav__icon-btn">
              <span className="material-symbols-outlined">notifications</span>
            </button>
            
            <button
              className="top-nav__icon-btn"
              onClick={() => setDarkMode(!darkMode)}
            >
              <span className="material-symbols-outlined">
                {darkMode ? "light_mode" : "dark_mode"}
              </span>
            </button>
          </div>
        </div>
      </header>

      {menuOpen && (
        <div className="mobile-overlay" onClick={() => setMenuOpen(false)} />
      )}

      <div className={`mobile-drawer ${menuOpen ? "open" : ""}`}>
        <div className="mobile-drawer__header">
            <span>Memora</span>
          <button onClick={() => setMenuOpen(false)}>
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <nav className="mobile-drawer__nav">
          <Link className="active" to={"/dashboard"}>Dashboard</Link>
          <Link to={"/dashboard/graph"}>Analytics</Link>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
