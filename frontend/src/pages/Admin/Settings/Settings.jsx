import React, { useState, useEffect } from 'react';
import { 
  FiUser, FiLock, FiGlobe, FiBell, FiMonitor, 
  FiExternalLink, FiSun, FiMoon, FiSave
} from 'react-icons/fi';
import { useAuth } from '../../../context/AuthContext.jsx';
import { toast } from 'react-toastify';
import adminProfileImg from '../../../assets/admin_profile.jpg';
import './Settings.css';

function AdminSettings() {
  const { user } = useAuth();
  const [profile, setProfile] = useState({
    fullName: 'Julian Thorne',
    email: 'j.thorne@autoservepro.com',
    bio: 'Senior Operations Manager at the Main Tech Hub. Responsible for workshop logistics and diagnostic equipment maintenance.'
  });

  // Dynamically set default details from logged-in admin if available
  useEffect(() => {
    if (user) {
      setProfile(prev => ({
        ...prev,
        fullName: user.name || prev.fullName,
        email: user.email || prev.email
      }));
    }
  }, [user]);

  const [security, setSecurity] = useState({
    currentPassword: '',
    newPassword: ''
  });

  const [system, setSystem] = useState({
    language: 'English (US)',
    timezone: 'UTC -05:00 Eastern Time'
  });

  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    smsNotifications: false,
    appPushAlerts: true
  });

  const [theme, setTheme] = useState('Light');

  const handleProfileChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSecurityChange = (e) => {
    setSecurity({ ...security, [e.target.name]: e.target.value });
  };

  const handleSystemChange = (e) => {
    setSystem({ ...system, [e.target.name]: e.target.value });
  };

  const toggleNotification = (key) => {
    setNotifications({ ...notifications, [key]: !notifications[key] });
  };

  const handleSaveAll = () => {
    toast.success('Settings saved successfully!');
  };

  const handleCancel = () => {
    if (user) {
      setProfile({
        fullName: user.name,
        email: user.email,
        bio: 'Senior Operations Manager at the Main Tech Hub. Responsible for workshop logistics and diagnostic equipment maintenance.'
      });
    }
    setSecurity({ currentPassword: '', newPassword: '' });
    toast.info('Changes discarded.');
  };

  return (
    <div className="admin-settings-container">
      <div className="settings-header">
        <div className="header-titles">
          <h2>Settings</h2>
          <p>Configure your personal profile and workshop preferences.</p>
        </div>
      </div>

      <div className="settings-main-grid">
        {/* Top Row */}
        <div className="settings-top-row">
          {/* Admin Profile Card */}
          <div className="settings-card profile-card">
            <div className="card-header">
              <FiUser className="card-icon text-blue" />
              <h3>Admin Profile</h3>
            </div>
            
            <div className="profile-content">
              <div className="profile-image-section">
                <img src={adminProfileImg} alt="Admin Profile" className="profile-img" />
                <button className="btn-link">Change Photo</button>
              </div>
              
              <div className="profile-form-section">
                <div className="form-row">
                  <div className="form-group">
                    <label>Full Name</label>
                    <input 
                      type="text" 
                      name="fullName"
                      value={profile.fullName}
                      onChange={handleProfileChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Email Address</label>
                    <input 
                      type="email" 
                      name="email"
                      value={profile.email}
                      onChange={handleProfileChange}
                    />
                  </div>
                </div>
                
                <div className="form-group">
                  <label>Bio / Workshop Title</label>
                  <textarea 
                    name="bio"
                    value={profile.bio}
                    onChange={handleProfileChange}
                    rows="3"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>

          {/* Security Card */}
          <div className="settings-card security-card">
            <div className="card-header">
              <FiLock className="card-icon text-red" />
              <h3>Security</h3>
            </div>
            <p className="security-desc">
              Keep your account secure by rotating your password regularly.
            </p>
            
            <div className="form-group">
              <label>Current Password</label>
              <input 
                type="password" 
                name="currentPassword"
                placeholder="••••••••"
                value={security.currentPassword}
                onChange={handleSecurityChange}
              />
            </div>
            
            <div className="form-group">
              <label>New Password</label>
              <input 
                type="password" 
                name="newPassword"
                placeholder="••••••••"
                value={security.newPassword}
                onChange={handleSecurityChange}
              />
            </div>
            
            <a href="#" className="reset-2fa-link">
              Reset 2FA Settings <FiExternalLink />
            </a>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="settings-bottom-row">
          {/* System Card */}
          <div className="settings-card system-card">
            <div className="card-header">
              <FiGlobe className="card-icon text-gray" />
              <h3>System</h3>
            </div>
            
            <div className="form-group">
              <label>Interface Language</label>
              <select name="language" value={system.language} onChange={handleSystemChange}>
                <option value="English (US)">English (US)</option>
                <option value="Spanish">Spanish</option>
                <option value="French">French</option>
              </select>
            </div>
            
            <div className="form-group">
              <label>Timezone</label>
              <select name="timezone" value={system.timezone} onChange={handleSystemChange}>
                <option value="UTC -05:00 Eastern Time">UTC -05:00 Eastern Time</option>
                <option value="UTC -08:00 Pacific Time">UTC -08:00 Pacific Time</option>
                <option value="UTC +00:00 GMT">UTC +00:00 GMT</option>
              </select>
            </div>
          </div>

          {/* Notifications Card */}
          <div className="settings-card notifications-card">
            <div className="card-header">
              <FiBell className="card-icon text-blue" />
              <h3>Notifications</h3>
            </div>
            
            <div className="notification-list">
              <div className="notification-item">
                <div className="notification-info">
                  <span className="notif-title">Email Alerts</span>
                  <span className="notif-desc">Daily summary and emergency logs</span>
                </div>
                <div 
                  className={`toggle-switch ${notifications.emailAlerts ? 'active' : ''}`}
                  onClick={() => toggleNotification('emailAlerts')}
                >
                  <div className="toggle-knob"></div>
                </div>
              </div>
              
              <div className="notification-item">
                <div className="notification-info">
                  <span className="notif-title">SMS Notifications</span>
                  <span className="notif-desc">Real-time booking updates</span>
                </div>
                <div 
                  className={`toggle-switch ${notifications.smsNotifications ? 'active' : ''}`}
                  onClick={() => toggleNotification('smsNotifications')}
                >
                  <div className="toggle-knob"></div>
                </div>
              </div>
              
              <div className="notification-item">
                <div className="notification-info">
                  <span className="notif-title">App Push alerts</span>
                  <span className="notif-desc">Direct messages from technicians</span>
                </div>
                <div 
                  className={`toggle-switch ${notifications.appPushAlerts ? 'active' : ''}`}
                  onClick={() => toggleNotification('appPushAlerts')}
                >
                  <div className="toggle-knob"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Appearance Card */}
          <div className="settings-card appearance-card">
            <div className="card-header">
              <FiMonitor className="card-icon text-gray" />
              <h3>Appearance</h3>
            </div>
            
            <div className="theme-options">
              <div 
                className={`theme-option ${theme === 'Light' ? 'selected' : ''}`}
                onClick={() => setTheme('Light')}
              >
                <FiSun className="theme-icon text-blue" />
                <span>Light</span>
              </div>
              
              <div 
                className={`theme-option dark-option ${theme === 'Dark' ? 'selected' : ''}`}
                onClick={() => setTheme('Dark')}
              >
                <FiMoon className="theme-icon text-gray-light" />
                <span>Dark</span>
              </div>
            </div>
            
            <p className="theme-desc">Modern high-precision theme active</p>
          </div>
        </div>
      </div>

      <div className="settings-actions">
        <button className="btn-cancel" onClick={handleCancel}>Cancel Changes</button>
        <button className="btn-save-all" onClick={handleSaveAll}>
          <FiSave /> Save All Changes
        </button>
      </div>
    </div>
  );
}

export default AdminSettings;
