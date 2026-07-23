import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { User, Package, Heart, LogOut, ArrowRight, ShieldCheck, ArrowLeft, CreditCard, Wallet, Plus, MapPin, Edit3, Trash2, CheckCircle2, Star } from 'lucide-react';

export const UserDashboardPage = () => {
  const { 
    user, 
    setUser, 
    setCurrentPage, 
    orders, 
    wishlist, 
    products, 
    showToast,
    userDashboardTab,
    setUserDashboardTab,
    userAddresses,
    addUserAddress,
    updateUserAddress,
    deleteUserAddress,
    setDefaultUserAddress
  } = useApp();

  const [walletBalance, setWalletBalance] = useState(150.00);
  const [addWalletAmount, setAddWalletAmount] = useState('');

  // Address Modal State
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [editingAddr, setEditingAddr] = useState(null);
  const [addrForm, setAddrForm] = useState({
    fullName: user?.name || '',
    phone: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    country: 'USA',
    type: 'Home',
    isDefault: false
  });

  const userOrders = (orders || []).filter(o => o.shippingAddress?.fullName === user?.name || user?.role === 'customer');
  const wishlistProducts = (wishlist || []).map(id => products.find(p => p.id === id || p._id === id)).filter(Boolean);

  const handleLogout = () => {
    try {
      localStorage.removeItem('token');
      localStorage.removeItem('switches_user');
    } catch (e) {}
    if (typeof setUser === 'function') {
      setUser(null);
    }
    showToast('Logged out of Account');
    setCurrentPage('home');
  };

  const handleAddWalletCash = (e) => {
    e.preventDefault();
    const val = parseFloat(addWalletAmount);
    if (isNaN(val) || val <= 0) {
      showToast('Please enter a valid amount');
      return;
    }
    setWalletBalance(prev => prev + val);
    setAddWalletAmount('');
    showToast(`$${val.toFixed(2)} added to your SWITCHES Wallet!`);
  };

  const handleOpenAddModal = () => {
    setEditingAddr(null);
    setAddrForm({
      fullName: user?.name || '',
      phone: '',
      street: '',
      city: '',
      state: '',
      zip: '',
      country: 'USA',
      type: 'Home',
      isDefault: userAddresses.length === 0
    });
    setIsAddressModalOpen(true);
  };

  const handleOpenEditModal = (addr) => {
    setEditingAddr(addr);
    setAddrForm({ ...addr });
    setIsAddressModalOpen(true);
  };

  const handleAddressSubmit = (e) => {
    e.preventDefault();
    if (!addrForm.street || !addrForm.city || !addrForm.zip) {
      showToast('Please fill out street address, city, and zip code');
      return;
    }

    if (editingAddr) {
      updateUserAddress(editingAddr.id, addrForm);
    } else {
      addUserAddress(addrForm);
    }
    setIsAddressModalOpen(false);
  };

  const dashboardNavTabs = [
    { id: 'profile', label: '1. My Profile', icon: User },
    { id: 'orders', label: '2. My Orders', icon: Package, count: userOrders.length },
    { id: 'wishlist', label: '3. My Wishlist', icon: Heart, count: wishlist.length },
    { id: 'addresses', label: '4. Saved Address', icon: MapPin, count: userAddresses.length },
    { id: 'payments', label: '5. Payment History', icon: CreditCard },
    { id: 'wallet', label: '6. My Wallet', icon: Wallet, badge: `$${walletBalance.toFixed(2)}` }
  ];

  return (
    <div className="animate-fade-in" style={{ paddingTop: '0.75rem', paddingBottom: '4rem', width: '100%' }}>
      
      {/* Back Button */}
      <div style={{ marginBottom: '1rem' }}>
        <button 
          onClick={() => setCurrentPage('home')} 
          className="btn btn-secondary"
          style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem', minHeight: '34px' }}
        >
          <ArrowLeft size={15} /> Back to Storefront
        </button>
      </div>

      {/* User Info Header Banner */}
      <div className="card" style={{ padding: '1.25rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
        <img
          src={user?.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80"}
          alt={user?.name || "Customer"}
          style={{ width: '60px', height: '60px', borderRadius: 'var(--radius-full)', border: '2px solid var(--border-active)', objectFit: 'cover' }}
        />
        <div style={{ flex: 1, minWidth: '180px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.2rem' }}>
            <h1 style={{ fontSize: '1.2rem', fontWeight: 800, margin: 0 }}>{user?.name || "Customer Account"}</h1>
            <ShieldCheck size={16} color="hsl(var(--hue-primary), 85%, 50%)" />
          </div>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: 0 }}>{user?.email || "alex@switches.io"}</p>
        </div>

        <button onClick={handleLogout} className="btn btn-secondary" style={{ color: '#ff4757', padding: '0.45rem 0.75rem', fontSize: '0.8rem' }}>
          <LogOut size={14} /> Log Out
        </button>
      </div>

      {/* Main Grid Layout: Side / Vertical Menu Bar + Active Tab Content */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: '1.25rem',
        alignItems: 'flex-start'
      }}>

        {/* 1. SIDEBAR / VERTICAL NAV OPTIONS (Side by Down Stacked) */}
        <div className="card" style={{ padding: '0.85rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          <span style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--text-muted)', letterSpacing: '0.6px', marginBottom: '0.25rem', paddingLeft: '0.4rem', textTransform: 'uppercase' }}>
            Account Menu
          </span>

          {dashboardNavTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = userDashboardTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setUserDashboardTab(tab.id)}
                className="btn"
                style={{
                  width: '100%',
                  padding: '0.65rem 0.85rem',
                  fontSize: '0.85rem',
                  fontWeight: isActive ? 800 : 600,
                  background: isActive ? 'var(--grad-primary)' : 'var(--bg-secondary)',
                  color: isActive ? '#ffffff' : 'var(--text-main)',
                  borderRadius: 'var(--radius-md)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  border: 'none',
                  textAlign: 'left',
                  transition: 'all 0.15s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <Icon size={16} />
                  <span>{tab.label}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  {tab.count !== undefined && (
                    <span className="badge" style={{ background: isActive ? 'rgba(255,255,255,0.25)' : 'var(--bg-glass-heavy)', color: isActive ? '#fff' : 'var(--text-muted)', fontSize: '0.68rem', fontWeight: 800 }}>
                      {tab.count}
                    </span>
                  )}
                  {tab.badge && (
                    <span className="badge" style={{ background: isActive ? 'rgba(255,255,255,0.3)' : 'rgba(186, 12, 47, 0.12)', color: isActive ? '#fff' : 'hsl(var(--hue-primary), 85%, 50%)', fontSize: '0.72rem', fontWeight: 800 }}>
                      {tab.badge}
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* 2. MAIN ACTIVE TAB CONTENT */}
        <div style={{ flex: 1, minWidth: 0 }}>
          
          {/* Tab 1: MY PROFILE */}
          {userDashboardTab === 'profile' && (
            <div className="card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800 }}>Personal Information</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                <div style={{ background: 'var(--bg-secondary)', padding: '0.85rem', borderRadius: 'var(--radius-md)' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Full Name</span>
                  <div style={{ fontWeight: 800, fontSize: '0.95rem' }}>{user?.name || 'Alex Mercer'}</div>
                </div>
                <div style={{ background: 'var(--bg-secondary)', padding: '0.85rem', borderRadius: 'var(--radius-md)' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Email Address</span>
                  <div style={{ fontWeight: 800, fontSize: '0.95rem' }}>{user?.email || 'alex@switches.io'}</div>
                </div>
                <div style={{ background: 'var(--bg-secondary)', padding: '0.85rem', borderRadius: 'var(--radius-md)' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Role Access</span>
                  <div style={{ fontWeight: 800, fontSize: '0.95rem', color: 'hsl(var(--hue-primary), 85%, 50%)' }}>
                    {(user?.role || 'customer').toUpperCase()}
                  </div>
                </div>
                <div 
                  onClick={() => setUserDashboardTab('addresses')}
                  style={{ background: 'var(--bg-secondary)', padding: '0.85rem', borderRadius: 'var(--radius-md)', cursor: 'pointer' }}
                >
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Saved Address</span>
                  <div style={{ fontWeight: 700, fontSize: '0.85rem', color: 'hsl(var(--hue-primary), 85%, 50%)' }}>
                    {userAddresses.find(a => a.isDefault)?.street || '742 Evergreen Terrace, San Francisco, CA'} →
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: MY ORDERS */}
          {userDashboardTab === 'orders' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {userOrders.length === 0 ? (
                <div className="card" style={{ padding: '2.5rem', textAlign: 'center' }}>
                  <Package size={40} style={{ color: 'var(--text-muted)', marginBottom: '0.5rem' }} />
                  <h3>No Order History Yet</h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Your placed orders will appear here.</p>
                </div>
              ) : (
                userOrders.map((o, idx) => (
                  <div key={idx} className="card" style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <span style={{ fontWeight: 800, fontSize: '0.95rem' }}>Order #{o.id || o.orderId}</span>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginLeft: '0.5rem' }}>
                          {new Date(o.createdAt || Date.now()).toLocaleDateString()}
                        </span>
                      </div>
                      <span className="badge badge-primary" style={{ background: o.status === 'delivered' ? '#10b981' : '#ba0c2f' }}>
                        {o.status?.toUpperCase() || 'PROCESSING'}
                      </span>
                    </div>
                    <div style={{ fontSize: '0.85rem' }}>
                      <strong>Total Amount:</strong> ${o.totalAmount?.toFixed(2)} | <strong>Payment:</strong> {o.paymentMethod?.toUpperCase()}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Tab 3: MY WISHLIST */}
          {userDashboardTab === 'wishlist' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1rem' }}>
              {wishlistProducts.length === 0 ? (
                <div className="card" style={{ padding: '2.5rem', textAlign: 'center', gridColumn: '1 / -1' }}>
                  <Heart size={40} style={{ color: 'var(--text-muted)', marginBottom: '0.5rem' }} />
                  <h3>Your Wishlist is Empty</h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Explore our catalog and click the heart icon to save products.</p>
                </div>
              ) : (
                wishlistProducts.map((p, idx) => (
                  <div key={idx} className="card" style={{ padding: '0.85rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <img src={p.images?.[0]} alt={p.name} style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: 'var(--radius-md)' }} />
                    <h4 style={{ fontSize: '0.85rem', fontWeight: 800 }}>{p.name}</h4>
                    <span style={{ fontWeight: 800, color: 'hsl(var(--hue-primary), 85%, 50%)' }}>${p.price}</span>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Tab 4: SAVED ADDRESS */}
          {userDashboardTab === 'addresses' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 800, margin: 0 }}>Saved Shipping Address</h3>
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: 0 }}>Manage your delivery destinations for 1-click checkout</p>
                </div>
                <button onClick={handleOpenAddModal} className="btn btn-primary" style={{ padding: '0.5rem 0.85rem', fontSize: '0.8rem' }}>
                  <Plus size={15} /> Add New Address
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.1rem' }}>
                {userAddresses.map((addr) => (
                  <div
                    key={addr.id}
                    className="card"
                    style={{
                      padding: '1.25rem',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.75rem',
                      border: addr.isDefault ? '2px solid var(--border-active)' : '1px solid var(--border-light)',
                      background: addr.isDefault ? 'rgba(186, 12, 47, 0.04)' : 'var(--bg-card)'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <span className="badge badge-secondary" style={{ background: 'var(--bg-glass-heavy)', color: 'var(--text-main)', fontSize: '0.7rem', fontWeight: 800 }}>
                          {addr.type || 'Home'}
                        </span>
                        {addr.isDefault && (
                          <span className="badge badge-primary" style={{ background: '#ba0c2f', color: '#fff', fontSize: '0.65rem', fontWeight: 900 }}>
                            DEFAULT
                          </span>
                        )}
                      </div>
                      
                      <div style={{ display: 'flex', gap: '0.3rem' }}>
                        <button onClick={() => handleOpenEditModal(addr)} className="btn btn-icon" style={{ width: '32px', height: '32px', minWidth: '32px' }} title="Edit Address">
                          <Edit3 size={14} />
                        </button>
                        {userAddresses.length > 1 && (
                          <button onClick={() => deleteUserAddress(addr.id)} className="btn btn-icon" style={{ width: '32px', height: '32px', minWidth: '32px' }} title="Delete Address">
                            <Trash2 size={14} color="#ff4757" />
                          </button>
                        )}
                      </div>
                    </div>

                    <div>
                      <h4 style={{ fontSize: '0.95rem', fontWeight: 800, marginBottom: '0.2rem' }}>{addr.fullName}</h4>
                      {addr.phone && <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>📞 {addr.phone}</p>}
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-main)', margin: 0, lineHeight: 1.4 }}>
                        {addr.street}<br />
                        {addr.city}, {addr.state} {addr.zip}<br />
                        {addr.country}
                      </p>
                    </div>

                    {!addr.isDefault && (
                      <button
                        onClick={() => setDefaultUserAddress(addr.id)}
                        className="btn btn-secondary"
                        style={{ padding: '0.35rem 0.65rem', fontSize: '0.75rem', marginTop: '0.25rem', width: 'fit-content' }}
                      >
                        <Star size={13} color="hsl(var(--hue-primary), 85%, 50%)" /> Set as Default
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 5: PAYMENT HISTORY */}
          {userDashboardTab === 'payments' && (
            <div className="card" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 800 }}>Transaction & Invoice Receipts</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {[
                  { id: 'TXN-88210', date: '2026-07-23', method: 'Credit Card', amount: 599.98, status: 'Completed' },
                  { id: 'TXN-88209', date: '2026-07-18', method: 'UPI Pay', amount: 199.99, status: 'Completed' }
                ].map((tx, idx) => (
                  <div key={idx} style={{ background: 'var(--bg-secondary)', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontWeight: 800, fontSize: '0.85rem' }}>{tx.id}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{tx.date} via {tx.method}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontWeight: 800, color: 'hsl(var(--hue-primary), 85%, 50%)' }}>${tx.amount.toFixed(2)}</div>
                      <span style={{ fontSize: '0.7rem', color: '#10b981', fontWeight: 700 }}>✓ {tx.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 6: MY WALLET */}
          {userDashboardTab === 'wallet' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div className="card" style={{ padding: '1.5rem', background: 'var(--grad-primary)', color: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                  <span style={{ fontSize: '0.8rem', opacity: 0.9, fontWeight: 700 }}>SWITCHES Store Credit Wallet</span>
                  <h2 style={{ fontSize: '2rem', fontWeight: 900, marginTop: '0.2rem' }}>${walletBalance.toFixed(2)}</h2>
                </div>
                <div style={{ fontSize: '0.8rem', background: 'rgba(255,255,255,0.2)', padding: '0.4rem 0.85rem', borderRadius: 'var(--radius-full)', fontWeight: 800 }}>
                  ⚡ 1-Click Instant Checkout Ready
                </div>
              </div>

              <div className="card" style={{ padding: '1.25rem' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '0.75rem' }}>Add Money to Wallet</h3>
                <form onSubmit={handleAddWalletCash} style={{ display: 'flex', gap: '0.5rem', maxWidth: '360px' }}>
                  <input
                    type="number"
                    placeholder="Enter amount (e.g. 50)"
                    value={addWalletAmount}
                    onChange={(e) => setAddWalletAmount(e.target.value)}
                    style={{ flex: 1, padding: '0.55rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', background: 'var(--bg-secondary)', fontSize: '0.85rem', color: 'var(--text-main)' }}
                  />
                  <button type="submit" className="btn btn-primary" style={{ padding: '0.55rem 1rem' }}>
                    <Plus size={16} /> Add Cash
                  </button>
                </form>
              </div>
            </div>
          )}

        </div>

      </div>

      {/* Add / Edit Address Modal */}
      {isAddressModalOpen && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 3000,
          background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem'
        }}>
          <div className="card animate-fade-in" style={{ maxWidth: '480px', width: '100%', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800 }}>{editingAddr ? 'Edit Saved Address' : 'Add New Shipping Address'}</h3>

            <form onSubmit={handleAddressSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div>
                <label style={{ fontSize: '0.78rem', fontWeight: 700, display: 'block', marginBottom: '0.2rem' }}>Full Name</label>
                <input
                  type="text"
                  value={addrForm.fullName}
                  onChange={(e) => setAddrForm({ ...addrForm, fullName: e.target.value })}
                  style={{ width: '100%', padding: '0.55rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', background: 'var(--bg-secondary)', color: 'var(--text-main)', fontSize: '0.85rem' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.78rem', fontWeight: 700, display: 'block', marginBottom: '0.2rem' }}>Phone Number</label>
                <input
                  type="text"
                  placeholder="+1 (555) 000-0000"
                  value={addrForm.phone}
                  onChange={(e) => setAddrForm({ ...addrForm, phone: e.target.value })}
                  style={{ width: '100%', padding: '0.55rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', background: 'var(--bg-secondary)', color: 'var(--text-main)', fontSize: '0.85rem' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.78rem', fontWeight: 700, display: 'block', marginBottom: '0.2rem' }}>Street Address</label>
                <input
                  type="text"
                  placeholder="Street address, Apt, Suite"
                  value={addrForm.street}
                  onChange={(e) => setAddrForm({ ...addrForm, street: e.target.value })}
                  style={{ width: '100%', padding: '0.55rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', background: 'var(--bg-secondary)', color: 'var(--text-main)', fontSize: '0.85rem' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: '0.78rem', fontWeight: 700, display: 'block', marginBottom: '0.2rem' }}>City</label>
                  <input
                    type="text"
                    value={addrForm.city}
                    onChange={(e) => setAddrForm({ ...addrForm, city: e.target.value })}
                    style={{ width: '100%', padding: '0.55rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', background: 'var(--bg-secondary)', color: 'var(--text-main)', fontSize: '0.85rem' }}
                  />
                </div>
                <div style={{ width: '90px' }}>
                  <label style={{ fontSize: '0.78rem', fontWeight: 700, display: 'block', marginBottom: '0.2rem' }}>State</label>
                  <input
                    type="text"
                    value={addrForm.state}
                    onChange={(e) => setAddrForm({ ...addrForm, state: e.target.value })}
                    style={{ width: '100%', padding: '0.55rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', background: 'var(--bg-secondary)', color: 'var(--text-main)', fontSize: '0.85rem' }}
                  />
                </div>
                <div style={{ width: '100px' }}>
                  <label style={{ fontSize: '0.78rem', fontWeight: 700, display: 'block', marginBottom: '0.2rem' }}>Zip Code</label>
                  <input
                    type="text"
                    value={addrForm.zip}
                    onChange={(e) => setAddrForm({ ...addrForm, zip: e.target.value })}
                    style={{ width: '100%', padding: '0.55rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', background: 'var(--bg-secondary)', color: 'var(--text-main)', fontSize: '0.85rem' }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: '0.78rem', fontWeight: 700, display: 'block', marginBottom: '0.2rem' }}>Address Tag</label>
                  <select
                    value={addrForm.type}
                    onChange={(e) => setAddrForm({ ...addrForm, type: e.target.value })}
                    style={{ width: '100%', padding: '0.55rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', background: 'var(--bg-secondary)', color: 'var(--text-main)', fontSize: '0.85rem' }}
                  >
                    <option value="Home">Home</option>
                    <option value="Work">Work</option>
                    <option value="Apartment">Apartment</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: '0.78rem', fontWeight: 700, display: 'block', marginBottom: '0.2rem' }}>Country</label>
                  <input
                    type="text"
                    value={addrForm.country}
                    onChange={(e) => setAddrForm({ ...addrForm, country: e.target.value })}
                    style={{ width: '100%', padding: '0.55rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', background: 'var(--bg-secondary)', color: 'var(--text-main)', fontSize: '0.85rem' }}
                  />
                </div>
              </div>

              <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.82rem', fontWeight: 700, cursor: 'pointer', marginTop: '0.25rem' }}>
                <input
                  type="checkbox"
                  checked={addrForm.isDefault}
                  onChange={(e) => setAddrForm({ ...addrForm, isDefault: e.target.checked })}
                />
                Set as default delivery address
              </label>

              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                <button type="button" onClick={() => setIsAddressModalOpen(false)} className="btn btn-secondary" style={{ flex: 1 }}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
                  Save Address
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
