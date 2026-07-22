import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  ArrowRight, 
  Star, 
  Heart, 
  Sparkles, 
  Cpu, 
  Shirt, 
  Home as HomeIcon, 
  Briefcase, 
  Zap, 
  ShieldCheck, 
  Truck, 
  MessageSquare, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp 
} from 'lucide-react';

export const HomePage = () => {
  const { products, categoriesList, navigateToProduct, setCurrentPage, setSelectedCategory, selectedCategory, toggleWishlist, wishlist } = useApp();

  const [openFaqId, setOpenFaqId] = useState(null);

  const featured = products.filter(p => p.isFeatured).slice(0, 4);

  // Dynamic Categories from Admin & AppContext
  const categories = React.useMemo(() => {
    const baseIconMap = { tech: Cpu, apparel: Shirt, home: HomeIcon, accessories: Briefcase };
    const catNamesFromList = (categoriesList || []).map(c => c.name);
    const catNamesFromProducts = (products || []).map(p => p.category).filter(Boolean);
    const allCatNames = Array.from(new Set([...catNamesFromList, ...catNamesFromProducts]));

    const list = [{ name: 'All', icon: Sparkles, color: '#BA0C2F' }];
    allCatNames.forEach(name => {
      const found = (categoriesList || []).find(c => c.name.toLowerCase() === name.toLowerCase());
      const lower = name.toLowerCase();
      const icon = found?.icon === 'Shirt' ? Shirt :
                   found?.icon === 'HomeIcon' ? HomeIcon :
                   found?.icon === 'Briefcase' ? Briefcase :
                   (baseIconMap[lower] || Cpu);
      const color = found?.color || (lower === 'tech' ? '#00CEC9' : lower === 'apparel' ? '#6C5CE7' : lower === 'home' ? '#FDCB6E' : '#E84393');
      list.push({ name, icon, color });
    });
    return list;
  }, [categoriesList, products]);

  const testimonials = [
    {
      id: 1,
      name: "Marcus Vance",
      role: "Verified Buyer",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
      quote: "The SoundPulse Wireless Pro has unmatched ANC quality. Sub-second pairing with my devices and battery lasts all week!",
      productName: "SoundPulse Wireless Pro"
    },
    {
      id: 2,
      name: "Sophia Chen",
      role: "Verified Buyer",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80",
      quote: "SWITCHES ordering process was seamless. Express dispatch delivered my Horizon Smartwatch in under 48 hours!",
      productName: "Horizon Smartwatch Ultra"
    },
    {
      id: 3,
      name: "David Miller",
      role: "Tech Enthusiast",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
      quote: "CyberGlow keyboard typing feedback is ultra-crisp. Easily the highest build quality keyboard in my setup.",
      productName: "CyberGlow Keyboard"
    }
  ];

  const faqs = [
    {
      id: 1,
      question: "How fast is SWITCHES Express Dispatch?",
      answer: "All orders placed before 2 PM EST are dispatched same-day with real-time GPS tracking enabled."
    },
    {
      id: 2,
      question: "What warranty comes with SWITCHES hardware?",
      answer: "Every electronic device and wearable includes our 2-Year SWITCHES Hardware Replacement Coverage."
    },
    {
      id: 3,
      question: "How do I apply VIP discount promo codes?",
      answer: "You can apply promo codes like SWITCHES10 or SWITCHES20 directly during 2-step checkout."
    }
  ];

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2.2rem', paddingTop: '0.85rem', width: '100%', overflowX: 'hidden' }}>
      
      {/* 1. Hero Banner Showcase with 3D E-Commerce Image */}
      <section className="card" style={{
        background: 'linear-gradient(135deg, rgba(186, 12, 47, 0.12), rgba(153, 0, 0, 0.05))',
        border: '1px solid var(--border-active)',
        padding: 'clamp(1.25rem, 4vw, 2.5rem) clamp(1rem, 4vw, 2.5rem)',
        borderRadius: 'var(--radius-lg)',
        position: 'relative',
        overflow: 'hidden',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '2rem'
      }}>
        <div style={{ flex: 1, maxWidth: '600px', position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.75rem' }} className="badge badge-primary">
            <img src="/logo.png" alt="SWITCHES" style={{ height: '1rem', width: 'auto' }} />
            <span>SWITCHES OFFICIAL — SINCE 2026</span>
          </div>
          
          <h1 style={{
            fontSize: 'clamp(1.6rem, 5vw, 3.2rem)',
            fontWeight: 900,
            lineHeight: 1.12,
            marginBottom: '0.85rem',
            letterSpacing: '-0.5px'
          }}>
            Engineered for <span style={{ background: 'var(--grad-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Speed & Precision</span>.
          </h1>
          
          <p style={{ fontSize: 'clamp(0.85rem, 2.5vw, 1rem)', color: 'var(--text-muted)', marginBottom: '1.5rem', lineHeight: 1.5 }}>
            Experience the new standard in retail. Instant sub-second browsing, high-converting checkout, and 60 FPS fluid animations.
          </p>

          <div style={{ display: 'flex', gap: '0.55rem', width: '100%', alignItems: 'center' }}>
            <button 
              onClick={() => setCurrentPage('catalog')} 
              className="btn btn-primary"
              style={{ flex: 1, padding: '0.65rem 0.65rem', fontSize: '0.8rem', whiteSpace: 'nowrap', minHeight: '38px' }}
            >
              Explore Collection <ArrowRight size={14} />
            </button>
            <button 
              onClick={() => {
                setSelectedCategory('Tech');
                setCurrentPage('catalog');
              }} 
              className="btn btn-secondary"
              style={{ flex: 1, padding: '0.65rem 0.65rem', fontSize: '0.8rem', whiteSpace: 'nowrap', minHeight: '38px' }}
            >
              Shop Electronics
            </button>
          </div>
        </div>

        <div className="hero-product-image-container" style={{ flex: '0 0 360px', maxWidth: '360px', position: 'relative', zIndex: 2 }}>
          <div style={{ position: 'relative', cursor: 'pointer' }} onClick={() => setCurrentPage('catalog')}>
            <img
              src="/ecommerce-hero.png"
              alt="SWITCHES 3D E-Commerce Shopping Showcase"
              style={{
                width: '100%',
                height: '250px',
                objectFit: 'cover',
                borderRadius: 'var(--radius-md)',
                boxShadow: 'var(--shadow-lg)',
                border: '2px solid var(--border-active)',
                filter: 'drop-shadow(0 12px 24px rgba(186, 12, 47, 0.35))'
              }}
            />
            <div style={{
              position: 'absolute',
              bottom: '10px',
              left: '10px',
              right: '10px',
              background: 'var(--bg-glass-heavy)',
              backdropFilter: 'blur(12px)',
              padding: '0.45rem 0.75rem',
              borderRadius: 'var(--radius-sm)',
              display: 'flex',
              justify: 'space-between',
              alignItems: 'center'
            }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 800 }}>SWITCHES Retail Platform</span>
              <span className="badge badge-primary" style={{ fontSize: '0.65rem' }}>VIP SHOPPING</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Category Quick Selector */}
      <section style={{ width: '100%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
          <h2 style={{ fontSize: 'clamp(1.15rem, 3.5vw, 1.4rem)', fontWeight: 800 }}>Explore Categories</h2>
          <button onClick={() => setCurrentPage('catalog')} className="btn btn-secondary" style={{ fontSize: '0.78rem', padding: '0.3rem 0.65rem', minHeight: '34px' }}>
            View All
          </button>
        </div>

        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.65rem',
          width: '100%'
        }}>
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.name;
            return (
              <button
                key={cat.name}
                onClick={() => {
                  setSelectedCategory(cat.name);
                  setCurrentPage('catalog');
                }}
                className="card"
                style={{
                  flex: '1 1 90px',
                  minWidth: '85px',
                  padding: '0.65rem 0.85rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  cursor: 'pointer',
                  border: isSelected ? '2px solid var(--border-active)' : '1px solid var(--border-light)',
                  background: isSelected ? 'rgba(186, 12, 47, 0.1)' : 'var(--bg-card)',
                  color: isSelected ? 'hsl(var(--hue-primary), 85%, 50%)' : 'var(--text-main)',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  minHeight: '42px',
                  borderRadius: 'var(--radius-md)'
                }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: cat.color
                }}>
                  <Icon size={18} />
                </div>
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* 3. Featured SWITCHES Products Grid */}
      <section style={{ width: '100%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div>
            <h2 style={{ fontSize: 'clamp(1.15rem, 3.5vw, 1.45rem)', fontWeight: 800 }}>Featured SWITCHES Products</h2>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Top-rated products engineered for high performance.</p>
          </div>
          <button onClick={() => setCurrentPage('catalog')} className="btn btn-primary" style={{ fontSize: '0.78rem', padding: '0.35rem 0.8rem' }}>
            Browse Catalog
          </button>
        </div>

        <div className="product-grid">
          {featured.map((product) => {
            const isWishlisted = wishlist.includes(product.id);
            return (
              <div 
                key={product.id} 
                className="card" 
                onClick={() => navigateToProduct(product.id)}
                style={{ display: 'flex', flexDirection: 'column', width: '100%', cursor: 'pointer' }}
              >
                
                {/* Image Container */}
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
                  {product.isNew && (
                    <span className="badge badge-primary" style={{ position: 'absolute', top: '8px', left: '8px', zIndex: 2 }}>
                      NEW
                    </span>
                  )}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(product.id);
                    }}
                    className="btn btn-icon"
                    style={{
                      position: 'absolute',
                      top: '8px',
                      right: '8px',
                      zIndex: 2,
                      background: 'var(--bg-glass-heavy)',
                      width: '32px',
                      height: '32px',
                      minWidth: '32px',
                      minHeight: '32px'
                    }}
                  >
                    <Heart size={14} color={isWishlisted ? '#ff4757' : 'var(--text-main)'} fill={isWishlisted ? '#ff4757' : 'none'} />
                  </button>
                </div>

                {/* Card Body */}
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
                      style={{ fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.2rem', lineHeight: 1.25, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                    >
                      {product.name}
                    </h3>
                    <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {product.tagline}
                    </p>
                  </div>

                  {/* Price & Action */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '0.45rem', borderTop: '1px solid var(--border-light)' }}>
                    <div>
                      <span style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-main)' }}>${product.price}</span>
                    </div>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        navigateToProduct(product.id);
                      }} 
                      className="btn btn-secondary" 
                      style={{ padding: '0.3rem 0.6rem', fontSize: '0.75rem', minHeight: '32px' }}
                    >
                      Details
                    </button>
                  </div>

                </div>

              </div>
            );
          })}
        </div>
      </section>

      {/* 4. Brand Promise & Key Values - Compact Icon Badges */}
      <section style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
        gap: '0.65rem',
        width: '100%'
      }}>
        {[
          { icon: Truck, title: "Express Dispatch" },
          { icon: ShieldCheck, title: "2-Year Coverage" },
          { icon: Zap, title: "Sub-Second Speed" },
          { icon: MessageSquare, title: "24/7 VIP Support" }
        ].map((v, idx) => {
          const Icon = v.icon;
          return (
            <div key={idx} className="card" style={{ padding: '0.55rem 0.75rem', display: 'flex', alignItems: 'center', gap: '0.55rem', justifyContent: 'center' }} title={v.title}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: 'var(--radius-full)',
                background: 'rgba(186, 12, 47, 0.12)',
                color: 'hsl(var(--hue-primary), 85%, 50%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <Icon size={16} />
              </div>
              <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-main)', whiteSpace: 'nowrap' }}>{v.title}</span>
            </div>
          );
        })}
      </section>      {/* Promotional Banner 1: Best Selling Products Deal */}
      <div className="card" style={{
        width: '100%',
        padding: '1.5rem 1.75rem',
        borderRadius: 'var(--radius-lg)',
        background: 'linear-gradient(135deg, #ba0c2f 0%, #7a071c 100%)',
        color: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1.5rem',
        boxShadow: '0 8px 24px rgba(186, 12, 47, 0.25)',
        overflow: 'hidden'
      }}>
        <div style={{ width: '170px', height: '130px', flexShrink: 0, borderRadius: 'var(--radius-md)', overflow: 'hidden', border: '2px solid rgba(255,255,255,0.3)', boxShadow: '0 6px 16px rgba(0,0,0,0.2)' }}>
          <img 
            src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80" 
            alt="Best Seller Headphones" 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
          />
        </div>

        <div style={{ flex: 1, minWidth: '260px' }}>
          <span style={{
            background: 'rgba(255, 255, 255, 0.2)',
            padding: '0.25rem 0.65rem',
            borderRadius: 'var(--radius-full)',
            fontSize: '0.68rem',
            fontWeight: 800,
            letterSpacing: '0.5px',
            display: 'inline-block',
            marginBottom: '0.4rem'
          }}>
            🔥 LIMITED TIME OFFER — SAVE UP TO 30%
          </span>
          <h2 style={{ fontSize: 'clamp(1.15rem, 3vw, 1.5rem)', fontWeight: 900, marginBottom: '0.35rem', color: '#fff', lineHeight: 1.2 }}>
            Top-Rated Tech & Ergonomic Hardware Sale
          </h2>
          <p style={{ fontSize: '0.82rem', opacity: 0.9, lineHeight: 1.5, marginBottom: '1rem', maxWidth: '500px' }}>
            Upgrade your daily workflow with studio audio headphones, titanium smartwatches, and hot-swappable keyboards.
          </p>
          <button 
            onClick={() => setCurrentPage('catalog')}
            className="btn"
            style={{
              background: '#ffffff',
              color: '#ba0c2f',
              fontWeight: 800,
              padding: '0.55rem 1.25rem',
              fontSize: '0.82rem',
              borderRadius: 'var(--radius-md)',
              boxShadow: '0 4px 14px rgba(0,0,0,0.15)'
            }}
          >
            Shop Best Sellers
          </button>
        </div>
      </div>

      {/* 5. 🔥 Best Selling Products Section */}
      <section style={{ width: '100%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div>
            <h2 style={{ fontSize: 'clamp(1.15rem, 3.5vw, 1.4rem)', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              🔥 Best Selling Products
            </h2>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              Top-rated hardware & tech accessories chosen by tech enthusiasts worldwide
            </p>
          </div>
          <button 
            onClick={() => setCurrentPage('catalog')}
            className="btn btn-secondary"
            style={{ padding: '0.35rem 0.85rem', fontSize: '0.8rem' }}
          >
            Explore All
          </button>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: '1rem',
          width: '100%'
        }}>
          {products.slice(0, 5).map((product) => (
            <div 
              key={product.id}
              className="card product-card-hover"
              style={{ padding: '0.85rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', cursor: 'pointer' }}
              onClick={() => navigateToProduct(product.id)}
            >
              <div>
                <div style={{ position: 'relative', borderRadius: 'var(--radius-md)', overflow: 'hidden', marginBottom: '0.65rem' }}>
                  <img 
                    src={product.images?.[0] || product.image} 
                    alt={product.name} 
                    style={{ width: '100%', height: '140px', objectFit: 'cover' }} 
                  />
                  <span className="badge" style={{ position: 'absolute', top: '8px', left: '8px', background: '#ba0c2f', color: '#fff', fontSize: '0.65rem', fontWeight: 800 }}>
                    🔥 BEST SELLER
                  </span>
                </div>
                <h3 style={{ fontSize: '0.88rem', fontWeight: 700, marginBottom: '0.2rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {product.name}
                </h3>
                <p style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginBottom: '0.5rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {product.tagline}
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '0.5rem', borderTop: '1px solid var(--border-light)' }}>
                <span style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-main)' }}>${product.price}</span>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(product, product.colors?.[0]?.name || 'Standard', product.sizes?.[0] || 'Default');
                    showToast(`Added ${product.name} to Cart!`);
                  }}
                  className="btn btn-primary"
                  style={{ padding: '0.35rem 0.65rem', fontSize: '0.75rem' }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Promotional Banner 2: New Season Drops */}
      <div className="card" style={{
        width: '100%',
        padding: '1.5rem 1.75rem',
        borderRadius: 'var(--radius-lg)',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        color: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1.5rem',
        border: '1px solid rgba(255, 255, 255, 0.12)',
        boxShadow: '0 8px 24px rgba(15, 23, 42, 0.3)',
        overflow: 'hidden'
      }}>
        <div style={{ width: '170px', height: '130px', flexShrink: 0, borderRadius: 'var(--radius-md)', overflow: 'hidden', border: '2px solid rgba(255,255,255,0.15)', boxShadow: '0 6px 16px rgba(0,0,0,0.3)' }}>
          <img 
            src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80" 
            alt="New Smartwatch Drop" 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
          />
        </div>

        <div style={{ flex: 1, minWidth: '260px' }}>
          <span style={{
            background: 'rgba(186, 12, 47, 0.35)',
            color: '#ff4757',
            border: '1px solid rgba(255, 71, 87, 0.4)',
            padding: '0.25rem 0.65rem',
            borderRadius: 'var(--radius-full)',
            fontSize: '0.68rem',
            fontWeight: 800,
            letterSpacing: '0.5px',
            display: 'inline-block',
            marginBottom: '0.4rem'
          }}>
            ✨ NEW 2026 RELEASE DROPS
          </span>
          <h2 style={{ fontSize: 'clamp(1.15rem, 3vw, 1.5rem)', fontWeight: 900, marginBottom: '0.35rem', color: '#fff', lineHeight: 1.2 }}>
            Next-Generation Smart Lighting & Audio Gear
          </h2>
          <p style={{ fontSize: '0.82rem', color: '#94a3b8', lineHeight: 1.5, marginBottom: '1rem', maxWidth: '500px' }}>
            Be among the first to experience our latest sub-second ANC audio, titanium display watches, and ambient lightbars.
          </p>
          <button 
            onClick={() => setCurrentPage('catalog')}
            className="btn btn-primary"
            style={{
              fontWeight: 800,
              padding: '0.55rem 1.25rem',
              fontSize: '0.82rem',
              borderRadius: 'var(--radius-md)'
            }}
          >
            Discover New Drops
          </button>
        </div>
      </div>

      {/* 5.5 ✨ New Arrivals Section */}
      <section style={{ width: '100%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div>
            <h2 style={{ fontSize: 'clamp(1.15rem, 3.5vw, 1.4rem)', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              ✨ New Arrivals
            </h2>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              Explore the latest 2026 hardware drops and fresh tech releases
            </p>
          </div>
          <button 
            onClick={() => setCurrentPage('catalog')}
            className="btn btn-secondary"
            style={{ padding: '0.35rem 0.85rem', fontSize: '0.8rem' }}
          >
            View All Drops
          </button>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: '1rem',
          width: '100%'
        }}>
          {products.slice(0, 5).map((product) => (
            <div 
              key={`new-${product.id}`}
              className="card product-card-hover"
              style={{ padding: '0.85rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', cursor: 'pointer' }}
              onClick={() => navigateToProduct(product.id)}
            >
              <div>
                <div style={{ position: 'relative', borderRadius: 'var(--radius-md)', overflow: 'hidden', marginBottom: '0.65rem' }}>
                  <img 
                    src={product.images?.[0] || product.image} 
                    alt={product.name} 
                    style={{ width: '100%', height: '140px', objectFit: 'cover' }} 
                  />
                  <span className="badge badge-accent" style={{ position: 'absolute', top: '8px', left: '8px', fontSize: '0.65rem', fontWeight: 800 }}>
                    ✨ NEW RELEASE
                  </span>
                </div>
                <h3 style={{ fontSize: '0.88rem', fontWeight: 700, marginBottom: '0.2rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {product.name}
                </h3>
                <p style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginBottom: '0.5rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {product.tagline}
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '0.5rem', borderTop: '1px solid var(--border-light)' }}>
                <span style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-main)' }}>${product.price}</span>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(product, product.colors?.[0]?.name || 'Standard', product.sizes?.[0] || 'Default');
                    showToast(`Added ${product.name} to Cart!`);
                  }}
                  className="btn btn-primary"
                  style={{ padding: '0.35rem 0.65rem', fontSize: '0.75rem' }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. ⚡ Precision Engineering & Brand Story Content */}
      <section className="card" style={{ padding: '1.5rem', width: '100%', background: 'linear-gradient(135deg, var(--bg-card) 0%, var(--bg-secondary) 100%)' }}>
        <div style={{ maxWidth: '680px', marginBottom: '1.25rem' }}>
          <span className="badge badge-primary" style={{ marginBottom: '0.5rem', fontSize: '0.68rem' }}>
            ENGINEERING & CRAFTSMANSHIP
          </span>
          <h2 style={{ fontSize: 'clamp(1.2rem, 3.5vw, 1.6rem)', fontWeight: 800, marginBottom: '0.5rem', color: 'var(--text-main)' }}>
            Engineered for Speed, Fluidity & Tactile Precision
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
            Every product in the SWITCHES ecosystem is crafted to deliver optimal ergonomics, premium material feel, and zero-compromise hardware durability.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem'
        }}>
          <div style={{ padding: '1rem', background: 'var(--bg-card)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
            <div style={{ fontSize: '1.2rem', marginBottom: '0.4rem' }}>⚡</div>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '0.3rem' }}>Sub-Second Speed</h4>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
              60 FPS fluid rendering with micro-animations optimized for instant tactile responsiveness.
            </p>
          </div>

          <div style={{ padding: '1rem', background: 'var(--bg-card)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
            <div style={{ fontSize: '1.2rem', marginBottom: '0.4rem' }}>🛡️</div>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '0.3rem' }}>2-Year Hardware Coverage</h4>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
              Comprehensive replacement warranty guaranteeing long-term peak performance for all gear.
            </p>
          </div>

          <div style={{ padding: '1rem', background: 'var(--bg-card)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
            <div style={{ fontSize: '1.2rem', marginBottom: '0.4rem' }}>🚀</div>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '0.3rem' }}>Express Worldwide Shipping</h4>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
              Real-time order tracking with express dispatch on all orders worldwide over $150.
            </p>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .hero-product-image-container { display: none !important; }
        }
      `}</style>

    </div>
  );
};
