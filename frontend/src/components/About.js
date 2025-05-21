import React from 'react';
import { Helmet } from 'react-helmet-async';
import './About.css';

// Placeholder image imports (replace with actual image paths)
import teamImg from '../asserts/team.jpg';
import techImg from '../asserts/tech.avif';

const About = () => {
  return (
    <div className="about-container min-h-screen flex flex-col">
      <Helmet>
        <title>About | CyberShield AI</title>
      </Helmet>

      {/* Header */}
      <header className="about-header bg-[#0a2540] text-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">CyberShield AI</h1>
          <nav className="flex space-x-3 items-center">
            {["Home", "Features", "About", "Contact"].map((item) => (
              <a
                key={`about-nav-${item}`}
                href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                className="about-nav-link"
              >
                {item}
              </a>
            ))}
            <a href="/login" className="about-nav-link">Login</a>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="about-main flex-grow bg-[#f5f7fa] px-6 py-16">
        <section className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-[#0a2540] mb-4">
            About CyberShield AI
          </h2>
          <p className="text-lg text-[#4a5568] max-w-3xl mx-auto">
            CyberShield AI is at the forefront of cybersecurity innovation, leveraging artificial intelligence to protect organizations from evolving digital threats.
          </p>
        </section>

        {/* Mission Section */}
        <section className="bg-white p-8 md:p-12 rounded-lg shadow-lg max-w-6xl mx-auto text-left mb-16">
          <h3 className="text-3xl font-bold text-[#0a2540] mb-4">Our Mission</h3>
          <p className="text-[#4a5568] mb-6">
            Our mission is to empower businesses with proactive, AI-driven cybersecurity solutions that anticipate and neutralize threats before they cause harm. We aim to make digital environments secure, reliable, and resilient.
          </p>
          <img src={teamImg} alt="Our Team" className="about-img rounded-lg shadow-md hover:scale-105 transition-transform" />
        </section>

        {/* Technology Section */}
        <section className="bg-white p-8 md:p-12 rounded-lg shadow-lg max-w-6xl mx-auto text-left mb-16">
          <h3 className="text-3xl font-bold text-[#0a2540] mb-4">Our Technology</h3>
          <p className="text-[#4a5568] mb-6">
            CyberShield AI combines machine learning, behavioral analytics, and real-time threat intelligence to deliver unmatched protection. Our platform adapts to new threats, ensuring your organization stays one step ahead.
          </p>
          <ul className="list-disc list-inside text-[#4a5568] mb-6">
            <li>Advanced Machine Learning Models</li>
            <li>Behavioral Anomaly Detection</li>
            <li>Real-Time Threat Intelligence Integration</li>
            <li>Scalable Cloud-Based Infrastructure</li>
          </ul>
          <img src={techImg} alt="Technology" className="about-img rounded-lg shadow-md hover:scale-105 transition-transform" />
        </section>

        {/* Call to Action */}
        <section className="text-center max-w-4xl mx-auto">
          <h3 className="text-3xl font-bold text-[#0a2540] mb-4">Join the Future of Cybersecurity</h3>
          <p className="text-[#4a5568] mb-6">
            Partner with CyberShield AI to safeguard your digital assets with cutting-edge technology.
          </p>
          <a href="/contact" className="about-cta bg-[#0056d2] text-white px-6 py-3 rounded-lg hover:bg-[#003bb5] transition-colors">
            Contact Us
          </a>
        </section>
      </main>

      {/* Footer */}
      <footer className="about-footer bg-[#0a2540] text-white text-center py-6 mt-auto">
        <p>© {new Date().getFullYear()} CyberShield AI. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default About;