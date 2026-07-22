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
        
        {/* Top Header Row (Logo, Center Brand Name, Right Actions) */}
        <div className="header-main-row" style={{ display: 'grid', gridTemplateColumns: 'auto 1fr auto', alignItems: 'center', width: '100%', gap: '0.5rem' }}>
          
          {/* 1. LEFT SIDE: Larger Logo Image */}
          <a 
            href="/"
            onClick={(e) => {
              e.preventDefault();
              setCurrentPage('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }} 
            className="left-logo-img-link"
            title="SWITCHES — Go to Homepage"
            style={{ justifySelf: 'start' }}
          >
            <img
              src="/logo.png"
              alt="SWITCHES Logo"
              style={{
                height: '4.5rem',
                width: 'auto',
                maxHeight: '70px',
                objectFit: 'contain',
                filter: 'drop-shadow(0 4px 12px rgba(186, 12, 47, 0.45))'
              }}
            />
          </a>

          {/* 2. MIDDLE / CENTER: Centered Brand Name Text */}
          <a 
            href="/"
            onClick={(e) => {
              e.preventDefault();
              setCurrentPage('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="middle-brand-name-link"
            title="SWITCHES — Homepage"
            style={{ justifySelf: 'center', textAlign: 'center' }}
          >
            <span style={{ fontSize: '1.4rem', fontWeight: 900, letterSpacing: '0.4px', color: 'var(--text-main)', lineHeight: 1 }}>
              SWITCHES<span style={{ color: 'hsl(var(--hue-primary), 85%, 50%)' }}>.</span>
            </span>
            <span style={{ fontSize: '0.58rem', fontWeight: 700, letterSpacing: '1px', color: 'var(--text-muted)' }} className="logo-tagline">
              SINCE 2026
            </span>
          </a>

          {/* 3. RIGHT SIDE: Actions (Compact Mini Cart & User) */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', justifySelf: 'end' }} className="header-right-actions">
            
            {/* Cart Button */}
            <button 
              onClick={() => setCurrentPage('cart')} 
              className="btn btn-primary desktop-cart-btn"
              style={{ padding: '0.22rem 0.45rem', position: 'relative', minHeight: '26px', fontSize: '0.7rem', display: 'flex', alignItems: 'center', gap: '0.2rem' }}
            >
              <ShoppingBag size={13} />
              <span style={{ fontSize: '0.7rem', fontWeight: 700 }} className="cart-text">Cart</span>
              {totalCartCount > 0 && (
                <span className="badge badge-primary animate-bounce" style={{ background: '#fff', color: '#ba0c2f', fontSize: '0.58rem', fontWeight: 800, padding: '0.05rem 0.25rem', borderRadius: '8px' }}>
                  {totalCartCount}
                </span>
              )}
            </button>

            {/* User / Login Button */}
            <button
              onClick={() => setCurrentPage(user ? (user.role === 'admin' ? 'admin' : 'user-dashboard') : 'auth')}
              className="btn btn-secondary desktop-user-btn"
              style={{ padding: '0.22rem 0.45rem', display: 'flex', alignItems: 'center', gap: '0.2rem', minHeight: '26px', fontSize: '0.7rem' }}
            >
              {user?.role === 'admin' ? <Shield size={13} color="#ba0c2f" /> : <User size={13} />}
              <span style={{ fontSize: '0.7rem', fontWeight: 600 }}>
                {user ? (user.role === 'admin' ? 'Admin' : user.name.split(' ')[0]) : 'Login'}
              </span>
            </button>

          </div>
        </div>

        {/* Navigation Links */}
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

      </div>

      <style>{`
        .header-inner-container {
          width: 100% !important;
          max-width: var(--container-max);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
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
            padding: 0.4rem 0 0.15rem !important;
            margin: 0 !important;
          }
          .header-inner-container {
            display: flex !important;
            flex-direction: column !important;
            align-items: stretch !important;
            padding: 0 0.65rem !important;
            width: 100% !important;
            gap: 0.25rem !important;
          }
          .header-main-row {
            display: grid !important;
            grid-template-columns: auto 1fr auto !important;
            align-items: center !important;
            width: 100% !important;
          }
          .left-logo-img-link img {
            height: 46px !important;
            max-height: 46px !important;
          }
          .middle-brand-name-link {
            justify-self: center !important;
            text-align: center !important;
          }
          .middle-brand-name-link span {
            font-size: 1.2rem !important;
          }
          .desktop-nav-links {
            display: flex !important;
            width: 100% !important;
            overflow-x: auto !important;
            -webkit-overflow-scrolling: touch !important;
            scrollbar-width: none !important;
            border-top: 1px solid var(--border-light) !important;
            padding: 0.3rem 0 0.1rem !important;
            margin: 0 !important;
            gap: 0.2rem !important;
          }
          .desktop-nav-links::-webkit-scrollbar {
            display: none !important;
          }
          .desktop-nav-links button {
            white-space: nowrap !important;
            padding: 0.25rem 0.6rem !important;
            font-size: 0.78rem !important;
            flex-shrink: 0 !important;
            min-height: 30px !important;
          }
          .header-right-actions {
            display: flex !important;
            align-items: center !important;
            gap: 0.25rem !important;
            justify-self: end !important;
          }
          .desktop-user-btn {
            display: flex !important;
            padding: 0.18rem 0.4rem !important;
            font-size: 0.68rem !important;
            min-height: 24px !important;
          }
          .desktop-cart-btn {
            display: flex !important;
            padding: 0.18rem 0.4rem !important;
            font-size: 0.68rem !important;
            min-height: 24px !important;
          }
          .logo-tagline { display: none !important; }
        }
      `}</style>
    </header>
  );
};
