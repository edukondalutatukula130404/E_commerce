import React from 'react';
import { useApp } from '../context/AppContext';
import { User, Package, Heart, LogOut, ArrowRight, ShieldCheck, ArrowLeft } from 'lucide-react';

export const UserDashboardPage = () => {
  const { user, setUser, setCurrentPage, orders, wishlist, products } = useApp();

  const userOrders = orders.filter(o => o.shippingAddress?.fullName === user?.name || user?.role === 'customer');

  const handleLogout = () => {
    setUser(null);
    setCurrentPage('home');
  };

  return (
    <div className="animate-fade-in" style={{ paddingTop: '0.75rem', paddingBottom: '4rem', width: '100%' }}>
      
      {/* Back Button */}
      <div style={{ marginBottom: '1rem' }}>
        <button 
          onClick={() => setCurrentPage('home')} 
          className="btn btn-secondary"
          style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem', minHeight: '34px' }}
        >
          <ArrowLeft size={15} /> Back
        </button>
      </div>

      {/* Header Banner */}
      <div className="card" style={{ padding: '1.25rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
        <img
          src={user?.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80"}
          alt={user?.name || "Customer"}
          style={{ width: '64px', height: '64px', borderRadius: 'var(--radius-full)', border: '2px solid var(--border-active)', objectFit: 'cover' }}
        />
        <div style={{ flex: 1, minWidth: '180px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.2rem' }}>
            <h1 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Welcome back, {user?.name || "Customer"}</h1>
            <ShieldCheck size={16} color="hsl(var(--hue-primary), 85%, 50%)" />
          </div>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{user?.email || "alex@switches.io"}</p>
        </div>

        <button onClick={handleLogout} className="btn btn-secondary" style={{ color: '#ff4757', padding: '0.45rem 0.75rem', fontSize: '0.8rem' }}>
          <LogOut size={14} /> Log Out
        </button>
      </div>

      {/* Quick Navigation Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
        <div className="card" style={{ padding: '1.1rem', cursor: 'pointer' }} onClick={() => setCurrentPage('orders')}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)' }}>My Orders</span>
            <Package size={20} color="hsl(var(--hue-primary), 85%, 50%)" />
          </div>
          <h3 style={{ fontSize: '1.4rem', fontWeight: 900 }}>{userOrders.length} Orders</h3>
          <span style={{ fontSize: '0.75rem', color: 'hsl(var(--hue-primary), 85%, 50%)', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '0.2rem', marginTop: '0.35rem' }}>
            View Order History <ArrowRight size={12} />
          </span>
        </div>

        <div className="card" style={{ padding: '1.1rem', cursor: 'pointer' }} onClick={() => setCurrentPage('wishlist')}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)' }}>Saved Wishlist</span>
            <Heart size={20} color="#ff4757" />
          </div>
          <h3 style={{ fontSize: '1.4rem', fontWeight: 900 }}>{wishlist.length} Items</h3>
          <span style={{ fontSize: '0.75rem', color: '#ff4757', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '0.2rem', marginTop: '0.35rem' }}>
            View Saved Products <ArrowRight size={12} />
          </span>
        </div>
      </div>

    </div>
  );
};
