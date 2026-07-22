import React from 'react';
import { useApp } from '../../context/AppContext';
import { ShoppingBag, Search, User, Shield } from 'lucide-react';

export const Navbar = () => {
  const { 
    currentPage, 
    setCurrentPage, 
    cart, 
    wishlist, 
    searchQuery, 
    setSearchQuery,
    user
  } = useApp();

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (currentPage !== 'catalog') {
      setCurrentPage('catalog');
    }
  };

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'catalog', label: 'Catalog' },
    { id: 'about', label: 'About Us' },
    { id: 'blogs', label: 'Blogs' },
    { id: 'faq', label: 'FAQ' },
    { id: 'terms', label: 'Terms' }
  ];

  return (
    <header className="glass-header" style={{ width: '100%', maxWidth: '100vw', margin: 0, padding: 0 }}>
      <div className="header-inner-container">
        
        {/* 1. LEFT SIDE: Extra Large Logo Image */}
        <a 
          href="/"
          onClick={(e) => {
            e.preventDefault();
            setCurrentPage('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }} 
          className="left-logo-img-link"
          title="SWITCHES — Go to Homepage"
        >
          <img
            src="/logo.png"
            alt="SWITCHES Logo"
            style={{
              height: '4.2rem',
              width: 'auto',
              maxHeight: '66px',
              objectFit: 'contain',
              filter: 'drop-shadow(0 4px 12px rgba(186, 12, 47, 0.45))'
            }}
          />
        </a>

        {/* 2. MIDDLE / CENTER: Brand Name Text */}
        <a 
          href="/"
          onClick={(e) => {
            e.preventDefault();
            setCurrentPage('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="middle-brand-name-link"
          title="SWITCHES — Homepage"
        >
          <span style={{ fontSize: '1.4rem', fontWeight: 900, letterSpacing: '0.4px', color: 'var(--text-main)', lineHeight: 1 }}>
            SWITCHES<span style={{ color: 'hsl(var(--hue-primary), 85%, 50%)' }}>.</span>
          </span>
          <span style={{ fontSize: '0.58rem', fontWeight: 700, letterSpacing: '1px', color: 'var(--text-muted)' }} className="logo-tagline">
            SINCE 2026
          </span>
        </a>

        {/* Navigation Links (Desktop/Tablet) */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }} className="desktop-nav-links">
          {navLinks.map((link) => {
            const isActive = currentPage === link.id;
            return (
              <button
                key={link.id}
                onClick={() => setCurrentPage(link.id)}
                className="btn"
                style={{
                  padding: '0.35rem 0.75rem',
                  fontSize: '0.85rem',
                  fontWeight: isActive ? 800 : 600,
                  background: isActive ? 'rgba(186, 12, 47, 0.12)' : 'transparent',
                  color: isActive ? 'hsl(var(--hue-primary), 85%, 50%)' : 'var(--text-main)',
                  border: 'none',
                  minHeight: '36px'
                }}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* 3. RIGHT SIDE: Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexShrink: 0 }} className="header-right-actions">
          
          {/* Cart Button (Desktop Only) */}
          <button 
            onClick={() => setCurrentPage('cart')} 
            className="btn btn-primary desktop-cart-btn"
            style={{ padding: '0.45rem 0.75rem', position: 'relative', minHeight: '38px' }}
          >
            <ShoppingBag size={17} />
            <span style={{ fontSize: '0.8rem' }} className="cart-text">Cart</span>
            {totalCartCount > 0 && (
              <span className="badge badge-primary animate-bounce" style={{ background: '#fff', color: '#ba0c2f', fontSize: '0.65rem', fontWeight: 800 }}>
                {totalCartCount}
              </span>
            )}
          </button>

          {/* User / Login Button (Desktop) */}
          <button
            onClick={() => setCurrentPage(user ? (user.role === 'admin' ? 'admin' : 'user-dashboard') : 'auth')}
            className="btn btn-secondary desktop-user-btn"
            style={{ padding: '0.4rem 0.75rem', display: 'flex', alignItems: 'center', gap: '0.35rem', minHeight: '38px' }}
          >
            {user?.role === 'admin' ? <Shield size={15} color="#ba0c2f" /> : <User size={15} />}
            <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>
              {user ? (user.role === 'admin' ? 'Admin' : user.name.split(' ')[0]) : 'Login'}
            </span>
          </button>

        </div>

      </div>

      <style>{`
        .header-inner-container {
          width: 100% !important;
          max-width: var(--container-max);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.5rem;
          position: relative;
          padding: 0 1rem;
          margin: 0 auto;
        }

        .left-logo-img-link {
          text-decoration: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          flex-shrink: 0;
        }

        .middle-brand-name-link {
          text-decoration: none;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        @media (min-width: 900px) {
          .desktop-search { display: block !important; }
        }

        @media (max-width: 767px) {
          .glass-header {
            width: 100vw !important;
            max-width: 100vw !important;
            padding: 0.35rem 0 !important;
            margin: 0 !important;
          }
          .header-inner-container {
            display: flex !important;
            flex-wrap: wrap !important;
            align-items: center !important;
            justify-content: space-between !important;
            padding: 0 0.85rem !important;
            width: 100% !important;
            gap: 0.4rem !important;
          }
          .left-logo-img-link img {
            height: 2.8rem !important;
          }
          .desktop-nav-links {
            display: flex !important;
            width: 100% !important;
            overflow-x: auto !important;
            -webkit-overflow-scrolling: touch !important;
            padding-bottom: 0.2rem !important;
            border-top: 1px solid var(--border-light) !important;
            padding-top: 0.35rem !important;
            gap: 0.2rem !important;
          }
          .desktop-nav-links button {
            white-space: nowrap !important;
            padding: 0.25rem 0.55rem !important;
            font-size: 0.78rem !important;
            flex-shrink: 0 !important;
          }
          .desktop-user-btn {
            display: flex !important;
            padding: 0.3rem 0.55rem !important;
            font-size: 0.75rem !important;
            min-height: 32px !important;
          }
          .desktop-cart-btn {
            display: flex !important;
            padding: 0.3rem 0.55rem !important;
            font-size: 0.75rem !important;
            min-height: 32px !important;
          }
          .logo-tagline { display: none !important; }
        }
      `}</style>
    </header>
  );
};
