import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { ShoppingBag, Shield, User, Package, Heart, CreditCard, Wallet, LogOut, ChevronDown, MapPin, Bell, Check, Trash2, X, BarChart3, Users, Layers, Tag, Ticket, Settings } from 'lucide-react';

export const Navbar = () => {
  const { 
    currentPage, 
    setCurrentPage, 
    cart, 
    user,
    setUser,
    setUserDashboardTab,
    setAdminActiveTab,
    showToast,
    notifications = [],
    removeNotification,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    clearAllNotifications
  } = useApp();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const dropdownRef = useRef(null);
  const notifRef = useRef(null);

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const unreadCount = notifications.filter(n => n.unread).length;

  const navLinks = [
    { id: 'home', label: 'Home', page: 'home' },
    { id: 'categories', label: 'Categories', page: 'catalog' },
    { id: 'catalog', label: 'Catalog', page: 'catalog' },
    { id: 'about', label: 'About Us', page: 'about' },
    { id: 'blogs', label: 'Blogs', page: 'blogs' },
    { id: 'faq', label: 'FAQ', page: 'faq' },
    { id: 'terms', label: 'Terms', page: 'terms' }
  ];

  // Close dropdowns on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setIsNotifOpen(false);
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
        top: document.getElementById('top-promo-banner') ? '38px' : 0,
        zIndex: 1000, 
        background: 'var(--bg-glass-heavy)', 
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* 1. Main Top Header Bar (Logo Left, Centered Title Middle, Actions Right) */}
      <div 
        style={{ 
          maxWidth: 'var(--container-max)', 
          width: '100%',
          margin: '0 auto', 
          padding: '0.55rem 1rem', 
          display: 'grid', 
          gridTemplateColumns: '1fr auto 1fr', 
          alignItems: 'center',
          gap: '0.5rem',
          position: 'relative'
        }}
      >
        {/* FAR LEFT (START): Logo Image & Mobile User Greeting Badge */}
        <div style={{ justifySelf: 'start', display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              setCurrentPage('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="hide-mobile"
            style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', flexShrink: 0 }}
            title="SWITCHES — Go to Homepage"
          >
            <img
              src="/logo.png"
              alt="SWITCHES Logo"
              style={{ 
                height: '46px', 
                width: 'auto', 
                objectFit: 'contain', 
                filter: 'drop-shadow(0 2px 10px rgba(186, 12, 47, 0.35))' 
              }}
            />
          </a>

          {/* Logged-In User Greeting Badge (Shown on Mobile when logged in on Home Page) */}
          {user && currentPage === 'home' && (
            <div 
              className="animate-fade-in hide-desktop"
              onClick={() => {
                if (typeof setUserDashboardTab === 'function') setUserDashboardTab('menu');
                setCurrentPage('user-dashboard');
              }}
              style={{ 
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                padding: '0.18rem 0.6rem 0.18rem 0.2rem',
                borderRadius: '9999px',
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-light)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                whiteSpace: 'nowrap',
                maxWidth: '140px',
                position: 'absolute',
                left: '0.85rem',
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 10
              }}
              title="View Account"
            >
              <img
                src={user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'}
                alt={user?.name || 'User'}
                style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '1.5px solid hsl(var(--hue-primary), 85%, 50%)',
                  flexShrink: 0
                }}
              />
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-main)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                Hi, <span style={{ color: '#ba0c2f' }}>{user?.name ? user.name.split(' ')[0] : 'User'}</span>
              </span>
            </div>
          )}
        </div>

        {/* CENTER / MIDDLE: Centered Brand Title */}
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            setCurrentPage('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          style={{ 
            justifySelf: 'center', 
            textAlign: 'center', 
            textDecoration: 'none', 
            display: 'flex', 
            flexDirection: 'column',
            alignItems: 'center', 
            justifyContent: 'center',
            minWidth: 0,
            overflow: 'hidden'
          }}
          title="SWITCHES — Homepage"
        >
          <span style={{ 
            fontSize: 'clamp(1.15rem, 3.8vw, 1.4rem)', 
            fontWeight: 900, 
            letterSpacing: '0.6px', 
            color: 'var(--text-main)', 
            lineHeight: 1, 
            whiteSpace: 'nowrap',
            textTransform: 'uppercase'
          }}>
            SWITCHES<span style={{ color: '#ba0c2f' }}>.</span>
          </span>
          <span style={{ 
            fontSize: '0.52rem', 
            fontWeight: 800, 
            letterSpacing: '1.5px', 
            color: 'var(--text-muted)', 
            marginTop: '2px', 
            whiteSpace: 'nowrap',
            textTransform: 'uppercase',
            opacity: 0.8
          }}>
            SINCE 2026
          </span>
        </a>

        {/* FAR RIGHT: Header Options (Cart, User Account / Login) */}
        <div style={{ justifySelf: 'end', display: 'flex', alignItems: 'center', gap: '0.55rem', flexShrink: 0 }}>
          
          {/* Desktop Cart Button */}
          <button
            onClick={() => setCurrentPage('cart')}
            className="hide-mobile"
            style={{
              padding: '0 0.9rem',
              height: '36px',
              fontSize: '0.8rem',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              borderRadius: '9999px',
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-light)',
              color: 'var(--text-main)',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            <ShoppingBag size={15} />
            <span>Cart</span>
            {totalCartCount > 0 && (
              <span className="badge badge-primary" style={{ background: '#ba0c2f', color: '#fff', fontSize: '0.65rem', fontWeight: 900, padding: '0.1rem 0.4rem', borderRadius: 'var(--radius-full)' }}>
                {totalCartCount}
              </span>
            )}
          </button>

          {/* User Account / Login Button & Interactive Dropdown Menu (Hidden on Mobile, handled by MobileNav) */}
          <div className="hide-mobile" style={{ position: 'relative' }} ref={dropdownRef}>
            <button
              onClick={() => {
                if (!user) {
                  setCurrentPage('auth');
                } else {
                  setIsDropdownOpen(!isDropdownOpen);
                }
              }}
              style={{
                padding: '0 0.9rem',
                height: '36px',
                fontSize: '0.8rem',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '0.45rem',
                borderRadius: '9999px',
                background: isDropdownOpen ? 'rgba(186, 12, 47, 0.12)' : 'var(--bg-secondary)',
                border: isDropdownOpen ? '1px solid var(--border-active)' : '1px solid var(--border-light)',
                color: 'var(--text-main)',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
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

                {/* Admin Dropdown Options */}
                {user.role === 'admin' ? (
                  <>
                    <button
                      onClick={() => {
                        if (typeof setAdminActiveTab === 'function') setAdminActiveTab('overview');
                        setCurrentPage('admin');
                        setIsDropdownOpen(false);
                      }}
                      className="btn"
                      style={{ padding: '0.45rem 0.75rem', fontSize: '0.8rem', fontWeight: 700, justifyContent: 'flex-start', gap: '0.65rem', color: 'var(--text-main)', background: 'transparent' }}
                    >
                      <BarChart3 size={15} color="#ba0c2f" /> Dashboard
                    </button>
                    <button
                      onClick={() => {
                        if (typeof setAdminActiveTab === 'function') setAdminActiveTab('products');
                        setCurrentPage('admin');
                        setIsDropdownOpen(false);
                      }}
                      className="btn"
                      style={{ padding: '0.45rem 0.75rem', fontSize: '0.8rem', fontWeight: 600, justifyContent: 'flex-start', gap: '0.65rem', color: 'var(--text-main)', background: 'transparent' }}
                    >
                      <Package size={15} color="#ba0c2f" /> Products
                    </button>
                    <button
                      onClick={() => {
                        if (typeof setAdminActiveTab === 'function') setAdminActiveTab('orders');
                        setCurrentPage('admin');
                        setIsDropdownOpen(false);
                      }}
                      className="btn"
                      style={{ padding: '0.45rem 0.75rem', fontSize: '0.8rem', fontWeight: 600, justifyContent: 'flex-start', gap: '0.65rem', color: 'var(--text-main)', background: 'transparent' }}
                    >
                      <ShoppingBag size={15} color="#ba0c2f" /> Orders
                    </button>
                    <button
                      onClick={() => {
                        if (typeof setAdminActiveTab === 'function') setAdminActiveTab('customers');
                        setCurrentPage('admin');
                        setIsDropdownOpen(false);
                      }}
                      className="btn"
                      style={{ padding: '0.45rem 0.75rem', fontSize: '0.8rem', fontWeight: 600, justifyContent: 'flex-start', gap: '0.65rem', color: 'var(--text-main)', background: 'transparent' }}
                    >
                      <Users size={15} color="#ba0c2f" /> Customers
                    </button>
                    <button
                      onClick={() => {
                        if (typeof setAdminActiveTab === 'function') setAdminActiveTab('categories');
                        setCurrentPage('admin');
                        setIsDropdownOpen(false);
                      }}
                      className="btn"
                      style={{ padding: '0.45rem 0.75rem', fontSize: '0.8rem', fontWeight: 600, justifyContent: 'flex-start', gap: '0.65rem', color: 'var(--text-main)', background: 'transparent' }}
                    >
                      <Layers size={15} color="#ba0c2f" /> Categories
                    </button>
                    <button
                      onClick={() => {
                        if (typeof setAdminActiveTab === 'function') setAdminActiveTab('inventory');
                        setCurrentPage('admin');
                        setIsDropdownOpen(false);
                      }}
                      className="btn"
                      style={{ padding: '0.45rem 0.75rem', fontSize: '0.8rem', fontWeight: 600, justifyContent: 'flex-start', gap: '0.65rem', color: 'var(--text-main)', background: 'transparent' }}
                    >
                      <Tag size={15} color="#ba0c2f" /> Inventory
                    </button>
                    <button
                      onClick={() => {
                        if (typeof setAdminActiveTab === 'function') setAdminActiveTab('banners');
                        setCurrentPage('admin');
                        setIsDropdownOpen(false);
                      }}
                      className="btn"
                      style={{ padding: '0.45rem 0.75rem', fontSize: '0.8rem', fontWeight: 600, justifyContent: 'flex-start', gap: '0.65rem', color: 'var(--text-main)', background: 'transparent' }}
                    >
                      <Ticket size={15} color="#ba0c2f" /> Coupons
                    </button>
                    <button
                      onClick={() => {
                        if (typeof setAdminActiveTab === 'function') setAdminActiveTab('payments');
                        setCurrentPage('admin');
                        setIsDropdownOpen(false);
                      }}
                      className="btn"
                      style={{ padding: '0.45rem 0.75rem', fontSize: '0.8rem', fontWeight: 600, justifyContent: 'flex-start', gap: '0.65rem', color: 'var(--text-main)', background: 'transparent' }}
                    >
                      <CreditCard size={15} color="#ba0c2f" /> Reports
                    </button>
                    <button
                      onClick={() => {
                        if (typeof setAdminActiveTab === 'function') setAdminActiveTab('overview');
                        setCurrentPage('admin');
                        setIsDropdownOpen(false);
                      }}
                      className="btn"
                      style={{ padding: '0.45rem 0.75rem', fontSize: '0.8rem', fontWeight: 600, justifyContent: 'flex-start', gap: '0.65rem', color: 'var(--text-main)', background: 'transparent' }}
                    >
                      <Settings size={15} color="#ba0c2f" /> Settings
                    </button>
                    <button
                      onClick={() => {
                        if (typeof setAdminActiveTab === 'function') setAdminActiveTab('customers');
                        setCurrentPage('admin');
                        setIsDropdownOpen(false);
                      }}
                      className="btn"
                      style={{ padding: '0.45rem 0.75rem', fontSize: '0.8rem', fontWeight: 600, justifyContent: 'flex-start', gap: '0.65rem', color: 'var(--text-main)', background: 'transparent' }}
                    >
                      <Shield size={15} color="#ba0c2f" /> Admin Users
                    </button>
                  </>
                ) : (
                  <>
                    {/* Standard User Menu Options */}
                    <button
                      onClick={() => {
                        setCurrentPage('user-dashboard');
                        setIsDropdownOpen(false);
                      }}
                      className="btn"
                      style={{ padding: '0.5rem 0.75rem', fontSize: '0.8rem', fontWeight: 600, justifyContent: 'flex-start', gap: '0.6rem', color: 'var(--text-main)', background: 'transparent' }}
                    >
                      <User size={15} color="hsl(var(--hue-primary), 85%, 50%)" /> My Profile
                    </button>
                    <button
                      onClick={() => {
                        setCurrentPage('orders');
                        setIsDropdownOpen(false);
                      }}
                      className="btn"
                      style={{ padding: '0.5rem 0.75rem', fontSize: '0.8rem', fontWeight: 600, justifyContent: 'flex-start', gap: '0.6rem', color: 'var(--text-main)', background: 'transparent' }}
                    >
                      <Package size={15} color="hsl(var(--hue-primary), 85%, 50%)" /> My Orders
                    </button>
                    <button
                      onClick={() => {
                        setCurrentPage('wishlist');
                        setIsDropdownOpen(false);
                      }}
                      className="btn"
                      style={{ padding: '0.5rem 0.75rem', fontSize: '0.8rem', fontWeight: 600, justifyContent: 'flex-start', gap: '0.6rem', color: 'var(--text-main)', background: 'transparent' }}
                    >
                      <Heart size={15} color="#ff4757" /> My Wishlist
                    </button>
                    <button
                      onClick={() => {
                        setUserDashboardTab('addresses');
                        setCurrentPage('user-dashboard');
                        setIsDropdownOpen(false);
                      }}
                      className="btn"
                      style={{ padding: '0.5rem 0.75rem', fontSize: '0.8rem', fontWeight: 600, justifyContent: 'flex-start', gap: '0.6rem', color: 'var(--text-main)', background: 'transparent' }}
                    >
                      <MapPin size={15} color="hsl(var(--hue-primary), 85%, 50%)" /> Saved Address
                    </button>
                    <button
                      onClick={() => {
                        setCurrentPage('user-dashboard');
                        setIsDropdownOpen(false);
                      }}
                      className="btn"
                      style={{ padding: '0.5rem 0.75rem', fontSize: '0.8rem', fontWeight: 600, justifyContent: 'flex-start', gap: '0.6rem', color: 'var(--text-main)', background: 'transparent' }}
                    >
                      <CreditCard size={15} color="hsl(var(--hue-primary), 85%, 50%)" /> Payment History
                    </button>
                    <button
                      onClick={() => {
                        setCurrentPage('user-dashboard');
                        setIsDropdownOpen(false);
                      }}
                      className="btn"
                      style={{ padding: '0.5rem 0.75rem', fontSize: '0.8rem', fontWeight: 600, justifyContent: 'flex-start', gap: '0.6rem', color: 'var(--text-main)', background: 'transparent' }}
                    >
                      <Wallet size={15} color="hsl(var(--hue-primary), 85%, 50%)" /> My Wallet
                    </button>
                  </>
                )}

                <div style={{ height: '1px', background: 'var(--border-light)', margin: '0.15rem 0' }} />

                {/* Logout (Last Option) */}
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

          {/* Nav Bar Notifications Pop Up Option */}
          <div style={{ position: 'relative' }} ref={notifRef}>
            <button
              onClick={() => setIsNotifOpen(!isNotifOpen)}
              className="btn"
              style={{
                padding: '0.35rem 0.95rem',
                fontSize: '0.85rem',
                fontWeight: isNotifOpen ? 800 : 600,
                background: isNotifOpen ? 'rgba(186, 12, 47, 0.12)' : 'transparent',
                color: isNotifOpen ? 'hsl(var(--hue-primary), 85%, 50%)' : 'var(--text-main)',
                borderRadius: 'var(--radius-md)',
                border: 'none',
                minHeight: '34px',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                cursor: 'pointer'
              }}
            >
              <Bell size={15} color={unreadCount > 0 ? '#ba0c2f' : 'currentColor'} />
              <span>Notifications</span>
              {unreadCount > 0 && (
                <span
                  style={{
                    background: '#ba0c2f',
                    color: '#fff',
                    fontSize: '0.62rem',
                    fontWeight: 900,
                    padding: '0.1rem 0.4rem',
                    borderRadius: '9999px'
                  }}
                >
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Desktop Nav Bar Notifications Dropdown */}
            {isNotifOpen && (
              <div
                className="animate-fade-in"
                style={{
                  position: 'absolute',
                  top: 'calc(100% + 0.5rem)',
                  right: 0,
                  width: '360px',
                  maxWidth: '92vw',
                  background: 'var(--bg-glass-heavy)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border: '1px solid var(--border-active)',
                  borderRadius: 'var(--radius-lg)',
                  boxShadow: '0 15px 40px rgba(0,0,0,0.25)',
                  padding: '0.85rem',
                  zIndex: 3500,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.65rem'
                }}
              >
                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border-light)', paddingBottom: '0.6rem', gap: '0.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', minWidth: 0 }}>
                    <Bell size={16} color="#ba0c2f" style={{ flexShrink: 0 }} />
                    <span style={{ fontSize: '0.88rem', fontWeight: 800, color: 'var(--text-main)', whiteSpace: 'nowrap', flexShrink: 0 }}>Notifications Pop Up</span>
                    {unreadCount > 0 && (
                      <span style={{ background: 'rgba(186, 12, 47, 0.15)', color: '#ba0c2f', fontSize: '0.65rem', fontWeight: 800, padding: '0.1rem 0.4rem', borderRadius: '9999px', whiteSpace: 'nowrap', flexShrink: 0 }}>
                        {unreadCount} new
                      </span>
                    )}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', flexShrink: 0 }}>
                    {unreadCount > 0 && (
                      <button
                        onClick={markAllNotificationsAsRead}
                        style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '0.72rem', fontWeight: 700, cursor: 'pointer', padding: '0.2rem 0.35rem', whiteSpace: 'nowrap' }}
                      >
                        Read all
                      </button>
                    )}
                    {notifications.length > 0 && (
                      <button
                        onClick={clearAllNotifications}
                        style={{ background: 'none', border: 'none', color: '#ba0c2f', fontSize: '0.72rem', fontWeight: 700, cursor: 'pointer', padding: '0.2rem 0.35rem', whiteSpace: 'nowrap' }}
                      >
                        Clear
                      </button>
                    )}
                  </div>
                </div>

                {/* Notifications List */}
                <div style={{ maxHeight: '280px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                  {notifications.length === 0 ? (
                    <div style={{ padding: '1.5rem 1rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                      🎉 No notifications at this time!
                    </div>
                  ) : (
                    notifications.map((notif) => (
                      <div
                        key={notif.id}
                        onClick={() => markNotificationAsRead(notif.id)}
                        style={{
                          padding: '0.6rem 0.75rem',
                          borderRadius: 'var(--radius-md)',
                          background: notif.unread ? 'rgba(186, 12, 47, 0.08)' : 'var(--bg-secondary)',
                          border: notif.unread ? '1px solid rgba(186, 12, 47, 0.25)' : '1px solid var(--border-light)',
                          cursor: 'pointer',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '0.2rem',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.4rem' }}>
                          <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--text-main)' }}>{notif.title}</span>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', flexShrink: 0 }}>
                            <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>{notif.time}</span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                removeNotification(notif.id);
                              }}
                              style={{
                                background: 'transparent',
                                border: 'none',
                                color: 'var(--text-muted)',
                                cursor: 'pointer',
                                fontSize: '0.75rem',
                                padding: '0.1rem 0.25rem',
                                lineHeight: 1,
                                borderRadius: '3px'
                              }}
                              title="Remove notification"
                              aria-label="Remove notification"
                            >
                              ✕
                            </button>
                          </div>
                        </div>
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.35 }}>{notif.message}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
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
