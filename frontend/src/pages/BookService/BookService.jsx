import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getAllServices, createBooking } from '../../services/api.js';
import { useAuth } from '../../context/AuthContext.jsx';
import { toast } from 'react-toastify';
import { FiCalendar, FiClock, FiMessageSquare, FiUser, FiPhone, FiTag, FiFileText, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { FaCar, FaOilCan, FaCogs, FaWrench, FaBatteryFull } from 'react-icons/fa';
import bookingImage from '../../assets/customer_booking_image.jpg';
import './BookService.css';

const coreServicesData = [
  { icon: <FaOilCan size={24} />, name: 'Oil Change', desc: 'Full synthetic oil replacement with premium filters.' },
  { icon: <FaWrench size={24} />, name: 'Full Service', desc: 'Comprehensive 150-point diagnostic and fluid check.' },
  { icon: <FaCogs size={24} />, name: 'Engine Repair', desc: 'Advanced troubleshooting and component restoration.' },
  { icon: <FaCar size={24} />, name: 'Tire Replacement', desc: 'High-performance tire fitting and precision balancing.' },
  { icon: <FaBatteryFull size={24} />, name: 'Battery Check', desc: 'Testing, charging, and replacement of vehicle batteries.' }
];

const testimonials = [
  {
    text: "The online booking process was incredibly smooth. I dropped my car off and received a text update when it was ready. High-tech and highly efficient.",
    author: "Marcus Sterling",
    role: "Audi A6 Owner",
    initials: "MS"
  },
  {
    text: "Finally, a service center that understands modern convenience. No more waiting on the phone, just simple digital transparency.",
    author: "Elena Petrov",
    role: "Tesla Model 3 Owner",
    initials: "EP"
  }
];

const faqs = [
  {
    q: "How long does a standard oil change take?",
    a: "Typically, our express oil change takes between 30 to 45 minutes, including a multi-point inspection."
  },
  {
    q: "Can I reschedule my appointment?",
    a: "Yes, you can easily reschedule or cancel your appointment through the 'My Bookings' panel up to 2 hours before the scheduled time."
  },
  {
    q: "Do you offer a warranty on engine repairs?",
    a: "Yes, all engine repair works come with a 12-month or 10,000-mile parts and labor warranty."
  },
  {
    q: "What vehicle brands do you service?",
    a: "We service all major brands, including luxury, electric, import, and domestic vehicles."
  }
];

function BookService() {
  const { serviceId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [services, setServices] = useState([]);
  const [activeFaq, setActiveFaq] = useState(null);

  const [form, setForm] = useState({
    customerName: user?.name || '',
    phone: user?.phone || '',
    licensePlate: '',
    vehicleType: 'Sedan',
    serviceId: '',
    date: '',
    time: '',
    notes: ''
  });

  // Fetch all services dynamically
  useEffect(() => {
    getAllServices()
      .then((res) => {
        if (res.data?.length) {
          setServices(res.data);
          
          // Preselect matching service from URL params
          const matched = res.data.find(s => s._id === serviceId);
          if (matched) {
            setForm(prev => ({ ...prev, serviceId: matched._id }));
          } else {
            // Default to first service
            setForm(prev => ({ ...prev, serviceId: res.data[0]._id }));
          }
        }
      })
      .catch(() => {
        toast.error('Failed to load services. Please refresh.');
      });
  }, [serviceId]);

  // Sync user info if loaded late
  useEffect(() => {
    if (user) {
      setForm(prev => ({
        ...prev,
        customerName: user.name || '',
        phone: user.phone || ''
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSelectService = (serviceName) => {
    const found = services.find(s => s.name.toLowerCase().includes(serviceName.toLowerCase()));
    if (found) {
      setForm(prev => ({ ...prev, serviceId: found._id }));
      const formEl = document.getElementById('booking-form-card');
      if (formEl) {
        formEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      toast.info(`Selected service: ${found.name}`);
    }
  };

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.serviceId || !form.vehicleType || !form.date || !form.time) {
      toast.error('Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      // Pass the complete form data including optional fields for backend schema compatibility
      await createBooking({
        serviceId: form.serviceId,
        vehicleType: form.vehicleType,
        vehicleMake: '',
        vehicleModel: '',
        vehicleYear: '',
        licensePlate: form.licensePlate,
        date: form.date,
        time: form.time,
        notes: form.notes
      });
      toast.success('Booking confirmed successfully!');
      navigate('/my-bookings');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to create booking');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="book-page-v2">
      {/* Hero Section */}
      <section className="booking-hero-section">
        <div className="container booking-hero-container">
          <div className="booking-hero-text">
            <h1 className="booking-hero-title">Book Your Vehicle Service Online</h1>
            <p className="booking-hero-subtitle">
              Experience precision-engineered trust with our seamless online booking platform. 
              Select your service, pick a time, and let our expert technicians handle the rest.
            </p>
          </div>
          <div className="booking-hero-image-wrapper">
            <img 
              src={bookingImage} 
              alt="Luxury Sports Cars" 
              className="booking-hero-image"
            />
          </div>
        </div>
      </section>

      {/* Floating Booking Form Card */}
      <div className="container form-overlap-container">
        <div className="booking-form-card" id="booking-form-card">
          <div className="booking-form-header">
            <h2 className="booking-form-title">Service Schedule Form</h2>
            <p className="booking-form-subtitle">Fill in your details below to secure your appointment.</p>
          </div>
          <form className="booking-actual-form" onSubmit={handleSubmit}>
            <div className="booking-form-grid">
              
              {/* Row 1 */}
              <div className="form-group-v2">
                <label className="label-v2"><FiUser className="input-icon" /> CUSTOMER NAME</label>
                <input 
                  type="text" 
                  name="customerName"
                  value={form.customerName}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="input-v2"
                  required
                />
              </div>

              <div className="form-group-v2">
                <label className="label-v2"><FiPhone className="input-icon" /> PHONE NUMBER</label>
                <input 
                  type="text" 
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+1 (555) 000-0000"
                  className="input-v2"
                  required
                />
              </div>

              <div className="form-group-v2">
                <label className="label-v2"><FiTag className="input-icon" /> VEHICLE NUMBER</label>
                <input 
                  type="text" 
                  name="licensePlate"
                  value={form.licensePlate}
                  onChange={handleChange}
                  placeholder="ABC-1234"
                  className="input-v2"
                  required
                />
              </div>

              {/* Row 2 */}
              <div className="form-group-v2">
                <label className="label-v2"><FaCar className="input-icon" /> VEHICLE TYPE</label>
                <div className="select-wrapper-v2">
                  <select 
                    name="vehicleType" 
                    value={form.vehicleType}
                    onChange={handleChange}
                    className="select-v2"
                  >
                    <option value="Sedan">Sedan</option>
                    <option value="SUV">SUV</option>
                    <option value="Truck">Truck</option>
                    <option value="Van">Van</option>
                    <option value="Motorcycle">Motorcycle</option>
                  </select>
                  <FiChevronDown className="select-arrow-icon" />
                </div>
              </div>

              <div className="form-group-v2">
                <label className="label-v2"><FaWrench className="input-icon" /> SERVICE TYPE</label>
                <div className="select-wrapper-v2">
                  <select 
                    name="serviceId" 
                    value={form.serviceId}
                    onChange={handleChange}
                    className="select-v2"
                    required
                  >
                    {services.length === 0 ? (
                      <option value="">Loading services...</option>
                    ) : (
                      services.map(s => (
                        <option key={s._id} value={s._id}>
                          {s.name} - LKR {s.price?.toLocaleString()}
                        </option>
                      ))
                    )}
                  </select>
                  <FiChevronDown className="select-arrow-icon" />
                </div>
              </div>

              <div className="form-group-v2">
                <label className="label-v2"><FiCalendar className="input-icon" /> DATE/TIME</label>
                <div className="datetime-split">
                  <input 
                    type="date" 
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                    min={new Date().toISOString().split('T')[0]}
                    className="input-v2 date-input-v2"
                    required
                  />
                  <div className="select-wrapper-v2 time-select-v2">
                    <select 
                      name="time"
                      value={form.time}
                      onChange={handleChange}
                      className="select-v2"
                      required
                    >
                      <option value="">--:-- --</option>
                      <option value="08:00 AM">08:00 AM</option>
                      <option value="09:00 AM">09:00 AM</option>
                      <option value="10:00 AM">10:00 AM</option>
                      <option value="11:00 AM">11:00 AM</option>
                      <option value="01:00 PM">01:00 PM</option>
                      <option value="02:00 PM">02:00 PM</option>
                      <option value="03:00 PM">03:00 PM</option>
                      <option value="04:00 PM">04:00 PM</option>
                    </select>
                    <FiChevronDown className="select-arrow-icon" />
                  </div>
                </div>
              </div>
            </div>

            {/* Row 3 - Notes */}
            <div className="form-group-v2 full-width-notes">
              <label className="label-v2"><FiFileText className="input-icon" /> NOTES</label>
              <textarea 
                name="notes"
                value={form.notes}
                onChange={handleChange}
                placeholder="Any specific issues or instructions..."
                className="textarea-v2"
                rows={4}
              />
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              className="confirm-booking-btn-v2" 
              disabled={loading}
            >
              {loading ? 'Booking Appointment...' : 'Confirm Booking'}
            </button>
          </form>
        </div>
      </div>

      {/* Core Services Section */}
      <section className="core-services-section container">
        <div className="core-services-header">
          <h2 className="core-services-title">Our Core Services</h2>
          <p className="core-services-subtitle">Precision maintenance tailored for your vehicle's performance.</p>
        </div>
        <div className="core-services-grid">
          {coreServicesData.map((cs, idx) => (
            <div 
              key={idx} 
              className="core-service-card"
              onClick={() => handleSelectService(cs.name)}
              title="Click to select this service"
            >
              <div className="core-service-icon-wrapper">
                {cs.icon}
              </div>
              <h3 className="core-service-name">{cs.name}</h3>
              <p className="core-service-desc">{cs.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ & Testimonials Section */}
      <section className="faq-testimonials-section container">
        <div className="faq-testimonials-grid">
          
          {/* Testimonials */}
          <div className="testimonials-column">
            <h2 className="column-title">What Our Clients Say</h2>
            <div className="testimonials-stack">
              {testimonials.map((t, idx) => (
                <div key={idx} className="testimonial-card-v2">
                  <p className="testimonial-text-v2">“{t.text}”</p>
                  <div className="testimonial-author-wrapper">
                    <div className="testimonial-avatar">
                      {t.initials}
                    </div>
                    <div className="testimonial-author-info">
                      <h4 className="testimonial-author-name">{t.author}</h4>
                      <p className="testimonial-author-role">{t.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ Accordion */}
          <div className="faq-column">
            <h2 className="column-title">Frequently Asked Questions</h2>
            <div className="faq-accordion">
              {faqs.map((faq, idx) => {
                const isOpen = activeFaq === idx;
                return (
                  <div key={idx} className={`faq-item-v2 ${isOpen ? 'active' : ''}`}>
                    <button 
                      className="faq-question-btn" 
                      onClick={() => toggleFaq(idx)}
                    >
                      <span>{faq.q}</span>
                      {isOpen ? <FiChevronUp className="faq-arrow" /> : <FiChevronDown className="faq-arrow" />}
                    </button>
                    <div className="faq-answer-wrapper">
                      <div className="faq-answer-content">
                        <p>{faq.a}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}

export default BookService;
