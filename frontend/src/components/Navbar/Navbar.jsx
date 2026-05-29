import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import { FiMenu, FiX, FiUser, FiLogOut, FiSettings } from 'react-icons/fi';
import './Navbar.css';

function Navbar() {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    setProfileOpen(false);
    navigate('/');
  };

  return (
    <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`} id="main-navbar">
      <div className="navbar-container container">
        {/* Left: Logo (Text Only, Solid Blue) */}
        <Link to="/" className="navbar-logo" id="navbar-logo">
          AutoServe Pro
        </Link>

        {/* Center: Navigation Links */}
        <div className={`navbar-links ${menuOpen ? 'active' : ''}`}>
          <NavLink to="/services" className="nav-link" id="nav-services" onClick={() => setMenuOpen(false)}>
            Services
          </NavLink>
          <NavLink to="/pricing" className="nav-link" id="nav-pricing" onClick={() => setMenuOpen(false)}>
            Pricing
          </NavLink>
          <NavLink to="/locations" className="nav-link" id="nav-locations" onClick={() => setMenuOpen(false)}>
            Locations
          </NavLink>
          <NavLink to="/support" className="nav-link" id="nav-support" onClick={() => setMenuOpen(false)}>
            Support
          </NavLink>
          {user && !isAdmin && (
            <NavLink to="/my-bookings" className="nav-link" id="nav-bookings" onClick={() => setMenuOpen(false)}>
              My Bookings
            </NavLink>
          )}
          {isAdmin && (
            <NavLink to="/admin" className="nav-link nav-link-admin" id="nav-admin" onClick={() => setMenuOpen(false)}>
              <FiSettings size={14} /> Admin
            </NavLink>
          )}
        </div>

        {/* Right: Actions */}
        <div className="navbar-actions">
          {user ? (
            <div className="auth-buttons">
              <div className="profile-dropdown">
                <button
                  className="profile-trigger"
                  id="profile-menu-btn"
                  onClick={() => setProfileOpen(!profileOpen)}
                >
                  <div className="profile-avatar">
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                  <span className="profile-name">{user.name}</span>
                </button>
                {profileOpen && (
                  <div className="profile-menu" id="profile-dropdown-menu">
                    <div className="profile-menu-header">
                      <p className="profile-menu-name">{user.name}</p>
                      <p className="profile-menu-email">{user.email}</p>
                    </div>
                    <div className="profile-menu-divider" />
                    <Link to="/my-bookings" className="profile-menu-item" onClick={() => setProfileOpen(false)}>
                      <FiUser size={16} /> My Bookings
                    </Link>
                    <button className="profile-menu-item logout" onClick={handleLogout} id="logout-btn">
                      <FiLogOut size={16} /> Logout
                    </button>
                  </div>
                )}
              </div>
              <Link to="/book/all" className="btn btn-primary" id="book-btn">
                Book Now
              </Link>
            </div>
          ) : (
            <div className="auth-buttons">
              <Link to="/login" className="btn btn-outline-gray" id="admin-login-btn">
                Admin Login
              </Link>
              <Link to="/book/all" className="btn btn-primary" id="book-btn">
                Book Now
              </Link>
            </div>
          )}

          <button
            className="mobile-toggle"
            id="mobile-menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
