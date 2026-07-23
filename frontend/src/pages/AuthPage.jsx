import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Shield, ArrowLeft, Eye, EyeOff } from 'lucide-react';

export const AuthPage = () => {
  const { user, setUser, loginWithCredentials, registerUser, setCurrentPage, showToast } = useApp();
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (user?.role === 'admin') {
      setCurrentPage('admin');
    }
  }, [user, setCurrentPage]);

  const handleCredentialSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      showToast('Please enter an email address');
      return;
    }
    if (isRegister) {
      await registerUser(name, email, password);
    } else {
      await loginWithCredentials(email, password);
    }
  };

  const autofillSeed = (type) => {
    if (type === 'admin') {
      setEmail('admin@switches.io');
      setPassword('admin123');
    } else {
      setEmail('alex@switches.io');
      setPassword('user123');
    }
  };

  const handleDemoLogin = (role) => {
    if (role === 'admin') {
      loginWithCredentials('admin@switches.io', 'admin123');
    } else {
      loginWithCredentials('alex@switches.io', 'user123');
    }
  };

  const handleLogout = () => {
    setUser(null);
    showToast('Logged out of SWITCHES');
    setCurrentPage('home');
  };

  return (
    <div className="animate-fade-in" style={{ paddingTop: '1rem', paddingBottom: '4rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      
      {/* Back Button */}
      <div style={{ width: '100%', maxWidth: '440px', marginBottom: '0.85rem' }}>
        <button 
          onClick={() => setCurrentPage('home')} 
          className="btn btn-secondary"
          style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem', minHeight: '34px' }}
        >
          <ArrowLeft size={15} /> Back
        </button>
      </div>

      <div className="card" style={{ width: '100%', maxWidth: '440px', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        
        {/* Brand Header */}
        <div style={{ textAlign: 'center' }}>
          <img src="/logo.png" alt="SWITCHES Logo" style={{ height: '2.5rem', width: 'auto', marginBottom: '0.4rem' }} />
          <h2 style={{ fontSize: '1.4rem', fontWeight: 900 }}>
            {user ? 'My Account' : (isRegister ? 'Create Account' : 'Welcome to SWITCHES')}
          </h2>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            {user ? 'Manage orders, wishlist & account settings' : 'Access instant checkout, tracking, and VIP drops'}
          </p>
        </div>

        {user ? (
          <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <img
              src={user.avatar}
              alt={user.name}
              style={{ width: '72px', height: '72px', borderRadius: 'var(--radius-full)', margin: '0 auto', border: '3px solid var(--border-active)', objectFit: 'cover' }}
            />
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800 }}>{user.name}</h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{user.email}</p>
              <span className="badge badge-primary" style={{ marginTop: '0.4rem' }}>
                Role: {user.role.toUpperCase()}
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginTop: '0.4rem' }}>
              {user.role === 'admin' ? (
                <button onClick={() => setCurrentPage('admin')} className="btn btn-primary">
                  <Shield size={16} /> Open Store Admin Panel
                </button>
              ) : (
                <button onClick={() => setCurrentPage('user-dashboard')} className="btn btn-primary">
                  Open Customer Dashboard
                </button>
              )}
              <button onClick={() => setCurrentPage('orders')} className="btn btn-secondary">
                View Order History
              </button>
              <button onClick={handleLogout} className="btn btn-secondary" style={{ color: '#ff4757' }}>
                Log Out
              </button>
            </div>
          </div>
        ) : (
          <>
            <form onSubmit={handleCredentialSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {isRegister && (
                <div>
                  <label style={{ fontSize: '0.78rem', fontWeight: 700, display: 'block', marginBottom: '0.2rem' }}>Full Name</label>
                  <input
                    type="text"
                    placeholder="Alex Mercer"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{ width: '100%', padding: '0.6rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', background: 'var(--bg-secondary)', color: 'var(--text-main)', fontSize: '0.85rem' }}
                  />
                </div>
              )}

              <div>
                <label style={{ fontSize: '0.78rem', fontWeight: 700, display: 'block', marginBottom: '0.2rem' }}>Email Address</label>
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ width: '100%', padding: '0.6rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', background: 'var(--bg-secondary)', color: 'var(--text-main)', fontSize: '0.85rem' }}
                />
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.2rem' }}>
                  <label style={{ fontSize: '0.78rem', fontWeight: 700 }}>Password</label>
                  {!isRegister && (
                    <button
                      type="button"
                      onClick={() => setCurrentPage('forgot-password')}
                      style={{ background: 'none', border: 'none', color: 'hsl(var(--hue-primary), 85%, 50%)', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer' }}
                    >
                      Forgot Password?
                    </button>
                  )}
                </div>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ width: '100%', padding: '0.6rem 2.4rem 0.6rem 0.6rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', background: 'var(--bg-secondary)', color: 'var(--text-main)', fontSize: '0.85rem' }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: 'absolute',
                      right: '0.6rem',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none',
                      border: 'none',
                      color: 'var(--text-muted)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      padding: '0.2rem'
                    }}
                    title={showPassword ? 'Hide Password' : 'Show Password'}
                  >
                    {showPassword ? <Eye size={16} color="hsl(var(--hue-primary), 85%, 50%)" /> : <EyeOff size={16} />}
                  </button>
                </div>
              </div>

              <button type="submit" className="btn btn-primary" style={{ padding: '0.7rem', marginTop: '0.35rem', fontSize: '0.875rem' }}>
                {isRegister ? 'Register Account' : 'Sign In'}
              </button>
            </form>

            <div style={{ textAlign: 'center', fontSize: '0.8rem', marginTop: '0.5rem' }}>
              <button 
                onClick={() => setIsRegister(!isRegister)} 
                style={{ background: 'none', border: 'none', color: 'hsl(var(--hue-primary), 85%, 50%)', fontWeight: 700, cursor: 'pointer' }}
              >
                {isRegister ? 'Already have an account? Sign In' : 'Need an account? Register'}
              </button>
            </div>
          </>
        )}

      </div>
    </div>
  );
};
