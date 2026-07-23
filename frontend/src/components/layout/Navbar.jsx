import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { ShoppingBag, Shield, User, Package, Heart, CreditCard, Wallet, LogOut, ChevronDown, MapPin } from 'lucide-react';

export const Navbar = () => {
  const { 
    currentPage, 
    setCurrentPage, 
    cart, 
    user,
    setUser,
    setUserDashboardTab,
    showToast
  } = useApp();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const navLinks = [
    { id: 'home', label: 'Home', page: 'home' },
    { id: 'categories', label: 'Categories', page: 'catalog' },
    { id: 'catalog', label: 'Catalog', page: 'catalog' },
    { id: 'about', label: 'About Us', page: 'about' },
    { id: 'blogs', label: 'Blogs', page: 'blogs' },
    { id: 'faq', label: 'FAQ', page: 'faq' },
    { id: 'terms', label: 'Terms', page: 'terms' }
  ];

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('switches_user');
    showToast('Logged out of SWITCHES');
    setCurrentPage('home');
    setIsDropdownOpen(false);
  };

  return (
    <header 
      className="glass-header" 
      style={{ 
        width: '100%', 
        borderBottom: '1px solid var(--border-light)', 
        position: 'sticky', 
        top: 0, 
        zIndex: 1000, 
        background: 'var(--bg-glass-heavy)', 
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* 1. Main Top Header Grid (Logo Left, Brand Name Middle, Cart/Admin Right) */}
      <div 
        style={{ 
          maxWidth: 'var(--container-max)', 
          width: '100%',
          margin: '0 auto', 
          padding: '0.65rem 2rem', 
          display: 'grid', 
          gridTemplateColumns: '1fr auto 1fr', 
          alignItems: 'center' 
        }}
      >
        {/* FAR LEFT: Logo Image */}
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            setCurrentPage('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          style={{ justifySelf: 'start', textDecoration: 'none', display: 'flex', alignItems: 'center' }}
          title="SWITCHES — Go to Homepage"
        >
          <img
            src="/logo.png"
            alt="SWITCHES Logo"
            style={{ 
              height: '42px', 
              width: 'auto', 
              objectFit: 'contain', 
              filter: 'drop-shadow(0 2px 8px rgba(186, 12, 47, 0.35))' 
            }}
          />
        </a>

        {/* MIDDLE / CENTER: Brand Name */}
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            setCurrentPage('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          style={{ justifySelf: 'center', textAlign: 'center', textDecoration: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
          title="SWITCHES — Homepage"
        >
          <span style={{ fontSize: '1.4rem', fontWeight: 900, letterSpacing: '0.5px', color: 'var(--text-main)', lineHeight: 1 }}>
            SWITCHES<span style={{ color: 'hsl(var(--hue-primary), 85%, 50%)' }}>.</span>
          </span>
          <span style={{ fontSize: '0.58rem', fontWeight: 800, letterSpacing: '1px', color: 'var(--text-muted)', marginTop: '2px' }}>
            SINCE 2026
          </span>
        </a>

        {/* FAR RIGHT / LAST: Cart & User Dropdown Actions */}
        <div className="hide-mobile" style={{ justifySelf: 'end', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <button
            onClick={() => setCurrentPage('cart')}
            className="btn btn-secondary"
            style={{ padding: '0.4rem 0.85rem', position: 'relative', height: '36px', fontSize: '0.8rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.4rem' }}
          >
            <ShoppingBag size={15} />
            <span>Cart</span>
            {totalCartCount > 0 && (
              <span className="badge badge-primary" style={{ background: '#ba0c2f', color: '#fff', fontSize: '0.65rem', fontWeight: 900, padding: '0.1rem 0.4rem', borderRadius: 'var(--radius-full)' }}>
                {totalCartCount}
              </span>
            )}
          </button>

          {/* User Account Button & Interactive Dropdown Menu */}
          <div style={{ position: 'relative' }} ref={dropdownRef}>
            <button
              onClick={() => {
                if (!user) {
                  setCurrentPage('auth');
                } else {
                  setIsDropdownOpen(!isDropdownOpen);
                }
              }}
              className="btn btn-secondary"
              style={{
                padding: '0.4rem 0.85rem',
                height: '36px',
                fontSize: '0.8rem',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                borderRadius: 'var(--radius-md)',
                background: isDropdownOpen ? 'rgba(186, 12, 47, 0.15)' : undefined
              }}
            >
              {user?.role === 'admin' ? <Shield size={15} color="#ba0c2f" /> : <User size={15} />}
              <span>{user ? (user.role === 'admin' ? 'Admin' : (user.name ? user.name.split(' ')[0] : 'User')) : 'Login'}</span>
              {user && (
                <ChevronDown 
                  size={13} 
                  style={{ 
                    transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)', 
                    transition: 'transform 0.2s ease',
                    opacity: 0.7 
                  }} 
                />
              )}
            </button>

            {/* Glassmorphic Dropdown Menu */}
            {user && isDropdownOpen && (
              <div
                className="animate-fade-in"
                style={{
                  position: 'absolute',
                  top: 'calc(100% + 0.5rem)',
                  right: 0,
                  width: '230px',
                  background: 'var(--bg-glass-heavy)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  border: '1px solid var(--border-active)',
                  borderRadius: 'var(--radius-lg)',
                  boxShadow: 'var(--shadow-xl)',
                  padding: '0.5rem',
                  zIndex: 2000,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.25rem'
                }}
              >
                {/* Header User Card */}
                <div style={{ padding: '0.6rem 0.75rem', borderBottom: '1px solid var(--border-light)', display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <img
                    src={user.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'}
                    alt={user.name}
                    style={{ width: '34px', height: '34px', borderRadius: '50%', objectFit: 'cover', border: '1px solid var(--border-active)' }}
                  />
                  <div style={{ minWidth: 0, flex: 1 }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: 800, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {user.name || 'Member User'}
                    </div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {user.email}
                    </div>
                  </div>
                </div>

                {/* Admin Command Panel Link if Admin Role */}
                {user.role === 'admin' && (
                  <button
                    onClick={() => {
                      setCurrentPage('admin');
                      setIsDropdownOpen(false);
                    }}
                    className="btn"
                    style={{
                      padding: '0.5rem 0.75rem',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      justifyContent: 'flex-start',
                      gap: '0.6rem',
                      color: '#ba0c2f',
                      background: 'rgba(186, 12, 47, 0.08)',
                      borderRadius: 'var(--radius-md)'
                    }}
                  >
                    <Shield size={15} color="#ba0c2f" /> Admin Command Panel
                  </button>
                )}

                {/* 1. My Profile */}
                <button
                  onClick={() => {
                    setCurrentPage('user-dashboard');
                    setIsDropdownOpen(false);
                  }}
                  className="btn"
                  style={{
                    padding: '0.5rem 0.75rem',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    justifyContent: 'flex-start',
                    gap: '0.6rem',
                    color: 'var(--text-main)',
                    background: 'transparent',
                    borderRadius: 'var(--radius-md)'
                  }}
                >
                  <User size={15} color="hsl(var(--hue-primary), 85%, 50%)" /> My Profile
                </button>

                {/* 2. My Orders */}
                <button
                  onClick={() => {
                    setCurrentPage('orders');
                    setIsDropdownOpen(false);
                  }}
                  className="btn"
                  style={{
                    padding: '0.5rem 0.75rem',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    justifyContent: 'flex-start',
                    gap: '0.6rem',
                    color: 'var(--text-main)',
                    background: 'transparent',
                    borderRadius: 'var(--radius-md)'
                  }}
                >
                  <Package size={15} color="hsl(var(--hue-primary), 85%, 50%)" /> My Orders
                </button>

                {/* 3. My Wishlist */}
                <button
                  onClick={() => {
                    setCurrentPage('wishlist');
                    setIsDropdownOpen(false);
                  }}
                  className="btn"
                  style={{
                    padding: '0.5rem 0.75rem',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    justifyContent: 'flex-start',
                    gap: '0.6rem',
                    color: 'var(--text-main)',
                    background: 'transparent',
                    borderRadius: 'var(--radius-md)'
                  }}
                >
                  <Heart size={15} color="#ff4757" /> My Wishlist
                </button>

                {/* 4. Saved Addresses */}
                <button
                  onClick={() => {
                    setUserDashboardTab('addresses');
                    setCurrentPage('user-dashboard');
                    setIsDropdownOpen(false);
                  }}
                  className="btn"
                  style={{
                    padding: '0.5rem 0.75rem',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    justifyContent: 'flex-start',
                    gap: '0.6rem',
                    color: 'var(--text-main)',
                    background: 'transparent',
                    borderRadius: 'var(--radius-md)'
                  }}
                >
                  <MapPin size={15} color="hsl(var(--hue-primary), 85%, 50%)" /> Saved Address
                </button>

                {/* 4. Payment History */}
                <button
                  onClick={() => {
                    setCurrentPage('user-dashboard');
                    setIsDropdownOpen(false);
                  }}
                  className="btn"
                  style={{
                    padding: '0.5rem 0.75rem',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    justifyContent: 'flex-start',
                    gap: '0.6rem',
                    color: 'var(--text-main)',
                    background: 'transparent',
                    borderRadius: 'var(--radius-md)'
                  }}
                >
                  <CreditCard size={15} color="hsl(var(--hue-primary), 85%, 50%)" /> Payment History
                </button>

                {/* 5. My Wallet */}
                <button
                  onClick={() => {
                    setCurrentPage('user-dashboard');
                    setIsDropdownOpen(false);
                  }}
                  className="btn"
                  style={{
                    padding: '0.5rem 0.75rem',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    justifyContent: 'flex-start',
                    gap: '0.6rem',
                    color: 'var(--text-main)',
                    background: 'transparent',
                    borderRadius: 'var(--radius-md)'
                  }}
                >
                  <Wallet size={15} color="hsl(var(--hue-primary), 85%, 50%)" /> My Wallet
                </button>

                <div style={{ height: '1px', background: 'var(--border-light)', margin: '0.15rem 0' }} />

                {/* 6. Logout (Last Option) */}
                <button
                  onClick={handleLogout}
                  className="btn"
                  style={{
                    padding: '0.5rem 0.75rem',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    justifyContent: 'flex-start',
                    gap: '0.6rem',
                    color: '#ff4757',
                    background: 'rgba(255, 71, 87, 0.08)',
                    borderRadius: 'var(--radius-md)'
                  }}
                >
                  <LogOut size={15} /> Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 2. Sub Header Row (Pages Navigation Bar Below Main Nav) */}
      <div 
        className="desktop-nav-links"
        style={{ 
          width: '100%',
          borderTop: '1px solid var(--border-light)',
          background: 'rgba(0, 0, 0, 0.02)',
          padding: '0.35rem 1.25rem',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', flexWrap: 'wrap', maxWidth: 'var(--container-max)', width: '100%' }}>
          {navLinks.map((link) => {
            const targetPage = link.page || link.id;
            const isActive = currentPage === targetPage;
            return (
              <button
                key={link.id}
                onClick={() => setCurrentPage(targetPage)}
                className="btn"
                style={{
                  padding: '0.35rem 0.95rem',
                  fontSize: '0.85rem',
                  fontWeight: isActive ? 800 : 600,
                  background: isActive ? 'rgba(186, 12, 47, 0.12)' : 'transparent',
                  color: isActive ? 'hsl(var(--hue-primary), 85%, 50%)' : 'var(--text-main)',
                  borderRadius: 'var(--radius-md)',
                  border: 'none',
                  minHeight: '34px'
                }}
              >
                {link.label}
              </button>
            );
          })}
        </nav>
      </div>

      <style>{`
        @media (max-width: 899px) {
          .desktop-nav-links {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
};
