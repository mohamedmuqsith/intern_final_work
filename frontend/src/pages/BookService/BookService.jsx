import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { createBooking } from '../../services/api.js';
import { toast } from 'react-toastify';
import { FiCalendar, FiClock, FiMessageSquare, FiArrowLeft } from 'react-icons/fi';
import './BookService.css';

function BookService() {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ vehicleType: '', vehicleMake: '', vehicleModel: '', vehicleYear: '', licensePlate: '', date: '', time: '', notes: '' });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.vehicleType || !form.date || !form.time) { toast.error('Please fill in all required fields'); return; }
    setLoading(true);
    try {
      await createBooking({ ...form, serviceId });
      toast.success('Booking created successfully!');
      navigate('/my-bookings');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to create booking');
    } finally { setLoading(false); }
  };

  return (
    <div className="book-page">
      <div className="book-hero"><div className="container"><button className="btn btn-ghost back-btn" onClick={()=>navigate(-1)}><FiArrowLeft /> Back</button><h1 className="page-title">Book a Service</h1><p className="page-subtitle">Fill in your vehicle details and choose your preferred time.</p></div></div>
      <div className="container section">
        <form className="book-form card" onSubmit={handleSubmit} id="booking-form">
          <div className="card-body">
            <h2 className="form-section-title">Vehicle Information</h2>
            <div className="form-grid">
              <div className="form-group"><label className="form-label">Vehicle Type *</label><select name="vehicleType" value={form.vehicleType} onChange={handleChange} required id="vehicle-type"><option value="">Select type</option><option>Car</option><option>SUV</option><option>Van</option><option>Truck</option><option>Motorcycle</option></select></div>
              <div className="form-group"><label className="form-label">Make</label><input name="vehicleMake" value={form.vehicleMake} onChange={handleChange} placeholder="e.g. Toyota" id="vehicle-make"/></div>
              <div className="form-group"><label className="form-label">Model</label><input name="vehicleModel" value={form.vehicleModel} onChange={handleChange} placeholder="e.g. Corolla" id="vehicle-model"/></div>
              <div className="form-group"><label className="form-label">Year</label><input name="vehicleYear" value={form.vehicleYear} onChange={handleChange} placeholder="e.g. 2022" id="vehicle-year"/></div>
              <div className="form-group"><label className="form-label">License Plate</label><input name="licensePlate" value={form.licensePlate} onChange={handleChange} placeholder="e.g. ABC-1234" id="license-plate"/></div>
            </div>
            <h2 className="form-section-title"><FiCalendar size={18}/> Schedule</h2>
            <div className="form-grid">
              <div className="form-group"><label className="form-label">Preferred Date *</label><input type="date" name="date" value={form.date} onChange={handleChange} required id="booking-date" min={new Date().toISOString().split('T')[0]}/></div>
              <div className="form-group"><label className="form-label">Preferred Time *</label><select name="time" value={form.time} onChange={handleChange} required id="booking-time"><option value="">Select time</option><option>08:00 AM</option><option>09:00 AM</option><option>10:00 AM</option><option>11:00 AM</option><option>01:00 PM</option><option>02:00 PM</option><option>03:00 PM</option><option>04:00 PM</option></select></div>
            </div>
            <h2 className="form-section-title"><FiMessageSquare size={18}/> Additional Notes</h2>
            <div className="form-group"><textarea name="notes" value={form.notes} onChange={handleChange} placeholder="Describe any specific issues or requests..." rows={4} id="booking-notes"/></div>
            <button type="submit" className="btn btn-primary btn-lg book-submit-btn" disabled={loading} id="submit-booking">{loading ? 'Booking...' : 'Confirm Booking'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default BookService;
