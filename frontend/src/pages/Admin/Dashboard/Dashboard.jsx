import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiCalendar, FiClipboard, FiCheckCircle, FiClock } from 'react-icons/fi';
import { adminGetStats, adminGetAllBookings } from '../../../services/api.js';
import './Dashboard.css';

function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [recentBookings, setRecentBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, bookingsRes] = await Promise.all([
          adminGetStats(),
          adminGetAllBookings()
        ]);
        setStats(statsRes.data);
        // Take top 5 for the dashboard recent view
        setRecentBookings(bookingsRes.data.slice(0, 5));
      } catch (err) {
        console.error("Failed to load dashboard data", err);
        setStats({ totalBookings: 0, pendingBookings: 0, approvedBookings: 0, completedBookings: 0, todayBookings: 0 });
        setRecentBookings([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const formatDate = (dateStr) => {
    if (!dateStr) return '--';
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    } catch {
      return dateStr;
    }
  };

  if (loading) return <div className="admin-loading">Loading Dashboard...</div>;

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <div>
          <h2>Workshop Overview</h2>
          <p>Precision analytics for your service floor today.</p>
        </div>
        <button className="date-picker-btn">
          <FiCalendar /> {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
        </button>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-card-header">
            <div className="stat-icon blue"><FiClipboard /></div>
          </div>
          <p className="stat-label">TOTAL BOOKINGS</p>
          <h3 className="stat-value">{stats?.totalBookings?.toLocaleString() || 0}</h3>
        </div>
        <div className="stat-card">
          <div className="stat-card-header">
            <div className="stat-icon gray"><FiClock /></div>
          </div>
          <p className="stat-label">PENDING APPROVALS</p>
          <h3 className="stat-value">{stats?.pendingBookings?.toLocaleString() || 0}</h3>
        </div>
        <div className="stat-card">
          <div className="stat-card-header">
            <div className="stat-icon gray"><FiCheckCircle /></div>
          </div>
          <p className="stat-label">APPROVED SERVICES</p>
          <h3 className="stat-value">{stats?.approvedBookings?.toLocaleString() || 0}</h3>
        </div>
        <div className="stat-card">
          <div className="stat-card-header">
            <div className="stat-icon blue"><FiCalendar /></div>
          </div>
          <p className="stat-label">COMPLETED</p>
          <h3 className="stat-value">{stats?.completedBookings?.toLocaleString() || 0}</h3>
        </div>
      </div>

      <div className="recent-bookings-section">
        <div className="section-header-flex">
          <h3>Recent Bookings</h3>
          <Link to="/admin/bookings" className="view-all-link">View All Bookings</Link>
        </div>
        <div className="table-responsive">
          <table className="admin-table">
            <thead>
              <tr>
                <th>CUSTOMER</th>
                <th>PHONE</th>
                <th>VEHICLE NO</th>
                <th>SERVICE TYPE</th>
                <th>DATE & TIME</th>
                <th>STATUS</th>
              </tr>
            </thead>
            <tbody>
              {recentBookings.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center', padding: '2rem', color: '#9ca3af' }}>
                    No bookings found. Bookings will appear here when customers submit requests.
                  </td>
                </tr>
              ) : (
                recentBookings.map((b, idx) => (
                  <tr key={b._id || idx}>
                    <td>
                      <div className="customer-cell">
                        <div className="avatar-initial">
                          {b.customerName?.substring(0, 2).toUpperCase() || '??'}
                        </div>
                        <div className="customer-info">
                          <span className="c-name">{b.customerName || 'Unknown'}</span>
                        </div>
                      </div>
                    </td>
                    <td>{b.phone || '--'}</td>
                    <td><strong>{b.vehicleNumber || '--'}</strong></td>
                    <td>
                      <span className="service-badge">{b.serviceType || 'General'}</span>
                    </td>
                    <td>
                      <div className="datetime-info">
                        <span className="d-date">{formatDate(b.date)}</span>
                        <span className="d-time">{b.time || '--'}</span>
                      </div>
                    </td>
                    <td>
                      <span className={`status-pill ${b.status?.toLowerCase()}`}>
                        <span className="status-dot"></span> {b.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
