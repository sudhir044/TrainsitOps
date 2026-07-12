import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { api } from '../utils/api';
import './Login.css';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('admin@transitops.com');
  const [password, setPassword] = useState('password');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await api.login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <div className="login-brand">
          <div className="brand-logo-large">
            <div className="logo-dots-large">
              <div className="dot"></div><div className="dot"></div><div className="dot"></div>
              <div className="dot"></div><div className="dot"></div><div className="dot"></div>
              <div className="dot"></div><div className="dot"></div><div className="dot"></div>
            </div>
          </div>
          <h1>TransitOps</h1>
          <p>Fleet and Transport Management System</p>
        </div>
        
        <div className="login-features">
          <h3>Manage Your Fleet:</h3>
          <ul>
            <li>Dashboard overview</li>
            <li>Vehicle Registry</li>
            <li>Routes & Stops</li>
            <li>Trip Dispatcher</li>
            <li>Maintenance</li>
            <li>Fuel & Expenses</li>
          </ul>
        </div>
      </div>
      
      <div className="login-right">
        <div className="login-form-container">
          <h2>Sign in to your account</h2>
          <p className="login-subtitle">Enter your credentials to continue</p>
          
          {error && <div className="error-message" style={{ color: 'red', marginBottom: '1rem', fontSize: '0.875rem' }}>{error}</div>}

          <form onSubmit={handleLogin} className="login-form">
            <div className="form-group">
              <label>Email / Username</label>
              <input 
                type="text" 
                placeholder="admin@transitops.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Password</label>
              <input 
                type="password" 
                placeholder="••••••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            <div className="form-options">
              <label className="checkbox-label">
                <input type="checkbox" />
                <span>Remember me</span>
              </label>
              <a href="#" className="forgot-password">Forgot password?</a>
            </div>
            
            <button type="submit" className="login-btn" disabled={loading}>
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>
          
          <div className="login-footer">
            <p>Admin credentials for demo purpose:</p>
            <p>Username: <strong>admin@transitops.com</strong></p>
            <p>Password: <strong>password</strong></p>
          </div>
        </div>
      </div>
    </div>
  );
}
