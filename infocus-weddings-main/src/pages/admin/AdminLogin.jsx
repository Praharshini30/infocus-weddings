import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Camera, Lock, Eye, EyeOff } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import './Admin.css';

export default function AdminLogin() {
  const { adminLogin, showToast } = useApp();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    await new Promise(r => setTimeout(r, 600));
    const success = adminLogin(password);
    setLoading(false);
    if (success) {
      showToast('Welcome back, Admin!', 'success');
      navigate('/admin');
    } else {
      setError('Incorrect password. Please try again.');
    }
  };

  return (
    <div className="admin-login">
      <div className="admin-login__bg">
        <img src="/wedding_hero.png" alt="bg" />
        <div className="admin-login__overlay" />
      </div>

      <div className="admin-login__card glass-card">
        <div className="admin-login__logo">
          <div className="admin-login__logo-icon">
            <Camera size={24} />
          </div>
          <div>
            <span className="admin-login__logo-name">Infocus Weddings</span>
            <span className="admin-login__logo-sub">Admin Dashboard</span>
          </div>
        </div>

        <h1 className="admin-login__title">Welcome Back</h1>
        <p className="admin-login__desc">Enter your admin password to continue.</p>

        <form onSubmit={handleSubmit} className="admin-login__form">
          <div className="form-group">
            <label className="admin-label" htmlFor="admin-password">Password</label>
            <div style={{ position: 'relative' }}>
              <Lock size={16} style={{ position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)', pointerEvents: 'none' }} />
              <input
                id="admin-password"
                type={showPass ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="admin-input"
                placeholder="Enter admin password"
                style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPass(s => !s)}
                style={{ position: 'absolute', right: '0.875rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)', cursor: 'pointer' }}
                aria-label="Toggle password visibility"
              >
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {error && <span className="form-error">{error}</span>}
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: '100%', justifyContent: 'center' }}
            disabled={loading || !password}
            id="admin-login-btn"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p className="admin-login__hint">
          Demo password: <code>infocus2024</code>
        </p>

        <Link to="/" className="admin-login__back">← Back to website</Link>
      </div>
    </div>
  );
}
