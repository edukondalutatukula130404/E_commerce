import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Shield, Package, ShoppingBag, Plus, Trash2, Edit3, ArrowLeft, BarChart3, PieChart, Users, DollarSign, TrendingUp, Building2, CheckCircle2, X } from 'lucide-react';

export const AdminDashboardPage = () => {
  const { products, setProducts, orders, setCurrentPage, showToast } = useApp();

  const [activeTab, setActiveTab] = useState('products');
  const [newProduct, setNewProduct] = useState({
    name: '',
    tagline: '',
    price: '',
    category: 'Tech',
    description: '',
    images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80']
  });

  // Multi-Vendor State
  const [vendors, setVendors] = useState([
    { id: 'v1', name: 'AURA Audio Labs', store: 'Aura Official Store', commission: 10, totalSales: 18400, pendingPayout: 16560, status: 'Active' },
    { id: 'v2', name: 'SWITCHES Apparel Ltd', store: 'Switches Wearables', commission: 12, totalSales: 9200, pendingPayout: 8096, status: 'Active' },
    { id: 'v3', name: 'SmartHome Ambient', store: 'Ambient Tech Store', commission: 8, totalSales: 7100, pendingPayout: 6532, status: 'Active' }
  ]);

  const [isVendorModalOpen, setIsVendorModalOpen] = useState(false);
  const [newVendor, setNewVendor] = useState({ name: '', store: '', commission: 10 });

  const handleCreateProduct = (e) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price) {
      showToast('Please fill out Product Name and Price');
      return;
    }

    const created = {
      id: `prod_${Date.now()}`,
      name: newProduct.name,
      tagline: newProduct.tagline || 'High-performance retail product',
      price: Number(newProduct.price),
      category: newProduct.category,
      rating: 4.8,
      isFeatured: true,
      isNew: true,
      description: newProduct.description || 'Engineered by SWITCHES for peak performance.',
      specs: { Brand: 'SWITCHES', Warranty: '2-Year Official Guarantee' },
      colors: ['Default'],
      sizes: ['Standard'],
      images: newProduct.images
    };

    setProducts([created, ...products]);
    showToast(`Product "${created.name}" created successfully!`);
    setNewProduct({
      name: '',
      tagline: '',
      price: '',
      category: 'Tech',
      description: '',
      images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80']
    });
  };

  const handleDeleteProduct = (id) => {
    setProducts(products.filter(p => p.id !== id));
    showToast('Product removed from catalog');
  };

  const handleAddVendor = (e) => {
    e.preventDefault();
    if (!newVendor.name || !newVendor.store) {
      showToast('Please fill out Vendor Name and Store Name');
      return;
    }

    const createdVendor = {
      id: `v_${Date.now()}`,
      name: newVendor.name,
      store: newVendor.store,
      commission: Number(newVendor.commission) || 10,
      totalSales: 0,
      pendingPayout: 0,
      status: 'Active'
    };

    setVendors([...vendors, createdVendor]);
    showToast(`Merchant "${createdVendor.store}" onboarded successfully!`);
    setIsVendorModalOpen(false);
    setNewVendor({ name: '', store: '', commission: 10 });
  };

  const handleDisbursePayout = (vendorId) => {
    setVendors(vendors.map(v => v.id === vendorId ? { ...v, pendingPayout: 0 } : v));
    showToast('Vendor payout disbursed successfully!');
  };

  const totalRevenue = orders.reduce((sum, o) => sum + o.totalAmount, 34700);

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

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.65rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Shield size={20} color="hsl(var(--hue-primary), 85%, 50%)" />
            <h1 style={{ fontSize: 'clamp(1.3rem, 4vw, 1.7rem)', fontWeight: 800 }}>SWITCHES Admin Command</h1>
          </div>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Manage products, multi-vendor merchants, analytics & store orders</p>
        </div>

        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
          <button 
            onClick={() => setActiveTab('products')} 
            className="btn" 
            style={{
              padding: '0.4rem 0.75rem',
              fontSize: '0.8rem',
              fontWeight: 700,
              background: activeTab === 'products' ? 'var(--grad-primary)' : 'var(--bg-secondary)',
              color: activeTab === 'products' ? '#fff' : 'var(--text-main)'
            }}
          >
            <Package size={15} /> Products ({products.length})
          </button>
          <button 
            onClick={() => setActiveTab('analytics')} 
            className="btn" 
            style={{
              padding: '0.4rem 0.75rem',
              fontSize: '0.8rem',
              fontWeight: 700,
              background: activeTab === 'analytics' ? 'var(--grad-primary)' : 'var(--bg-secondary)',
              color: activeTab === 'analytics' ? '#fff' : 'var(--text-main)'
            }}
          >
            <BarChart3 size={15} /> Analytics
          </button>
          <button 
            onClick={() => setActiveTab('vendors')} 
            className="btn" 
            style={{
              padding: '0.4rem 0.75rem',
              fontSize: '0.8rem',
              fontWeight: 700,
              background: activeTab === 'vendors' ? 'var(--grad-primary)' : 'var(--bg-secondary)',
              color: activeTab === 'vendors' ? '#fff' : 'var(--text-main)'
            }}
          >
            <Building2 size={15} /> Vendors ({vendors.length})
          </button>
          <button 
            onClick={() => setActiveTab('orders')} 
            className="btn" 
            style={{
              padding: '0.4rem 0.75rem',
              fontSize: '0.8rem',
              fontWeight: 700,
              background: activeTab === 'orders' ? 'var(--grad-primary)' : 'var(--bg-secondary)',
              color: activeTab === 'orders' ? '#fff' : 'var(--text-main)'
            }}
          >
            <ShoppingBag size={15} /> Orders ({orders.length})
          </button>
        </div>
      </div>

      {/* PRODUCTS TAB */}
      {activeTab === 'products' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* Create Product Form */}
          <div className="card" style={{ padding: '1.25rem' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <Plus size={16} color="hsl(var(--hue-primary), 85%, 50%)" /> Add New Product to Store Catalog
            </h3>
            
            <form onSubmit={handleCreateProduct} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.85rem' }}>
              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, display: 'block', marginBottom: '0.2rem' }}>Product Name</label>
                <input
                  type="text"
                  placeholder="e.g. SWITCHES Pro Earbuds"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  style={{ width: '100%', padding: '0.55rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', background: 'var(--bg-secondary)', color: 'var(--text-main)', fontSize: '0.82rem' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, display: 'block', marginBottom: '0.2rem' }}>Price ($)</label>
                <input
                  type="number"
                  placeholder="149.99"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                  style={{ width: '100%', padding: '0.55rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', background: 'var(--bg-secondary)', color: 'var(--text-main)', fontSize: '0.82rem' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, display: 'block', marginBottom: '0.2rem' }}>Category</label>
                <select
                  value={newProduct.category}
                  onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                  style={{ width: '100%', padding: '0.55rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', background: 'var(--bg-secondary)', color: 'var(--text-main)', fontSize: '0.82rem' }}
                >
                  <option value="Tech">Tech</option>
                  <option value="Apparel">Apparel</option>
                  <option value="Home">Home</option>
                  <option value="Accessories">Accessories</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, display: 'block', marginBottom: '0.2rem' }}>Tagline</label>
                <input
                  type="text"
                  placeholder="e.g. High-fidelity ANC wireless audio"
                  value={newProduct.tagline}
                  onChange={(e) => setNewProduct({ ...newProduct, tagline: e.target.value })}
                  style={{ width: '100%', padding: '0.55rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', background: 'var(--bg-secondary)', color: 'var(--text-main)', fontSize: '0.82rem' }}
                />
              </div>

              <div style={{ gridColumn: '1 / -1' }}>
                <button type="submit" className="btn btn-primary" style={{ padding: '0.65rem 1.25rem', fontSize: '0.85rem' }}>
                  <Plus size={15} /> Publish Product to Catalog
                </button>
              </div>
            </form>
          </div>

          {/* Product List */}
          <div className="card" style={{ padding: '1.25rem' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '0.85rem' }}>Inventory List ({products.length})</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {products.map((p) => (
                <div key={p.id} style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', background: 'var(--bg-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <img src={p.images[0]} alt={p.name} style={{ width: '44px', height: '44px', borderRadius: 'var(--radius-sm)', objectFit: 'cover' }} />
                    <div>
                      <h4 style={{ fontSize: '0.88rem', fontWeight: 700 }}>{p.name}</h4>
                      <span className="badge badge-primary" style={{ fontSize: '0.6rem' }}>{p.category}</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <span style={{ fontSize: '0.95rem', fontWeight: 800 }}>${p.price}</span>
                    <button onClick={() => handleDeleteProduct(p.id)} className="btn btn-icon" style={{ width: '32px', height: '32px', minWidth: '32px', minHeight: '32px' }}>
                      <Trash2 size={14} color="#ff4757" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* ANALYTICS & CHARTS TAB */}
      {activeTab === 'analytics' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* KPI Metrics */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            <div className="card" style={{ padding: '1.1rem', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Gross Store Revenue</span>
              <span style={{ fontSize: '1.6rem', fontWeight: 900, color: 'hsl(var(--hue-primary), 85%, 50%)' }}>${totalRevenue.toLocaleString()}</span>
              <span style={{ fontSize: '0.72rem', color: '#10b981', fontWeight: 700 }}>+24.5% vs last month</span>
            </div>

            <div className="card" style={{ padding: '1.1rem', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Conversion Rate</span>
              <span style={{ fontSize: '1.6rem', fontWeight: 900 }}>3.42%</span>
              <span style={{ fontSize: '0.72rem', color: '#10b981', fontWeight: 700 }}>+0.8% SLA Target</span>
            </div>

            <div className="card" style={{ padding: '1.1rem', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Avg Order Value (AOV)</span>
              <span style={{ fontSize: '1.6rem', fontWeight: 900 }}>$148.50</span>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Based on {orders.length + 142} orders</span>
            </div>
          </div>

          {/* Revenue Trend Visual Chart */}
          <div className="card" style={{ padding: '1.25rem' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '1rem' }}>Revenue Growth Trend (2026)</h3>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '1rem', height: '180px', paddingTop: '1rem', paddingBottom: '0.5rem', borderBottom: '1px solid var(--border-light)' }}>
              {[
                { month: 'Apr', val: 42, label: '$4.2k' },
                { month: 'May', val: 68, label: '$6.8k' },
                { month: 'Jun', val: 95, label: '$9.5k' },
                { month: 'Jul', val: 142, label: '$14.2k' }
              ].map(item => (
                <div key={item.month} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'flex-end' }}>
                  <span style={{ fontSize: '0.72rem', fontWeight: 700, marginBottom: '0.3rem' }}>{item.label}</span>
                  <div style={{ width: '80%', height: `${item.val}%`, background: 'var(--grad-primary)', borderRadius: 'var(--radius-sm)' }} />
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.4rem' }}>{item.month}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Category Distribution Chart */}
          <div className="card" style={{ padding: '1.25rem' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '1rem' }}>Category Sales Distribution</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {[
                { cat: 'Tech Hardware & Audio', pct: 54, color: 'hsl(var(--hue-primary), 85%, 50%)' },
                { cat: 'Apparel & Activewear', pct: 24, color: '#3b82f6' },
                { cat: 'Smart Home Ambient Lighting', pct: 14, color: '#f59e0b' },
                { cat: 'Accessories', pct: 8, color: '#10b981' }
              ].map(c => (
                <div key={c.cat} style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 700 }}>
                    <span>{c.cat}</span>
                    <span>{c.pct}%</span>
                  </div>
                  <div style={{ width: '100%', height: '8px', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
                    <div style={{ width: `${c.pct}%`, height: '100%', background: c.color }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* MULTI-VENDOR / MERCHANTS TAB */}
      {activeTab === 'vendors' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800 }}>Multi-Vendor Merchants ({vendors.length})</h3>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Platform commission fees and merchant payout management</p>
            </div>

            <button 
              onClick={() => setIsVendorModalOpen(true)}
              className="btn btn-primary"
              style={{ padding: '0.45rem 0.85rem', fontSize: '0.8rem' }}
            >
              <Plus size={14} /> Onboard New Merchant
            </button>
          </div>

          <div className="card" style={{ padding: '1.25rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {vendors.map(v => (
                <div key={v.id} style={{ padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', background: 'var(--bg-secondary)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
                  <div>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 800 }}>{v.store}</h4>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Vendor: {v.name} | Commission Rate: {v.commission}%</span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                    <div>
                      <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block' }}>Total Sales</span>
                      <span style={{ fontSize: '0.95rem', fontWeight: 800 }}>${v.totalSales.toLocaleString()}</span>
                    </div>

                    <div>
                      <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block' }}>Pending Payout</span>
                      <span style={{ fontSize: '0.95rem', fontWeight: 800, color: 'hsl(var(--hue-primary), 85%, 50%)' }}>
                        ${v.pendingPayout.toLocaleString()}
                      </span>
                    </div>

                    <button 
                      onClick={() => handleDisbursePayout(v.id)}
                      disabled={v.pendingPayout === 0}
                      className="btn btn-primary"
                      style={{ padding: '0.4rem 0.75rem', fontSize: '0.75rem', opacity: v.pendingPayout === 0 ? 0.5 : 1 }}
                    >
                      {v.pendingPayout === 0 ? 'Disbursed' : 'Disburse Payout'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* ORDERS TAB */}
      {activeTab === 'orders' && (
        <div className="card" style={{ padding: '1.25rem' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '0.85rem' }}>Customer Orders ({orders.length})</h3>
          {orders.map((o) => (
            <div key={o.id} style={{ padding: '0.85rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', background: 'var(--bg-secondary)', marginBottom: '0.65rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 800, marginBottom: '0.35rem' }}>
                <span>Order ID: {o.id}</span>
                <span className="badge badge-primary">{o.status}</span>
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Customer: {o.shippingAddress?.fullName || 'Customer'} | Total: ${o.totalAmount}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Onboard Vendor Modal */}
      {isVendorModalOpen && (
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
        }}>
          <div className="card" style={{ maxWidth: '420px', width: '100%', padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 800 }}>Onboard New Merchant</h3>
              <button onClick={() => setIsVendorModalOpen(false)} className="btn btn-icon"><X size={16} /></button>
            </div>

            <form onSubmit={handleAddVendor} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, display: 'block', marginBottom: '0.2rem' }}>Vendor Name</label>
                <input
                  type="text"
                  placeholder="e.g. Acme Tech Solutions"
                  value={newVendor.name}
                  onChange={(e) => setNewVendor({ ...newVendor, name: e.target.value })}
                  style={{ width: '100%', padding: '0.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', background: 'var(--bg-secondary)', color: 'var(--text-main)', fontSize: '0.85rem' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, display: 'block', marginBottom: '0.2rem' }}>Store Brand Name</label>
                <input
                  type="text"
                  placeholder="e.g. Acme Audio Store"
                  value={newVendor.store}
                  onChange={(e) => setNewVendor({ ...newVendor, store: e.target.value })}
                  style={{ width: '100%', padding: '0.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', background: 'var(--bg-secondary)', color: 'var(--text-main)', fontSize: '0.85rem' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, display: 'block', marginBottom: '0.2rem' }}>Platform Commission Rate (%)</label>
                <input
                  type="number"
                  placeholder="10"
                  value={newVendor.commission}
                  onChange={(e) => setNewVendor({ ...newVendor, commission: e.target.value })}
                  style={{ width: '100%', padding: '0.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', background: 'var(--bg-secondary)', color: 'var(--text-main)', fontSize: '0.85rem' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                <button type="button" onClick={() => setIsVendorModalOpen(false)} className="btn btn-secondary" style={{ flex: 1 }}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>Onboard Merchant</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

