import React, { useState, useRef, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

import './Homepage.css';

import dashboardImg from '../asserts/ashboard.jpg';
import cyberImg from '../asserts/cyber.jpg';
import aiShieldImg from '../asserts/cyberhack.jpg';
import analyticsImg from '../asserts/visual.jpg';

const Home = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }

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
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">CyberShield AI</h1>
          <nav>
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
                onClick={() => setShowDropdown(!showDropdown)}
                className="nav-link"
              >
                Login
              </button>
              {showDropdown && (
                <div className="dropdown-menu">
                  {["User", "Admin"].map((role) => (
                    <a
                      key={role}
                      href={`/login/${role.toLowerCase().replace(" ", "")}`}
                    >
                      {role}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </nav>
        </div>
      </header>

      {/* Main */}
      <main className="homepage-main px-6 py-16 flex-grow">
        <section className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-[#0a2540] mb-4">
            Welcome to CyberShield AI
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Harness the power of Artificial Intelligence for real-time cyber threat detection,
            behavioral analysis, and proactive defense. Stay secure, stay smart.
          </p>
        </section>

        {/* About */}
        <section className="bg-white p-8 md:p-12 rounded-lg shadow-lg max-w-6xl mx-auto text-left mb-16">
          <h3 className="text-3xl font-bold text-[#0a2540] mb-4">🧠 About CyberShield AI</h3>
          <p className="text-gray-700 mb-4">
            CyberShield AI is a cutting-edge cyber threat monitoring platform built for modern
            digital infrastructures. Whether you're a startup or an enterprise, we help detect
            anomalies, secure networks, and provide deep insights using AI-powered technology.
          </p>
          <ul className="list-disc list-inside text-gray-700 mb-6">
            <li>🚨 Intelligent Threat Identification</li>
            <li>📊 Customizable Admin/User Dashboards</li>
            <li>🔐 Role-Based Secure Authentication</li>
            <li>⚡ Fast Incident Reporting</li>
          </ul>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <img src={dashboardImg} alt="Dashboard" className="rounded-lg shadow-md hover:scale-105 transition-transform" />
            <img src={cyberImg} alt="Cyber Defense" className="rounded-lg shadow-md hover:scale-105 transition-transform" />
          </div>
        </section>

        {/* Features */}
        <section className="max-w-6xl mx-auto mb-16">
          <h3 className="text-3xl font-bold text-[#0a2540] text-center mb-8">🚀 Key Features</h3>
          <div className="grid md:grid-cols-2 gap-10">
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <h4 className="text-xl font-semibold text-[#0a2540] mb-2">Real-Time Monitoring</h4>
              <p className="text-gray-600">
                Receive live updates and security alerts as soon as threats are detected by the system.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <h4 className="text-xl font-semibold text-[#0a2540] mb-2">AI Behavior Analytics</h4>
              <p className="text-gray-600">
                Track and analyze user behavior to spot unusual activities with precision.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <h4 className="text-xl font-semibold text-[#0a2540] mb-2">Detailed Reports</h4>
              <p className="text-gray-600">
                Generate customized security reports and logs to audit system activity.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <h4 className="text-xl font-semibold text-[#0a2540] mb-2">Easy Role Management</h4>
              <p className="text-gray-600">
                Admins and Users have separated dashboards with different privileges and views.
              </p>
            </div>
          </div>
        </section>

        {/* Visual Insights */}
        <section className="max-w-6xl mx-auto text-center mb-16">
          <h3 className="text-3xl font-bold text-[#0a2540] mb-6">📸 Visual Insights</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <img src={aiShieldImg} alt="AI Shield" className="rounded-lg shadow-md hover:scale-105 transition-transform" />
            <img src={analyticsImg} alt="Analytics Panel" className="rounded-lg shadow-md hover:scale-105 transition-transform" />
          </div>
        </section>

        {/* AI Edge */}
        <section className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-bold text-[#0a2540] mb-4">🧬 Why AI Matters in Cybersecurity</h3>
          <p className="text-gray-700">
            Traditional security systems react after an incident has occurred. Our AI model learns from historical patterns, identifies unknown threats, and neutralizes them before they cause harm — offering a proactive defense layer you can trust.
          </p>
        </section>
      </main>

      {/* Footer */}
      <footer className="homepage-footer">
        <p>&copy; {new Date().getFullYear()} CyberShield AI. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
