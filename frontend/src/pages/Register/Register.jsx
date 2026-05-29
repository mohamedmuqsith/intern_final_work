import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../../services/api.js';
import { useAuth } from '../../context/AuthContext.jsx';
import { toast } from 'react-toastify';
import { FiUser, FiMail, FiPhone, FiLock, FiArrowRight } from 'react-icons/fi';
import '../Login/Login.css'; // Reusing Login styles for unified styling

function Register() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await registerUser(form);
      login(res.data.token, res.data.user);
      toast.success('Registration successful!');
      if (res.data.user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/book/all');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-form-section">
          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="auth-header-text">
              <h1 className="auth-title">Create Account</h1>
              <p className="auth-subtitle">Join AutoServe Pro today</p>
            </div>
            
            <div className="form-group-auth">
              <label className="form-label-auth"><FiUser size={14} /> Full Name</label>
              <input 
                type="text" 
                name="name" 
                className="input-auth"
                value={form.name} 
                onChange={handleChange} 
                placeholder="John Doe" 
                required 
              />
            </div>

            <div className="form-group-auth">
              <label className="form-label-auth"><FiMail size={14} /> Email</label>
              <input 
                type="email" 
                name="email" 
                className="input-auth"
                value={form.email} 
                onChange={handleChange} 
                placeholder="john@example.com" 
                required 
              />
            </div>

            <div className="form-group-auth">
              <label className="form-label-auth"><FiPhone size={14} /> Phone</label>
              <input 
                type="text" 
                name="phone" 
                className="input-auth"
                value={form.phone} 
                onChange={handleChange} 
                placeholder="+94 7X XXX XXXX" 
                required 
              />
            </div>
            
            <div className="form-group-auth">
              <label className="form-label-auth"><FiLock size={14} /> Password</label>
              <input 
                type="password" 
                name="password" 
                className="input-auth"
                value={form.password} 
                onChange={handleChange} 
                placeholder="••••••••" 
                required 
              />
            </div>
            
            <button type="submit" className="btn btn-primary btn-full btn-auth" disabled={loading}>
              {loading ? 'Registering...' : 'Register'} <FiArrowRight />
            </button>
            
            <p className="auth-switch">
              Already have an account? <Link to="/login">Sign In</Link>
            </p>
          </form>
        </div>
        
        <div className="auth-visual">
          <div className="auth-visual-content">
            <h2>AutoServe Pro</h2>
            <p>Precision Engineered Trust. Access your dashboard to manage bookings, services, and customers.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
