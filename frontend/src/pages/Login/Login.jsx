import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../../services/api.js';
import { useAuth } from '../../context/AuthContext.jsx';
import { toast } from 'react-toastify';
import { FiMail, FiLock, FiArrowRight } from 'react-icons/fi';
import { FaCar } from 'react-icons/fa';
import './Login.css';

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) { toast.error('Please fill all fields'); return; }
    setLoading(true);
    try {
      const res = await loginUser(form);
      login(res.data.token, res.data.user);
      toast.success('Welcome back!');
      navigate(res.data.user.role === 'admin' ? '/admin' : '/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    } finally { setLoading(false); }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-visual">
          <div className="auth-visual-content">
            <FaCar size={56} />
            <h2>Welcome Back</h2>
            <p>Sign in to manage your vehicle service bookings and track appointments.</p>
          </div>
        </div>
        <div className="auth-form-section">
          <form className="auth-form" onSubmit={handleSubmit} id="login-form">
            <h1 className="auth-title">Sign In</h1>
            <p className="auth-subtitle">Enter your credentials to access your account</p>
            <div className="form-group"><label className="form-label"><FiMail size={14}/> Email</label><input type="email" name="email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} placeholder="your@email.com" required id="login-email"/></div>
            <div className="form-group"><label className="form-label"><FiLock size={14}/> Password</label><input type="password" name="password" value={form.password} onChange={e=>setForm({...form, password:e.target.value})} placeholder="••••••••" required id="login-password"/></div>
            <button type="submit" className="btn btn-primary btn-lg auth-submit" disabled={loading} id="login-submit">{loading ? 'Signing in...' : 'Sign In'} <FiArrowRight/></button>
            <p className="auth-switch">Don't have an account? <Link to="/register">Create one</Link></p>
          </form>
        </div>
      </div>
    </div>
  );
}
export default Login;
