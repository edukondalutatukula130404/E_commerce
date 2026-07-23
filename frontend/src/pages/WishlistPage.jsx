import React from 'react';
import { useApp } from '../context/AppContext';
import { Heart, ShoppingBag, Trash2, ArrowLeft } from 'lucide-react';

export const WishlistPage = () => {
  const { wishlist, products, toggleWishlist, addToCart, navigateToProduct, setCurrentPage, setUserDashboardTab } = useApp();

  const savedProducts = products.filter(p => wishlist.includes(p.id));

  return (
    <div className="animate-fade-in" style={{ paddingTop: '0.75rem', paddingBottom: '4rem' }}>
      
      {/* Back Button */}
      <div style={{ marginBottom: '1rem' }}>
        <button 
          onClick={() => {
            if (typeof setUserDashboardTab === 'function') setUserDashboardTab('menu');
            setCurrentPage('user-dashboard');
          }} 
          className="btn btn-secondary"
          style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem', minHeight: '34px' }}
        >
          <ArrowLeft size={15} /> Back to Account Menu
        </button>
      </div>

      <div style={{ marginBottom: '1.25rem' }}>
        <h1 style={{ fontSize: 'clamp(1.4rem, 4vw, 1.8rem)', fontWeight: 800 }}>Saved Wishlist</h1>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          {savedProducts.length} items saved for later
        </p>
      </div>

      {savedProducts.length === 0 ? (
        <div className="card" style={{ padding: '3.5rem 1.5rem', textAlign: 'center' }}>
          <Heart size={44} style={{ color: 'var(--text-muted)', marginBottom: '0.85rem' }} />
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.4rem' }}>Your Wishlist is Empty</h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
            Tap the heart icon on any product card to save items to your personal wishlist.
          </p>
          <button onClick={() => setCurrentPage('catalog')} className="btn btn-primary">
            Explore Products
          </button>
        </div>
      ) : (
        <div className="product-grid">
          {savedProducts.map((product) => (
            <div key={product.id} className="card" style={{ display: 'flex', flexDirection: 'column' }}>
              <div className="product-image-container">
                <img
                  src={product.images?.[0] || product.image || "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80"}
                  alt={product.name}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80";
                  }}
                />
                <button onClick={() => toggleWishlist(product.id)} className="btn btn-icon" style={{ position: 'absolute', top: '8px', right: '8px', background: 'var(--bg-glass-heavy)', width: '34px', height: '34px', minWidth: '34px', minHeight: '34px' }}>
                  <Trash2 size={14} color="#ff4757" />
                </button>
              </div>

              <div style={{ padding: '0.85rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '0.65rem' }}>
                <div>
                  <h3 onClick={() => navigateToProduct(product.id)} style={{ fontSize: '0.9rem', fontWeight: 700, cursor: 'pointer', marginBottom: '0.2rem', lineHeight: 1.3 }}>
                    {product.name}
                  </h3>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{product.tagline}</p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '0.55rem', borderTop: '1px solid var(--border-light)' }}>
                  <span style={{ fontSize: '1.05rem', fontWeight: 800 }}>${product.price}</span>
                  <button onClick={() => addToCart(product)} className="btn btn-primary" style={{ padding: '0.35rem 0.65rem', fontSize: '0.75rem', minHeight: '32px' }}>
                    <ShoppingBag size={13} /> Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
