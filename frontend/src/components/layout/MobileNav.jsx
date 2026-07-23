import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Grid, Heart, Home, Search, User, Shield, ShoppingBag, X, ChevronRight, Layers, Tag, Package } from 'lucide-react';

export const MobileNav = () => {
  const {
    currentPage,
    setCurrentPage,
    wishlist,
    cart,
    user,
    searchQuery,
    setSearchQuery,
    categoriesList,
    selectedCategory,
    setSelectedCategory,
    setIsFilterDrawerOpen,
    openCatalogFilter,
    products
  } = useApp();

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCategoryDrawerOpen, setIsCategoryDrawerOpen] = useState(false);

  // Scroll direction detection state
  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsHidden(true); // Scrolling down -> hide bottom bar
      } else {
        setIsHidden(false); // Scrolling up -> reveal bottom bar
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Hide bottom bar ONLY on Admin View
  if (currentPage === 'admin') {
    return null;
  }

  const navItems = [
    { 
      id: 'catalog', 
      label: 'Categories', 
      icon: Grid,
      onClick: () => {
        setCurrentPage('catalog');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    },
    { 
      id: 'wishlist', 
      label: 'Wishlist', 
      icon: Heart, 
      badge: wishlist.length 
    },
    { 
      id: 'home', 
      label: 'Home', 
      icon: Home 
    },
    { 
      id: 'orders', 
      label: 'My Orders', 
      icon: Package,
      onClick: () => {
        setCurrentPage('orders');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    },
    { 
      id: user ? (user.role === 'admin' ? 'admin' : 'user-dashboard') : 'auth', 
      label: 'Profile', 
      icon: user?.role === 'admin' ? Shield : User 
    }
  ];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setIsSearchOpen(false);
    setCurrentPage('catalog');
  };

  const handleCategorySelect = (catName) => {
    setSelectedCategory(catName);
    setIsCategoryDrawerOpen(false);
    setCurrentPage('catalog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Floating Mobile Cart Action Button - Hides on scroll down */}
      <button
        onClick={() => {
          setCurrentPage('cart');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        style={{
          position: 'fixed',
          bottom: 'calc(var(--mobile-nav-height) + 12px)',
          right: '18px',
          zIndex: 1600,
          width: '52px',
          height: '52px',
          borderRadius: 'var(--radius-full)',
          background: 'var(--grad-primary)',
          color: '#fff',
          border: '3px solid var(--bg-card)',
          boxShadow: '0 8px 24px rgba(186, 12, 47, 0.55)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          transform: isHidden ? 'translateY(150px)' : 'translateY(0)',
          transition: 'transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)'
        }}
        className="mobile-only-floating-cart"
        title="View Shopping Cart"
      >
        <ShoppingBag size={22} />
        {totalCartCount > 0 && (
          <span 
            className="badge badge-primary" 
            style={{
              position: 'absolute',
              top: '-4px',
              right: '-4px',
              background: '#fff',
              color: '#ba0c2f',
              fontSize: '0.7rem',
              fontWeight: 900,
              padding: '2px 6px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.3)'
            }}
          >
            {totalCartCount}
          </span>
        )}
      </button>

      {/* Bottom Navigation Bar - Hides smoothly on scroll down */}
      <nav style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: 'var(--mobile-nav-height)',
        background: 'var(--bg-glass-heavy)',
        backdropFilter: 'blur(18px)',
        WebkitBackdropFilter: 'blur(18px)',
        borderTop: '1px solid var(--border-light)',
        zIndex: 1500,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: '0 0.4rem',
        transform: isHidden ? 'translateY(100%)' : 'translateY(0)',
        transition: 'transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)'
      }} className="mobile-only-bar">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id || (item.id === 'categories-drawer' && isCategoryDrawerOpen);
          return (
            <button
              key={item.label}
              onClick={() => {
                if (item.onClick) {
                  item.onClick();
                } else {
                  setCurrentPage(item.id);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              style={{
                background: 'none',
                border: 'none',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.2rem',
                color: isActive ? 'hsl(var(--hue-primary), 85%, 50%)' : 'var(--text-muted)',
                cursor: 'pointer',
                position: 'relative',
                padding: '0.3rem 0.4rem',
                borderRadius: 'var(--radius-sm)',
                transition: 'color 0.2s ease, transform 0.15s ease',
                flex: 1
              }}
            >
              <div style={{ position: 'relative' }}>
                <Icon size={20} color={isActive ? 'hsl(var(--hue-primary), 85%, 50%)' : 'currentColor'} />
                {item.badge > 0 && (
                  <span className="badge badge-primary animate-bounce" style={{
                    position: 'absolute',
                    top: '-5px',
                    right: '-10px',
                    fontSize: '0.6rem',
                    padding: '1px 4px'
                  }}>
                    {item.badge}
                  </span>
                )}
              </div>
              <span style={{ 
                fontSize: '0.72rem', 
                fontWeight: isActive ? 900 : 750,
                color: isActive ? 'hsl(var(--hue-primary), 85%, 50%)' : 'var(--text-main)',
                marginTop: '0.1rem'
              }}>
                {item.label}
              </span>
            </button>
          );
        })}

        <style>{`
          @media (min-width: 768px) {
            .mobile-only-bar { display: none !important; }
            .mobile-only-floating-cart { display: none !important; }
          }
        `}</style>
      </nav>

      {/* Dynamic Slide-Up Categories Modal */}
      {isCategoryDrawerOpen && (
        <div 
          onClick={() => setIsCategoryDrawerOpen(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 2600,
            background: 'rgba(0, 0, 0, 0.65)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center'
          }}
          className="animate-fade-in"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="card"
            style={{
              width: '100%',
              maxWidth: '500px',
              borderBottomLeftRadius: 0,
              borderBottomRightRadius: 0,
              borderTopLeftRadius: 'var(--radius-lg)',
              borderTopRightRadius: 'var(--radius-lg)',
              padding: '1.25rem',
              maxHeight: '80vh',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              boxShadow: '0 -10px 30px rgba(0,0,0,0.3)',
              background: 'var(--bg-card)'
            }}
          >
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-light)', paddingBottom: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Layers size={20} color="hsl(var(--hue-primary), 85%, 50%)" />
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800 }}>Explore Categories</h3>
              </div>
              <button onClick={() => setIsCategoryDrawerOpen(false)} className="btn btn-icon">
                <X size={18} />
              </button>
            </div>

            {/* Category Items List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {/* All Products Option */}
              <button
                onClick={() => handleCategorySelect('All')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.85rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  border: selectedCategory === 'All' ? '2px solid var(--border-active)' : '1px solid var(--border-light)',
                  background: selectedCategory === 'All' ? 'rgba(186, 12, 47, 0.1)' : 'var(--bg-secondary)',
                  color: selectedCategory === 'All' ? 'hsl(var(--hue-primary), 85%, 50%)' : 'var(--text-main)',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <Tag size={18} color="hsl(var(--hue-primary), 85%, 50%)" />
                  <span>All Products</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <span style={{ fontSize: '0.75rem', background: 'var(--bg-card)', padding: '0.2rem 0.55rem', borderRadius: 'var(--radius-full)', color: 'var(--text-muted)' }}>
                    {products.length} items
                  </span>
                  <ChevronRight size={16} />
                </div>
              </button>

              {/* Dynamic Categories Map */}
              {categoriesList.map((cat) => {
                const count = products.filter(p => p.category === cat.name).length;
                const isSelected = selectedCategory === cat.name;
                return (
                  <button
                    key={cat.id}
                    onClick={() => handleCategorySelect(cat.name)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.85rem 1rem',
                      borderRadius: 'var(--radius-md)',
                      border: isSelected ? '2px solid var(--border-active)' : '1px solid var(--border-light)',
                      background: isSelected ? 'rgba(186, 12, 47, 0.1)' : 'var(--bg-secondary)',
                      color: isSelected ? 'hsl(var(--hue-primary), 85%, 50%)' : 'var(--text-main)',
                      fontWeight: 700,
                      fontSize: '0.9rem',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                      <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: cat.color || 'hsl(var(--hue-primary), 85%, 50%)' }} />
                      <span>{cat.name}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <span style={{ fontSize: '0.75rem', background: 'var(--bg-card)', padding: '0.2rem 0.55rem', borderRadius: 'var(--radius-full)', color: 'var(--text-muted)' }}>
                        {count} items
                      </span>
                      <ChevronRight size={16} />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Mobile Instant Search Modal */}
      {isSearchOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 2500,
          background: 'rgba(0, 0, 0, 0.75)',
          backdropFilter: 'blur(10px)',
          display: 'flex',
          flexDirection: 'column',
          padding: '1rem'
        }} className="animate-fade-in">
          <div className="card" style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 800 }}>Search SWITCHES</h3>
              <button onClick={() => setIsSearchOpen(false)} className="btn btn-icon">
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleSearchSubmit} style={{ position: 'relative' }}>
              <input
                type="text"
                placeholder="Search products, headphones, watch..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                style={{
                  width: '100%',
                  padding: '0.75rem 0.85rem 0.75rem 2.2rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-active)',
                  background: 'var(--bg-secondary)',
                  color: 'var(--text-main)',
                  fontSize: '0.9rem',
                  outline: 'none'
                }}
              />
              <Search size={16} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            </form>

            <button type="button" onClick={handleSearchSubmit} className="btn btn-primary" style={{ padding: '0.65rem' }}>
              View Search Results
            </button>
          </div>
        </div>
      )}
    </>
  );
};
