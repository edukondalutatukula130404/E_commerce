import React from 'react';
import { useApp } from '../../context/AppContext';
import { ShoppingBag, Shield, User } from 'lucide-react';

export const Navbar = () => {
  const { 
    currentPage, 
    setCurrentPage, 
    cart, 
    user
  } = useApp();

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'catalog', label: 'Catalog' },
    { id: 'about', label: 'About Us' },
    { id: 'blogs', label: 'Blogs' },
    { id: 'faq', label: 'FAQ' },
    { id: 'terms', label: 'Terms' }
  ];

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

        {/* FAR RIGHT / LAST: Cart & Admin/Login Actions */}
        <div style={{ justifySelf: 'end', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
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

          <button
            onClick={() => setCurrentPage(user ? (user.role === 'admin' ? 'admin' : 'user-dashboard') : 'auth')}
            className="btn btn-secondary"
            style={{ padding: '0.4rem 0.85rem', height: '36px', fontSize: '0.8rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.4rem' }}
          >
            {user?.role === 'admin' ? <Shield size={15} color="#ba0c2f" /> : <User size={15} />}
            <span>{user ? (user.role === 'admin' ? 'Admin' : user.name.split(' ')[0]) : 'Login'}</span>
          </button>
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
            const isActive = currentPage === link.id;
            return (
              <button
                key={link.id}
                onClick={() => setCurrentPage(link.id)}
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

          {user?.role === 'admin' && (
            <button
              onClick={() => setCurrentPage('admin')}
              className="btn btn-primary"
              style={{
                padding: '0.35rem 0.95rem',
                fontSize: '0.82rem',
                fontWeight: 800,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                minHeight: '34px',
                marginLeft: '0.5rem'
              }}
            >
              <Shield size={14} /> Admin Command
            </button>
          )}
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
