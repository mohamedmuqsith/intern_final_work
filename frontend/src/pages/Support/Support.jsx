import { useState } from 'react';
import { 
  FiMessageSquare, FiPhone, FiMail, FiBook, FiChevronDown, 
  FiChevronUp, FiSend, FiClock, FiShield, FiHeadphones,
  FiFileText, FiTool, FiCreditCard, FiCalendar
} from 'react-icons/fi';
import { toast } from 'react-toastify';
import './Support.css';

const categories = [
  { icon: <FiCalendar />, title: 'Booking Issues', desc: 'Schedule changes, cancellations, or rescheduling' },
  { icon: <FiTool />, title: 'Service Queries', desc: 'Questions about our service offerings' },
  { icon: <FiCreditCard />, title: 'Billing & Payments', desc: 'Invoices, refunds, and payment methods' },
  { icon: <FiFileText />, title: 'Account & Profile', desc: 'Login issues, profile updates, password reset' },
];

const faqs = [
  { q: 'How do I reschedule a booking?', a: 'Go to "My Bookings", select the booking you want to change, and click "Reschedule". You can pick a new date and time slot up to 2 hours before your original appointment.' },
  { q: 'What is your cancellation policy?', a: 'Free cancellation is available up to 24 hours before your scheduled appointment. Cancellations within 24 hours may incur a 15% service fee.' },
  { q: 'How do I get a refund?', a: 'If you are unsatisfied with a service, contact us within 48 hours. We will review your case and process a full or partial refund within 5–7 business days.' },
  { q: 'Can I bring my own parts?', a: 'Yes, we accept customer-supplied parts. However, warranty coverage only applies to parts sourced through our certified supply chain.' },
  { q: 'Do you offer pickup and delivery?', a: 'Yes! Our Fleet Solutions and Professional plans include complimentary vehicle pickup and drop-off within a 15km radius of any AutoServe Pro center.' },
  { q: 'What certifications do your technicians have?', a: 'All our technicians are ASE-certified with a minimum of 5 years of hands-on experience. Senior technicians hold manufacturer-specific certifications from Toyota, Honda, BMW, and Mercedes-Benz.' },
];

function Support() {
  const [openFaq, setOpenFaq] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', category: '', message: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error('Please fill in all required fields.');
      return;
    }
    toast.success('Your message has been sent! We\'ll respond within 24 hours.');
    setForm({ name: '', email: '', category: '', message: '' });
  };

  return (
    <div className="support-page">
      {/* Hero */}
      <section className="support-hero">
        <div className="container">
          <div className="support-hero-content">
            <span className="support-badge">Support Center</span>
            <h1 className="support-hero-title">How Can We<br />Help You Today?</h1>
            <p className="support-hero-subtitle">
              Our dedicated support team is available to assist with bookings, services, payments, and more. We typically respond within 2 hours.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Contact Cards */}
      <section className="support-contact-section">
        <div className="container">
          <div className="contact-cards-grid">
            <div className="contact-card">
              <div className="contact-card-icon blue"><FiHeadphones /></div>
              <h3>Call Us</h3>
              <p>Speak directly with a service advisor</p>
              <a href="tel:+94112345678" className="contact-card-link">+94 11 234 5678</a>
              <span className="contact-hours"><FiClock /> Mon–Sat, 7AM–7PM</span>
            </div>
            <div className="contact-card">
              <div className="contact-card-icon green"><FiMessageSquare /></div>
              <h3>Live Chat</h3>
              <p>Get instant answers from our team</p>
              <button className="contact-card-btn">Start Chat</button>
              <span className="contact-hours"><FiClock /> Avg. response: 2 min</span>
            </div>
            <div className="contact-card">
              <div className="contact-card-icon purple"><FiMail /></div>
              <h3>Email Us</h3>
              <p>For detailed inquiries and documentation</p>
              <a href="mailto:support@autoservepro.lk" className="contact-card-link">support@autoservepro.lk</a>
              <span className="contact-hours"><FiClock /> Response within 24h</span>
            </div>
          </div>
        </div>
      </section>

      {/* Support Categories */}
      <section className="support-categories-section">
        <div className="container">
          <div className="section-header-center">
            <h2>Browse by Topic</h2>
            <p>Select a category to find relevant help articles and guides.</p>
          </div>
          <div className="categories-grid">
            {categories.map((cat, i) => (
              <div key={i} className="support-cat-card">
                <div className="cat-icon">{cat.icon}</div>
                <h4>{cat.title}</h4>
                <p>{cat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ + Contact Form */}
      <section className="support-main-section">
        <div className="container">
          <div className="support-main-grid">
            {/* FAQ Column */}
            <div className="support-faq-column">
              <div className="column-header">
                <FiBook className="column-icon" />
                <h2>Frequently Asked Questions</h2>
              </div>
              <div className="support-faq-list">
                {faqs.map((faq, i) => (
                  <div key={i} className={`support-faq-item ${openFaq === i ? 'open' : ''}`}>
                    <button className="support-faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                      <span>{faq.q}</span>
                      {openFaq === i ? <FiChevronUp /> : <FiChevronDown />}
                    </button>
                    <div className="support-faq-a">
                      <p>{faq.a}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Form Column */}
            <div className="support-form-column">
              <div className="support-form-card">
                <div className="form-card-header">
                  <FiSend className="form-header-icon" />
                  <h3>Send Us a Message</h3>
                  <p>We'll get back to you within 24 hours.</p>
                </div>
                <form className="support-form" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label>Full Name *</label>
                    <input type="text" name="name" placeholder="Your full name" value={form.name} onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <label>Email Address *</label>
                    <input type="email" name="email" placeholder="you@example.com" value={form.email} onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <label>Category</label>
                    <select name="category" value={form.category} onChange={handleChange}>
                      <option value="">Select a topic</option>
                      <option value="booking">Booking Issues</option>
                      <option value="service">Service Queries</option>
                      <option value="billing">Billing & Payments</option>
                      <option value="account">Account & Profile</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Message *</label>
                    <textarea name="message" placeholder="Describe your issue or question..." rows="4" value={form.message} onChange={handleChange}></textarea>
                  </div>
                  <button type="submit" className="support-submit-btn">
                    <FiSend /> Send Message
                  </button>
                </form>
              </div>

              <div className="trust-badges">
                <div className="trust-item"><FiShield /> Secure & Encrypted</div>
                <div className="trust-item"><FiClock /> 24h Response Time</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Support;
