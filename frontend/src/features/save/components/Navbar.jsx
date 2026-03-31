import React, { useEffect, useState } from "react";

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
            <a href="#" className="active">
              Dashboard
            </a>
            <a href="#">Analytics</a>
            {/* <a href="#">Content</a>
            <a href="#">Media</a> */}
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
          <a href="#" className="active">
            Dashboard
          </a>
          <a href="#">Content</a>
          <a href="#">Analytics</a>
          <a href="#">Media</a>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
