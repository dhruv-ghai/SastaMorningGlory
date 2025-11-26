import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../utils/api.js';

const AdminLogin = () => {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      await api.post('/auth/login', form);
      navigate('/admin/articles');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBypassLogin = () => {
    // Bypass login and go directly to admin dashboard
    navigate('/admin/articles');
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-container">
        <div className="admin-login-header">
          <Link to="/" className="admin-login-logo">
            <div className="admin-login-logo-box">
              <span className="admin-login-logo-text">SMG</span>
            </div>
            <h1 className="admin-login-title">Sasta Morning Glory</h1>
          </Link>
          <p className="admin-login-subtitle">Admin Dashboard</p>
        </div>

        <div className="admin-login-card">
          <h2 className="admin-login-card-title">Sign In</h2>

          {error && (
            <div className="admin-error-box">
              <p className="admin-error-text">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="admin-form">
            <div className="admin-form-group">
              <label htmlFor="username" className="admin-form-label">
                Username
              </label>
              <input
                id="username"
                type="text"
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
                className="admin-form-input"
                placeholder="Enter your username"
                required
                autoComplete="username"
              />
            </div>

            <div className="admin-form-group">
              <label htmlFor="password" className="admin-form-label">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="admin-form-input"
                placeholder="Enter your password"
                required
                autoComplete="current-password"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="admin-btn-primary"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>

            <button
              type="button"
              onClick={handleBypassLogin}
              className="admin-btn-bypass"
            >
              🚀 Quick Access (Bypass Login)
            </button>
            <button
              type="button"
              onClick={handleBypassLogin}
              className="admin-btn-dashboard"
            >
              🔐 Go Straight to Admin Dashboard
            </button>
          </form>

          <div className="admin-back-link">
            <Link to="/">← Back to Home</Link>
          </div>
        </div>

        <div className="admin-credentials-hint">
          <p className="admin-credentials-hint-text">
            Default: <span className="admin-credentials-hint-code">admin / 12345678</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
