import { useState, useEffect } from 'react';
import { FiDownload, FiPlus, FiSearch, FiFilter, FiCalendar, FiUsers, FiClipboard, FiCheck, FiX, FiRefreshCw, FiTrash2 } from 'react-icons/fi';
import { adminGetStats, adminGetAllBookings, adminUpdateBooking, adminDeleteBooking } from '../../../services/api.js';
import { toast } from 'react-toastify';
import './ManageBookings.css';

function AdminManageBookings() {
  const [stats, setStats] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const fetchData = async () => {
    try {
      const [statsRes, bookingsRes] = await Promise.all([
        adminGetStats(),
        adminGetAllBookings()
      ]);
      setStats(statsRes.data);
      setBookings(bookingsRes.data);
    } catch (err) {
      console.error("API Error loading bookings", err);
      toast.error("Failed to fetch bookings from server");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      await adminUpdateBooking(id, { status: newStatus });
      toast.success(`Booking status updated to ${newStatus}`);
      fetchData(); // reload data
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update status");
    }
  };

  const handleDeleteBooking = async (id) => {
    if (!window.confirm("Are you sure you want to delete this booking?")) return;
    try {
      await adminDeleteBooking(id);
      toast.success("Booking deleted successfully");
      fetchData(); // reload data
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete booking");
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '--';
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    } catch {
      return dateStr;
    }
  };

  // Filter logic
  const filteredBookings = bookings.filter(b => {
    const matchesSearch = 
      b.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.vehicleNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b._id?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'All' || b.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  if (loading) return <div className="admin-loading">Loading Bookings...</div>;

  return (
    <div className="admin-manage-bookings">
      <div className="page-header-flex">
        <div>
          <h2>Booking Management</h2>
          <p>Oversee all workshop appointments and technician schedules.</p>
        </div>
        <div className="header-actions">
          <button className="btn btn-outline-gray" onClick={fetchData}>
            <FiRefreshCw /> Refresh
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid m-bookings-stats">
        <div className="stat-card">
          <p className="stat-label">TOTAL BOOKINGS</p>
          <div className="stat-value-flex">
            <h3 className="stat-value">{stats?.totalBookings?.toLocaleString() || 0}</h3>
          </div>
        </div>
        <div className="stat-card">
          <p className="stat-label">PENDING APPROVAL</p>
          <div className="stat-value-flex">
            <h3 className="stat-value">{stats?.pendingBookings?.toLocaleString() || 0}</h3>
            <FiClipboard className="stat-bg-icon" />
          </div>
        </div>
        <div className="stat-card">
          <p className="stat-label">APPROVED SERVICES</p>
          <div className="stat-value-flex">
            <h3 className="stat-value">{stats?.approvedBookings?.toLocaleString() || 0}</h3>
            <span className="stat-bg-icon">✓</span>
          </div>
        </div>
        <div className="stat-card">
          <p className="stat-label">COMPLETED SERVICES</p>
          <div className="stat-value-flex">
            <h3 className="stat-value">{stats?.completedBookings?.toLocaleString() || 0}</h3>
          </div>
        </div>
      </div>

      {/* Table Container */}
      <div className="bookings-table-container">
        <div className="table-filters-bar">
          <div className="search-wrapper">
            <FiSearch className="search-icon" />
            <input 
              type="text" 
              placeholder="Search by ID, Customer, or Vehicle Number..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="filter-dropdowns">
            <div className="filter-group">
              <label>Status:</label>
              <select 
                value={statusFilter} 
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="All">All Statuses</option>
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Completed">Completed</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
          </div>
        </div>

        <div className="table-responsive">
          <table className="admin-table bookings-table">
            <thead>
              <tr>
                <th>BOOKING ID</th>
                <th>CUSTOMER</th>
                <th>PHONE</th>
                <th>VEHICLE NO</th>
                <th>SERVICE TYPE</th>
                <th>SCHEDULED DATE</th>
                <th>STATUS</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.length === 0 ? (
                <tr>
                  <td colSpan="8" style={{ textAlign: 'center', padding: '3rem', color: '#9ca3af' }}>
                    No bookings found matching search criteria.
                  </td>
                </tr>
              ) : (
                filteredBookings.map((b, idx) => (
                  <tr key={b._id || idx}>
                    <td className="booking-id-cell">#{b._id?.substring(0, 7).toUpperCase()}</td>
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
                      <span className={`status-badge ${b.status?.toLowerCase()}`}>
                        {b.status}
                      </span>
                    </td>
                    <td className="actions-cell">
                      <div className="action-buttons-flex">
                        {b.status === 'Pending' && (
                          <>
                            <button 
                              className="action-icon-btn approve" 
                              title="Approve Booking"
                              onClick={() => handleUpdateStatus(b._id, 'Approved')}
                            >
                              <FiCheck />
                            </button>
                            <button 
                              className="action-icon-btn reject" 
                              title="Reject Booking"
                              onClick={() => handleUpdateStatus(b._id, 'Rejected')}
                            >
                              <FiX />
                            </button>
                          </>
                        )}
                        {b.status === 'Approved' && (
                          <button 
                            className="action-icon-btn complete" 
                            title="Mark Completed"
                            onClick={() => handleUpdateStatus(b._id, 'Completed')}
                          >
                            <FiCheck /> Done
                          </button>
                        )}
                        <button 
                          className="action-icon-btn delete" 
                          title="Delete Booking"
                          onClick={() => handleDeleteBooking(b._id)}
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="table-pagination">
          <span className="pagination-info">Showing {filteredBookings.length} bookings</span>
        </div>
      </div>
    </div>
  );
}

export default AdminManageBookings;
