import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../../services/api.js';
import { useAuth } from '../../context/AuthContext.jsx';
import { toast } from 'react-toastify';
import { FiUser, FiMail, FiLock, FiPhone, FiArrowRight } from 'react-icons/fi';
import { FaCar } from 'react-icons/fa';
import '../Login/Login.css';

function Register() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirmPassword: '' });
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) { toast.error('Passwords do not match'); return; }
    if (form.password.length < 6) { toast.error('Password must be at least 6 characters'); return; }
    setLoading(true);
    try {
      const res = await registerUser({ name: form.name, email: form.email, phone: form.phone, password: form.password });
      login(res.data.token, res.data.user);
      toast.success('Account created successfully!');
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
    } finally { setLoading(false); }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-visual">
          <div className="auth-visual-content"><FaCar size={56}/><h2>Join AutoCare Pro</h2><p>Create an account to book services, track appointments, and get exclusive offers.</p></div>
        </div>
        <div className="auth-form-section">
          <form className="auth-form" onSubmit={handleSubmit} id="register-form">
            <h1 className="auth-title">Create Account</h1>
            <p className="auth-subtitle">Fill in your details to get started</p>
            <div className="form-group"><label className="form-label"><FiUser size={14}/> Full Name</label><input name="name" value={form.name} onChange={handleChange} placeholder="John Doe" required id="reg-name"/></div>
            <div className="form-group"><label className="form-label"><FiMail size={14}/> Email</label><input type="email" name="email" value={form.email} onChange={handleChange} placeholder="your@email.com" required id="reg-email"/></div>
            <div className="form-group"><label className="form-label"><FiPhone size={14}/> Phone</label><input name="phone" value={form.phone} onChange={handleChange} placeholder="+94 7X XXX XXXX" id="reg-phone"/></div>
            <div className="form-group"><label className="form-label"><FiLock size={14}/> Password</label><input type="password" name="password" value={form.password} onChange={handleChange} placeholder="Min 6 characters" required id="reg-password"/></div>
            <div className="form-group"><label className="form-label"><FiLock size={14}/> Confirm Password</label><input type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} placeholder="••••••••" required id="reg-confirm"/></div>
            <button type="submit" className="btn btn-primary btn-lg auth-submit" disabled={loading} id="reg-submit">{loading ? 'Creating...' : 'Create Account'} <FiArrowRight/></button>
            <p className="auth-switch">Already have an account? <Link to="/login">Sign In</Link></p>
          </form>
        </div>
      </div>
    </div>
  );
}
export default Register;
