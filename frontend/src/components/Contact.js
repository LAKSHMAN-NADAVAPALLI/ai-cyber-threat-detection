
import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic validation
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setSubmitStatus('Please fill out all fields.');
      return;
    }
    // Simulate form submission (replace with actual API call)
    console.log('Form submitted:', formData);
    setSubmitStatus('Message sent successfully!');
    setFormData({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setSubmitStatus(null), 3000); // Clear status after 3s
  };

  return (
    <div className="contact-page">
      <header className="contact-header">
        <h1>Contact Our AI Cybersecurity Team</h1>
        <p>Reach out for inquiries, support, or to learn more about our advanced threat detection solutions.</p>
      </header>

      <main className="contact-container">
        <section className="contact-tile contact-form-tile">
          <h2>Send Us a Message</h2>
          <form onSubmit={handleSubmit} aria-label="Contact Form">
            <div className="contact-form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                aria-required="true"
                placeholder="Your Name"
              />
            </div>
            <div className="contact-form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                aria-required="true"
                placeholder="Your Email"
              />
            </div>
            <div className="contact-form-group">
              <label htmlFor="subject">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                aria-required="true"
                placeholder="Subject"
              />
            </div>
            <div className="contact-form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                aria-required="true"
                placeholder="Your Message"
              ></textarea>
            </div>
            <button type="submit" className="contact-submit-btn">Submit</button>
            {submitStatus && <p className="contact-form-status">{submitStatus}</p>}
          </form>
        </section>

        <section className="contact-tile contact-info-tile">
          <h2>Contact Information</h2>
          <ul className="contact-info-list">
            <li>
              <strong>Email:</strong> <a href="mailto:info@cybershield.ai">info@cybershield.ai</a>
            </li>
            <li>
              <strong>Phone:</strong> <a href="tel:+1234567890">+1 (234) 567-890</a>
            </li>
            <li>
              <strong>Address:</strong> 123 Cyber Lane, Tech City, TC 12345
            </li>
            <li>
              <strong>Support:</strong> <a href="https://support.cybershield.ai">support.cybershield.ai</a>
            </li>
          </ul>
        </section>
      </main>
    </div>
  );
};

export default Contact;


