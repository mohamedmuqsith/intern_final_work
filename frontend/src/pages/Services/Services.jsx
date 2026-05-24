import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllServices } from '../../services/api.js';
import { FiArrowRight, FiSearch } from 'react-icons/fi';
import { FaOilCan, FaCogs, FaWrench, FaCar, FaBatteryFull, FaSnowflake } from 'react-icons/fa';
import './Services.css';

const iconMap = { 'oil': <FaOilCan size={28}/>, 'engine': <FaCogs size={28}/>, 'brake': <FaWrench size={28}/>, 'inspect': <FaCar size={28}/>, 'battery': <FaBatteryFull size={28}/>, 'ac': <FaSnowflake size={28}/> };
const getIcon = (name) => { const key = Object.keys(iconMap).find(k => name?.toLowerCase().includes(k)); return key ? iconMap[key] : <FaCar size={28}/>; };

const defaultServices = [
  { _id: '1', name: 'Oil Change', description: 'Full synthetic oil change with premium filter replacement and fluid top-off.', price: 3500, duration: '45 min', category: 'Maintenance' },
  { _id: '2', name: 'Engine Tune-Up', description: 'Complete engine diagnostics, spark plug replacement, and performance optimization.', price: 8000, duration: '2 hours', category: 'Repair' },
  { _id: '3', name: 'Brake Service', description: 'Brake pad replacement, rotor inspection, fluid flush and safety check.', price: 5500, duration: '1.5 hours', category: 'Repair' },
  { _id: '4', name: 'Full Inspection', description: 'Comprehensive 50-point vehicle health inspection with detailed report.', price: 4000, duration: '1 hour', category: 'Inspection' },
  { _id: '5', name: 'Battery Replacement', description: 'Battery testing, terminal cleaning, and new battery installation.', price: 6000, duration: '30 min', category: 'Maintenance' },
  { _id: '6', name: 'AC Service', description: 'AC system diagnosis, refrigerant recharge, and performance check.', price: 4500, duration: '1 hour', category: 'Maintenance' },
];

function Services() {
  const [services, setServices] = useState(defaultServices);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  useEffect(() => {
    getAllServices().then(res => { if (res.data?.length) setServices(res.data); }).catch(() => {});
  }, []);

  const categories = ['All', ...new Set(services.map(s => s.category))];
  const filtered = services.filter(s => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === 'All' || s.category === category;
    return matchSearch && matchCat;
  });

  return (
    <div className="services-page">
      <div className="services-hero"><div className="container"><h1 className="page-title">Our Services</h1><p className="page-subtitle">Choose from our comprehensive range of vehicle maintenance and repair services.</p></div></div>
      <div className="container section">
        <div className="services-filters">
          <div className="search-box"><FiSearch size={18}/><input type="text" placeholder="Search services..." value={search} onChange={e=>setSearch(e.target.value)} id="service-search"/></div>
          <div className="category-tabs">{categories.map(c=>(<button key={c} className={`cat-tab ${category===c?'active':''}`} onClick={()=>setCategory(c)}>{c}</button>))}</div>
        </div>
        <div className="services-list">
          {filtered.map(s=>(
            <div className="service-card card" key={s._id} id={`service-${s._id}`}>
              <div className="card-body service-card-body">
                <div className="service-card-icon">{getIcon(s.name)}</div>
                <div className="service-card-info">
                  <div className="service-card-header"><h3>{s.name}</h3><span className="badge badge-confirmed">{s.category}</span></div>
                  <p className="service-card-desc">{s.description}</p>
                  <div className="service-card-meta"><span className="service-card-price">LKR {s.price?.toLocaleString()}</span><span className="service-card-duration">⏱ {s.duration}</span></div>
                </div>
                <Link to={`/book/${s._id}`} className="btn btn-primary" id={`book-${s._id}`}>Book Now <FiArrowRight size={14}/></Link>
              </div>
            </div>
          ))}
          {filtered.length===0 && <div className="no-results"><p>No services found matching your search.</p></div>}
        </div>
      </div>
    </div>
  );
}
export default Services;
