import React from 'react';
import { Helmet } from 'react-helmet-async';
import './Features.css';

// Placeholder image imports (replace with actual image paths)
import monitoringImg from '../asserts/cyberhack.jpg';

import analyticsImg from '../asserts/visual.jpg';
import reportsImg from '../asserts/ashboard.jpg';
import rolesImg from '../asserts/new.webp';

const Features = () => {
  return (
    <div className="features-container min-h-screen flex flex-col">
      <Helmet>
        <title>Features | CyberShield AI</title>
      </Helmet>

      {/* Header */}
      <header className="features-header bg-[#0a2540] text-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">CyberShield AI</h1>
          <nav className="flex space-x-3 items-center">
            {["Home", "Features", "About", "Contact"].map((item) => (
              <a
                key={`features-nav-${item}`}
                href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                className="features-nav-link"
              >
                {item}
              </a>
            ))}
            <a href="/login" className="features-nav-link">Login</a>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="features-main flex-grow bg-[#f5f7fa] px-6 py-16">
        <section className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-[#0a2540] mb-4">
            Explore CyberShield AI Features
          </h2>
          <p className="text-lg text-[#4a5568] max-w-3xl mx-auto">
            Discover how our AI-powered platform delivers unmatched cybersecurity through real-time monitoring, intelligent analytics, and robust reporting.
          </p>
        </section>

        {/* Feature Cards */}
        <section className="max-w-6xl mx-auto mb-16">
          <div className="grid md:grid-cols-2 gap-10">
            <div className="features-card bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <img src={monitoringImg} alt="Real-Time Monitoring" className="features-img rounded-lg mb-4" />
              <h3 className="text-xl font-semibold text-[#0a2540] mb-2">Real-Time Monitoring</h3>
              <p className="text-[#4a5568]">
                Stay ahead of threats with live updates and instant alerts powered by our AI-driven detection system.
              </p>
            </div>
            <div className="features-card bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <img src={analyticsImg} alt="AI Behavior Analytics" className="features-img rounded-lg mb-4" />
              <h3 className="text-xl font-semibold text-[#0a2540] mb-2">AI Behavior Analytics</h3>
              <p className="text-[#4a5568]">
                Analyze user and network behavior to detect anomalies with precision and prevent potential breaches.
              </p>
            </div>
            <div className="features-card bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <img src={reportsImg} alt="Detailed Reports" className="features-img rounded-lg mb-4" />
              <h3 className="text-xl font-semibold text-[#0a2540] mb-2">Detailed Reports</h3>
              <p className="text-[#4a5568]">
                Generate comprehensive, customizable reports to audit system activity and ensure compliance.
              </p>
            </div>
            <div className="features-card bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <img src={rolesImg} alt="Role-Based Management" className="features-img rounded-lg mb-4" />
              <h3 className="text-xl font-semibold text-[#0a2540] mb-2">Role-Based Management</h3>
              <p className="text-[#4a5568]">
                Securely manage access with distinct admin and user dashboards tailored to specific roles.
              </p>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center max-w-4xl mx-auto">
          <h3 className="text-3xl font-bold text-[#0a2540] mb-4">Ready to Secure Your Future?</h3>
          <p className="text-[#4a5568] mb-6">
            Leverage CyberShield AI’s advanced features to protect your organization from evolving cyber threats.
          </p>
          <a href="/contact" className="features-cta bg-[#0056d2] text-white px-6 py-3 rounded-lg hover:bg-[#003bb5] transition-colors">
            Get Started
          </a>
        </section>
      </main>

      {/* Footer */}
      <footer className="features-footer bg-[#0a2540] text-white text-center py-6 mt-auto">
        <p>© {new Date().getFullYear()} CyberShield AI. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Features;