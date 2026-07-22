import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

const AppContext = createContext();

const initialProducts = [
  {
    id: "p1",
    name: "SWITCHES SoundPulse Wireless Pro",
    slug: "switches-soundpulse-wireless-pro",
    tagline: "Ultra-low latency ANC Headphones with Hifi Audio",
    price: 199.99,
    originalPrice: 249.99,
    category: "Tech",
    rating: 4.9,
    reviewCount: 128,
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=800&q=80"
    ],
    colors: [
      { name: "Crimson Red", hex: "#BA0C2F" },
      { name: "Obsidian Black", hex: "#121212" },
      { name: "Cyber Silver", hex: "#E0E0E0" }
    ],
    sizes: ["Standard"],
    description: "Experience spatial studio audio with true hybrid Active Noise Cancellation (ANC), 40-hour battery life, and ultra-plush memory foam cushions.",
    features: [
      "Hybrid ANC up to -42dB",
      "40-hour battery runtime with ultra-fast charging",
      "Custom 40mm Titanium Drivers",
      "Bluetooth 5.3 + Multipoint Connectivity"
    ],
    stock: 35,
    isNew: true,
    isFeatured: true
  },
  {
    id: "p2",
    name: "SWITCHES Horizon Smartwatch Ultra",
    slug: "switches-horizon-smartwatch-ultra",
    tagline: "Titanium Chassis with Sapphire OLED Display",
    price: 299.99,
    originalPrice: 349.99,
    category: "Tech",
    rating: 4.8,
    reviewCount: 94,
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=800&q=80"
    ],
    colors: [
      { name: "Titanium Gray", hex: "#4A4A4A" },
      { name: "Crimson Red Accent", hex: "#BA0C2F" }
    ],
    sizes: ["42mm", "46mm"],
    description: "Next-generation health telemetry monitoring heart rate, SpO2, HRV, and sleep stages enclosed in aerospace-grade titanium.",
    features: [
      "Always-on 2000-nit AMOLED Display",
      "Water resistant to 100m (10 ATM)",
      "Dual-frequency precision GPS",
      "7-day active battery life"
    ],
    stock: 18,
    isNew: true,
    isFeatured: true
  },
  {
    id: "p3",
    name: "SWITCHES NeoMatte Tech Hoodie",
    slug: "switches-neomatte-tech-hoodie",
    tagline: "Water-repellent 4-way stretch activewear",
    price: 89.99,
    originalPrice: 110.00,
    category: "Apparel",
    rating: 4.7,
    reviewCount: 64,
    images: [
      "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80"
    ],
    colors: [
      { name: "Charcoal Dark", hex: "#222222" },
      { name: "Crimson Accent", hex: "#BA0C2F" }
    ],
    sizes: ["S", "M", "L", "XL"],
    description: "Engineered for urban commuters and athletes, featuring thermoregulating fabric, hidden zip pockets, and ergonomic articulation.",
    features: [
      "DWR water-resistant finish",
      "Bonded seamless construction",
      "Concealed media pocket",
      "Anti-microbial odor resistant fabric"
    ],
    stock: 50,
    isNew: false,
    isFeatured: true
  },
  {
    id: "p4",
    name: "SWITCHES CyberGlow Keyboard",
    slug: "switches-cyberglow-keyboard",
    tagline: "Hot-swappable Gasket Mount RGB Keyboard",
    price: 149.99,
    originalPrice: 179.99,
    category: "Tech",
    rating: 4.9,
    reviewCount: 210,
    images: [
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80"
    ],
    colors: [
      { name: "Frost White", hex: "#FAFAFA" },
      { name: "Crimson Red", hex: "#BA0C2F" }
    ],
    sizes: ["75% Compact"],
    description: "Silky tactile typing experience with sound-dampening gasket mounts, customizable RGB key lighting, and Tri-mode wireless connectivity.",
    features: [
      "Hot-swappable mechanical switches",
      "Tri-mode: 2.4G Wireless, Bluetooth 5.0, USB-C",
      "PBT double-shot keycaps",
      "Per-key RGB lighting"
    ],
    stock: 12,
    isNew: false,
    isFeatured: true
  },
  {
    id: "p5",
    name: "SWITCHES Lumina Ambient Light",
    slug: "switches-lumina-ambient-light",
    tagline: "Dynamic RGBIC Lightbar with Music Sync",
    price: 69.99,
    originalPrice: 89.99,
    category: "Home",
    rating: 4.6,
    reviewCount: 52,
    images: [
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80"
    ],
    colors: [
      { name: "Matte Black", hex: "#111111" }
    ],
    sizes: ["Single Pack", "Dual Pack"],
    description: "Transform your desk setup with 16 million colors, reactive sound sync, and smart assistant control.",
    features: [
      "16 Million RGBIC gradients",
      "Built-in mic music synchronization",
      "Zero-flicker eye protection LED"
    ],
    stock: 40,
    isNew: true,
    isFeatured: false
  },
  {
    id: "p6",
    name: "SWITCHES Vanguard Backpack",
    slug: "switches-vanguard-backpack",
    tagline: "Waterproof Anti-theft 25L Travel Backpack",
    price: 119.99,
    originalPrice: 139.99,
    category: "Accessories",
    rating: 4.8,
    reviewCount: 88,
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80"
    ],
    colors: [
      { name: "Stealth Black", hex: "#1A1A1A" },
      { name: "Crimson Red", hex: "#BA0C2F" }
    ],
    sizes: ["25 Liters"],
    description: "Crafted with Cordura 1000D waterproof nylon, dedicated 16-inch laptop sleeve, and integrated USB charging port.",
    features: [
      "TSA-friendly 180° flat opening",
      "Waterproof YKK weather-sealed zippers",
      "RFID blocking security pocket"
    ],
    stock: 22,
    isNew: false,
    isFeatured: false
  }
];

