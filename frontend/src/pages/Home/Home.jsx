import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import { FiArrowRight, FiShield, FiClock, FiStar, FiTool, FiCheckCircle, FiTruck } from 'react-icons/fi';
import { FaCar, FaOilCan, FaCogs, FaWrench } from 'react-icons/fa';
import './Home.css';

const features = [
  { icon: <FiClock size={28} />, title: 'Quick Booking', desc: 'Schedule appointments in under 2 minutes.' },
  { icon: <FiShield size={28} />, title: 'Trusted Experts', desc: 'Certified professionals with years of experience.' },
  { icon: <FiStar size={28} />, title: 'Quality Service', desc: 'Genuine parts and manufacturer guidelines.' },
  { icon: <FiTruck size={28} />, title: 'Track Progress', desc: 'Real-time updates on your service status.' },
];

const services = [
  { icon: <FaOilCan size={32} />, name: 'Oil Change', desc: 'Synthetic oil change with filter', price: 'LKR 3,500' },
  { icon: <FaCogs size={32} />, name: 'Engine Tune-Up', desc: 'Diagnostics and performance tuning', price: 'LKR 8,000' },
  { icon: <FaWrench size={32} />, name: 'Brake Service', desc: 'Pads, rotors, and fluid check', price: 'LKR 5,500' },
  { icon: <FaCar size={32} />, name: 'Full Inspection', desc: '50-point vehicle health check', price: 'LKR 4,000' },
];

function Home() {
  const { user } = useAuth();
  return (
    <div className="home-page">
      <section className="hero" id="hero-section">
        <div className="hero-bg-shapes">
          <div className="hero-shape hero-shape-1"></div>
          <div className="hero-shape hero-shape-2"></div>
        </div>
        <div className="hero-content container">
          <div className="hero-text animate-fade-in">
            <div className="hero-badge"><FiCheckCircle size={14} /> #1 Rated Service Platform</div>
            <h1 className="hero-title">Professional Vehicle<span className="hero-title-accent"> Service Booking</span><br />Made Simple</h1>
            <p className="hero-subtitle">Book your vehicle service online in minutes. Expert mechanics, genuine parts, and transparent pricing.</p>
            <div className="hero-actions">
              <Link to="/services" className="btn btn-primary btn-lg" id="hero-book-btn">Book a Service <FiArrowRight /></Link>
              {!user && <Link to="/register" className="btn btn-outline btn-lg" id="hero-register-btn">Create Account</Link>}
            </div>
          </div>
          <div className="hero-visual animate-slide-right">
            <div className="hero-car-circle"><FaCar size={48} /></div>
            <div className="hero-floating-card card-1"><FiTool size={18} /><div><p className="fc-title">Engine Tune-Up</p><p className="fc-sub">Tomorrow, 10 AM</p></div><span className="badge badge-confirmed">Confirmed</span></div>
            <div className="hero-floating-card card-2"><FaOilCan size={18} /><div><p className="fc-title">Oil Change</p><p className="fc-sub">In Progress</p></div><span className="badge badge-pending">Active</span></div>
          </div>
        </div>
      </section>

      <section className="stats-section" id="stats-section">
        <div className="container">
          <div className="stats-grid">
            {[['5,000+','Vehicles Serviced'],['98%','Satisfaction'],['50+','Mechanics'],['24/7','Support']].map(([v,l],i)=>(
              <div className="stat-item" key={i}><span className="stat-value">{v}</span><span className="stat-label">{l}</span></div>
            ))}
          </div>
        </div>
      </section>

      <section className="features-section section" id="features-section">
        <div className="container">
          <div className="section-header"><h2 className="section-title">Why Choose AutoCare Pro?</h2><p className="section-subtitle">Cutting-edge technology meets expert craftsmanship.</p></div>
          <div className="features-grid">
            {features.map((f,i)=>(<div className="feature-card card" key={i}><div className="card-body"><div className="feature-icon">{f.icon}</div><h3 className="feature-title">{f.title}</h3><p className="feature-desc">{f.desc}</p></div></div>))}
          </div>
        </div>
      </section>

      <section className="services-preview section" id="services-preview">
        <div className="container">
          <div className="section-header"><h2 className="section-title">Our Popular Services</h2><p className="section-subtitle">From routine maintenance to complex repairs.</p></div>
          <div className="services-grid">
            {services.map((s,i)=>(<div className="service-preview-card card" key={i}><div className="card-body"><div className="service-icon">{s.icon}</div><h3 className="service-name">{s.name}</h3><p className="service-desc">{s.desc}</p><p className="service-price">From {s.price}</p><Link to="/services" className="btn btn-outline btn-sm">Learn More <FiArrowRight size={14} /></Link></div></div>))}
          </div>
          <div className="services-cta"><Link to="/services" className="btn btn-primary btn-lg" id="view-all-btn">View All Services <FiArrowRight /></Link></div>
        </div>
      </section>

      <section className="cta-section" id="cta-section">
        <div className="container"><div className="cta-card"><h2 className="cta-title">Ready to Book Your Service?</h2><p className="cta-text">Join thousands of satisfied customers who trust AutoCare Pro.</p><Link to="/services" className="btn btn-accent btn-lg" id="cta-book-btn">Book Now <FiArrowRight /></Link></div></div>
      </section>
    </div>
  );
}

export default Home;
