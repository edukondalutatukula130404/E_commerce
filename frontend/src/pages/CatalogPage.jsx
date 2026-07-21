import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { Search, Filter, SlidersHorizontal, Star, Heart, ShoppingBag, X, ArrowLeft, RotateCcw } from 'lucide-react';

export const CatalogPage = () => {
  const { 
    products, 
    searchQuery, 
    setSearchQuery, 
    selectedCategory, 
    setSelectedCategory, 
    navigateToProduct, 
    addToCart, 
    toggleWishlist, 
    wishlist,
    setCurrentPage 
  } = useApp();

  const [sortOption, setSortOption] = useState('featured');
  const [maxPrice, setMaxPrice] = useState(400);
  const [minRating, setMinRating] = useState(0);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  const categories = ['All', 'Tech', 'Apparel', 'Home', 'Accessories'];

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchesSearch = !searchQuery || 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        p.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === 'All' || p.category.toLowerCase() === selectedCategory.toLowerCase();
      const matchesPrice = p.price <= maxPrice;
      const matchesRating = p.rating >= minRating;

      return matchesSearch && matchesCategory && matchesPrice && matchesRating;
    }).sort((a, b) => {
      if (sortOption === 'price-low') return a.price - b.price;
      if (sortOption === 'price-high') return b.price - a.price;
      if (sortOption === 'rating') return b.rating - a.rating;
      return 0;
    });
  }, [products, searchQuery, selectedCategory, maxPrice, minRating, sortOption]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setMaxPrice(400);
    setMinRating(0);
    setSortOption('featured');
  };

  return (
    <div className="animate-fade-in" style={{ paddingTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: '1.25rem', width: '100%', overflowX: 'hidden' }}>
      
      {/* Back Button */}
      <div>
        <button 
          onClick={() => setCurrentPage('home')} 
          className="btn btn-secondary"
          style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem', minHeight: '34px' }}
        >
          <ArrowLeft size={15} /> Back
        </button>
      </div>

      {/* Header Title & Items Count */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
        <div>
          <h1 style={{ fontSize: 'clamp(1.3rem, 4vw, 1.7rem)', fontWeight: 800 }}>Explore SWITCHES Catalog</h1>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            Showing {filteredProducts.length} items
          </p>
        </div>

        {searchQuery || selectedCategory !== 'All' || maxPrice < 400 ? (
          <button 
            onClick={resetFilters} 
            className="btn btn-secondary"
            style={{ fontSize: '0.75rem', padding: '0.3rem 0.6rem', color: 'hsl(var(--hue-primary), 85%, 50%)' }}
          >
            <RotateCcw size={12} /> Clear Filters
          </button>
        ) : null}
      </div>

      {/* Prominent Search Bar & Filter Controls */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', width: '100%' }}>
        
        {/* Search Input Bar + Filter & Sort Buttons */}
        <div style={{ display: 'flex', gap: '0.55rem', alignItems: 'center', width: '100%', flexWrap: 'wrap' }}>
          
          {/* Instant Search Bar Input */}
          <div style={{ position: 'relative', flex: '1 1 200px', minWidth: '180px' }}>
            <input
              type="text"
              placeholder="Search catalog products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '0.55rem 0.75rem 0.55rem 2.1rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-active)',
                background: 'var(--bg-secondary)',
                color: 'var(--text-main)',
                fontSize: '0.85rem',
                outline: 'none',
                boxShadow: 'var(--shadow-sm)'
              }}
            />
            <Search size={15} style={{ position: 'absolute', left: '0.7rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                style={{ position: 'absolute', right: '0.6rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Filter Drawer Trigger Button */}
          <button
            onClick={() => setIsFilterDrawerOpen(true)}
            className="btn btn-primary"
            style={{ padding: '0.55rem 0.85rem', fontSize: '0.82rem', minHeight: '38px', gap: '0.35rem' }}
          >
            <SlidersHorizontal size={15} /> Filter
          </button>

          {/* Sort Dropdown */}
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="card"
            style={{
              padding: '0.55rem 0.65rem',
              fontSize: '0.8rem',
              fontWeight: 600,
              color: 'var(--text-main)',
              background: 'var(--bg-card)',
              outline: 'none',
              cursor: 'pointer',
              minHeight: '38px',
              border: '1px solid var(--border-light)'
            }}
          >
            <option value="featured">Sort: Featured</option>
            <option value="price-low">Price: Low-High</option>
            <option value="price-high">Price: High-Low</option>
            <option value="rating">Highest Rated</option>
          </select>

        </div>

        {/* Flex Wrap Category Quick Tabs */}
        <div className="flex-wrap-container">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className="btn"
              style={{
                padding: '0.35rem 0.75rem',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.78rem',
                fontWeight: selectedCategory === cat ? 800 : 500,
                background: selectedCategory === cat ? 'var(--grad-primary)' : 'var(--bg-secondary)',
                color: selectedCategory === cat ? '#fff' : 'var(--text-main)',
                border: '1px solid var(--border-light)',
                minHeight: '34px',
                flex: '1 1 auto'
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Main Layout */}
      <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start', width: '100%' }}>
        
        {/* Desktop Sidebar Filters */}
        <aside 
          className="desktop-filter-sidebar card"
          style={{
            width: '240px',
            padding: '1.1rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.1rem',
            position: 'sticky',
            top: 'calc(var(--header-height) + 1rem)'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <Filter size={14} /> Filters
            </h3>
            <button 
              onClick={resetFilters} 
              style={{ background: 'none', border: 'none', color: 'hsl(var(--hue-primary), 85%, 50%)', fontSize: '0.75rem', cursor: 'pointer', fontWeight: 600 }}
            >
              Reset
            </button>
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.25rem' }}>
              <span>Max Price</span>
              <span>${maxPrice}</span>
            </div>
            <input
              type="range"
              min="20"
              max="400"
              step="10"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              style={{ width: '100%', accentColor: 'hsl(var(--hue-primary), 85%, 50%)', cursor: 'pointer' }}
            />
          </div>
        </aside>

        {/* Product Grid - Entire Card Tap Opens Product Detail View */}
        <div style={{ flex: 1, width: '100%' }}>
          {filteredProducts.length === 0 ? (
            <div className="card" style={{ padding: '3rem 1.25rem', textAlign: 'center' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.35rem' }}>No products found</h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                Try adjusting your search query, price slider, or category filter.
              </p>
              <button onClick={resetFilters} className="btn btn-primary">
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="product-grid">
              {filteredProducts.map((product) => {
                const isWishlisted = wishlist.includes(product.id);
                return (
                  <div 
                    key={product.id} 
                    className="card" 
                    onClick={() => navigateToProduct(product.id)}
                    style={{ display: 'flex', flexDirection: 'column', width: '100%', cursor: 'pointer' }}
                  >
                    
                    <div className="product-image-container">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        loading="lazy"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80";
                        }}
                      />
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleWishlist(product.id);
                        }}
                        className="btn btn-icon"
                        style={{
                          position: 'absolute',
                          top: '6px',
                          right: '6px',
                          zIndex: 2,
                          background: 'var(--bg-glass-heavy)',
                          width: '32px',
                          height: '32px',
                          minWidth: '32px',
                          minHeight: '32px'
                        }}
                      >
                        <Heart size={13} color={isWishlisted ? '#ff4757' : 'var(--text-main)'} fill={isWishlisted ? '#ff4757' : 'none'} />
                      </button>
                    </div>

                    <div style={{ padding: '0.75rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '0.5rem' }}>
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.2rem' }}>
                          <span className="badge badge-primary" style={{ fontSize: '0.6rem' }}>{product.category}</span>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.15rem', fontSize: '0.72rem', fontWeight: 700 }}>
                            <Star size={11} color="#f59e0b" fill="#f59e0b" />
                            <span>{product.rating}</span>
                          </div>
                        </div>
                        <h3 
                          style={{ fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.15rem', lineHeight: 1.25, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                        >
                          {product.name}
                        </h3>
                        <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                          {product.tagline}
                        </p>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '0.45rem', borderTop: '1px solid var(--border-light)' }}>
                        <span style={{ fontSize: '0.95rem', fontWeight: 800 }}>${product.price}</span>
                        <div style={{ display: 'flex', gap: '0.3rem' }}>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              addToCart(product);
                            }} 
                            className="btn btn-primary"
                            style={{ padding: '0.3rem 0.55rem', fontSize: '0.72rem', minHeight: '30px' }}
                          >
                            <ShoppingBag size={12} /> Add
                          </button>
                        </div>
                      </div>

                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

      </div>

      {/* Slide-Over Filter Drawer */}
      {isFilterDrawerOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 2000,
          background: 'rgba(0, 0, 0, 0.65)',
          backdropFilter: 'blur(6px)',
          display: 'flex',
          justifyContent: 'flex-end'
        }}>
          <div className="animate-slide-up" style={{
            width: '100%',
            maxWidth: '320px',
            height: '100%',
            background: 'var(--bg-card)',
            padding: '1.25rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem',
            overflowY: 'auto'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <Filter size={16} /> Filter Catalog
              </h3>
              <button onClick={() => setIsFilterDrawerOpen(false)} className="btn btn-icon">
                <X size={16} />
              </button>
            </div>

            <div>
              <label style={{ fontSize: '0.78rem', fontWeight: 700, display: 'block', marginBottom: '0.35rem' }}>Search Keywords</label>
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.55rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-light)',
                  background: 'var(--bg-secondary)',
                  color: 'var(--text-main)',
                  fontSize: '0.85rem'
                }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.78rem', fontWeight: 700, display: 'block', marginBottom: '0.35rem' }}>Max Price: ${maxPrice}</label>
              <input
                type="range"
                min="20"
                max="400"
                step="10"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                style={{ width: '100%', accentColor: 'hsl(var(--hue-primary), 85%, 50%)' }}
              />
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', marginTop: 'auto' }}>
              <button onClick={resetFilters} className="btn btn-secondary" style={{ flex: 1 }}>
                Reset
              </button>
              <button 
                onClick={() => setIsFilterDrawerOpen(false)} 
                className="btn btn-primary"
                style={{ flex: 2 }}
              >
                Apply ({filteredProducts.length})
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 899px) {
          .desktop-filter-sidebar { display: none !important; }
        }
      `}</style>
    </div>
  );
};
