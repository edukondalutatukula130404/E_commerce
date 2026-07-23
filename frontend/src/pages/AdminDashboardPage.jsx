import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { api } from '../services/api';
import { 
  Shield, Package, ShoppingBag, Plus, Trash2, Edit3, ArrowLeft, LogOut,
  BarChart3, Users, Building2, X, Search, CheckCircle2, AlertTriangle, UserCheck, 
  RefreshCw, Menu, Tag, Layers, CreditCard, Image, Eye, EyeOff, PlusCircle, Check
} from 'lucide-react';

export const AdminDashboardPage = () => {
  const context = useApp() || {};
  const products = context.products || [];
  const addProduct = context.addProduct;
  const updateProduct = context.updateProduct;
  const deleteProduct = context.deleteProduct;
  const updateStock = context.updateStock;
  const adjustStock = context.adjustStock;

  const categoriesList = context.categoriesList || [];
  const addCategory = context.addCategory;
  const updateCategory = context.updateCategory;
  const deleteCategory = context.deleteCategory;

  const orders = context.orders || [];
  const updateOrderStatus = context.updateOrderStatus;
  const deleteOrder = context.deleteOrder;

  const payments = context.payments || [];
  const updatePaymentStatus = context.updatePaymentStatus;

  const usersList = context.usersList || [];
  const updateUserRole = context.updateUserRole;
  const deleteUser = context.deleteUser;

  const banners = context.banners || [];
  const addBanner = context.addBanner;
  const updateBanner = context.updateBanner;
  const toggleBannerActive = context.toggleBannerActive;
  const deleteBanner = context.deleteBanner;

  const vendors = context.vendors || [];
  const addVendor = context.addVendor;
  const disbursePayout = context.disbursePayout;
  const deleteVendor = context.deleteVendor;

  const user = context.user;
  const setUser = typeof context.setUser === 'function' ? context.setUser : (() => {});
  const setCurrentPage = typeof context.setCurrentPage === 'function' ? context.setCurrentPage : (() => {});
  const showToast = typeof context.showToast === 'function' ? context.showToast : (() => {});

  // Active Tab: 8 sidebar items
  // 'overview' | 'categories' | 'products' | 'inventory' | 'orders' | 'payments' | 'customers' | 'banners'
  const [activeTab, setActiveTab] = useState('overview');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Search & Filter States
  const [productSearch, setProductSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [orderSearch, setOrderSearch] = useState('');
  const [customerSearch, setCustomerSearch] = useState('');

  // Modals & Forms State
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [newCat, setNewCat] = useState({ name: '', slug: '', icon: 'Cpu', color: '#ba0c2f', description: '' });
  const [editingCat, setEditingCat] = useState(null);
  const [selectedAdminCatId, setSelectedAdminCatId] = useState(null);
  const [newSubTextMap, setNewSubTextMap] = useState({});
  const [editingSubIndex, setEditingSubIndex] = useState(null); // { catId, index }
  const [editingSubText, setEditingSubText] = useState('');

  const availableColors = ['#ba0c2f', '#00CEC9', '#6C5CE7', '#FDCB6E', '#E84393', '#10B981', '#0984e3', '#fd79a8'];
  const availableIcons = ['Cpu', 'Shirt', 'HomeIcon', 'Briefcase', 'Tag', 'Sparkles', 'Smartphone', 'Headphones'];

  const [newProduct, setNewProduct] = useState({
    name: '', tagline: '', price: '', originalPrice: '', stock: 25, category: 'Tech', description: '',
    images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80'],
    isBestSeller: false, isNew: true
  });
  const [editingProduct, setEditingProduct] = useState(null);
  const [imageUploading, setImageUploading] = useState(false);

  // Image Compression & Backend Cloudinary Upload
  const compressAndUploadImage = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new window.Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 1000;
          const MAX_HEIGHT = 1000;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height = Math.round((height *= MAX_WIDTH / width));
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width = Math.round((width *= MAX_HEIGHT / height));
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);

          // Compress to JPEG at 70% quality
          const compressedBase64 = canvas.toDataURL('image/jpeg', 0.7);

          // Upload using api service
          api.uploadImage(compressedBase64)
            .then(res => {
              if (res.success && res.url) {
                resolve(res.url);
              } else {
                reject(new Error(res.message || 'Upload failed'));
              }
            })
            .catch(err => reject(err));
        };
        img.onerror = (err) => reject(new Error('Failed to load image for compression'));
        img.src = event.target.result;
      };
      reader.onerror = (err) => reject(new Error('Failed to read file'));
      reader.readAsDataURL(file);
    });
  };

  // Image upload handler
  const handleImageUpload = async (e, isEditing = false) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      showToast('Please select an image file');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      showToast('Image must be under 10MB');
      return;
    }

    setImageUploading(true);
    showToast('Compressing and uploading image...');

    try {
      const cloudinaryUrl = await compressAndUploadImage(file);
      if (isEditing) {
        setEditingProduct(prev => ({ ...prev, images: [cloudinaryUrl] }));
      } else {
        setNewProduct(prev => ({ ...prev, images: [cloudinaryUrl] }));
      }
      showToast('✓ Image uploaded to Cloudinary!');
    } catch (err) {
      console.error('Upload error:', err);
      showToast('Upload failed: ' + err.message);
    } finally {
      setImageUploading(false);
    }
  };

  const [isBannerModalOpen, setIsBannerModalOpen] = useState(false);
  const [newBanner, setNewBanner] = useState({
    title: '', subtitle: '', ctaText: 'Shop Best Sellers', imageUrl: '', tag: 'PROMOTION', category: 'Tech'
  });
  const [editingBanner, setEditingBanner] = useState(null);

  // Handle Logout
  const handleLogout = () => {
    try {
      localStorage.removeItem('token');
      localStorage.removeItem('switches_user');
    } catch (e) {}
    if (typeof setUser === 'function') {
      setUser(null);
    }
    showToast('Logged out of Admin Command');
    setCurrentPage('home');
  };

  // Handlers for Category CRUD
  const handleAddCategorySubmit = (e) => {
    e.preventDefault();
    if (!newCat.name) {
      showToast('Please enter Category Name');
      return;
    }
    addCategory({
      name: newCat.name,
      slug: (newCat.slug || newCat.name).toLowerCase().replace(/\s+/g, '-'),
      icon: newCat.icon || 'Cpu',
      color: newCat.color || '#ba0c2f',
      description: newCat.description || '',
      subCategories: newCat.subCategories
    });
    setIsCategoryModalOpen(false);
    setNewCat({ name: '', slug: '', icon: 'Cpu', color: '#ba0c2f', description: '', subCategories: '' });
  };

  const handleSaveCategoryEdit = (e) => {
    e.preventDefault();
    if (!editingCat || !editingCat.name) return;
    updateCategory(editingCat.id, {
      name: editingCat.name,
      slug: (editingCat.slug || editingCat.name).toLowerCase().replace(/\s+/g, '-'),
      icon: editingCat.icon || 'Cpu',
      color: editingCat.color || '#ba0c2f',
      description: editingCat.description || '',
      subCategories: editingCat.subCategories
    });
    setEditingCat(null);
  };

  // Handlers for Product CRUD
  const handleCreateProductSubmit = (e) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price) {
      showToast('Please fill out Product Name and Price');
      return;
    }
    addProduct({
      name: newProduct.name,
      tagline: newProduct.tagline || 'High-performance retail product',
      price: Number(newProduct.price),
      originalPrice: newProduct.originalPrice ? Number(newProduct.originalPrice) : Number(newProduct.price) * 1.2,
      stock: Number(newProduct.stock) || 25,
      category: newProduct.category,
      description: newProduct.description || 'Engineered by SWITCHES.',
      images: newProduct.images,
      isBestSeller: Boolean(newProduct.isBestSeller),
      isNew: newProduct.isNew !== undefined ? Boolean(newProduct.isNew) : true
    });
    setNewProduct({
      name: '', tagline: '', price: '', originalPrice: '', stock: 25, category: 'Tech', description: '',
      images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80'],
      isBestSeller: false, isNew: true
    });
  };

  const handleSaveProductEdit = (e) => {
    e.preventDefault();
    if (!editingProduct) return;
    updateProduct(editingProduct.id, {
      name: editingProduct.name,
      tagline: editingProduct.tagline,
      price: Number(editingProduct.price),
      stock: Number(editingProduct.stock),
      category: editingProduct.category,
      description: editingProduct.description,
      images: editingProduct.images,
      isBestSeller: Boolean(editingProduct.isBestSeller),
      isNew: Boolean(editingProduct.isNew)
    });
    setEditingProduct(null);
  };

  // Handlers for Banner CRUD
  const handleAddBannerSubmit = (e) => {
    e.preventDefault();
    if (!newBanner.title) {
      showToast('Please enter banner title');
      return;
    }
    addBanner(newBanner);
    setIsBannerModalOpen(false);
    setNewBanner({ title: '', subtitle: '', ctaText: 'Shop Best Sellers', imageUrl: '', tag: 'PROMOTION', category: 'Tech' });
  };

  const handleSaveBannerEdit = (e) => {
    e.preventDefault();
    if (!editingBanner) return;
    updateBanner(editingBanner.id, editingBanner);
    setEditingBanner(null);
  };

  // Filtered Products
  const filteredProducts = (products || []).filter(p => {
    if (!p) return false;
    const pName = String(p.name || '').toLowerCase();
    const pCat = String(p.category || '').toLowerCase();
    const search = String(productSearch || '').toLowerCase();
    const matchesSearch = pName.includes(search) || pCat.includes(search);
    const matchesCat = categoryFilter === 'All' || p.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  // Filtered Orders
  const filteredOrders = (orders || []).filter(o => {
    if (!o) return false;
    const orderId = String(o.id || o.orderId || o._id || '').toLowerCase();
    const custName = String(o.shippingAddress?.fullName || o.customerName || '').toLowerCase();
    const search = String(orderSearch || '').toLowerCase();
    return orderId.includes(search) || custName.includes(search);
  });

  // Filtered Customers
  const filteredCustomers = (usersList || []).filter(u => {
    if (!u) return false;
    const uName = String(u.name || '').toLowerCase();
    const uEmail = String(u.email || '').toLowerCase();
    const search = String(customerSearch || '').toLowerCase();
    return uName.includes(search) || uEmail.includes(search);
  });

  const totalRevenue = (orders || []).reduce((sum, o) => sum + (o?.totalAmount || 0), 34700);
  const lowStockProducts = (products || []).filter(p => (p?.stock || 0) <= 15);

  // Sidebar Items Definition (8 Modules)
  const sidebarNavItems = [
    { id: 'overview', label: '1. Overview', icon: BarChart3 },
    { id: 'categories', label: '2. Category Management', icon: Layers, count: (categoriesList || []).length },
    { id: 'products', label: '3. Product Management', icon: Package, count: (products || []).length },
    { id: 'inventory', label: '4. Inventory Management', icon: AlertTriangle, count: lowStockProducts.length },
    { id: 'orders', label: '5. Orders', icon: ShoppingBag, count: (orders || []).length },
    { id: 'payments', label: '6. Payment History', icon: CreditCard, count: (payments || []).length },
    { id: 'customers', label: '7. Customers', icon: Users, count: (usersList || []).length },
    { id: 'banners', label: '8. Banners', icon: Image, count: (banners || []).length }
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', width: '100vw', maxWidth: '100%', background: 'var(--bg-primary)', color: 'var(--text-main)', overflowX: 'hidden' }}>
      
      {/* 1. LEFT ADMIN SIDEBAR */}
      <aside className={`admin-sidebar ${isMobileSidebarOpen ? 'sidebar-open' : ''}`} style={{
        width: '270px',
        minWidth: '270px',
        background: 'var(--bg-secondary)',
        borderRight: '1px solid var(--border-light)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '1.15rem 1rem',
        position: 'sticky',
        top: 0,
        height: '100vh',
        zIndex: 2500,
        boxShadow: 'var(--shadow-md)'
      }}>
        <div>
          {/* Brand Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--border-light)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <img src="/logo.png" alt="SWITCHES Logo" style={{ height: '2.1rem', width: 'auto', filter: 'drop-shadow(0 2px 8px rgba(186,12,47,0.4))' }} />
              <div>
                <span style={{ fontSize: '1.05rem', fontWeight: 900, letterSpacing: '0.5px', display: 'block', lineHeight: 1 }}>
                  SWITCHES<span style={{ color: '#ba0c2f' }}>.</span>
                </span>
                <span style={{ fontSize: '0.6rem', fontWeight: 800, color: 'hsl(var(--hue-primary), 85%, 50%)', letterSpacing: '0.8px' }}>
                  ADMIN COMMAND
                </span>
              </div>
            </div>

            <button onClick={() => setIsMobileSidebarOpen(false)} className="btn btn-icon mobile-sidebar-close" style={{ display: 'none' }}>
              <X size={16} />
            </button>
          </div>

          {/* Sidebar Nav Items (8 Modules) */}
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
            <span style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--text-muted)', letterSpacing: '0.8px', marginBottom: '0.15rem', paddingLeft: '0.4rem' }}>
              ADMIN MODULES
            </span>
            {sidebarNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsMobileSidebarOpen(false);
                  }}
                  className="btn"
                  style={{
                    width: '100%',
                    padding: '0.55rem 0.75rem',
                    borderRadius: 'var(--radius-md)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: '0.82rem',
                    fontWeight: isActive ? 800 : 600,
                    background: isActive ? 'var(--grad-primary)' : 'transparent',
                    color: isActive ? '#ffffff' : 'var(--text-main)',
                    border: 'none',
                    textAlign: 'left',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
                    <Icon size={16} color={isActive ? '#ffffff' : 'hsl(var(--hue-primary), 85%, 50%)'} />
                    <span>{item.label}</span>
                  </div>
                  {item.count !== undefined && (
                    <span style={{ fontSize: '0.65rem', fontWeight: 800, background: isActive ? 'rgba(255,255,255,0.25)' : 'var(--bg-glass-heavy)', color: isActive ? '#fff' : 'var(--text-muted)', padding: '0.1rem 0.4rem', borderRadius: 'var(--radius-full)' }}>
                      {item.count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', paddingTop: '0.85rem', borderTop: '1px solid var(--border-light)' }}>
          <button onClick={() => setCurrentPage('home')} className="btn btn-secondary" style={{ width: '100%', padding: '0.5rem 0.75rem', fontSize: '0.78rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}>
            <ArrowLeft size={14} /> Exit to Storefront
          </button>
          <button onClick={handleLogout} className="btn btn-secondary" style={{ width: '100%', padding: '0.5rem 0.75rem', fontSize: '0.78rem', color: '#ff4757', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}>
            <LogOut size={14} /> Log Out
          </button>
        </div>
      </aside>

      {/* 2. MAIN WORKSPACE CONTENT */}
      <main style={{ flex: 1, padding: '1.25rem clamp(1rem, 3vw, 2rem)', minWidth: 0, overflowY: 'auto' }}>
        
        {/* Workspace Top Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.75rem', background: 'var(--bg-secondary)', padding: '0.85rem 1.25rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-light)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <button onClick={() => setIsMobileSidebarOpen(true)} className="btn btn-secondary mobile-sidebar-toggle" style={{ display: 'none', padding: '0.4rem', minHeight: '36px' }}>
              <Menu size={18} />
            </button>
            <div>
              <h1 style={{ fontSize: 'clamp(1.2rem, 3vw, 1.5rem)', fontWeight: 900, margin: 0 }}>
                {activeTab === 'overview' && '📊 Dashboard Overview'}
                {activeTab === 'categories' && '🏷️ Category Management'}
                {activeTab === 'products' && '📦 Product Management'}
                {activeTab === 'inventory' && '📋 Inventory & Stock Control'}
                {activeTab === 'orders' && '🛍️ Orders Fulfillment'}
                {activeTab === 'payments' && '💳 Payment Transactions'}
                {activeTab === 'customers' && '👥 Customer Database & Roles'}
                {activeTab === 'banners' && '🖼️ Hero Banners & Marketing'}
              </h1>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Real-time dynamic administrative control panel
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <div style={{ fontSize: '0.78rem', background: 'var(--bg-card)', padding: '0.35rem 0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
              <span style={{ color: 'var(--text-muted)' }}>Gross Revenue: </span>
              <strong style={{ color: 'hsl(var(--hue-primary), 85%, 50%)', fontWeight: 900 }}>${totalRevenue.toLocaleString()}</strong>
            </div>

            {lowStockProducts.length > 0 && (
              <div style={{ fontSize: '0.75rem', background: 'rgba(255,71,87,0.12)', color: '#ff4757', padding: '0.35rem 0.65rem', borderRadius: 'var(--radius-md)', border: '1px solid rgba(255,71,87,0.3)', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <AlertTriangle size={13} /> {lowStockProducts.length} Low Stock
              </div>
            )}
          </div>
        </div>

        {/* 1. OVERVIEW MODULE */}
        {activeTab === 'overview' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* KPI Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
              <div className="card" style={{ padding: '1.1rem', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Total Store Revenue</span>
                <span style={{ fontSize: '1.6rem', fontWeight: 900, color: 'hsl(var(--hue-primary), 85%, 50%)' }}>${totalRevenue.toLocaleString()}</span>
                <span style={{ fontSize: '0.72rem', color: '#10b981', fontWeight: 700 }}>+24.5% SLA Performance</span>
              </div>
              <div className="card" style={{ padding: '1.1rem', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Total Products</span>
                <span style={{ fontSize: '1.6rem', fontWeight: 900 }}>{products.length} Items</span>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Across {categoriesList.length} Categories</span>
              </div>
              <div className="card" style={{ padding: '1.1rem', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Customer Orders</span>
                <span style={{ fontSize: '1.6rem', fontWeight: 900 }}>{orders.length} Orders</span>
                <span style={{ fontSize: '0.72rem', color: '#10b981', fontWeight: 700 }}>98.2% Fulfillment Rate</span>
              </div>
              <div className="card" style={{ padding: '1.1rem', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Low Stock Warnings</span>
                <span style={{ fontSize: '1.6rem', fontWeight: 900, color: lowStockProducts.length > 0 ? '#ff4757' : 'var(--text-main)' }}>{lowStockProducts.length} Items</span>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Stock level ≤ 15 units</span>
              </div>
            </div>

            {/* Revenue Trend Chart */}
            <div className="card" style={{ padding: '1.25rem' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '1rem' }}>Revenue Growth Trend (2026 Q2)</h3>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: '1rem', height: '160px', borderBottom: '1px solid var(--border-light)', paddingBottom: '0.5rem' }}>
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
          </div>
        )}

        {/* 2. CATEGORY MANAGEMENT MODULE (CRUD) */}
        {activeTab === 'categories' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800 }}>Store Categories ({categoriesList.length})</h3>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Manage catalog categories, colors, and iconography</p>
              </div>
              <button onClick={() => setIsCategoryModalOpen(true)} className="btn btn-primary" style={{ padding: '0.45rem 0.85rem', fontSize: '0.8rem' }}>
                <Plus size={14} /> Add New Category
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%' }}>
              {categoriesList.map(cat => {
                const prodCount = products.filter(p => p.category === cat.name).length;
                const isSelected = selectedAdminCatId === cat.id;
                return (
                  <div 
                    key={cat.id} 
                    className="card" 
                    onClick={() => setSelectedAdminCatId(isSelected ? null : cat.id)}
                    style={{ 
                      width: '100%',
                      padding: '1.25rem', 
                      display: 'flex', 
                      flexDirection: 'column', 
                      gap: '0.85rem',
                      cursor: 'pointer',
                      border: isSelected ? '2px solid var(--border-active)' : '1px solid var(--border-light)',
                      background: isSelected ? 'rgba(186, 12, 47, 0.02)' : 'var(--bg-card)',
                      boxShadow: isSelected ? 'var(--shadow-md)' : 'var(--shadow-sm)',
                      transition: 'all 0.2s ease',
                      height: 'auto'
                    }}
                  >
                    {/* Header Row: Title, Icons, Actions */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div style={{ width: '40px', height: '40px', borderRadius: 'var(--radius-md)', background: `${cat.color}22`, color: cat.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>
                          <Tag size={20} />
                        </div>
                        <div>
                          <h4 style={{ fontSize: '1rem', fontWeight: 800, margin: 0 }}>{cat.name}</h4>
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>/{cat.slug}</span>
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }} onClick={(e) => e.stopPropagation()}>
                        <span className="badge badge-primary" style={{ fontSize: '0.72rem', padding: '0.25rem 0.5rem' }}>{prodCount} Products</span>
                        <div style={{ display: 'flex', gap: '0.35rem' }}>
                          <button onClick={() => setEditingCat(cat)} className="btn btn-secondary" style={{ padding: '0.3rem 0.6rem', fontSize: '0.75rem', minHeight: '32px' }}>
                            <Edit3 size={14} />
                          </button>
                          <button onClick={() => deleteCategory(cat.id)} className="btn btn-secondary" style={{ padding: '0.3rem 0.6rem', fontSize: '0.75rem', color: '#ff4757', minHeight: '32px' }}>
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Subcategories Management Area - Collapsible */}
                    {isSelected && (
                      <div 
                        style={{ 
                          marginTop: '0.5rem',
                          paddingTop: '1rem',
                          borderTop: '1px solid var(--border-light)',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '0.85rem'
                        }}
                        onClick={(e) => e.stopPropagation()} // Prevent closing card when clicking CRUD actions
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <h5 style={{ fontSize: '0.82rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', margin: 0 }}>
                            Manage Sub-Categories ({cat.subCategories?.length || 0})
                          </h5>
                        </div>

                        {/* Subcategories List */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                          {cat.subCategories && cat.subCategories.length > 0 ? (
                            cat.subCategories.map((sub, idx) => {
                              const isSubEditing = editingSubIndex && editingSubIndex.catId === cat.id && editingSubIndex.index === idx;
                              return (
                                <div 
                                  key={idx} 
                                  style={{ 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    justifyContent: 'space-between', 
                                    padding: '0.45rem 0.75rem', 
                                    background: 'var(--bg-secondary)', 
                                    borderRadius: 'var(--radius-sm)', 
                                    border: '1px solid var(--border-light)',
                                    gap: '0.5rem'
                                  }}
                                >
                                  {isSubEditing ? (
                                    <div style={{ display: 'flex', width: '100%', gap: '0.4rem', alignItems: 'center' }}>
                                      <input 
                                        type="text" 
                                        value={editingSubText} 
                                        onChange={(e) => setEditingSubText(e.target.value)} 
                                        style={{ 
                                          flex: 1, 
                                          padding: '0.25rem 0.45rem', 
                                          fontSize: '0.8rem', 
                                          borderRadius: 'var(--radius-sm)', 
                                          border: '1px solid var(--border-active)',
                                          background: 'var(--bg-card)',
                                          color: 'var(--text-main)'
                                        }} 
                                        autoFocus
                                      />
                                      <button 
                                        onClick={() => {
                                          const updatedSubs = [...cat.subCategories];
                                          updatedSubs[idx] = editingSubText.trim();
                                          updateCategory(cat.id, { ...cat, subCategories: updatedSubs });
                                          setEditingSubIndex(null);
                                        }}
                                        className="btn btn-secondary" 
                                        style={{ padding: '0.25rem', minWidth: '28px', minHeight: '28px' }}
                                      >
                                        <Check size={14} color="#10B981" />
                                      </button>
                                      <button 
                                        onClick={() => setEditingSubIndex(null)}
                                        className="btn btn-secondary" 
                                        style={{ padding: '0.25rem', minWidth: '28px', minHeight: '28px' }}
                                      >
                                        <X size={14} color="#ff4757" />
                                      </button>
                                    </div>
                                  ) : (
                                    <>
                                      <span style={{ fontSize: '0.82rem', fontWeight: 600 }}>{sub}</span>
                                      <div style={{ display: 'flex', gap: '0.25rem' }}>
                                        <button 
                                          onClick={() => {
                                            setEditingSubIndex({ catId: cat.id, index: idx });
                                            setEditingSubText(sub);
                                          }}
                                          className="btn btn-secondary" 
                                          style={{ padding: '0.25rem', minWidth: '26px', minHeight: '26px' }}
                                        >
                                          <Edit3 size={11} />
                                        </button>
                                        <button 
                                          onClick={() => {
                                            const updatedSubs = cat.subCategories.filter((_, subIdx) => subIdx !== idx);
                                            updateCategory(cat.id, { ...cat, subCategories: updatedSubs });
                                          }}
                                          className="btn btn-secondary" 
                                          style={{ padding: '0.25rem', minWidth: '26px', minHeight: '26px', color: '#ff4757' }}
                                        >
                                          <Trash2 size={11} />
                                        </button>
                                      </div>
                                    </>
                                  )}
                                </div>
                              );
                            })
                          ) : (
                            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontStyle: 'italic', margin: '0.2rem 0' }}>
                              No sub-categories defined. Add one below!
                            </p>
                          )}
                        </div>

                        {/* Add New Sub-category Form */}
                        <div style={{ display: 'flex', gap: '0.45rem', marginTop: '0.25rem' }}>
                          <input 
                            type="text" 
                            placeholder="Add new sub-category..." 
                            value={newSubTextMap[cat.id] || ''}
                            onChange={(e) => setNewSubTextMap(prev => ({ ...prev, [cat.id]: e.target.value }))}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                const val = (newSubTextMap[cat.id] || '').trim();
                                if (!val) return;
                                const updatedSubs = [...(cat.subCategories || []), val];
                                updateCategory(cat.id, { ...cat, subCategories: updatedSubs });
                                setNewSubTextMap(prev => ({ ...prev, [cat.id]: '' }));
                              }
                            }}
                            style={{ 
                              flex: 1, 
                              padding: '0.45rem 0.65rem', 
                              fontSize: '0.8rem', 
                              borderRadius: 'var(--radius-md)', 
                              border: '1px solid var(--border-light)', 
                              background: 'var(--bg-secondary)', 
                              color: 'var(--text-main)' 
                            }}
                          />
                          <button 
                            onClick={() => {
                              const val = (newSubTextMap[cat.id] || '').trim();
                              if (!val) return;
                              const updatedSubs = [...(cat.subCategories || []), val];
                              updateCategory(cat.id, { ...cat, subCategories: updatedSubs });
                              setNewSubTextMap(prev => ({ ...prev, [cat.id]: '' }));
                            }}
                            className="btn btn-primary"
                            style={{ padding: '0.45rem 0.85rem', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.25rem', minHeight: '34px' }}
                          >
                            <PlusCircle size={14} /> Add
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 3. PRODUCT MANAGEMENT MODULE (CRUD) */}
        {activeTab === 'products' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div className="card" style={{ padding: '1.25rem' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <Plus size={16} color="hsl(var(--hue-primary), 85%, 50%)" /> Add New Product to Catalog (CREATE)
              </h3>
              <form onSubmit={handleCreateProductSubmit} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.85rem' }}>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, display: 'block', marginBottom: '0.2rem' }}>Product Title *</label>
                  <input type="text" placeholder="e.g. SWITCHES Pro Wireless" value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} style={{ width: '100%', padding: '0.55rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', background: 'var(--bg-secondary)', color: 'var(--text-main)', fontSize: '0.82rem' }} />
                </div>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, display: 'block', marginBottom: '0.2rem' }}>Price ($) *</label>
                  <input type="number" step="0.01" placeholder="149.99" value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} style={{ width: '100%', padding: '0.55rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', background: 'var(--bg-secondary)', color: 'var(--text-main)', fontSize: '0.82rem' }} />
                </div>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, display: 'block', marginBottom: '0.2rem' }}>Stock Quantity</label>
                  <input type="number" placeholder="35" value={newProduct.stock} onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })} style={{ width: '100%', padding: '0.55rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', background: 'var(--bg-secondary)', color: 'var(--text-main)', fontSize: '0.82rem' }} />
                </div>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, display: 'block', marginBottom: '0.2rem' }}>Category *</label>
                  <select 
                    value={newProduct.category || ''} 
                    onChange={(e) => {
                      const selectedCatName = e.target.value;
                      const catObj = (categoriesList || []).find(c => (c.name || '').trim().toLowerCase() === selectedCatName.trim().toLowerCase());
                      let subList = catObj?.subCategories || [];
                      if (!subList || subList.length === 0) {
                        const lower = selectedCatName.toLowerCase();
                        if (lower.includes('tech')) subList = ["Headphones & ANC", "Smartwatches", "Keyboards", "Smartphones", "Audio"];
                        else if (lower.includes('apparel')) subList = ["Hoodies", "Activewear", "Jackets", "Caps & Hats"];
                        else if (lower.includes('home') || lower.includes('appliance')) subList = ["Ambient Lighting", "Desk Accessories", "Smart Gadgets", "Kitchen Appliances", "Air Quality & Cooling"];
                        else if (lower.includes('accessories')) subList = ["Backpacks", "Travel Gear", "Cases & Sleeves"];
                        else if (lower.includes('switch') || lower.includes('key')) subList = ["Mechanical Switches", "Keycaps", "Custom Cables"];
                        else if (lower.includes('beauty') || lower.includes('care')) subList = ["Skincare", "facewash", "Cosmetics", "Fragrance"];
                        else subList = [`${selectedCatName} Essentials`, `${selectedCatName} Pro`];
                      }
                      const defaultSub = subList[0] || '';
                      setNewProduct({ ...newProduct, category: selectedCatName, subCategory: defaultSub });
                    }} 
                    style={{ width: '100%', padding: '0.55rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', background: 'var(--bg-secondary)', color: 'var(--text-main)', fontSize: '0.82rem' }}
                  >
                    {categoriesList.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                  </select>
                </div>

                <div style={{ gridColumn: 'span 2' }}>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, display: 'block', marginBottom: '0.2rem' }}>Sub-Category (Select Existing OR Type New) *</label>
                  <div style={{ display: 'flex', gap: '0.4rem' }}>
                    <select 
                      value={newProduct.subCategory || ''} 
                      onChange={(e) => setNewProduct({ ...newProduct, subCategory: e.target.value })} 
                      style={{ flex: 1, padding: '0.55rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', background: 'var(--bg-secondary)', color: 'var(--text-main)', fontSize: '0.82rem' }}
                    >
                      {(() => {
                        const catObj = (categoriesList || []).find(c => (c.name || '').trim().toLowerCase() === (newProduct.category || '').trim().toLowerCase());
                        let subList = (catObj?.subCategories && catObj.subCategories.length > 0) ? catObj.subCategories : [];
                        if (subList.length === 0) {
                          const catName = newProduct.category || 'Tech';
                          const lower = catName.toLowerCase();
                          if (lower.includes('tech')) subList = ["Headphones & ANC", "Smartwatches", "Keyboards", "Smartphones", "Audio"];
                          else if (lower.includes('apparel')) subList = ["Hoodies", "Activewear", "Jackets", "Caps & Hats"];
                          else if (lower.includes('home') || lower.includes('appliance')) subList = ["Ambient Lighting", "Desk Accessories", "Smart Gadgets", "Kitchen Appliances", "Air Quality & Cooling"];
                          else if (lower.includes('accessories')) subList = ["Backpacks", "Travel Gear", "Cases & Sleeves"];
                          else if (lower.includes('switch') || lower.includes('key')) subList = ["Mechanical Switches", "Keycaps", "Custom Cables"];
                          else if (lower.includes('beauty') || lower.includes('care')) subList = ["Skincare", "facewash", "Cosmetics", "Fragrance"];
                          else subList = [`${catName} Essentials`, `${catName} Pro`];
                        }
                        return subList.map(sub => <option key={sub} value={sub}>{sub}</option>);
                      })()}
                    </select>
                    <input 
                      type="text" 
                      placeholder="Or type custom sub-category..." 
                      value={newProduct.subCategory || ''} 
                      onChange={(e) => setNewProduct({ ...newProduct, subCategory: e.target.value })} 
                      style={{ flex: 1.2, padding: '0.55rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', background: 'var(--bg-secondary)', color: 'var(--text-main)', fontSize: '0.82rem' }} 
                    />
                  </div>
                </div>
                <div style={{ gridColumn: 'span 2' }}>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, display: 'block', marginBottom: '0.2rem' }}>Tagline</label>
                  <input type="text" placeholder="e.g. Studio-grade noise cancelling" value={newProduct.tagline} onChange={(e) => setNewProduct({ ...newProduct, tagline: e.target.value })} style={{ width: '100%', padding: '0.55rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', background: 'var(--bg-secondary)', color: 'var(--text-main)', fontSize: '0.82rem' }} />
                </div>

                <div style={{ gridColumn: 'span 2', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, display: 'block', marginBottom: '0.2rem' }}>Product Flags & Display Options</label>
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap', padding: '0.55rem 0.85rem', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', height: '38px' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer', fontSize: '0.78rem', fontWeight: 700 }}>
                      <input
                        type="checkbox"
                        checked={Boolean(newProduct.isBestSeller)}
                        onChange={(e) => setNewProduct({ ...newProduct, isBestSeller: e.target.checked })}
                        style={{ width: '15px', height: '15px', accentColor: '#ba0c2f' }}
                      />
                      🔥 Best Selling Product
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer', fontSize: '0.78rem', fontWeight: 700 }}>
                      <input
                        type="checkbox"
                        checked={newProduct.isNew !== false}
                        onChange={(e) => setNewProduct({ ...newProduct, isNew: e.target.checked })}
                        style={{ width: '15px', height: '15px', accentColor: 'hsl(var(--hue-primary), 85%, 50%)' }}
                      />
                      ✨ New Arrival
                    </label>
                  </div>
                </div>

                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, display: 'block', marginBottom: '0.35rem' }}>Product Image (File Upload or Image URL)</label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                    <label htmlFor="new-product-image" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.5rem 0.9rem', borderRadius: 'var(--radius-md)', border: '1px dashed var(--border-active)', background: 'var(--bg-secondary)', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 700, color: 'hsl(var(--hue-primary), 85%, 50%)' }}>
                      <Image size={15} /> Upload Local Image File
                    </label>
                    <input
                      id="new-product-image"
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, false)}
                      style={{ display: 'none' }}
                    />
                    
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700 }}>OR</span>

                    <input
                      type="text"
                      placeholder="Paste Image URL (e.g. https://...)"
                      value={newProduct.images?.[0] && !newProduct.images[0].startsWith('data:') ? newProduct.images[0] : ''}
                      onChange={(e) => setNewProduct({ ...newProduct, images: [e.target.value] })}
                      style={{ flex: 1, minWidth: '200px', padding: '0.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', background: 'var(--bg-secondary)', color: 'var(--text-main)', fontSize: '0.82rem' }}
                    />

                    {newProduct.images?.[0] && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.25rem 0.5rem', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
                        <img
                          src={newProduct.images[0]}
                          alt="Preview"
                          style={{ width: '48px', height: '48px', borderRadius: 'var(--radius-sm)', objectFit: 'cover' }}
                        />
                        <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 700 }}>Preview</span>
                      </div>
                    )}
                  </div>
                </div>

                <div style={{ gridColumn: '1 / -1' }}>
                  <button type="submit" className="btn btn-primary" style={{ padding: '0.6rem 1.2rem', fontSize: '0.85rem' }}>
                    <Plus size={15} /> Publish Product to Catalog
                  </button>
                </div>
              </form>
            </div>

            <div className="card" style={{ padding: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.75rem' }}>
                <div>
                  <h3 style={{ fontSize: '1rem', fontWeight: 800 }}>Store Inventory ({filteredProducts.length})</h3>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Search, edit stock/pricing, or delete products</p>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <input type="text" placeholder="Search product..." value={productSearch} onChange={(e) => setProductSearch(e.target.value)} style={{ padding: '0.45rem 0.65rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', background: 'var(--bg-secondary)', color: 'var(--text-main)', fontSize: '0.78rem' }} />
                  <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} style={{ padding: '0.45rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', background: 'var(--bg-secondary)', color: 'var(--text-main)', fontSize: '0.78rem' }}>
                    <option value="All">All Categories</option>
                    {categoriesList.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                  </select>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                {filteredProducts.map(p => (
                  <div key={p.id} style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', background: 'var(--bg-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <img src={p.images?.[0] || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80'} alt={p.name} style={{ width: '44px', height: '44px', borderRadius: 'var(--radius-sm)', objectFit: 'cover' }} />
                      <div>
                        <h4 style={{ fontSize: '0.88rem', fontWeight: 800, margin: 0 }}>{p.name}</h4>
                        <span className="badge badge-primary" style={{ fontSize: '0.6rem', marginTop: '0.2rem' }}>{p.category}</span>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <span style={{ fontSize: '0.95rem', fontWeight: 900, color: 'hsl(var(--hue-primary), 85%, 50%)' }}>${p.price}</span>
                      <div style={{ display: 'flex', gap: '0.35rem' }}>
                        <button onClick={() => setEditingProduct(p)} className="btn btn-secondary" style={{ padding: '0.3rem 0.55rem', fontSize: '0.75rem' }}><Edit3 size={13} /> Edit</button>
                        <button onClick={() => deleteProduct(p.id)} className="btn btn-secondary" style={{ padding: '0.3rem 0.55rem', fontSize: '0.75rem', color: '#ff4757' }}><Trash2 size={13} /> Delete</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 4. INVENTORY MANAGEMENT MODULE (CRUD & STOCK ADJUSTMENTS) */}
        {activeTab === 'inventory' && (
          <div className="card" style={{ padding: '1.25rem' }}>
            <div style={{ marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 800 }}>Inventory & Stock Control ({products.length})</h3>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Adjust real-time stock levels, resolve low stock alerts, and trigger reorders</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {products.map(p => {
                const isLow = (p.stock || 0) <= 15;
                const isOut = (p.stock || 0) === 0;
                return (
                  <div key={p.id} style={{ padding: '0.85rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', background: 'var(--bg-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <img src={p.images?.[0]} alt={p.name} style={{ width: '40px', height: '40px', borderRadius: 'var(--radius-sm)', objectFit: 'cover' }} />
                      <div>
                        <h4 style={{ fontSize: '0.88rem', fontWeight: 800, margin: 0 }}>{p.name}</h4>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.2rem' }}>
                          <span className="badge badge-primary" style={{ fontSize: '0.6rem' }}>{p.category}</span>
                          <span style={{ fontSize: '0.72rem', fontWeight: 800, color: isOut ? '#ff4757' : (isLow ? '#f59e0b' : '#10b981') }}>
                            {isOut ? '⚠️ Out of Stock' : (isLow ? `⚠️ Low Stock: ${p.stock}` : `In Stock: ${p.stock}`)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                      <button onClick={() => adjustStock(p.id, -5)} className="btn btn-secondary" style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem' }}>-5</button>
                      <input type="number" value={p.stock} onChange={(e) => updateStock(p.id, e.target.value)} style={{ width: '64px', padding: '0.35rem', textAlign: 'center', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-active)', background: 'var(--bg-card)', color: 'var(--text-main)', fontSize: '0.85rem', fontWeight: 800 }} />
                      <button onClick={() => adjustStock(p.id, 5)} className="btn btn-secondary" style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem' }}>+5</button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 5. ORDERS MODULE (CRUD) */}
        {activeTab === 'orders' && (
          <div className="card" style={{ padding: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
              <div>
                <h3 style={{ fontSize: '1rem', fontWeight: 800 }}>Customer Orders Fulfillment ({orders.length})</h3>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Update status, view shipping info, or cancel orders</p>
              </div>
              <input type="text" placeholder="Search order ID..." value={orderSearch} onChange={(e) => setOrderSearch(e.target.value)} style={{ padding: '0.45rem 0.65rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', background: 'var(--bg-secondary)', color: 'var(--text-main)', fontSize: '0.78rem' }} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {filteredOrders.map(o => (
                <div key={o.id} style={{ padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', background: 'var(--bg-secondary)', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ fontSize: '0.95rem', fontWeight: 900 }}>{o.id}</span>
                      <span className="badge badge-primary" style={{ fontSize: '0.68rem' }}>{o.status.toUpperCase()}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                      <select value={o.status} onChange={(e) => updateOrderStatus(o.id, e.target.value)} style={{ padding: '0.35rem 0.6rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-active)', background: 'var(--bg-glass-heavy)', color: 'var(--text-main)', fontSize: '0.78rem', fontWeight: 700 }}>
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                      <button onClick={() => deleteOrder(o.id)} className="btn btn-icon" style={{ width: '32px', height: '32px' }}><Trash2 size={14} color="#ff4757" /></button>
                    </div>
                  </div>

                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.4rem', borderTop: '1px solid var(--border-light)', paddingTop: '0.5rem' }}>
                    <div><strong>Customer:</strong> {o.shippingAddress?.fullName || 'Alex Mercer'}</div>
                    <div><strong>Total Amount:</strong> <span style={{ color: 'var(--text-main)', fontWeight: 800 }}>${o.totalAmount}</span></div>
                    <div><strong>Payment Method:</strong> {(o.paymentMethod || 'card').toUpperCase()}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 6. PAYMENT HISTORY MODULE (CRUD) */}
        {activeTab === 'payments' && (
          <div className="card" style={{ padding: '1.25rem' }}>
            <div style={{ marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 800 }}>Payment Transactions ({payments.length})</h3>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Financial transaction logs and payment status management</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {payments.map(pay => (
                <div key={pay.id} style={{ padding: '0.85rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', background: 'var(--bg-secondary)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ fontSize: '0.9rem', fontWeight: 900 }}>{pay.id}</span>
                      <span className="badge badge-primary" style={{ fontSize: '0.6rem' }}>{pay.paymentMethod.toUpperCase()}</span>
                    </div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginTop: '0.2rem' }}>
                      Customer: {pay.customerName} | Order: {pay.orderId}
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <span style={{ fontSize: '1rem', fontWeight: 900, color: 'hsl(var(--hue-primary), 85%, 50%)' }}>${pay.amount}</span>
                    <select value={pay.status} onChange={(e) => updatePaymentStatus(pay.id, e.target.value)} style={{ padding: '0.35rem 0.6rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', background: 'var(--bg-card)', color: 'var(--text-main)', fontSize: '0.78rem', fontWeight: 700 }}>
                      <option value="Paid">Paid</option>
                      <option value="Pending">Pending</option>
                      <option value="Refunded">Refunded</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 7. CUSTOMERS MODULE (CRUD) */}
        {activeTab === 'customers' && (
          <div className="card" style={{ padding: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
              <div>
                <h3 style={{ fontSize: '1rem', fontWeight: 800 }}>Registered Customers ({usersList.length})</h3>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Customer accounts database and administrative role permissions</p>
              </div>
              <input type="text" placeholder="Search customer..." value={customerSearch} onChange={(e) => setCustomerSearch(e.target.value)} style={{ padding: '0.45rem 0.65rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', background: 'var(--bg-secondary)', color: 'var(--text-main)', fontSize: '0.78rem' }} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {filteredCustomers.map(u => (
                <div key={u.id} style={{ padding: '0.85rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', background: 'var(--bg-secondary)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <img src={u.avatar} alt={u.name} style={{ width: '40px', height: '40px', borderRadius: 'var(--radius-full)', objectFit: 'cover' }} />
                    <div>
                      <h4 style={{ fontSize: '0.88rem', fontWeight: 800, margin: 0 }}>{u.name}</h4>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{u.email}</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    <span className="badge badge-primary" style={{ fontSize: '0.65rem', background: u.role === 'admin' ? 'var(--grad-primary)' : 'var(--bg-glass-heavy)' }}>
                      {u.role.toUpperCase()}
                    </span>
                    <button onClick={() => updateUserRole(u.id, u.role === 'admin' ? 'customer' : 'admin')} className="btn btn-secondary" style={{ padding: '0.35rem 0.65rem', fontSize: '0.75rem' }}>
                      <RefreshCw size={12} /> Make {u.role === 'admin' ? 'Customer' : 'Admin'}
                    </button>
                    <button onClick={() => deleteUser(u.id)} className="btn btn-secondary" style={{ padding: '0.35rem 0.55rem', fontSize: '0.75rem', color: '#ff4757' }}>
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 8. BANNERS MODULE (CRUD) */}
        {activeTab === 'banners' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800 }}>Marketing Banners ({banners.length})</h3>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Manage promotional hero banners displayed on the storefront</p>
              </div>
              <button onClick={() => setIsBannerModalOpen(true)} className="btn btn-primary" style={{ padding: '0.45rem 0.85rem', fontSize: '0.8rem' }}>
                <Plus size={14} /> Create New Banner
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {banners.map(b => (
                <div key={b.id} className="card" style={{ padding: '1rem', display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flex: 1, minWidth: '240px' }}>
                    <img src={b.imageUrl} alt={b.title} style={{ width: '90px', height: '65px', borderRadius: 'var(--radius-md)', objectFit: 'cover' }} />
                    <div>
                      <span className="badge badge-accent" style={{ fontSize: '0.6rem', marginBottom: '0.2rem' }}>{b.tag}</span>
                      <h4 style={{ fontSize: '0.92rem', fontWeight: 800, margin: 0 }}>{b.title}</h4>
                      <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: 0 }}>{b.subtitle}</p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    <button onClick={() => toggleBannerActive(b.id)} className={`btn ${b.isActive ? 'btn-primary' : 'btn-secondary'}`} style={{ padding: '0.35rem 0.75rem', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      {b.isActive ? <Eye size={13} /> : <EyeOff size={13} />} {b.isActive ? 'Active' : 'Inactive'}
                    </button>
                    <button onClick={() => setEditingBanner(b)} className="btn btn-secondary" style={{ padding: '0.35rem 0.65rem', fontSize: '0.75rem' }}><Edit3 size={13} /> Edit</button>
                    <button onClick={() => deleteBanner(b.id)} className="btn btn-secondary" style={{ padding: '0.35rem 0.65rem', fontSize: '0.75rem', color: '#ff4757' }}><Trash2 size={13} /> Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>

      {/* Category Create Modal */}
      {isCategoryModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(8px)', zIndex: 3000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <div className="card" style={{ maxWidth: '440px', width: '100%', padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 800 }}>Add Store Category (CREATE)</h3>
              <button onClick={() => setIsCategoryModalOpen(false)} className="btn btn-icon"><X size={16} /></button>
            </div>
            
            <form onSubmit={handleAddCategorySubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, display: 'block', marginBottom: '0.2rem' }}>Category Name *</label>
                <input 
                  type="text" 
                  placeholder="e.g. Gaming Gear, Smartphones" 
                  value={newCat.name} 
                  onChange={(e) => {
                    const val = e.target.value;
                    setNewCat({ ...newCat, name: val, slug: val.toLowerCase().replace(/\s+/g, '-') });
                  }} 
                  style={{ width: '100%', padding: '0.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', background: 'var(--bg-secondary)', color: 'var(--text-main)', fontSize: '0.85rem' }} 
                />
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, display: 'block', marginBottom: '0.2rem' }}>URL Slug</label>
                <input 
                  type="text" 
                  placeholder="e.g. gaming-gear" 
                  value={newCat.slug} 
                  onChange={(e) => setNewCat({ ...newCat, slug: e.target.value })} 
                  style={{ width: '100%', padding: '0.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', background: 'var(--bg-secondary)', color: 'var(--text-main)', fontSize: '0.85rem' }} 
                />
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, display: 'block', marginBottom: '0.2rem' }}>
                  Sub-Categories (Comma Separated)
                </label>
                <input 
                  type="text" 
                  placeholder="e.g. Skincare, Cosmetics, Fragrance" 
                  value={newCat.subCategories || ''} 
                  onChange={(e) => setNewCat({ ...newCat, subCategories: e.target.value })} 
                  style={{ width: '100%', padding: '0.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', background: 'var(--bg-secondary)', color: 'var(--text-main)', fontSize: '0.85rem' }} 
                />
              </div>

              {/* Color Swatch Picker */}
              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, display: 'block', marginBottom: '0.3rem' }}>Accent Brand Color</label>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
                  {availableColors.map(c => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setNewCat({ ...newCat, color: c })}
                      style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: 'var(--radius-full)',
                        background: c,
                        border: newCat.color === c ? '2px solid #ffffff' : '1px solid transparent',
                        boxShadow: newCat.color === c ? '0 0 0 2px var(--border-active)' : 'none',
                        cursor: 'pointer'
                      }}
                    />
                  ))}
                  <input
                    type="color"
                    value={newCat.color}
                    onChange={(e) => setNewCat({ ...newCat, color: e.target.value })}
                    style={{ width: '28px', height: '28px', border: 'none', background: 'none', cursor: 'pointer' }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                <button type="button" onClick={() => setIsCategoryModalOpen(false)} className="btn btn-secondary" style={{ flex: 1 }}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>Create Category</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Category Edit Modal */}
      {editingCat && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(8px)', zIndex: 3000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <div className="card" style={{ maxWidth: '440px', width: '100%', padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 800 }}>Edit Category Specs (UPDATE)</h3>
              <button onClick={() => setEditingCat(null)} className="btn btn-icon"><X size={16} /></button>
            </div>
            
            <form onSubmit={handleSaveCategoryEdit} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, display: 'block', marginBottom: '0.2rem' }}>Category Name</label>
                <input 
                  type="text" 
                  value={editingCat.name} 
                  onChange={(e) => {
                    const val = e.target.value;
                    setEditingCat({ ...editingCat, name: val, slug: val.toLowerCase().replace(/\s+/g, '-') });
                  }} 
                  style={{ width: '100%', padding: '0.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', background: 'var(--bg-secondary)', color: 'var(--text-main)', fontSize: '0.85rem' }} 
                />
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, display: 'block', marginBottom: '0.2rem' }}>URL Slug</label>
                <input 
                  type="text" 
                  value={editingCat.slug || ''} 
                  onChange={(e) => setEditingCat({ ...editingCat, slug: e.target.value })} 
                  style={{ width: '100%', padding: '0.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', background: 'var(--bg-secondary)', color: 'var(--text-main)', fontSize: '0.85rem' }} 
                />
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, display: 'block', marginBottom: '0.2rem' }}>
                  Sub-Categories (Comma Separated)
                </label>
                <input 
                  type="text" 
                  placeholder="e.g. Headphones, Smartwatches, Keyboards"
                  value={Array.isArray(editingCat.subCategories) ? editingCat.subCategories.join(', ') : (editingCat.subCategories || '')} 
                  onChange={(e) => {
                    const raw = e.target.value;
                    setEditingCat({ ...editingCat, subCategories: raw });
                  }} 
                  style={{ width: '100%', padding: '0.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', background: 'var(--bg-secondary)', color: 'var(--text-main)', fontSize: '0.85rem' }} 
                />
              </div>

              {/* Color Swatch Picker */}
              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, display: 'block', marginBottom: '0.3rem' }}>Accent Brand Color</label>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
                  {availableColors.map(c => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setEditingCat({ ...editingCat, color: c })}
                      style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: 'var(--radius-full)',
                        background: c,
                        border: editingCat.color === c ? '2px solid #ffffff' : '1px solid transparent',
                        boxShadow: editingCat.color === c ? '0 0 0 2px var(--border-active)' : 'none',
                        cursor: 'pointer'
                      }}
                    />
                  ))}
                  <input
                    type="color"
                    value={editingCat.color || '#ba0c2f'}
                    onChange={(e) => setEditingCat({ ...editingCat, color: e.target.value })}
                    style={{ width: '28px', height: '28px', border: 'none', background: 'none', cursor: 'pointer' }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                <button type="button" onClick={() => setEditingCat(null)} className="btn btn-secondary" style={{ flex: 1 }}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Product Modal */}
      {editingProduct && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(8px)', zIndex: 3000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <div className="card" style={{ maxWidth: '480px', width: '100%', padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 800 }}>Edit Product Specs</h3>
              <button onClick={() => setEditingProduct(null)} className="btn btn-icon"><X size={16} /></button>
            </div>
            <form onSubmit={handleSaveProductEdit} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, display: 'block', marginBottom: '0.2rem' }}>Product Name</label>
                <input type="text" value={editingProduct.name} onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })} style={{ width: '100%', padding: '0.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', background: 'var(--bg-secondary)', color: 'var(--text-main)', fontSize: '0.85rem' }} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, display: 'block', marginBottom: '0.2rem' }}>Price ($)</label>
                  <input type="number" step="0.01" value={editingProduct.price} onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value })} style={{ width: '100%', padding: '0.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', background: 'var(--bg-secondary)', color: 'var(--text-main)', fontSize: '0.85rem' }} />
                </div>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, display: 'block', marginBottom: '0.2rem' }}>Stock Units</label>
                  <input type="number" value={editingProduct.stock} onChange={(e) => setEditingProduct({ ...editingProduct, stock: e.target.value })} style={{ width: '100%', padding: '0.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', background: 'var(--bg-secondary)', color: 'var(--text-main)', fontSize: '0.85rem' }} />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, display: 'block', marginBottom: '0.2rem' }}>Category</label>
                <select 
                  value={editingProduct.category || ''} 
                  onChange={(e) => {
                    const selectedCatName = e.target.value;
                    const catObj = (categoriesList || []).find(c => (c.name || '').trim().toLowerCase() === selectedCatName.trim().toLowerCase());
                    let subList = catObj?.subCategories || [];
                    if (!subList || subList.length === 0) {
                      const lower = selectedCatName.toLowerCase();
                      if (lower.includes('tech')) subList = ["Headphones & ANC", "Smartwatches", "Keyboards", "Smartphones", "Audio"];
                      else if (lower.includes('apparel')) subList = ["Hoodies", "Activewear", "Jackets", "Caps & Hats"];
                      else if (lower.includes('home') || lower.includes('appliance')) subList = ["Ambient Lighting", "Desk Accessories", "Smart Gadgets", "Kitchen Appliances", "Air Quality & Cooling"];
                      else if (lower.includes('accessories')) subList = ["Backpacks", "Travel Gear", "Cases & Sleeves"];
                      else if (lower.includes('switch') || lower.includes('key')) subList = ["Mechanical Switches", "Keycaps", "Custom Cables"];
                      else if (lower.includes('beauty') || lower.includes('care')) subList = ["Skincare", "facewash", "Cosmetics", "Fragrance"];
                      else subList = [`${selectedCatName} Essentials`, `${selectedCatName} Pro`];
                    }
                    const defaultSub = subList[0] || '';
                    setEditingProduct({ ...editingProduct, category: selectedCatName, subCategory: defaultSub });
                  }} 
                  style={{ width: '100%', padding: '0.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', background: 'var(--bg-secondary)', color: 'var(--text-main)', fontSize: '0.85rem' }}
                >
                  {categoriesList.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, display: 'block', marginBottom: '0.2rem' }}>Sub-Category (Select Existing OR Type Custom)</label>
                <div style={{ display: 'flex', gap: '0.4rem' }}>
                  <select 
                    value={editingProduct.subCategory || ''} 
                    onChange={(e) => setEditingProduct({ ...editingProduct, subCategory: e.target.value })} 
                    style={{ flex: 1, padding: '0.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', background: 'var(--bg-secondary)', color: 'var(--text-main)', fontSize: '0.85rem' }}
                  >
                    {(() => {
                      const catObj = (categoriesList || []).find(c => (c.name || '').trim().toLowerCase() === (editingProduct.category || '').trim().toLowerCase());
                      let subList = (catObj?.subCategories && catObj.subCategories.length > 0) ? catObj.subCategories : [];
                      if (subList.length === 0) {
                        const catName = editingProduct.category || 'Tech';
                        const lower = catName.toLowerCase();
                        if (lower.includes('tech')) subList = ["Headphones & ANC", "Smartwatches", "Keyboards", "Smartphones", "Audio"];
                        else if (lower.includes('apparel')) subList = ["Hoodies", "Activewear", "Jackets", "Caps & Hats"];
                        else if (lower.includes('home') || lower.includes('appliance')) subList = ["Ambient Lighting", "Desk Accessories", "Smart Gadgets", "Kitchen Appliances", "Air Quality & Cooling"];
                        else if (lower.includes('accessories')) subList = ["Backpacks", "Travel Gear", "Cases & Sleeves"];
                        else if (lower.includes('switch') || lower.includes('key')) subList = ["Mechanical Switches", "Keycaps", "Custom Cables"];
                        else if (lower.includes('beauty') || lower.includes('care')) subList = ["Skincare", "facewash", "Cosmetics", "Fragrance"];
                        else subList = [`${catName} Essentials`, `${catName} Pro`];
                      }
                      return subList.map(sub => <option key={sub} value={sub}>{sub}</option>);
                    })()}
                  </select>
                  <input 
                    type="text" 
                    placeholder="Or type custom..." 
                    value={editingProduct.subCategory || ''} 
                    onChange={(e) => setEditingProduct({ ...editingProduct, subCategory: e.target.value })} 
                    style={{ flex: 1.2, padding: '0.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', background: 'var(--bg-secondary)', color: 'var(--text-main)', fontSize: '0.85rem' }} 
                  />
                </div>
              </div>

              {/* Image Upload & URL Input */}
              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, display: 'block', marginBottom: '0.35rem' }}>Product Image (Upload File or Paste URL)</label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <img
                      src={editingProduct.images?.[0] || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80'}
                      alt="Current"
                      style={{ width: '64px', height: '64px', borderRadius: 'var(--radius-md)', objectFit: 'cover', border: '1px solid var(--border-light)' }}
                    />
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', flex: 1 }}>
                      <label htmlFor="edit-product-image" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', padding: '0.45rem 0.85rem', borderRadius: 'var(--radius-md)', border: '1px dashed var(--border-active)', background: 'var(--bg-secondary)', cursor: 'pointer', fontSize: '0.78rem', fontWeight: 700, color: 'hsl(var(--hue-primary), 85%, 50%)' }}>
                        <Image size={14} /> Upload New Local Image File
                      </label>
                      <input
                        id="edit-product-image"
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, true)}
                        style={{ display: 'none' }}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 700, display: 'block', marginBottom: '0.2rem' }}>Or Image Web URL:</label>
                    <input
                      type="text"
                      placeholder="https://..."
                      value={editingProduct.images?.[0] && !editingProduct.images[0].startsWith('data:') ? editingProduct.images[0] : ''}
                      onChange={(e) => setEditingProduct({ ...editingProduct, images: [e.target.value] })}
                      style={{ width: '100%', padding: '0.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', background: 'var(--bg-secondary)', color: 'var(--text-main)', fontSize: '0.82rem' }}
                    />
                  </div>
                </div>
              </div>

              {/* Product Badges / Display Options */}
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap', padding: '0.6rem 0.75rem', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', cursor: 'pointer', fontSize: '0.78rem', fontWeight: 700 }}>
                  <input
                    type="checkbox"
                    checked={Boolean(editingProduct.isBestSeller)}
                    onChange={(e) => setEditingProduct({ ...editingProduct, isBestSeller: e.target.checked })}
                    style={{ width: '15px', height: '15px', accentColor: '#ba0c2f' }}
                  />
                  🔥 Best Seller
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', cursor: 'pointer', fontSize: '0.78rem', fontWeight: 700 }}>
                  <input
                    type="checkbox"
                    checked={Boolean(editingProduct.isNew)}
                    onChange={(e) => setEditingProduct({ ...editingProduct, isNew: e.target.checked })}
                    style={{ width: '15px', height: '15px', accentColor: 'hsl(var(--hue-primary), 85%, 50%)' }}
                  />
                  ✨ New Arrival
                </label>
              </div>

              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                <button type="button" onClick={() => setEditingProduct(null)} className="btn btn-secondary" style={{ flex: 1 }}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Banner Create Modal */}
      {isBannerModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(8px)', zIndex: 3000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <div className="card" style={{ maxWidth: '450px', width: '100%', padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 800 }}>Add Hero Promotional Banner</h3>
              <button onClick={() => setIsBannerModalOpen(false)} className="btn btn-icon"><X size={16} /></button>
            </div>
            <form onSubmit={handleAddBannerSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, display: 'block', marginBottom: '0.2rem' }}>Banner Title *</label>
                <input type="text" placeholder="e.g. Summer Tech Extravaganza" value={newBanner.title} onChange={(e) => setNewBanner({ ...newBanner, title: e.target.value })} style={{ width: '100%', padding: '0.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', background: 'var(--bg-secondary)', color: 'var(--text-main)', fontSize: '0.85rem' }} />
              </div>
              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, display: 'block', marginBottom: '0.2rem' }}>Subtitle</label>
                <input type="text" placeholder="e.g. Save up to 40% on all hardware" value={newBanner.subtitle} onChange={(e) => setNewBanner({ ...newBanner, subtitle: e.target.value })} style={{ width: '100%', padding: '0.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', background: 'var(--bg-secondary)', color: 'var(--text-main)', fontSize: '0.85rem' }} />
              </div>
              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, display: 'block', marginBottom: '0.2rem' }}>Image URL</label>
                <input type="text" placeholder="https://images.unsplash.com/..." value={newBanner.imageUrl} onChange={(e) => setNewBanner({ ...newBanner, imageUrl: e.target.value })} style={{ width: '100%', padding: '0.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', background: 'var(--bg-secondary)', color: 'var(--text-main)', fontSize: '0.85rem' }} />
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button type="button" onClick={() => setIsBannerModalOpen(false)} className="btn btn-secondary" style={{ flex: 1 }}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>Publish Banner</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Responsive Styles */}
      <style>{`
        @media (max-width: 900px) {
          .admin-sidebar {
            position: fixed !important;
            left: -290px;
            transition: left 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
          }
          .admin-sidebar.sidebar-open {
            left: 0 !important;
          }
          .mobile-sidebar-toggle, .mobile-sidebar-close {
            display: flex !important;
          }
        }
      `}</style>

    </div>
  );
};

export default AdminDashboardPage;
