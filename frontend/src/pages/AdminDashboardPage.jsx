import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Shield, Package, ShoppingBag, Plus, Trash2, Edit3, ArrowLeft } from 'lucide-react';

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
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Manage products, catalog inventory & store orders</p>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button 
            onClick={() => setActiveTab('products')} 
            className="btn" 
            style={{
              padding: '0.4rem 0.8rem',
              fontSize: '0.8rem',
              fontWeight: 700,
              background: activeTab === 'products' ? 'var(--grad-primary)' : 'var(--bg-secondary)',
              color: activeTab === 'products' ? '#fff' : 'var(--text-main)'
            }}
          >
            <Package size={15} /> Products ({products.length})
          </button>
          <button 
            onClick={() => setActiveTab('orders')} 
            className="btn" 
            style={{
              padding: '0.4rem 0.8rem',
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

    </div>
  );
};
