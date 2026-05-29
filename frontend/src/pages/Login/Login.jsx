import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../../services/api.js';
import { useAuth } from '../../context/AuthContext.jsx';
import { toast } from 'react-toastify';
import { FiMail, FiLock, FiArrowRight } from 'react-icons/fi';
import './Login.css';

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await loginUser(form);
      login(res.data.token, res.data.user);
      toast.success('Welcome back!');
      
      if (res.data.user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/book/all');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
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
              <h1 className="auth-title">Welcome Back</h1>
              <p className="auth-subtitle">Sign in to AutoServe Pro</p>
            </div>
            
            <div className="form-group-auth">
              <label className="form-label-auth"><FiMail size={14} /> Email</label>
              <input 
                type="email" 
                name="email" 
                className="input-auth"
                value={form.email} 
                onChange={handleChange} 
                placeholder="admin@autoservepro.com" 
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
              {loading ? 'Signing in...' : 'Sign In'} <FiArrowRight />
            </button>
            
            <p className="auth-switch">
              Don't have an account? <Link to="/register">Create one</Link>
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

export default Login;
