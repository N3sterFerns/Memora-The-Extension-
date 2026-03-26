import React, { useEffect, useState } from "react";
import "../styles/homepage.scss"
import { Link } from "react-router";

const Homepage = () => {
  const [darkMode, setDarkMode] = useState(false);

  // Optional: persist + system preference
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved) {
      setDarkMode(saved === "dark");
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setDarkMode(prefersDark);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <div className={`memora ${darkMode ? "dark" : ""}`}>
      {/* Navbar */}
      <nav className="navbar">
        <div className="container">
          <div className="left">
            <span className="logo">Memora</span>
          </div>

          <div className="right">
            <Link to={"/login"}><button className="cta">Login</button></Link>
            <button
              className="login"
              onClick={() => setDarkMode(!darkMode)}
            >
              {darkMode ? "Light" : "Dark"}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <main>
        <section className="hero">
          <div className="content">
            <h1>
              Your Digital Archive,{" "}
              <span className="gradient">Refined.</span>
            </h1>

            <p>
              Capture, curate, and collaborate on your best ideas with precision
              and speed. Transform the chaos of information into a structured
              gallery of insights.
            </p>

            <div className="buttons">
              <button className="primary">
                Download Chrome Extension
              </button>
            </div>
          </div>

          <div className="cards">
            <div className="card">
              <h3>Instant Curation</h3>
              <p>Automatically categorize and tag content as you save it.</p>
            </div>

            <div className="card">
              <h3>Infinite Search</h3>
              <p>Find anything in seconds with powerful indexing.</p>
            </div>

            <div className="card">
              <h3>Semantic Organization</h3>
              <p>Connect ideas and discover insights effortlessly.</p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>© 2026 Memora. All rights reserved.</p>
        <div className="footer-links">
          <a>Privacy</a>
          <a>Terms</a>
          <a>Contact</a>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;
