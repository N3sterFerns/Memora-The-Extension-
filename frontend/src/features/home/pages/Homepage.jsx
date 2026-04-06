import React, { useEffect, useState } from "react";
import "../styles/homepage.scss";
import { Link } from "react-router";

const Homepage = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [showGuide, setShowGuide] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved) {
      setDarkMode(saved === "dark");
    } else {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)",
      ).matches;
      setDarkMode(prefersDark);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <div className={`memora ${darkMode ? "dark" : ""}`}>
      <nav className="navbar">
        <div className="container">
          <div className="left">
            <span className="logo">Memora</span>
            <div className="beta-con">
              <span className="beta">Beta</span>
            </div>
          </div>

          <div className="right">
            <Link to={"/login"}>
              <button className="cta">Login</button>
            </Link>
            <button className="login" onClick={() => setDarkMode(!darkMode)}>
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
              Your Second Brain, <span className="gradient">Automated.</span>
            </h1>

            <p>
              Save anything from the internet articles, videos, tweets, or PDFs
              and let Memora automatically organize, connect, and resurface your
              knowledge when you need it most.
            </p>

            <div className="buttons">
              <a href="/extension/Memora.zip" download>
                <button className="primary">Download Chrome Extension</button>
              </a>

              <button className="secondary" onClick={() => setShowGuide(true)}>
                How it Works
              </button>
            </div>
          </div>

          <div className="cards">
            <div className="card">
              <h3>Smart Saving</h3>
              <p>
                Capture any content instantly with one click no manual effort.
              </p>
            </div>

            <div className="card">
              <h3>AI Organization</h3>
              <p>Automatically tagged, structured, and grouped using AI.</p>
            </div>

            <div className="card">
              <h3>Connected Knowledge</h3>
              <p>
                Discover relationships between ideas and resurface insights over
                time.
              </p>
            </div>
          </div>
        </section>
      </main>

      {showGuide && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>How to Install Memora Extension</h2>

            <ul>
              <li>
                Download the <b>memora.zip</b> file using the button above.
              </li>
              <li>Extract (unzip) the file to a folder on your computer.</li>
              <li>
                Open Chrome and go to: <b>chrome://extensions</b>
              </li>
              <li>
                Enable <b>Developer Mode</b> (top right).
              </li>
              <li>
                Click <b>"Load unpacked"</b>
              </li>
              <li>
                Select the extracted <b>memora</b> folder (not the zip file).
              </li>
              <li>
                Done! You can now save content directly from your browser.
              </li>
              <li>(Optional) Pin the extension for quick access.</li>
            </ul>

            <button className="close-btn" onClick={() => setShowGuide(false)}>
              Close
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="footer">
        <p>Memora — Made By Nester Ferns.</p>
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
