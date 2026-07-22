import React, { useState, useMemo, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Search, Filter, SlidersHorizontal, Star, Heart, ShoppingBag, X, ArrowLeft, RotateCcw } from 'lucide-react';

export const CatalogPage = () => {
  const { 
    products, 
    categoriesList,
    searchQuery, 
    setSearchQuery, 
    selectedCategory, 
    setSelectedCategory, 
    selectedSubCategory,
    setSelectedSubCategory,
    isFilterDrawerOpen,
    setIsFilterDrawerOpen,
    navigateToProduct, 
    addToCart, 
    toggleWishlist, 
    wishlist,
    showToast,
    setCurrentPage 
  } = useApp();

  const [sortOption, setSortOption] = useState('featured');
  const [maxPrice, setMaxPrice] = useState(400);
  const [minRating, setMinRating] = useState(0);

  // Prevent background scrolling and preserve position when filter drawer is open
  useEffect(() => {
    if (isFilterDrawerOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
      }
    }
    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
    };
  }, [isFilterDrawerOpen]);

  // Dynamic Categories Array from Admin & AppContext
  const categories = useMemo(() => {
    const list = ['All'];
    const catNamesFromList = (categoriesList || []).map(c => c.name);
    const catNamesFromProducts = (products || []).map(p => p.category).filter(Boolean);
    const combined = Array.from(new Set([...catNamesFromList, ...catNamesFromProducts]));
    combined.forEach(c => {
      if (c && !list.includes(c)) list.push(c);
    });
    return list;
  }, [categoriesList, products]);

  const activeCategoryObj = useMemo(() => {
    return (categoriesList || []).find(c => (c.name || '').trim().toLowerCase() === (selectedCategory || '').trim().toLowerCase());
  }, [categoriesList, selectedCategory]);

  const availableSubCategories = useMemo(() => {
    if (selectedCategory !== 'All') {
      if (activeCategoryObj?.subCategories?.length > 0) {
        return activeCategoryObj.subCategories;
      }
      const catName = selectedCategory;
      const lower = catName.toLowerCase();
      if (lower.includes('appliance') || lower.includes('home')) return ["Kitchen Appliances", "Cleaning & Vacuum", "Air Quality & Cooling"];
      if (lower.includes('beauty') || lower.includes('care')) return ["Skincare", "facewash", "Cosmetics", "Fragrance"];
      if (lower.includes('phone') || lower.includes('mobile')) return ["Smartphones", "Flagship Phones", "Phone Accessories"];
      if (lower.includes('switch') || lower.includes('key')) return ["Mechanical Switches", "Keycaps", "Custom Cables"];
      return [`${catName} Essentials`, `${catName} Pro`, `${catName} Accessories`];
    }
    return [];
  }, [selectedCategory, activeCategoryObj]);

  const handleSearchKeyDown = (e) => {
    if (e.key === 'Enter') {
      const q = (searchQuery || '').trim().toLowerCase();
      if (!q) return;
      
      // 1. Check direct category match
      const matchedCat = (categories || []).find(cat => cat.trim().toLowerCase() === q || cat.trim().toLowerCase().includes(q));
      if (matchedCat && matchedCat !== 'All') {
        setSelectedCategory(matchedCat);
        setSelectedSubCategory('All');
        setSearchQuery('');
        return;
      }

      // 2. Check direct sub-category match
      (categoriesList || []).forEach(cat => {
        if (cat.subCategories && Array.isArray(cat.subCategories)) {
          const matchedSub = cat.subCategories.find(sub => sub.trim().toLowerCase() === q || sub.trim().toLowerCase().includes(q));
          if (matchedSub) {
            setSelectedCategory(cat.name);
            setSelectedSubCategory(matchedSub);
            setSearchQuery('');
          }
        }
      });
    }
  };

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const query = (searchQuery || '').trim().toLowerCase();
      const matchesSearch = !query || 
        (p.name || '').toLowerCase().includes(query) || 
        (p.category || '').toLowerCase().includes(query) || 
        (p.subCategory || '').toLowerCase().includes(query) || 
        (p.tagline || '').toLowerCase().includes(query) || 
        (p.description || '').toLowerCase().includes(query);
      
      const queryMatchesCat = query && (p.category || '').toLowerCase().includes(query);
      const matchesCategory = !query || queryMatchesCat || selectedCategory === 'All' || (p.category || '').trim().toLowerCase() === selectedCategory.trim().toLowerCase();
      
      let matchesSubCategory = true;
      if (!query && selectedSubCategory && selectedSubCategory !== 'All') {
        const subClean = selectedSubCategory.toLowerCase().replace(/[^a-z0-9]/g, '');
        const pSubClean = (p.subCategory || '').toLowerCase().replace(/[^a-z0-9]/g, '');
        const pNameClean = (p.name || '').toLowerCase().replace(/[^a-z0-9]/g, '');
        const pTagClean = (p.tagline || '').toLowerCase().replace(/[^a-z0-9]/g, '');
        const pDescClean = (p.description || '').toLowerCase().replace(/[^a-z0-9]/g, '');

        const directMatch = pSubClean === subClean ||
          pSubClean.includes(subClean) ||
          (pSubClean.length > 2 && subClean.includes(pSubClean)) ||
          pNameClean.includes(subClean) ||
          pTagClean.includes(subClean) ||
          pDescClean.includes(subClean);

        if (!directMatch && matchesCategory && selectedCategory !== 'All') {
          const catProds = products.filter(item => (item.category || '').trim().toLowerCase() === selectedCategory.trim().toLowerCase());
          const anyDirectMatch = catProds.some(item => {
            const itemSub = (item.subCategory || '').toLowerCase().replace(/[^a-z0-9]/g, '');
            return itemSub === subClean || itemSub.includes(subClean) || (item.name || '').toLowerCase().replace(/[^a-z0-9]/g, '').includes(subClean);
          });
          matchesSubCategory = !anyDirectMatch;
        } else {
          matchesSubCategory = directMatch;
        }
      }

      const matchesPrice = p.price <= maxPrice;
      const matchesRating = p.rating >= minRating;

      return matchesSearch && matchesCategory && matchesSubCategory && matchesPrice && matchesRating;
    }).sort((a, b) => {
      if (sortOption === 'price-low') return a.price - b.price;
      if (sortOption === 'price-high') return b.price - a.price;
      if (sortOption === 'rating') return b.rating - a.rating;
      return 0;
    });
  }, [products, searchQuery, selectedCategory, selectedSubCategory, maxPrice, minRating, sortOption]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    if (typeof setSelectedSubCategory === 'function') setSelectedSubCategory('All');
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
              onKeyDown={handleSearchKeyDown}
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

          {/* Category & Nested Sub-Category Filter */}
          <div>
            <label style={{ fontSize: '0.78rem', fontWeight: 700, display: 'block', marginBottom: '0.4rem' }}>Category</label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
              {categories.map((cat) => {
                const isCatSelected = selectedCategory.trim().toLowerCase() === cat.trim().toLowerCase();
                const catProdCount = cat === 'All' ? products.length : products.filter(p => (p.category || '').trim().toLowerCase() === cat.trim().toLowerCase()).length;
                return (
                  <React.Fragment key={cat}>
                    <button
                      onClick={() => {
                        setSelectedCategory(cat);
                        if (typeof setSelectedSubCategory === 'function') setSelectedSubCategory('All');
                      }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justify: 'space-between',
                        padding: '0.5rem 0.7rem',
                        borderRadius: 'var(--radius-md)',
                        border: isCatSelected ? '1px solid var(--border-active)' : '1px solid var(--border-light)',
                        background: isCatSelected ? 'rgba(186, 12, 47, 0.1)' : 'var(--bg-secondary)',
                        color: isCatSelected ? 'hsl(var(--hue-primary), 85%, 50%)' : 'var(--text-main)',
                        fontSize: '0.8rem',
                        fontWeight: isCatSelected ? 800 : 500,
                        cursor: 'pointer'
                      }}
                    >
                      <span>{cat}</span>
                      <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                        ({catProdCount})
                      </span>
                    </button>

                    {/* Sub-Categories nested directly UNDER active category */}
                    {isCatSelected && availableSubCategories && availableSubCategories.length > 0 && (
                      <div className="animate-slide-down" style={{
                        marginLeft: '0.65rem',
                        paddingLeft: '0.65rem',
                        borderLeft: '2px solid rgba(186, 12, 47, 0.3)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.3rem',
                        marginTop: '0.1rem',
                        marginBottom: '0.35rem'
                      }}>
                        <button
                          onClick={() => setSelectedSubCategory('All')}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.3rem',
                            padding: '0.3rem 0.5rem',
                            borderRadius: 'var(--radius-sm)',
                            border: selectedSubCategory === 'All' ? '1px solid var(--border-active)' : '1px solid transparent',
                            background: selectedSubCategory === 'All' ? 'rgba(186, 12, 47, 0.12)' : 'transparent',
                            color: selectedSubCategory === 'All' ? 'hsl(var(--hue-primary), 85%, 50%)' : 'var(--text-muted)',
                            fontSize: '0.75rem',
                            fontWeight: selectedSubCategory === 'All' ? 800 : 500,
                            cursor: 'pointer',
                            textAlign: 'left'
                          }}
                        >
                          <span>• All {cat}</span>
                        </button>

                        {availableSubCategories.map(sub => {
                          const isSubSelected = (selectedSubCategory || '').trim().toLowerCase() === sub.trim().toLowerCase();
                          return (
                            <button
                              key={sub}
                              onClick={() => setSelectedSubCategory(sub)}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.3rem',
                                padding: '0.3rem 0.5rem',
                                borderRadius: 'var(--radius-sm)',
                                border: isSubSelected ? '1px solid var(--border-active)' : '1px solid transparent',
                                background: isSubSelected ? 'rgba(186, 12, 47, 0.12)' : 'transparent',
                                color: isSubSelected ? 'hsl(var(--hue-primary), 85%, 50%)' : 'var(--text-main)',
                                fontSize: '0.75rem',
                                fontWeight: isSubSelected ? 800 : 500,
                                cursor: 'pointer',
                                textAlign: 'left'
                              }}
                            >
                              <span>↳ {sub}</span>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </React.Fragment>
                );
              })}
            </div>
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

          {/* Apply Filters Button */}
          <div style={{ marginTop: '0.35rem' }}>
            <button 
              onClick={() => {
                if (typeof showToast === 'function') showToast(`Applied filters (${filteredProducts.length} items found)`);
              }}
              className="btn btn-primary"
              style={{ width: '100%', padding: '0.6rem', fontSize: '0.82rem', fontWeight: 800 }}
            >
              Apply Filters ({filteredProducts.length})
            </button>
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
                        src={product.images?.[0] || product.image || "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80"}
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
              <label style={{ fontSize: '0.78rem', fontWeight: 700, display: 'block', marginBottom: '0.4rem' }}>Select Category</label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                {categories.map((cat) => {
                  const isSelected = selectedCategory.trim().toLowerCase() === cat.trim().toLowerCase();
                  const count = cat === 'All' ? products.length : products.filter(p => (p.category || '').trim().toLowerCase() === cat.trim().toLowerCase()).length;
                  return (
                    <React.Fragment key={cat}>
                      <button
                        onClick={() => {
                          setSelectedCategory(cat);
                          if (typeof setSelectedSubCategory === 'function') setSelectedSubCategory('All');
                        }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justify: 'space-between',
                          padding: '0.5rem 0.7rem',
                          borderRadius: 'var(--radius-md)',
                          border: isSelected ? '2px solid var(--border-active)' : '1px solid var(--border-light)',
                          background: isSelected ? 'rgba(186, 12, 47, 0.1)' : 'var(--bg-secondary)',
                          color: isSelected ? 'hsl(var(--hue-primary), 85%, 50%)' : 'var(--text-main)',
                          fontSize: '0.82rem',
                          fontWeight: isSelected ? 800 : 500,
                          cursor: 'pointer'
                        }}
                      >
                        <span>{cat}</span>
                        <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                          ({count})
                        </span>
                      </button>

                      {isSelected && availableSubCategories && availableSubCategories.length > 0 && (
                        <div className="animate-slide-down" style={{
                          marginLeft: '0.65rem',
                          paddingLeft: '0.65rem',
                          borderLeft: '2px solid rgba(186, 12, 47, 0.3)',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '0.3rem',
                          marginTop: '0.1rem',
                          marginBottom: '0.35rem'
                        }}>
                          <button
                            onClick={() => {
                              setSelectedSubCategory('All');
                              setIsFilterDrawerOpen(false);
                            }}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.3rem',
                              padding: '0.35rem 0.5rem',
                              borderRadius: 'var(--radius-sm)',
                              border: selectedSubCategory === 'All' ? '1px solid var(--border-active)' : '1px solid transparent',
                              background: selectedSubCategory === 'All' ? 'rgba(186, 12, 47, 0.12)' : 'transparent',
                              color: selectedSubCategory === 'All' ? 'hsl(var(--hue-primary), 85%, 50%)' : 'var(--text-muted)',
                              fontSize: '0.78rem',
                              fontWeight: selectedSubCategory === 'All' ? 800 : 500,
                              cursor: 'pointer',
                              textAlign: 'left'
                            }}
                          >
                            <span>• All {cat}</span>
                          </button>

                          {availableSubCategories.map(sub => {
                            const isSubSelected = (selectedSubCategory || '').trim().toLowerCase() === sub.trim().toLowerCase();
                            return (
                              <button
                                key={sub}
                                onClick={() => {
                                  setSelectedSubCategory(sub);
                                  setIsFilterDrawerOpen(false);
                                }}
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '0.3rem',
                                  padding: '0.35rem 0.5rem',
                                  borderRadius: 'var(--radius-sm)',
                                  border: isSubSelected ? '1px solid var(--border-active)' : '1px solid transparent',
                                  background: isSubSelected ? 'rgba(186, 12, 47, 0.12)' : 'transparent',
                                  color: isSubSelected ? 'hsl(var(--hue-primary), 85%, 50%)' : 'var(--text-main)',
                                  fontSize: '0.78rem',
                                  fontWeight: isSubSelected ? 800 : 500,
                                  cursor: 'pointer',
                                  textAlign: 'left'
                                }}
                              >
                                <span>↳ {sub}</span>
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </React.Fragment>
                  );
                })}
              </div>
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
