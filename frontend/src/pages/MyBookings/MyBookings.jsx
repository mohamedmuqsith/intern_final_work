import { useState, useEffect } from 'react';
import { getMyBookings, cancelBooking } from '../../services/api.js';
import { toast } from 'react-toastify';
import { FiCalendar, FiClock, FiXCircle } from 'react-icons/fi';
import { FaCar } from 'react-icons/fa';
import './MyBookings.css';

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = () => {
    setLoading(true);
    getMyBookings().then(res => setBookings(res.data)).catch(() => toast.error('Failed to load bookings')).finally(() => setLoading(false));
  };

  useEffect(() => { fetchBookings(); }, []);

  const handleCancel = async (id) => {
    if (!window.confirm('Cancel this booking?')) return;
    try { await cancelBooking(id); toast.success('Booking cancelled'); fetchBookings(); }
    catch { toast.error('Failed to cancel'); }
  };

  const statusClass = (s) => ({ pending:'badge-pending', confirmed:'badge-confirmed', completed:'badge-completed', cancelled:'badge-cancelled' }[s] || 'badge-pending');

  return (
    <div className="bookings-page">
      <div className="bookings-hero"><div className="container"><h1 className="page-title">My Bookings</h1><p className="page-subtitle">View and manage your service appointments.</p></div></div>
      <div className="container section">
        {loading ? <div className="loading-msg">Loading bookings...</div> : bookings.length === 0 ? (
          <div className="empty-state"><FaCar size={48}/><h3>No Bookings Yet</h3><p>You haven't made any service bookings yet.</p></div>
        ) : (
          <div className="bookings-list">
            {bookings.map(b => (
              <div className="booking-card card" key={b._id} id={`booking-${b._id}`}>
                <div className="card-body booking-card-body">
                  <div className="booking-info">
                    <div className="booking-header"><h3>{b.serviceName || 'Vehicle Service'}</h3><span className={`badge ${statusClass(b.status)}`}>{b.status}</span></div>
                    <div className="booking-meta"><span><FiCalendar size={14}/> {b.date}</span><span><FiClock size={14}/> {b.time}</span></div>
                    <p className="booking-vehicle">{b.vehicleType} {b.vehicleMake} {b.vehicleModel} {b.vehicleYear}</p>
                    {b.notes && <p className="booking-notes">"{b.notes}"</p>}
                  </div>
                  {(b.status === 'pending' || b.status === 'confirmed') && (
                    <button className="btn btn-ghost cancel-btn" onClick={() => handleCancel(b._id)} id={`cancel-${b._id}`}><FiXCircle size={16}/> Cancel</button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
export default MyBookings;
