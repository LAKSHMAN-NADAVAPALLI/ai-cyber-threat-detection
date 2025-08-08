import React, { useState, useRef, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

import './Homepage.css';

import dashboardImg from '../asserts/ashboard.jpg';
import cyberImg from '../asserts/cyber.jpg';
import aiShieldImg from '../asserts/cyberhack.jpg';
import analyticsImg from '../asserts/visual.jpg';

const Home = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="homepage-container">
      <Helmet>
        <title>Home | CyberShield AI</title>
      </Helmet>

      {/* Navbar */}
      <header className="homepage-navbar">
        <div className="navbar-content">
          <h1 className="logo">CyberShield AI</h1>
          <nav className="navbar-links">
            {["Home", "Features", "About", "Contact"].map((item) => (
              <a
                key={item}
                href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                className="nav-link"
              >
                {item}
              </a>
            ))}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setShowDropdown((prev) => !prev)}
                className="nav-link"
              >
                Login
              </button>
              {showDropdown && (
                <div className="dropdown-menu">
                  <a href="/login/user">User</a>
                  <a href="/login/admin">Admin</a>
                </div>
              )}
            </div>
          </nav>
        </div>
      </header>

      {/* Main Section */}
      <main className="homepage-main">
        <section className="intro">
          <h2>Welcome to CyberShield AI</h2>
          <p>
            Harness the power of Artificial Intelligence for real-time cyber threat detection,
            behavioral analysis, and proactive defense. Stay secure, stay smart.
          </p>
        </section>

        {/* Other Sections (About, Features, Visual Insights) — Keep same as your current code */}
        {/* You can copy your detailed sections here like About, Features, Visuals, etc. */}
      </main>

      {/* Footer */}
      <footer className="homepage-footer">
        <p>&copy; {new Date().getFullYear()} CyberShield AI. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
