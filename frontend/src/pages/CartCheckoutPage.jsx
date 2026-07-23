import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Trash2, ShoppingBag, ArrowRight, CheckCircle2, Tag, CreditCard, Smartphone, DollarSign, Printer, ArrowLeft } from 'lucide-react';

export const CartCheckoutPage = () => {
  const { 
    cart, 
    products, 
    updateCartQty, 
    removeFromCart, 
    appliedCoupon, 
    applyCouponCode, 
    placeOrder, 
    setCurrentPage,
    user,
    setRedirectAfterAuth,
    pendingCheckoutStep,
    setPendingCheckoutStep,
    showToast
  } = useApp();

  const [checkoutStep, setCheckoutStep] = useState(pendingCheckoutStep || 'cart'); // 'cart' | 'shipping' | 'payment'
  const [couponInput, setCouponInput] = useState('');
  const [confirmedOrder, setConfirmedOrder] = useState(null);

  // Form State
  const [shippingInfo, setShippingInfo] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    street: '742 Evergreen Terrace',
    city: 'San Francisco',
    zip: '94107'
  });

  useEffect(() => {
    if (user) {
      setShippingInfo(prev => ({
        ...prev,
        fullName: user.name || prev.fullName || '',
        email: user.email || prev.email || ''
      }));
    }
  }, [user]);

  const [paymentMethod, setPaymentMethod] = useState('card');

  const cartItemsDetailed = cart.map(item => {
    const p = products.find(prod => prod.id === item.productId || prod._id === item.productId);
    return {
      ...item,
      product: p || { name: 'Product', price: 0, images: [''] }
    };
  });

  const subtotal = cartItemsDetailed.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discountAmount = appliedCoupon ? (subtotal * appliedCoupon.discountPercent) / 100 : 0;
  const freeShippingThreshold = 150;
  const progressToFreeShipping = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const shippingCost = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 15;
  const finalTotal = Math.max(0, subtotal - discountAmount + shippingCost);

  const handleCouponSubmit = (e) => {
    e.preventDefault();
    if (couponInput) applyCouponCode(couponInput);
  };

  const handleProceedToShipping = () => {
    if (!user) {
      setRedirectAfterAuth('checkout');
      setPendingCheckoutStep('shipping');
      setCurrentPage('auth');
      showToast('Please log in or create an account to proceed to shipping');
      return;
    }
    setCheckoutStep('shipping');
  };

  const handleProceedToPayment = () => {
    if (!user) {
      setRedirectAfterAuth('checkout');
      setPendingCheckoutStep('payment');
      setCurrentPage('auth');
      showToast('Please log in or create an account to proceed to payment');
      return;
    }
    setCheckoutStep('payment');
  };

  const handleStepTabClick = (step) => {
    if (step === 'shipping' || step === 'payment') {
      if (!user) {
        setRedirectAfterAuth('checkout');
        setPendingCheckoutStep(step);
        setCurrentPage('auth');
        showToast('Please log in or create an account to proceed');
        return;
      }
    }
    setCheckoutStep(step);
  };

  const handleFinalOrderSubmit = async () => {
    if (!user) {
      setRedirectAfterAuth('checkout');
      setPendingCheckoutStep('payment');
      setCurrentPage('auth');
      showToast('Please log in to complete your order');
      return;
    }
    const newOrder = await placeOrder(shippingInfo, paymentMethod);
    setConfirmedOrder(newOrder);
  };

  return (
    <div className="animate-fade-in" style={{ paddingTop: '0.75rem', paddingBottom: '4rem' }}>
      
      {/* Back Button */}
      <div style={{ marginBottom: '0.85rem' }}>
        <button 
          onClick={() => setCurrentPage('home')} 
          className="btn btn-secondary"
          style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem', minHeight: '34px' }}
        >
          <ArrowLeft size={15} /> Back
        </button>
      </div>

      {/* Page Title & Wizard Stepper */}
      <div style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: 'clamp(1.4rem, 4vw, 1.8rem)', fontWeight: 800, marginBottom: '0.4rem' }}>
          {checkoutStep === 'cart' && 'Shopping Cart'}
          {checkoutStep === 'shipping' && 'Shipping Details'}
          {checkoutStep === 'payment' && 'Payment & Review'}
        </h1>

        {/* Wizard Stepper Tabs */}
        <div style={{ display: 'flex', gap: '0.4rem', marginTop: '0.75rem', flexWrap: 'wrap' }}>
          {['cart', 'shipping', 'payment'].map((step, idx) => (
            <div
              key={step}
              onClick={() => {
                if (cart.length > 0) handleStepTabClick(step);
              }}
              style={{
                flex: 1,
                minWidth: '90px',
                padding: '0.55rem 0.65rem',
                borderRadius: 'var(--radius-md)',
                background: checkoutStep === step ? 'var(--grad-primary)' : 'var(--bg-secondary)',
                color: checkoutStep === step ? '#fff' : 'var(--text-muted)',
                fontWeight: 700,
                fontSize: '0.75rem',
                textAlign: 'center',
                cursor: cart.length > 0 ? 'pointer' : 'default'
              }}
            >
              {idx + 1}. {step.toUpperCase()}
            </div>
          ))}
        </div>
      </div>

      {cart.length === 0 && !confirmedOrder ? (
        <div className="card" style={{ padding: '3.5rem 1.5rem', textAlign: 'center' }}>
          <ShoppingBag size={48} style={{ color: 'var(--text-muted)', marginBottom: '1rem' }} />
          <h2 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '0.5rem' }}>Your Cart is Empty</h2>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
            Discover our curated catalog and add high-performance products to your cart.
          </p>
          <button onClick={() => setCurrentPage('catalog')} className="btn btn-primary">
            Start Shopping
          </button>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
          gap: '1.5rem',
          alignItems: 'flex-start'
        }}>
          
          {/* Left Main Content */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            
            {/* Step 1: Cart Items View */}
            {checkoutStep === 'cart' && (
              <>
                {/* Free Shipping Progress Indicator */}
                <div className="card" style={{ padding: '1rem', background: 'var(--bg-card)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.4rem' }}>
                    <span>
                      {subtotal >= freeShippingThreshold 
                        ? '🎉 You unlocked FREE Express Shipping!' 
                        : `Add $${(freeShippingThreshold - subtotal).toFixed(2)} more for Free Shipping`}
                    </span>
                    <span>{Math.round(progressToFreeShipping)}%</span>
                  </div>
                  <div style={{ width: '100%', height: '7px', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
                    <div style={{
                      width: `${progressToFreeShipping}%`,
                      height: '100%',
                      background: 'var(--grad-primary)',
                      transition: 'width 0.4s ease'
                    }} />
                  </div>
                </div>

                {/* Cart Items List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  {cartItemsDetailed.map((item, idx) => (
                    <div key={idx} className="card" style={{ padding: '0.85rem', display: 'flex', gap: '0.85rem', alignItems: 'center', flexWrap: 'wrap' }}>
                      <img
                        src={item.product?.images?.[0] || item.product?.image || "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80"}
                        alt={item.product?.name || "Product"}
                        style={{ width: '64px', height: '64px', borderRadius: 'var(--radius-md)', objectFit: 'cover' }}
                      />
                      <div style={{ flex: 1, minWidth: '140px' }}>
                        <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.2rem' }}>{item.product.name}</h4>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>
                          Color: {item.selectedColor} | Size: {item.selectedSize}
                        </div>
                        <span style={{ fontWeight: 800, color: 'hsl(var(--hue-primary), 85%, 50%)' }}>
                          ${item.product.price}
                        </span>
                      </div>

                      {/* Quantity Modifier & Remove */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', width: '100%', justifyContent: 'space-between' }} className="mobile-cart-controls">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                          <button onClick={() => updateCartQty(item.productId, item.selectedColor, item.selectedSize, -1)} className="btn btn-secondary" style={{ padding: '0.2rem 0.5rem', minHeight: '34px' }}>-</button>
                          <span style={{ fontWeight: 700, fontSize: '0.85rem' }}>{item.quantity}</span>
                          <button onClick={() => updateCartQty(item.productId, item.selectedColor, item.selectedSize, 1)} className="btn btn-secondary" style={{ padding: '0.2rem 0.5rem', minHeight: '34px' }}>+</button>
                        </div>

                        <button onClick={() => removeFromCart(item.productId, item.selectedColor, item.selectedSize)} className="btn btn-icon" style={{ width: '36px', height: '36px', minWidth: '36px', minHeight: '36px' }}>
                          <Trash2 size={15} color="#ff4757" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* Step 2: Shipping Form View */}
            {checkoutStep === 'shipping' && (
              <div className="card" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>Shipping Address</h3>
                
                <div>
                  <label style={{ fontSize: '0.78rem', fontWeight: 700, display: 'block', marginBottom: '0.2rem' }}>Full Name</label>
                  <input
                    type="text"
                    value={shippingInfo.fullName}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, fullName: e.target.value })}
                    style={{ width: '100%', padding: '0.6rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', background: 'var(--bg-secondary)', color: 'var(--text-main)', fontSize: '0.875rem' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.78rem', fontWeight: 700, display: 'block', marginBottom: '0.2rem' }}>Email Address</label>
                  <input
                    type="email"
                    value={shippingInfo.email}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, email: e.target.value })}
                    style={{ width: '100%', padding: '0.6rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', background: 'var(--bg-secondary)', color: 'var(--text-main)', fontSize: '0.875rem' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.78rem', fontWeight: 700, display: 'block', marginBottom: '0.2rem' }}>Street Address</label>
                  <input
                    type="text"
                    value={shippingInfo.street}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, street: e.target.value })}
                    style={{ width: '100%', padding: '0.6rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', background: 'var(--bg-secondary)', color: 'var(--text-main)', fontSize: '0.875rem' }}
                  />
                </div>

                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <div style={{ flex: 1 }}>
                    <label style={{ fontSize: '0.78rem', fontWeight: 700, display: 'block', marginBottom: '0.2rem' }}>City</label>
                    <input
                      type="text"
                      value={shippingInfo.city}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
                      style={{ width: '100%', padding: '0.6rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', background: 'var(--bg-secondary)', color: 'var(--text-main)', fontSize: '0.875rem' }}
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={{ fontSize: '0.78rem', fontWeight: 700, display: 'block', marginBottom: '0.2rem' }}>Zip Code</label>
                    <input
                      type="text"
                      value={shippingInfo.zip}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, zip: e.target.value })}
                      style={{ width: '100%', padding: '0.6rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', background: 'var(--bg-secondary)', color: 'var(--text-main)', fontSize: '0.875rem' }}
                    />
                  </div>
                </div>

              </div>
            )}

            {/* Step 3: Payment Method View */}
            {checkoutStep === 'payment' && (
              <div className="card" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>Select Payment Method</h3>

                {[
                  { id: 'card', title: 'Credit / Debit Card', desc: 'Instant 256-bit encrypted checkout', icon: CreditCard },
                  { id: 'upi', title: 'UPI / Instant Mobile Pay', desc: 'Zero transaction fee checkout', icon: Smartphone },
                  { id: 'cod', title: 'Cash on Delivery', desc: 'Pay when delivered to doorstep', icon: DollarSign }
                ].map(pm => {
                  const Icon = pm.icon;
                  const isSelected = paymentMethod === pm.id;
                  return (
                    <div
                      key={pm.id}
                      onClick={() => setPaymentMethod(pm.id)}
                      style={{
                        padding: '0.85rem 1rem',
                        borderRadius: 'var(--radius-md)',
                        border: isSelected ? '2px solid var(--border-active)' : '1px solid var(--border-light)',
                        background: isSelected ? 'rgba(186, 12, 47, 0.08)' : 'var(--bg-secondary)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem'
                      }}
                    >
                      <Icon size={20} color={isSelected ? 'hsl(var(--hue-primary), 85%, 50%)' : 'var(--text-muted)'} />
                      <div>
                        <h4 style={{ fontSize: '0.9rem', fontWeight: 700 }}>{pm.title}</h4>
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{pm.desc}</p>
                      </div>
                    </div>
                  );
                })}

              </div>
            )}

          </div>

          {/* Right Summary Sidebar */}
          <aside className="card" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>Order Summary</h3>

            {/* Promo Code Input */}
            <form onSubmit={handleCouponSubmit} style={{ display: 'flex', gap: '0.4rem' }}>
              <input
                type="text"
                placeholder="Promo (SWITCHES10)"
                value={couponInput}
                onChange={(e) => setCouponInput(e.target.value)}
                style={{
                  flex: 1,
                  padding: '0.5rem 0.65rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-light)',
                  background: 'var(--bg-secondary)',
                  color: 'var(--text-main)',
                  fontSize: '0.8rem'
                }}
              />
              <button type="submit" className="btn btn-secondary" style={{ padding: '0.5rem 0.75rem', fontSize: '0.8rem', minHeight: '36px' }}>Apply</button>
            </form>

            {appliedCoupon && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'hsl(var(--hue-success), 80%, 45%)', fontSize: '0.8rem', fontWeight: 700 }}>
                <Tag size={13} /> ({appliedCoupon.code}) -{appliedCoupon.discountPercent}%
              </div>
            )}

            {/* Price Calculations */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem', paddingTop: '0.4rem', borderTop: '1px solid var(--border-light)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Subtotal</span>
                <span style={{ fontWeight: 700 }}>${subtotal.toFixed(2)}</span>
              </div>
              {appliedCoupon && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'hsl(var(--hue-success), 80%, 45%)' }}>
                  <span>Discount</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Shipping</span>
                <span style={{ fontWeight: 700 }}>{shippingCost === 0 ? 'FREE' : `$${shippingCost}`}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.15rem', fontWeight: 900, paddingTop: '0.6rem', borderTop: '1px solid var(--border-light)', color: 'var(--text-main)' }}>
                <span>Total</span>
                <span>${finalTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Next Step Action Button */}
            {checkoutStep === 'cart' && (
              <button onClick={handleProceedToShipping} className="btn btn-primary" style={{ padding: '0.75rem', fontSize: '0.9rem' }}>
                Proceed to Shipping <ArrowRight size={16} />
              </button>
            )}

            {checkoutStep === 'shipping' && (
              <button onClick={handleProceedToPayment} className="btn btn-primary" style={{ padding: '0.75rem', fontSize: '0.9rem' }}>
                Proceed to Payment <ArrowRight size={16} />
              </button>
            )}

            {checkoutStep === 'payment' && (
              <button onClick={handleFinalOrderSubmit} className="btn btn-primary" style={{ padding: '0.75rem', fontSize: '0.9rem' }}>
                <CheckCircle2 size={18} /> Place Order Now (${finalTotal.toFixed(2)})
              </button>
            )}

          </aside>

        </div>
      )}

      {/* Order Confirmation Modal */}
      {confirmedOrder && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 3000,
          background: 'rgba(0, 0, 0, 0.75)',
          backdropFilter: 'blur(10px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1rem'
        }}>
          <div className="card animate-fade-in" style={{
            maxWidth: '520px',
            width: '100%',
            padding: '2rem',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: 'rgba(186, 12, 47, 0.12)',
              color: 'hsl(var(--hue-primary), 85%, 50%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto'
            }}>
              <CheckCircle2 size={36} />
            </div>

            <h2 style={{ fontSize: '1.4rem', fontWeight: 800 }}>Order Confirmed & Saved to Database!</h2>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
              Thank you for shopping with SWITCHES! Your order ID is <strong style={{ color: 'var(--text-main)' }}>#{confirmedOrder.id || confirmedOrder.orderId}</strong>.
            </p>

            <div style={{
              background: 'var(--bg-secondary)',
              padding: '0.85rem 1rem',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.8rem',
              textAlign: 'left',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.35rem'
            }}>
              <div><strong>Customer:</strong> {confirmedOrder.customerName || user?.name || 'Customer'} ({confirmedOrder.customerEmail || user?.email || ''})</div>
              <div><strong>Total Amount:</strong> ${confirmedOrder.totalAmount?.toFixed(2)}</div>
              <div><strong>Payment Method:</strong> {confirmedOrder.paymentMethod?.toUpperCase()}</div>
              <div><strong>Shipping To:</strong> {confirmedOrder.shippingAddress?.street}, {confirmedOrder.shippingAddress?.city} {confirmedOrder.shippingAddress?.zip}</div>
              <div style={{ color: 'hsl(var(--hue-success), 80%, 45%)', fontWeight: 700, marginTop: '0.25rem' }}>
                ⚡ Saved to MongoDB Atlas Cloud Database
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
              <button
                onClick={() => {
                  setConfirmedOrder(null);
                  setCurrentPage('orders');
                }}
                className="btn btn-primary"
                style={{ flex: 1 }}
              >
                Track Order
              </button>
              <button
                onClick={() => {
                  setConfirmedOrder(null);
                  setCurrentPage('catalog');
                }}
                className="btn btn-secondary"
                style={{ flex: 1 }}
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
