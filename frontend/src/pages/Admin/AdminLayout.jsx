import { Outlet, NavLink, Link, Navigate, useNavigate } from 'react-router-dom';
import { 
  FiGrid, FiCalendar, FiTool, FiUsers, 
  FiBarChart2, FiSettings, FiHelpCircle, FiLogOut, 
  FiSearch, FiBell, FiPlus 
} from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext.jsx';
import './AdminLayout.css';

function AdminLayout() {
  const { user, loading, isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  // Show loading state while auth is being checked
  if (loading) {
    return <div className="admin-loading">Checking authentication...</div>;
  }

  // Redirect to login if not authenticated or not an admin
  if (!user || !isAdmin) {
    return <Navigate to="/login" replace />;
  }

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <h2>Admin Panel</h2>
          <p>Main Workshop</p>
        </div>
        
        <nav className="admin-nav">
          <NavLink to="/admin" end className={({isActive}) => isActive ? "admin-nav-link active" : "admin-nav-link"}>
            <FiGrid /> Dashboard
          </NavLink>
          <NavLink to="/admin/bookings" className={({isActive}) => isActive ? "admin-nav-link active" : "admin-nav-link"}>
            <FiCalendar /> Bookings
          </NavLink>
          <NavLink to="/admin/services" className="admin-nav-link">
            <FiTool /> Services
          </NavLink>
          <NavLink to="/admin/customers" className="admin-nav-link">
            <FiUsers /> Customers
          </NavLink>
          <NavLink to="/admin/analytics" className="admin-nav-link">
            <FiBarChart2 /> Analytics
          </NavLink>
          <NavLink to="/admin/settings" className="admin-nav-link">
            <FiSettings /> Settings
          </NavLink>
        </nav>

        <div className="admin-sidebar-bottom">
          <Link to="/admin/bookings/new" className="btn btn-primary btn-full admin-new-btn">
            <FiPlus /> New Booking
          </Link>
          <div className="admin-bottom-links">
            <Link to="/admin/help" className="admin-nav-link">
              <FiHelpCircle /> Help Center
            </Link>
            <button onClick={handleLogout} className="admin-nav-link logout" style={{ background: 'none', border: 'none', cursor: 'pointer', width: '100%', textAlign: 'left' }}>
              <FiLogOut /> Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Wrapper */}
      <div className="admin-main-wrapper">
        {/* Top Navbar */}
        <header className="admin-topbar">
          <div className="admin-topbar-left">
            <h1 className="admin-topbar-brand">AutoServe Pro</h1>
            <div className="admin-search-bar">
              <FiSearch className="search-icon" />
              <input type="text" placeholder="Search services, customers, VIN..." />
            </div>
          </div>
          <div className="admin-topbar-right">
            <button className="admin-icon-btn">
              <FiBell />
            </button>
            <div className="admin-profile">
              <div className="admin-profile-info">
                <span className="admin-profile-name">{user.name}</span>
                <span className="admin-profile-role">Admin</span>
              </div>
              <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=1d4ed8&color=fff`} alt="Profile" className="admin-profile-avatar" />
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="admin-content-area">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
