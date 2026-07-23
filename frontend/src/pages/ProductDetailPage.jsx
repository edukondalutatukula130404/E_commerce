import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Star, Heart, ShoppingBag, ArrowLeft, Check, Sparkles, Upload, Image as ImageIcon, MessageSquare, CheckCircle2, X, Zap } from 'lucide-react';

export const ProductDetailPage = () => {
  const { products, selectedProductId, setCurrentPage, navigateToProduct, addToCart, toggleWishlist, wishlist, showToast } = useApp();

  const product = products.find(p => p.id === selectedProductId) || products[0];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || '');
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || 'Standard');
  const [quantity, setQuantity] = useState(1);

  // Review System & Upload State
  const [reviews, setReviews] = useState([
    {
      id: 1,
      author: "Marcus Vance",
      date: "July 20, 2026",
      rating: 5,
      comment: "Absolutely top quality. Build materials feel premium and delivery was super fast under 2 days.",
      verified: true,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 2,
      author: "Sarah Jenkins",
      date: "July 16, 2026",
      rating: 5,
      comment: "Exceeded my expectations! The color and finish match the photos perfectly. Highly recommend SWITCHES.",
      verified: true
    },
    {
      id: 3,
      author: "David Chen",
      date: "July 10, 2026",
      rating: 4,
      comment: "Great product for the price. Very comfortable to use and feels sturdy.",
      verified: true
    }
  ]);

  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [newReview, setNewReview] = useState({
    author: '',
    rating: 5,
    comment: '',
    verified: true,
    image: null
  });
  const [imagePreview, setImagePreview] = useState(null);

  const isWishlisted = wishlist.includes(product.id);

  // AI-Powered Recommendation Logic: Filters related items by category & price proximity
  const recommendations = products.filter(
    p => p.id !== product.id && (p.category === product.category || Math.abs(p.price - product.price) <= 120)
  ).slice(0, 4);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setNewReview(prev => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddReview = (e) => {
    e.preventDefault();
    if (!newReview.author || !newReview.comment) {
      showToast('Please enter your name and review details');
      return;
    }

    const createdReview = {
      id: Date.now(),
      author: newReview.author,
      date: 'Just Now',
      rating: Number(newReview.rating),
      comment: newReview.comment,
      verified: newReview.verified,
      image: newReview.image
    };

    setReviews([createdReview, ...reviews]);
    showToast('Review submitted successfully!');
    setIsReviewModalOpen(false);
    setNewReview({ author: '', rating: 5, comment: '', verified: true, image: null });
    setImagePreview(null);
  };

  return (
    <div className="animate-fade-in" style={{ paddingTop: '1rem', paddingBottom: '6rem' }}>
      
      {/* Back Button */}
      <button 
        onClick={() => setCurrentPage('catalog')} 
        className="btn btn-secondary"
        style={{ marginBottom: '1.1rem', padding: '0.4rem 0.85rem', fontSize: '0.85rem', minHeight: '36px' }}
      >
        <ArrowLeft size={16} /> Back to Catalog
      </button>

      {/* Main Detail Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '1.75rem',
        alignItems: 'flex-start'
      }}>
        
        {/* Gallery Section */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          
          {/* Main Large Image Container */}
          <div className="card" style={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
            <img
              src={product.images?.[activeImageIndex] || product.images?.[0] || product.image || "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80"}
              alt={product.name}
              className="product-detail-main-img"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80";
              }}
            />
            <button
              onClick={() => toggleWishlist(product.id)}
              className="btn btn-icon"
              style={{ position: 'absolute', top: '12px', right: '12px', background: 'var(--bg-glass-heavy)' }}
            >
              <Heart size={18} color={isWishlisted ? '#ff4757' : 'var(--text-main)'} fill={isWishlisted ? '#ff4757' : 'none'} />
            </button>
          </div>

          {/* Thumbnails list */}
          {product.images?.length > 1 && (
            <div style={{ display: 'flex', gap: '0.55rem', overflowX: 'auto' }}>
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className="card"
                  style={{
                    width: '60px',
                    height: '60px',
                    minWidth: '60px',
                    padding: 0,
                    cursor: 'pointer',
                    border: activeImageIndex === idx ? '2px solid var(--border-active)' : '1px solid var(--border-light)',
                    overflow: 'hidden'
                  }}
                >
                  <img src={img} alt="thumb" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </button>
              ))}
            </div>
          )}

        </div>

        {/* Product Details Section */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
          
          <div>
            <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '0.4rem', flexWrap: 'wrap' }}>
              <span className="badge badge-primary">{product.category}</span>
              {product.stock > 0 ? (
                <span className="badge badge-success">In Stock ({product.stock})</span>
              ) : (
                <span className="badge badge-danger">Out of Stock</span>
              )}
            </div>
            <h1 style={{ fontSize: 'clamp(1.35rem, 4vw, 2.1rem)', fontWeight: 800, marginBottom: '0.3rem', lineHeight: 1.25 }}>
              {product.name}
            </h1>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '0.55rem' }}>
              {product.tagline}
            </p>
            
            {/* Rating */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <div style={{ display: 'flex', color: '#f59e0b' }}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} fill={i < Math.floor(product.rating) ? '#f59e0b' : 'none'} />
                ))}
              </div>
              <span style={{ fontWeight: 700, fontSize: '0.85rem' }}>{product.rating}</span>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>({reviews.length} verified reviews)</span>
            </div>
          </div>

          {/* Pricing */}
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.6rem' }}>
            <span style={{ fontSize: 'clamp(1.5rem, 5vw, 2.1rem)', fontWeight: 800, color: 'hsl(var(--hue-primary), 85%, 50%)' }}>
              ${product.price}
            </span>
            {product.originalPrice && (
              <span style={{ fontSize: '0.95rem', color: 'var(--text-muted)', textDecoration: 'line-through' }}>
                ${product.originalPrice}
              </span>
            )}
          </div>

          {/* Description */}
          <p style={{ fontSize: '0.875rem', lineHeight: 1.6, color: 'var(--text-main)' }}>
            {product.description}
          </p>

          {/* Color Swatches */}
          {product.colors && product.colors.length > 0 && (
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 700, display: 'block', marginBottom: '0.35rem' }}>
                Color: <span style={{ color: 'var(--text-muted)' }}>{selectedColor}</span>
              </label>
              <div style={{ display: 'flex', gap: '0.55rem' }}>
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(c.name)}
                    style={{
                      width: '2.25rem',
                      height: '2.25rem',
                      borderRadius: 'var(--radius-full)',
                      background: c.hex,
                      border: selectedColor === c.name ? '3px solid var(--border-active)' : '1px solid var(--border-light)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: 'var(--shadow-sm)',
                      minWidth: '36px',
                      minHeight: '36px'
                    }}
                    title={c.name}
                  >
                    {selectedColor === c.name && <Check size={14} color={c.hex === '#FAFAFA' || c.hex === '#E0E0E0' ? '#000' : '#fff'} />}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Size Selector */}
          {product.sizes && product.sizes.length > 1 && (
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 700, display: 'block', marginBottom: '0.35rem' }}>
                Size: <span style={{ color: 'var(--text-muted)' }}>{selectedSize}</span>
              </label>
              <div style={{ display: 'flex', gap: '0.45rem' }}>
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className="btn"
                    style={{
                      padding: '0.4rem 0.85rem',
                      fontSize: '0.8rem',
                      background: selectedSize === s ? 'var(--grad-primary)' : 'var(--bg-secondary)',
                      color: selectedSize === s ? '#fff' : 'var(--text-main)',
                      border: '1px solid var(--border-light)',
                      minHeight: '36px'
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity, Add to Cart & Buy Now Action Controls */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', width: '100%', marginTop: '0.5rem' }}>
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
              <div className="card" style={{ display: 'flex', alignItems: 'center', padding: '0.2rem 0.4rem' }}>
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="btn btn-secondary" style={{ padding: '0.3rem 0.65rem', minHeight: '36px', fontSize: '1rem', fontWeight: 800 }}>-</button>
                <span style={{ padding: '0 0.85rem', fontWeight: 800, fontSize: '0.95rem' }}>{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="btn btn-secondary" style={{ padding: '0.3rem 0.65rem', minHeight: '36px', fontSize: '1rem', fontWeight: 800 }}>+</button>
              </div>

              <button
                onClick={() => addToCart(product, selectedColor, selectedSize, quantity)}
                className="btn btn-primary"
                style={{ flex: 1, padding: '0.75rem 1rem', fontSize: '0.875rem', minHeight: '44px', minWidth: '150px' }}
              >
                <ShoppingBag size={18} /> Add to Cart (${(product.price * quantity).toFixed(2)})
              </button>
            </div>

            <button
              onClick={() => {
                addToCart(product, selectedColor, selectedSize, quantity);
                setCurrentPage('cart');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="btn"
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                fontSize: '0.9rem',
                fontWeight: 800,
                background: 'linear-gradient(135deg, #10B981, #059669)',
                color: '#ffffff',
                borderRadius: 'var(--radius-md)',
                minHeight: '44px',
                boxShadow: '0 4px 14px rgba(16, 185, 129, 0.35)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem'
              }}
            >
              <Zap size={18} /> Buy Now (Instant Checkout)
            </button>
          </div>

          {/* Specifications */}
          {product.features && (
            <div className="card" style={{ padding: '1rem', marginTop: '0.3rem' }}>
              <h4 style={{ fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.5rem' }}>Key Specifications</h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.35rem', fontSize: '0.8rem' }}>
                {product.features.map((f, idx) => (
                  <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Check size={14} color="hsl(var(--hue-primary), 85%, 50%)" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

        </div>

      </div>

      {/* 1. Customer Reviews & Verification System (Desktop Only) */}
      <div className="hide-mobile" style={{ marginTop: '2.5rem', paddingTop: '1.75rem', borderTop: '1px solid var(--border-light)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Customer Reviews & Feedback</h3>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Verified buyer ratings and uploaded product photos</p>
          </div>

          <button 
            onClick={() => setIsReviewModalOpen(true)}
            className="btn btn-primary"
            style={{ padding: '0.45rem 0.85rem', fontSize: '0.8rem' }}
          >
            <MessageSquare size={14} /> Write a Review
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem', alignItems: 'flex-start' }}>
          
          {/* Summary Box */}
          <div className="card" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
              <span style={{ fontSize: '2.5rem', fontWeight: 900, color: 'hsl(var(--hue-primary), 85%, 50%)' }}>
                {product.rating}
              </span>
              <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>out of 5</span>
            </div>

            <div style={{ display: 'flex', color: '#f59e0b', gap: '2px' }}>
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={18} fill={i < Math.floor(product.rating) ? '#f59e0b' : 'none'} />
              ))}
            </div>

            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Based on {reviews.length} verified customer reviews
            </p>

            {/* Rating Distribution Bars */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginTop: '0.25rem' }}>
              {[
                { stars: 5, pct: 82 },
                { stars: 4, pct: 12 },
                { stars: 3, pct: 4 },
                { stars: 2, pct: 1 },
                { stars: 1, pct: 1 }
              ].map(item => (
                <div key={item.stars} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem' }}>
                  <span style={{ width: '40px', fontWeight: 600 }}>{item.stars} ★</span>
                  <div style={{ flex: 1, height: '6px', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
                    <div style={{ width: `${item.pct}%`, height: '100%', background: 'var(--grad-primary)', borderRadius: 'var(--radius-full)' }} />
                  </div>
                  <span style={{ width: '30px', color: 'var(--text-muted)', textAlign: 'right' }}>{item.pct}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Verified Customer Feedback Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {reviews.map(review => (
              <div key={review.id} className="card" style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <span style={{ fontWeight: 700, fontSize: '0.85rem' }}>{review.author}</span>
                    {review.verified && (
                      <span className="badge badge-success" style={{ fontSize: '0.65rem', padding: '1px 4px', display: 'flex', alignItems: 'center', gap: '2px' }}>
                        <CheckCircle2 size={10} /> Verified Purchase
                      </span>
                    )}
                  </div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{review.date}</span>
                </div>

                <div style={{ display: 'flex', color: '#f59e0b', gap: '2px' }}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={13} fill={i < review.rating ? '#f59e0b' : 'none'} />
                  ))}
                </div>

                <p style={{ fontSize: '0.825rem', color: 'var(--text-main)', lineHeight: 1.5 }}>
                  {review.comment}
                </p>

                {/* Uploaded Customer Image Preview */}
                {review.image && (
                  <div style={{ marginTop: '0.4rem' }}>
                    <img 
                      src={review.image} 
                      alt="Customer review photo" 
                      style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)' }} 
                    />
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* 2. AI-Powered Product Recommendations ("You May Also Like") */}
      {recommendations.length > 0 && (
        <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid var(--border-light)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
            <Sparkles size={20} color="hsl(var(--hue-primary), 85%, 50%)" />
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>AI Recommendations: You May Also Like</h3>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))',
            gap: '1rem'
          }}>
            {recommendations.map(rec => (
              <div key={rec.id} className="card product-card" style={{ padding: '0.85rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <img
                  src={rec.images[0]}
                  alt={rec.name}
                  style={{ width: '100%', height: '140px', objectFit: 'cover', borderRadius: 'var(--radius-sm)' }}
                />
                <span className="badge badge-primary" style={{ alignSelf: 'flex-start', fontSize: '0.65rem' }}>{rec.category}</span>
                <h4 style={{ fontSize: '0.85rem', fontWeight: 700, lineHeight: 1.25, height: '2.2rem', overflow: 'hidden' }}>{rec.name}</h4>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                  <span style={{ fontWeight: 800, color: 'hsl(var(--hue-primary), 85%, 50%)' }}>${rec.price}</span>
                  <button 
                    onClick={() => navigateToProduct(rec.id)}
                    className="btn btn-secondary"
                    style={{ fontSize: '0.75rem', padding: '0.3rem 0.6rem' }}
                  >
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Write Review Modal with Image Upload */}
      {isReviewModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.65)',
          backdropFilter: 'blur(8px)',
          zIndex: 2000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1rem'
        }} className="animate-fade-in">
          <div className="card" style={{ maxWidth: '480px', width: '100%', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800 }}>Write a Review for {product.name}</h3>
              <button onClick={() => setIsReviewModalOpen(false)} className="btn btn-icon">
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleAddReview} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <div>
                <label style={{ fontSize: '0.78rem', fontWeight: 700, display: 'block', marginBottom: '0.3rem' }}>Your Name</label>
                <input
                  type="text"
                  placeholder="e.g. Alex Mercer"
                  value={newReview.author}
                  onChange={(e) => setNewReview({ ...newReview, author: e.target.value })}
                  style={{ width: '100%', padding: '0.55rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', background: 'var(--bg-secondary)', color: 'var(--text-main)', fontSize: '0.85rem' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.78rem', fontWeight: 700, display: 'block', marginBottom: '0.3rem' }}>Rating</label>
                <div style={{ display: 'flex', gap: '0.4rem', color: '#f59e0b' }}>
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setNewReview({ ...newReview, rating: star })}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                    >
                      <Star size={22} fill={star <= newReview.rating ? '#f59e0b' : 'none'} />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.78rem', fontWeight: 700, display: 'block', marginBottom: '0.3rem' }}>Review Details</label>
                <textarea
                  rows={3}
                  placeholder="Share your experience with quality, fit, audio performance..."
                  value={newReview.comment}
                  onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                  style={{ width: '100%', padding: '0.55rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', background: 'var(--bg-secondary)', color: 'var(--text-main)', fontSize: '0.85rem', resize: 'vertical' }}
                />
              </div>

              {/* Image Upload Input */}
              <div>
                <label style={{ fontSize: '0.78rem', fontWeight: 700, display: 'block', marginBottom: '0.35rem' }}>Upload Product Photo</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={{ fontSize: '0.8rem' }}
                />
                {imagePreview && (
                  <div style={{ marginTop: '0.5rem' }}>
                    <img src={imagePreview} alt="Preview" style={{ width: '70px', height: '70px', objectFit: 'cover', borderRadius: 'var(--radius-sm)' }} />
                  </div>
                )}
              </div>

              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                <button type="button" onClick={() => setIsReviewModalOpen(false)} className="btn btn-secondary" style={{ flex: 1 }}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>Submit Review</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Mobile Fixed Sticky Bottom Action Bar */}
      <div style={{
        position: 'fixed',
        bottom: 'var(--mobile-nav-height)',
        left: 0,
        right: 0,
        zIndex: 1400,
        background: 'var(--bg-glass-heavy)',
        backdropFilter: 'blur(16px)',
        borderTop: '1px solid var(--border-light)',
        padding: '0.55rem 0.85rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '0.5rem'
      }} className="mobile-only-actionbar">
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>Price</span>
          <span style={{ fontSize: '1.1rem', fontWeight: 900, color: 'hsl(var(--hue-primary), 85%, 50%)' }}>
            ${(product.price * quantity).toFixed(2)}
          </span>
        </div>

        <div style={{ display: 'flex', gap: '0.4rem', flex: 1, justifyContent: 'flex-end' }}>
          <button
            onClick={() => addToCart(product, selectedColor, selectedSize, quantity)}
            className="btn btn-primary"
            style={{ padding: '0.5rem 0.65rem', fontSize: '0.78rem', minHeight: '38px' }}
          >
            <ShoppingBag size={14} /> Add Cart
          </button>

          <button
            onClick={() => {
              addToCart(product, selectedColor, selectedSize, quantity);
              setCurrentPage('cart');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="btn"
            style={{
              padding: '0.5rem 0.65rem',
              fontSize: '0.78rem',
              fontWeight: 800,
              background: 'linear-gradient(135deg, #10B981, #059669)',
              color: '#ffffff',
              borderRadius: 'var(--radius-md)',
              minHeight: '38px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.3rem'
            }}
          >
            <Zap size={14} /> Buy Now
          </button>
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .mobile-only-actionbar { display: none !important; }
        }
      `}</style>
    </div>
  );
};
