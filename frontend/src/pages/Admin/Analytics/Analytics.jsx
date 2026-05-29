import React, { useState, useEffect } from 'react';
import { 
  FiCalendar, FiDownload, FiDollarSign, FiTrendingUp, 
  FiStar, FiClock, FiUsers, FiRefreshCw, FiTool, FiLoader 
} from 'react-icons/fi';
import { adminGetStats, adminGetAllBookings, adminGetAllServices, adminGetAllCustomers } from '../../../services/api.js';
import './Analytics.css';

function AdminAnalytics() {
  const [stats, setStats] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [services, setServices] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [statsRes, bookingsRes, servicesRes, customersRes] = await Promise.all([
          adminGetStats(),
          adminGetAllBookings(),
          adminGetAllServices(),
          adminGetAllCustomers()
        ]);
        setStats(statsRes.data);
        setBookings(bookingsRes.data);
        setServices(servicesRes.data);
        setCustomers(customersRes.data);
      } catch (err) {
        console.error('Failed to load analytics:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  // Compute popular services from bookings
  const serviceCounts = bookings.reduce((acc, b) => {
    const svc = b.serviceType || 'Unknown';
    acc[svc] = (acc[svc] || 0) + 1;
    return acc;
  }, {});

  const popularServices = Object.entries(serviceCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 4)
    .map(([name, count]) => ({ name, count, percentage: bookings.length > 0 ? Math.round((count / bookings.length) * 100) : 0 }));

  // Monthly booking data
  const monthlyData = Array(12).fill(0);
  bookings.forEach(b => {
    if (b.date) {
      const month = new Date(b.date).getMonth();
      if (!isNaN(month)) monthlyData[month]++;
    }
  });
  const maxMonthly = Math.max(...monthlyData, 1);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  // Status distribution for heatmap-like display
  const completionRate = stats && stats.totalBookings > 0 
    ? Math.round((stats.completedBookings / stats.totalBookings) * 100) 
    : 0;

  const approvalRate = stats && stats.totalBookings > 0 
    ? Math.round((stats.approvedBookings / stats.totalBookings) * 100) 
    : 0;

  if (loading) {
    return (
      <div className="admin-analytics-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
        <FiLoader className="spin" style={{ fontSize: 32, color: '#2563eb' }} />
      </div>
    );
  }

  return (
    <div className="admin-analytics-container">
      {/* Header */}
      <div className="analytics-header">
        <div className="header-titles">
          <h2>Analytics Overview</h2>
          <p>Live insights from your MongoDB database.</p>
        </div>
        <div className="header-actions">
          <button className="btn-secondary">
            <FiCalendar /> Live Data
          </button>
          <button className="btn-primary" onClick={() => window.print()}>
            <FiDownload /> Export Report
          </button>
        </div>
      </div>

      {/* Key Metrics Row */}
      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-header">
            <span className="metric-title">TOTAL BOOKINGS</span>
            <FiDollarSign className="metric-icon text-blue" />
          </div>
          <div className="metric-value">{stats?.totalBookings || 0}</div>
          <div className="metric-trend positive">
            <FiTrendingUp /> {stats?.todayBookings || 0} today
          </div>
        </div>
        
        <div className="metric-card">
          <div className="metric-header">
            <span className="metric-title">COMPLETION RATE</span>
            <FiTrendingUp className="metric-icon text-blue" />
          </div>
          <div className="metric-value">{completionRate}%</div>
          <div className="metric-trend positive">
            <FiTrendingUp /> {stats?.completedBookings || 0} completed
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-header">
            <span className="metric-title">SERVICES</span>
            <FiStar className="metric-icon text-blue" />
          </div>
          <div className="metric-value">{services.length}</div>
          <div className="metric-trend neutral">
            <span>Active in catalog</span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-header">
            <span className="metric-title">PENDING</span>
            <FiClock className="metric-icon text-blue" />
          </div>
          <div className="metric-value">{stats?.pendingBookings || 0}</div>
          <div className="metric-trend positive">
            Awaiting approval
          </div>
        </div>
      </div>

      {/* Charts Row 1 */}
      <div className="charts-row-1">
        {/* Booking Trends Bar Chart */}
        <div className="chart-card booking-trends">
          <div className="chart-header">
            <h3>Monthly Booking Trends</h3>
            <div className="chart-legend">
              <span className="legend-item"><span className="dot current"></span> Bookings</span>
            </div>
          </div>
          <div className="bar-chart-container">
            <div className="bars-area">
              {months.map((month, index) => (
                <div className="bar-group" key={index}>
                  <div className="bar" style={{ height: `${(monthlyData[index] / maxMonthly) * 100}%` }}></div>
                  <span className="bar-label">{month}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Status Breakdown */}
        <div className="chart-card monthly-growth">
          <div className="chart-header">
            <h3>Status Breakdown</h3>
            <p>Booking status distribution</p>
          </div>
          
          <div className="segment-bars">
            <div className="segment">
              <div className="segment-header">
                <span>Completed</span>
                <span className="segment-value text-blue">{completionRate}%</span>
              </div>
              <div className="progress-bg">
                <div className="progress-fill fill-blue" style={{ width: `${completionRate}%` }}></div>
              </div>
            </div>
            
            <div className="segment mt-4">
              <div className="segment-header">
                <span>Approved</span>
                <span className="segment-value text-blue">{approvalRate}%</span>
              </div>
              <div className="progress-bg">
                <div className="progress-fill fill-light-blue" style={{ width: `${approvalRate}%` }}></div>
              </div>
            </div>
          </div>

          <div className="insight-box">
            <p>Total: {stats?.totalBookings || 0} bookings · {stats?.rejectedBookings || 0} rejected</p>
          </div>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="charts-row-2">
        {/* Popular Services */}
        <div className="chart-card popular-services">
          <div className="chart-header">
            <h3>Popular Services</h3>
          </div>
          <div className="services-list">
            {popularServices.length > 0 ? popularServices.map((service, index) => (
              <div className="service-row" key={index}>
                <div className="service-name">{service.name}</div>
                <div className="service-bar-container">
                  <div className="service-progress-bg">
                    <div className="service-progress-fill" style={{ width: `${service.percentage}%` }}>
                       <span className="service-count">{service.count} Bookings</span>
                    </div>
                  </div>
                </div>
              </div>
            )) : (
              <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>No booking data available yet.</p>
            )}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="chart-card peak-activity">
          <div className="chart-header">
            <h3>Recent Activity</h3>
            <span className="subtitle">Last 5 bookings</span>
          </div>
          <div className="recent-list">
            {bookings.slice(0, 5).map((b, i) => (
              <div className="recent-item" key={b._id || i}>
                <div className="recent-avatar">{b.customerName?.substring(0, 2).toUpperCase() || '??'}</div>
                <div className="recent-info">
                  <span className="recent-name">{b.customerName}</span>
                  <span className="recent-service">{b.serviceType} · {b.date}</span>
                </div>
                <span className={`recent-status ${b.status?.toLowerCase()}`}>{b.status}</span>
              </div>
            ))}
            {bookings.length === 0 && (
              <p style={{ color: '#94a3b8', fontSize: '0.9rem', textAlign: 'center', padding: '2rem 0' }}>No bookings yet.</p>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Stats Row */}
      <div className="bottom-stats-grid">
        <div className="stat-card">
          <div className="stat-icon-wrapper">
            <FiUsers />
          </div>
          <div className="stat-info">
            <span className="stat-label">Total Users</span>
            <span className="stat-value">{customers.length}</span>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon-wrapper">
            <FiRefreshCw />
          </div>
          <div className="stat-info">
            <span className="stat-label">Approval Rate</span>
            <span className="stat-value">{approvalRate}%</span>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon-wrapper">
            <FiTool />
          </div>
          <div className="stat-info">
            <span className="stat-label">Service Catalog</span>
            <span className="stat-value">{services.length} items</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminAnalytics;
