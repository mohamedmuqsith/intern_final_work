import { Link } from 'react-router-dom';
import { FaCar } from 'react-icons/fa';
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer" id="site-footer">
      <div className="footer-wave">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,64 C360,120 720,0 1080,64 C1260,96 1380,80 1440,64 L1440,120 L0,120 Z" fill="currentColor" />
        </svg>
      </div>
      <div className="footer-content container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <div className="footer-logo-icon"><FaCar /></div>
              <span>Auto<span className="logo-accent">Serve</span> Pro</span>
            </Link>
            <p className="footer-description">
              Professional vehicle service booking platform. Schedule your appointments online and keep your vehicle in top condition.
            </p>
          </div>

          <div className="footer-links-group">
            <h4 className="footer-heading">Quick Links</h4>
            <Link to="/" className="footer-link">Home</Link>
            <Link to="/services" className="footer-link">Services</Link>
            <Link to="/login" className="footer-link">Sign In</Link>
            <Link to="/register" className="footer-link">Register</Link>
          </div>

          <div className="footer-links-group">
            <h4 className="footer-heading">Services</h4>
            <span className="footer-link">Oil Change</span>
            <span className="footer-link">Brake Repair</span>
            <span className="footer-link">Engine Tune-Up</span>
            <span className="footer-link">Full Inspection</span>
          </div>

          <div className="footer-links-group">
            <h4 className="footer-heading">Contact</h4>
            <div className="footer-contact">
              <FiMapPin size={14} />
              <span>123 Auto Lane, Colombo</span>
            </div>
            <div className="footer-contact">
              <FiPhone size={14} />
              <span>+94 11 234 5678</span>
            </div>
            <div className="footer-contact">
              <FiMail size={14} />
              <span>info@autoservepro.lk</span>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} AutoServe Pro. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
