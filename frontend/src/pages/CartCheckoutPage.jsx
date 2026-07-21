import React, { useState } from 'react';
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
    setCurrentPage 
  } = useApp();

  const [checkoutStep, setCheckoutStep] = useState('cart'); // 'cart' | 'shipping' | 'payment'
  const [couponInput, setCouponInput] = useState('');
  const [confirmedOrder, setConfirmedOrder] = useState(null);

  // Form State
  const [shippingInfo, setShippingInfo] = useState({
    fullName: 'Alex Mercer',
    email: 'alex@switches.io',
    street: '742 Evergreen Terrace',
    city: 'San Francisco',
    zip: '94107'
  });

  const [paymentMethod, setPaymentMethod] = useState('card');

  const cartItemsDetailed = cart.map(item => {
    const p = products.find(prod => prod.id === item.productId);
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

  const handleFinalOrderSubmit = () => {
    const newOrder = placeOrder(shippingInfo, paymentMethod);
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
                if (cart.length > 0) setCheckoutStep(step);
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
                        src={item.product.images[0]}
                        alt={item.product.name}
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
              <button onClick={() => setCheckoutStep('shipping')} className="btn btn-primary" style={{ padding: '0.75rem', fontSize: '0.9rem' }}>
                Proceed to Shipping <ArrowRight size={16} />
              </button>
            )}

            {checkoutStep === 'shipping' && (
              <button onClick={() => setCheckoutStep('payment')} className="btn btn-primary" style={{ padding: '0.75rem', fontSize: '0.9rem' }}>
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
            width: '100%',
            maxWidth: '480px',
            padding: '1.5rem',
            background: 'var(--bg-card)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: '3rem',
                height: '3rem',
                borderRadius: 'var(--radius-full)',
                background: 'rgba(46, 213, 115, 0.15)',
                color: 'hsl(var(--hue-success), 80%, 45%)',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '0.5rem'
              }}>
                <CheckCircle2 size={28} />
              </div>
              <h2 style={{ fontSize: '1.35rem', fontWeight: 800 }}>SWITCHES Order Confirmed!</h2>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Order ID: <strong style={{ color: 'var(--text-main)' }}>{confirmedOrder.id}</strong>
              </p>
            </div>

            <div style={{ padding: '0.85rem', borderRadius: 'var(--radius-md)', background: 'var(--bg-secondary)', fontSize: '0.8rem', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
              <div style={{ fontWeight: 700 }}>Shipping Address:</div>
              <div>{confirmedOrder.shippingAddress.fullName}</div>
              <div>{confirmedOrder.shippingAddress.street}, {confirmedOrder.shippingAddress.city}</div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 800, fontSize: '1rem' }}>
              <span>Total Paid:</span>
              <span>${confirmedOrder.totalAmount}</span>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button onClick={() => window.print()} className="btn btn-secondary" style={{ flex: 1, fontSize: '0.85rem' }}>
                <Printer size={15} /> Print Receipt
              </button>
              <button 
                onClick={() => {
                  setConfirmedOrder(null);
                  setCurrentPage('orders');
                }} 
                className="btn btn-primary" 
                style={{ flex: 1, fontSize: '0.85rem' }}
              >
                Track Order
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
