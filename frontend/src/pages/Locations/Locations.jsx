import { useState } from 'react';
import { 
  FiMapPin, FiClock, FiPhone, FiStar, FiNavigation, 
  FiSearch, FiChevronRight
} from 'react-icons/fi';
import './Locations.css';

const locations = [
  {
    id: 1,
    name: 'Downtown Hub',
    address: '123 Auto Lane, Colombo 03',
    phone: '+94 11 234 5678',
    hours: 'Mon–Sat: 7:00 AM – 7:00 PM',
    rating: 4.9,
    reviews: 312,
    services: ['Full Service', 'Diagnostics', 'Body Shop'],
    status: 'Open Now',
    coords: { lat: '6.9147° N', lng: '79.8536° E' },
    image: 'https://images.unsplash.com/photo-1486006920555-c77dcf18193c?w=600&h=400&fit=crop'
  },
  {
    id: 2,
    name: 'Northside Express',
    address: '45 Galle Road, Colombo 06',
    phone: '+94 11 345 6789',
    hours: 'Mon–Fri: 8:00 AM – 6:00 PM',
    rating: 4.8,
    reviews: 198,
    services: ['Quick Service', 'Tire Center', 'Oil Change'],
    status: 'Open Now',
    coords: { lat: '6.8840° N', lng: '79.8612° E' },
    image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=600&h=400&fit=crop'
  },
  {
    id: 3,
    name: 'Eastside Mega Center',
    address: '78 Kandy Road, Kaduwela',
    phone: '+94 11 456 7890',
    hours: 'Mon–Sun: 6:00 AM – 9:00 PM',
    rating: 4.7,
    reviews: 421,
    services: ['Full Service', 'Fleet Center', 'Detailing', 'EV Service'],
    status: 'Open Now',
    coords: { lat: '6.9320° N', lng: '79.9810° E' },
    image: 'https://images.unsplash.com/photo-1625047509248-ec889cbff17f?w=600&h=400&fit=crop'
  },
  {
    id: 4,
    name: 'Southern Branch',
    address: '210 Marine Drive, Mount Lavinia',
    phone: '+94 11 567 8901',
    hours: 'Mon–Sat: 8:00 AM – 5:00 PM',
    rating: 4.6,
    reviews: 156,
    services: ['Quick Service', 'Brakes', 'AC Repair'],
    status: 'Closed',
    coords: { lat: '6.8382° N', lng: '79.8658° E' },
    image: 'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=600&h=400&fit=crop'
  },
  {
    id: 5,
    name: 'Western Workshop',
    address: '55 Negombo Road, Wattala',
    phone: '+94 11 678 9012',
    hours: 'Mon–Sat: 7:30 AM – 6:30 PM',
    rating: 4.8,
    reviews: 245,
    services: ['Full Service', 'Transmission', 'Suspension', 'Diagnostics'],
    status: 'Open Now',
    coords: { lat: '6.9890° N', lng: '79.8920° E' },
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&h=400&fit=crop'
  },
];

function Locations() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState(locations[0]);

  const filteredLocations = locations.filter(loc =>
    loc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    loc.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="locations-page">
      {/* Hero */}
      <section className="locations-hero">
        <div className="container">
          <div className="locations-hero-content">
            <span className="locations-badge">Our Workshops</span>
            <h1 className="locations-hero-title">Find Your Nearest<br />AutoServe Pro Center</h1>
            <p className="locations-hero-subtitle">
              Premium service centers strategically located for your convenience. Every location equipped with state-of-the-art diagnostic tools.
            </p>
            <div className="locations-search-bar">
              <FiSearch className="loc-search-icon" />
              <input
                type="text"
                placeholder="Search by city, area, or branch name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="loc-search-btn"><FiNavigation /> Find Nearby</button>
            </div>
          </div>
        </div>
      </section>

      {/* Locations Grid */}
      <section className="locations-grid-section">
        <div className="container">
          <div className="locations-layout">
            {/* Left: Location Cards */}
            <div className="locations-list">
              {filteredLocations.length > 0 ? filteredLocations.map(loc => (
                <div
                  key={loc.id}
                  className={`location-card ${selectedLocation?.id === loc.id ? 'selected' : ''}`}
                  onClick={() => setSelectedLocation(loc)}
                >
                  <img src={loc.image} alt={loc.name} className="loc-card-img" />
                  <div className="loc-card-body">
                    <div className="loc-card-top">
                      <h3>{loc.name}</h3>
                      <span className={`loc-status ${loc.status === 'Open Now' ? 'open' : 'closed'}`}>
                        {loc.status}
                      </span>
                    </div>
                    <p className="loc-address"><FiMapPin /> {loc.address}</p>
                    <div className="loc-rating">
                      <FiStar className="star-filled" /> {loc.rating}
                      <span className="review-count">({loc.reviews} reviews)</span>
                    </div>
                    <div className="loc-services-tags">
                      {loc.services.map((s, i) => (
                        <span key={i} className="loc-tag">{s}</span>
                      ))}
                    </div>
                    <button className="loc-details-btn">
                      View Details <FiChevronRight />
                    </button>
                  </div>
                </div>
              )) : (
                <div className="no-locations">No locations found matching "{searchTerm}"</div>
              )}
            </div>

            {/* Right: Selected Location Detail */}
            {selectedLocation && (
              <div className="location-detail-panel">
                <img src={selectedLocation.image} alt={selectedLocation.name} className="detail-hero-img" />
                <div className="detail-body">
                  <div className="detail-header">
                    <h2>{selectedLocation.name}</h2>
                    <span className={`loc-status large ${selectedLocation.status === 'Open Now' ? 'open' : 'closed'}`}>
                      {selectedLocation.status}
                    </span>
                  </div>
                  
                  <div className="detail-info-grid">
                    <div className="detail-info-item">
                      <FiMapPin className="detail-icon" />
                      <div>
                        <span className="detail-label">Address</span>
                        <span className="detail-value">{selectedLocation.address}</span>
                      </div>
                    </div>
                    <div className="detail-info-item">
                      <FiPhone className="detail-icon" />
                      <div>
                        <span className="detail-label">Phone</span>
                        <span className="detail-value">{selectedLocation.phone}</span>
                      </div>
                    </div>
                    <div className="detail-info-item">
                      <FiClock className="detail-icon" />
                      <div>
                        <span className="detail-label">Working Hours</span>
                        <span className="detail-value">{selectedLocation.hours}</span>
                      </div>
                    </div>
                    <div className="detail-info-item">
                      <FiStar className="detail-icon" />
                      <div>
                        <span className="detail-label">Rating</span>
                        <span className="detail-value">{selectedLocation.rating} / 5 ({selectedLocation.reviews} reviews)</span>
                      </div>
                    </div>
                  </div>

                  <div className="detail-services">
                    <h4>Available Services</h4>
                    <div className="detail-tags">
                      {selectedLocation.services.map((s, i) => (
                        <span key={i} className="detail-tag">{s}</span>
                      ))}
                    </div>
                  </div>

                  <div className="detail-coords">
                    <span>Coordinates: {selectedLocation.coords.lat}, {selectedLocation.coords.lng}</span>
                  </div>

                  <a href={`tel:${selectedLocation.phone}`} className="detail-cta">
                    <FiPhone /> Call This Location
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Locations;