export const AppProvider = ({ children }) => {
  // Navigation State
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProductId, setSelectedProductId] = useState('p1');

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Products State
  const [products, setProducts] = useState(initialProducts);

  // Cart State
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('switches_cart');
      return saved ? JSON.parse(saved) : [
        {
          productId: 'p1',
          selectedColor: 'Crimson Red',
          selectedSize: 'Standard',
          quantity: 1
        }
      ];
    } catch {
      return [];
    }
  });

  // Coupon Engine State
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  // Wishlist State
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('switches_wishlist');
      return saved ? JSON.parse(saved) : ['p2'];
    } catch {
      return [];
    }
  });

  // Auth User State
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('switches_user');
      return saved ? JSON.parse(saved) : {
        id: 'u1',
        name: 'Alex Mercer',
        email: 'alex@switches.io',
        role: 'customer',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'
      };
    } catch {
      return null;
    }
  });

  // Orders State
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('switches_orders');
      return saved ? JSON.parse(saved) : [
        {
          id: 'SW-92810',
          createdAt: new Date().toISOString(),
          items: [
            {
              productId: 'p1',
              name: 'SWITCHES SoundPulse Wireless Pro',
              price: 199.99,
              quantity: 1,
              selectedColor: 'Crimson Red',
              selectedSize: 'Standard'
            }
          ],
          totalAmount: 199.99,
          discount: 0,
          shippingAddress: {
            fullName: 'Alex Mercer',
            email: 'alex@switches.io',
            street: '742 Evergreen Terrace',
            city: 'San Francisco',
            zip: '94107'
          },
          paymentMethod: 'card',
          status: 'shipped'
        }
      ];
    } catch {
      return [];
    }
  });

  // Vendors State
  const [vendors, setVendors] = useState(() => {
    try {
      const saved = localStorage.getItem('switches_vendors');
      return saved ? JSON.parse(saved) : [
        { id: 'v1', name: 'AURA Audio Labs', store: 'Aura Official Store', commission: 10, totalSales: 18400, pendingPayout: 16560, status: 'Active' },
        { id: 'v2', name: 'SWITCHES Apparel Ltd', store: 'Switches Wearables', commission: 12, totalSales: 9200, pendingPayout: 8096, status: 'Active' },
        { id: 'v3', name: 'SmartHome Ambient', store: 'Ambient Tech Store', commission: 8, totalSales: 7100, pendingPayout: 6532, status: 'Active' }
      ];
    } catch {
      return [];
    }
  });

  // Users List State
  const [usersList, setUsersList] = useState([
    { id: 'u1', name: 'Alex Mercer', email: 'alex@aura.io', role: 'customer', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80' },
    { id: 'u2', name: 'Elena Rostova (Admin)', email: 'admin@aura.io', role: 'admin', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80' }
  ]);

  // Toast State
  const [toast, setToast] = useState(null);

  // Enforce default light theme
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'light');
    localStorage.removeItem('switches_theme');
  }, []);

  // Storage persistence effects
  useEffect(() => {
    localStorage.setItem('switches_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('switches_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    if (user) localStorage.setItem('switches_user', JSON.stringify(user));
    else localStorage.removeItem('switches_user');
  }, [user]);

  useEffect(() => {
    localStorage.setItem('switches_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('switches_vendors', JSON.stringify(vendors));
  }, [vendors]);

  // Attempt backend API sync on mount
  useEffect(() => {
    api.getProducts().then(res => {
      if (res && res.data) {
        setProducts(res.data);
      }
    });
    api.getVendors().then(res => {
      if (res && res.data) {
        setVendors(res.data);
      }
    });
    api.getUsers().then(res => {
      if (res && res.data) {
        setUsersList(res.data);
      }
    });
  }, []);

  const showToast = (text) => {
    setToast({ text, id: Date.now() });
    setTimeout(() => setToast(null), 3000);
  };

  // Credential Login Method
  const loginWithCredentials = async (email, password) => {
    const cleanEmail = (email || '').trim().toLowerCase();
    const cleanPass = (password || '').trim();

    // Check backend API first
    const res = await api.login(cleanEmail, cleanPass);
    if (res && res.success && res.user) {
      setUser(res.user);
      showToast(`Welcome back, ${res.user.name}!`);
      if (res.user.role === 'admin') {
        setCurrentPage('admin');
      } else {
        setCurrentPage('user-dashboard');
      }
      return { success: true, user: res.user };
    }

    // Local fallback for seed credentials
    if (cleanEmail === 'admin@aura.io' || cleanEmail === 'admin@switches.io' || cleanEmail.includes('admin')) {
      if (cleanPass && cleanPass !== 'admin123' && cleanPass !== 'admin') {
        showToast('Invalid password for Admin account');
        return { success: false, message: 'Invalid password for Admin account' };
      }
      const adminObj = {
        id: 'u2',
        name: 'Elena Rostova (Admin)',
        email: cleanEmail || 'admin@aura.io',
        role: 'admin',
        avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80'
      };
      setUser(adminObj);
      showToast('Logged in as Store Administrator');
      setCurrentPage('admin');
      return { success: true, user: adminObj };
    } else if (cleanEmail === 'alex@aura.io' || cleanEmail === 'alex@switches.io' || cleanEmail.includes('alex')) {
      if (cleanPass && cleanPass !== 'user123' && cleanPass !== 'user') {
        showToast('Invalid password for User account');
        return { success: false, message: 'Invalid password for User account' };
      }
      const userObj = {
        id: 'u1',
        name: 'Alex Mercer',
        email: cleanEmail || 'alex@aura.io',
        role: 'customer',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'
      };
      setUser(userObj);
      showToast('Logged in as Alex Mercer');
      setCurrentPage('user-dashboard');
      return { success: true, user: userObj };
    } else {
      // Dynamic user fallback
      const newUser = {
        id: `u_${Date.now()}`,
        name: cleanEmail.split('@')[0] || 'Member User',
        email: cleanEmail,
        role: 'customer',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'
      };
      setUser(newUser);
      showToast('Logged in successfully');
      setCurrentPage('user-dashboard');
      return { success: true, user: newUser };
    }
  };

  // Product CRUD
  const addProduct = (prodData) => {
    const created = {
      id: `p_${Date.now()}`,
      rating: 5.0,
      reviewCount: 0,
      isFeatured: true,
      isNew: true,
      colors: prodData.colors || [{ name: 'Default', hex: '#6C5CE7' }],
      sizes: prodData.sizes || ['Standard'],
      features: prodData.features || ['Premium Build', 'Official Warranty'],
      images: prodData.images && prodData.images.length > 0 ? prodData.images : ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80'],
      ...prodData
    };
    setProducts(prev => [created, ...prev]);
    api.createProduct(created);
    showToast(`Product "${created.name}" created!`);
    return created;
  };

  const updateProduct = (id, updatedData) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updatedData } : p));
    api.updateProduct(id, updatedData);
    showToast('Product catalog updated!');
  };

  const deleteProduct = (id) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    api.deleteProduct(id);
    showToast('Product deleted from catalog');
  };

  // Order CRUD
  const updateOrderStatus = (id, status) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
    api.updateOrderStatus(id, status);
    showToast(`Order ${id} marked as ${status}`);
  };

  const deleteOrder = (id) => {
    setOrders(prev => prev.filter(o => o.id !== id));
    api.deleteOrder(id);
    showToast(`Order ${id} deleted`);
  };

  // Vendor CRUD
  const addVendor = (vendorData) => {
    const created = {
      id: `v_${Date.now()}`,
      name: vendorData.name,
      store: vendorData.store,
      commission: Number(vendorData.commission) || 10,
      totalSales: 0,
      pendingPayout: 0,
      status: 'Active'
    };
    setVendors(prev => [...prev, created]);
    api.createVendor(created);
    showToast(`Merchant "${created.store}" onboarded!`);
    return created;
  };

  const disbursePayout = (vendorId) => {
    setVendors(prev => prev.map(v => v.id === vendorId ? { ...v, pendingPayout: 0 } : v));
    api.disburseVendorPayout(vendorId);
    showToast('Vendor payout disbursed successfully!');
  };

  const deleteVendor = (vendorId) => {
    setVendors(prev => prev.filter(v => v.id !== vendorId));
    api.deleteVendor(vendorId);
    showToast('Vendor removed');
  };

  // User Roles CRUD
  const updateUserRole = (userId, newRole) => {
    setUsersList(prev => prev.map(u => u.id === userId ? { ...u, role: newRole } : u));
    if (user && user.id === userId) {
      setUser(prev => ({ ...prev, role: newRole }));
    }
    api.updateUserRole(userId, newRole);
    showToast(`User role updated to ${newRole}`);
  };

  const navigateToProduct = (id) => {
    setSelectedProductId(id);
    setCurrentPage('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addToCart = (product, color, size, qty = 1) => {
    const existingIndex = cart.findIndex(
      item => item.productId === product.id && item.selectedColor === color && item.selectedSize === size
    );

    if (existingIndex > -1) {
      const updated = [...cart];
      updated[existingIndex].quantity += qty;
      setCart(updated);
    } else {
      setCart([...cart, {
        productId: product.id,
        selectedColor: color || (product.colors && product.colors[0]?.name) || 'Crimson Red',
        selectedSize: size || (product.sizes && product.sizes[0]) || 'Standard',
        quantity: qty
      }]);
    }
    showToast(`Added ${product.name} to Cart`);
  };

  const updateCartQty = (productId, color, size, delta) => {
    setCart(prev => prev.map(item => {
      if (item.productId === productId && item.selectedColor === color && item.selectedSize === size) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : null;
      }
      return item;
    }).filter(Boolean));
  };

  const removeFromCart = (productId, color, size) => {
    setCart(prev => prev.filter(item => 
      !(item.productId === productId && item.selectedColor === color && item.selectedSize === size)
    ));
    showToast('Removed item from cart');
  };

  const toggleWishlist = (productId) => {
    setWishlist(prev => {
      const exists = prev.includes(productId);
      const updated = exists ? prev.filter(id => id !== productId) : [...prev, productId];
      showToast(exists ? 'Removed from Wishlist' : 'Saved to Wishlist');
      return updated;
    });
  };

  const applyCouponCode = (code) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'SWITCHES10' || clean === 'AURA10') {
      setAppliedCoupon({ code: 'SWITCHES10', discountPercent: 10 });
      showToast('10% SWITCHES Coupon Applied!');
      return true;
    } else if (clean === 'SWITCHES20' || clean === 'AURA20') {
      setAppliedCoupon({ code: 'SWITCHES20', discountPercent: 20 });
      showToast('20% SWITCHES VIP Coupon Applied!');
      return true;
    } else {
      showToast('Invalid Coupon Code');
      return false;
    }
  };

  const placeOrder = (shippingInfo, paymentMethod) => {
    const cartDetails = cart.map(item => {
      const p = products.find(prod => prod.id === item.productId);
      return {
        productId: item.productId,
        name: p ? p.name : 'Product',
        price: p ? p.price : 0,
        quantity: item.quantity,
        selectedColor: item.selectedColor,
        selectedSize: item.selectedSize
      };
    });

    const subtotal = cartDetails.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const discount = appliedCoupon ? (subtotal * appliedCoupon.discountPercent) / 100 : 0;
    const finalTotal = Math.max(0, subtotal - discount);

    const newOrder = {
      id: `SW-${Math.floor(10000 + Math.random() * 90000)}`,
      createdAt: new Date().toISOString(),
      items: cartDetails,
      totalAmount: parseFloat(finalTotal.toFixed(2)),
      discount: parseFloat(discount.toFixed(2)),
      shippingAddress: shippingInfo,
      paymentMethod,
      status: 'processing'
    };

    setOrders([newOrder, ...orders]);
    setCart([]);
    setAppliedCoupon(null);
    showToast('SWITCHES Order Placed Successfully!');
    api.createOrder(newOrder);
    return newOrder;
  };

  // Categories State
  const [categoriesList, setCategoriesList] = useState(() => {
    try {
      const saved = localStorage.getItem('switches_categories');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
      return [
        { id: "c1", name: "Tech", slug: "tech", icon: "Cpu", color: "#00CEC9" },
        { id: "c2", name: "Apparel", slug: "apparel", icon: "Shirt", color: "#6C5CE7" },
        { id: "c3", name: "Home", slug: "home", icon: "HomeIcon", color: "#FDCB6E" },
        { id: "c4", name: "Accessories", slug: "accessories", icon: "Briefcase", color: "#E84393" },
        { id: "c5", name: "Switches", slug: "switches", icon: "Cpu", color: "#ba0c2f" },
        { id: "c6", name: "Electronics", slug: "electronics", icon: "Cpu", color: "#00b894" }
      ];
    } catch {
      return [
        { id: "c1", name: "Tech", slug: "tech", icon: "Cpu", color: "#00CEC9" },
        { id: "c2", name: "Apparel", slug: "apparel", icon: "Shirt", color: "#6C5CE7" },
        { id: "c3", name: "Home", slug: "home", icon: "HomeIcon", color: "#FDCB6E" },
        { id: "c4", name: "Accessories", slug: "accessories", icon: "Briefcase", color: "#E84393" },
        { id: "c5", name: "Switches", slug: "switches", icon: "Cpu", color: "#ba0c2f" },
        { id: "c6", name: "Electronics", slug: "electronics", icon: "Cpu", color: "#00b894" }
      ];
    }
  });

  // Payments State
  const [payments, setPayments] = useState(() => {
    try {
      const saved = localStorage.getItem('switches_payments');
      return saved ? JSON.parse(saved) : [
        { id: "TXN-90182", orderId: "ORD-92810", customerName: "Alex Mercer", amount: 199.99, paymentMethod: "card", status: "Paid", date: "2026-07-20T14:30:00Z" },
        { id: "TXN-90183", orderId: "ORD-92811", customerName: "Sophia Chen", amount: 299.99, paymentMethod: "upi", status: "Paid", date: "2026-07-21T09:15:00Z" },
        { id: "TXN-90184", orderId: "ORD-92812", customerName: "Marcus Vance", amount: 89.99, paymentMethod: "cod", status: "Pending", date: "2026-07-22T11:00:00Z" }
      ];
    } catch {
      return [];
    }
  });

  // Marketing Banners State
  const [banners, setBanners] = useState(() => {
    try {
      const saved = localStorage.getItem('switches_banners');
      return saved ? JSON.parse(saved) : [
        {
          id: "b1",
          title: "Top-Rated Tech & Ergonomic Hardware Sale",
          subtitle: "Upgrade your daily workflow with studio audio headphones, titanium smartwatches, and hot-swappable keyboards.",
          ctaText: "Shop Best Sellers",
          imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
          tag: "🔥 LIMITED TIME OFFER — SAVE UP TO 30%",
          category: "Tech",
          isActive: true
        },
        {
          id: "b2",
          title: "Next-Generation Smart Lighting & Audio Gear",
          subtitle: "Be among the first to experience our latest sub-second ANC audio, titanium display watches, and ambient lightbars.",
          ctaText: "Discover New Drops",
          imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
          tag: "✨ NEW 2026 RELEASE DROPS",
          category: "Home",
          isActive: true
        }
      ];
    } catch {
      return [];
    }
  });

  // Storage persistence effects
  useEffect(() => {
    localStorage.setItem('switches_categories', JSON.stringify(categoriesList));
  }, [categoriesList]);

  useEffect(() => {
    localStorage.setItem('switches_payments', JSON.stringify(payments));
  }, [payments]);

  useEffect(() => {
    localStorage.setItem('switches_banners', JSON.stringify(banners));
  }, [banners]);

  // Sync with API backend
  useEffect(() => {
    api.getCategories().then(res => { 
      if (res && res.data && Array.isArray(res.data)) {
        setCategoriesList(prev => {
          const combined = [...res.data];
          prev.forEach(item => {
            if (!combined.some(c => c.id === item.id || c.name.toLowerCase() === item.name.toLowerCase())) {
              combined.push(item);
            }
          });
          return combined;
        });
      } 
    });
    api.getPayments().then(res => { if (res && res.data) setPayments(res.data); });
    api.getBanners().then(res => { if (res && res.data) setBanners(res.data); });
  }, []);

  // Category CRUD
  const addCategory = (catData) => {
    const created = {
      id: `c_${Date.now()}`,
      name: catData.name,
      slug: (catData.name || '').toLowerCase().replace(/\s+/g, '-'),
      icon: catData.icon || 'Cpu',
      color: catData.color || '#ba0c2f'
    };
    setCategoriesList(prev => {
      const next = [...prev, created];
      localStorage.setItem('switches_categories', JSON.stringify(next));
      return next;
    });
    api.createCategory(created);
    showToast(`Category "${created.name}" created!`);
    return created;
  };

  const updateCategory = (id, updatedData) => {
    const oldCategory = categoriesList.find(c => c.id === id);
    const oldName = oldCategory?.name;
    const newName = updatedData.name || oldName;

    setCategoriesList(prev => {
      const next = prev.map(c => c.id === id ? { ...c, ...updatedData, slug: (updatedData.name || c.name).toLowerCase().replace(/\s+/g, '-') } : c);
      localStorage.setItem('switches_categories', JSON.stringify(next));
      return next;
    });

    if (oldName && newName && oldName !== newName) {
      setProducts(prev => prev.map(p => p.category === oldName ? { ...p, category: newName } : p));
    }

    api.updateCategory(id, updatedData);
    showToast('Category specs updated!');
  };

  const deleteCategory = (id) => {
    setCategoriesList(prev => {
      const next = prev.filter(c => c.id !== id);
      localStorage.setItem('switches_categories', JSON.stringify(next));
      return next;
    });
    api.deleteCategory(id);
    showToast('Category removed');
  };

  // Stock / Inventory Management
  const updateStock = (productId, newStock) => {
    setProducts(prev => prev.map(p => p.id === productId ? { ...p, stock: Math.max(0, Number(newStock)) } : p));
    api.updateProduct(productId, { stock: Math.max(0, Number(newStock)) });
    showToast('Stock level updated!');
  };

  const adjustStock = (productId, delta) => {
    setProducts(prev => prev.map(p => {
      if (p.id === productId) {
        const updated = Math.max(0, (p.stock || 0) + delta);
        api.updateProduct(productId, { stock: updated });
        return { ...p, stock: updated };
      }
      return p;
    }));
  };

  // Payment Status CRUD
  const updatePaymentStatus = (id, status) => {
    setPayments(prev => prev.map(p => p.id === id ? { ...p, status } : p));
    api.updatePaymentStatus(id, status);
    showToast(`Payment ${id} marked as ${status}`);
  };

  // Customer Management CRUD
  const deleteUser = (userId) => {
    setUsersList(prev => prev.filter(u => u.id !== userId));
    api.deleteUser(userId);
    showToast('Customer account removed');
  };

  // Banners CRUD
  const addBanner = (bannerData) => {
    const created = {
      id: `b_${Date.now()}`,
      title: bannerData.title,
      subtitle: bannerData.subtitle || '',
      ctaText: bannerData.ctaText || 'Shop Now',
      imageUrl: bannerData.imageUrl || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
      tag: bannerData.tag || 'PROMOTION',
      category: bannerData.category || 'Tech',
      isActive: true
    };
    setBanners(prev => [created, ...prev]);
    api.createBanner(created);
    showToast(`Marketing banner "${created.title}" added!`);
    return created;
  };

  const updateBanner = (id, updatedData) => {
    setBanners(prev => prev.map(b => b.id === id ? { ...b, ...updatedData } : b));
    api.updateBanner(id, updatedData);
    showToast('Banner updated!');
  };

  const toggleBannerActive = (id) => {
    setBanners(prev => prev.map(b => {
      if (b.id === id) {
        const newState = !b.isActive;
        api.updateBanner(id, { isActive: newState });
        return { ...b, isActive: newState };
      }
      return b;
    }));
    showToast('Banner visibility toggled!');
  };

  const deleteBanner = (id) => {
    setBanners(prev => prev.filter(b => b.id !== id));
    api.deleteBanner(id);
    showToast('Banner deleted!');
  };

  return (
    <AppContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        selectedProductId,
        navigateToProduct,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        categoriesList,
        addCategory,
        updateCategory,
        deleteCategory,
        products,
        setProducts,
        addProduct,
        updateProduct,
        deleteProduct,
        updateStock,
        adjustStock,
        cart,
        addToCart,
        updateCartQty,
        removeFromCart,
        appliedCoupon,
        applyCouponCode,
        wishlist,
        toggleWishlist,
        user,
        setUser,
        loginWithCredentials,
        orders,
        setOrders,
        updateOrderStatus,
        deleteOrder,
        placeOrder,
        payments,
        updatePaymentStatus,
        vendors,
        addVendor,
        disbursePayout,
        deleteVendor,
        usersList,
        updateUserRole,
        deleteUser,
        banners,
        addBanner,
        updateBanner,
        toggleBannerActive,
        deleteBanner,
        toast,
        showToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
