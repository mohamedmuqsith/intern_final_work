import { useState, useEffect } from 'react';
import { adminGetAllBookings, adminUpdateBooking } from '../../../services/api.js';
import { toast } from 'react-toastify';
import { FiCalendar, FiClock, FiUser, FiInfo, FiCheck, FiX, FiCheckCircle } from 'react-icons/fi';
import './ManageBookings.css';

function ManageBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = () => {
    setLoading(true);
    adminGetAllBookings()
      .then(res => setBookings(res.data))
      .catch(() => {
        // Mock data fallback for demonstration if API isn't live yet
        setBookings([
          { _id: '1', userName: 'John Doe', userEmail: 'john@example.com', serviceName: 'Oil Change', vehicleType: 'Car', vehicleMake: 'Toyota', vehicleModel: 'Corolla', vehicleYear: '2019', licensePlate: 'WP-CAD-1234', date: '2026-05-24', time: '10:00 AM', notes: 'First service for this car', status: 'pending' },
          { _id: '2', userName: 'Jane Smith', userEmail: 'jane@example.com', serviceName: 'Brake Service', vehicleType: 'SUV', vehicleMake: 'Honda', vehicleModel: 'CR-V', vehicleYear: '2021', licensePlate: 'WP-CAS-5678', date: '2026-05-25', time: '02:00 PM', notes: 'Brakes squeaking', status: 'confirmed' }
        ]);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchBookings(); }, []);

  const handleUpdateStatus = async (id, status) => {
    try {
      await adminUpdateBooking(id, { status });
      toast.success(`Booking status updated to ${status}`);
      fetchBookings();
    } catch {
      // Mock update local state for presentation if backend isn't ready
      setBookings(prev => prev.map(b => b._id === id ? { ...b, status } : b));
      toast.success(`Demo status updated to ${status}`);
    }
  };

  const statusClass = (s) => ({ pending:'badge-pending', confirmed:'badge-confirmed', completed:'badge-completed', cancelled:'badge-cancelled' }[s] || 'badge-pending');

  return (
    <div className="manage-bookings-page">
      <div className="admin-hero">
        <div className="container">
          <h1 className="page-title">Manage Service Bookings</h1>
          <p className="page-subtitle">Review customer appointments, confirm bookings, or update service status.</p>
        </div>
      </div>

      <div className="container section">
        {loading ? <div className="loading-msg">Loading bookings list...</div> : bookings.length === 0 ? (
          <div className="empty-state"><h3>No bookings found</h3></div>
        ) : (
          <div className="admin-bookings-list">
            {bookings.map(b => (
              <div className="booking-card card admin-b-card" key={b._id} id={`booking-${b._id}`}>
                <div className="card-body admin-booking-body">
                  <div className="booking-info-main">
                    <div className="booking-header">
                      <h3>{b.serviceName}</h3>
                      <span className={`badge ${statusClass(b.status)}`}>{b.status}</span>
                    </div>
                    <div className="customer-info">
                      <p className="cust-detail"><FiUser size={14} /> <strong>{b.userName || 'Guest User'}</strong> ({b.userEmail})</p>
                      <p className="cust-detail"><FiInfo size={14} /> {b.vehicleType} | {b.vehicleMake} {b.vehicleModel} ({b.vehicleYear}) - <strong>{b.licensePlate}</strong></p>
                    </div>
                    <div className="booking-meta">
                      <span><FiCalendar size={14} /> {b.date}</span>
                      <span><FiClock size={14} /> {b.time}</span>
                    </div>
                    {b.notes && <p className="admin-booking-notes">Notes: "{b.notes}"</p>}
                  </div>
                  <div className="admin-actions">
                    {b.status === 'pending' && (
                      <>
                        <button className="btn btn-primary btn-sm btn-icon-text" onClick={() => handleUpdateStatus(b._id, 'confirmed')} id={`confirm-${b._id}`}><FiCheck /> Confirm</button>
                        <button className="btn btn-ghost btn-sm text-danger" onClick={() => handleUpdateStatus(b._id, 'cancelled')} id={`cancel-${b._id}`}><FiX /> Decline</button>
                      </>
                    )}
                    {b.status === 'confirmed' && (
                      <button className="btn btn-accent btn-sm btn-icon-text" onClick={() => handleUpdateStatus(b._id, 'completed')} id={`complete-${b._id}`}><FiCheckCircle /> Mark Completed</button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ManageBookings;
