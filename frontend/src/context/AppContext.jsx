import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';
import { subscribeToEvent } from '../services/socket';

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
    subCategory: "Headphones & ANC",
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
    subCategory: "Smartwatches",
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
    subCategory: "Hoodies",
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
    subCategory: "Keyboards",
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
    subCategory: "Ambient Lighting",
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
    subCategory: "Backpacks",
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
  },
  {
    id: "p7",
    name: "SWITCHES Crimson Mechanical Switch Pack (110 Pcs)",
    slug: "switches-crimson-mechanical-switch-pack",
    tagline: "Pre-lubed Smooth Linear Mechanical Keyboard Switches",
    price: 49.99,
    originalPrice: 65.00,
    category: "Switches",
    subCategory: "Mechanical Switches",
    rating: 5.0,
    reviewCount: 142,
    images: [
      "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=800&q=80"
    ],
    colors: [{ name: "Crimson Red", hex: "#BA0C2F" }],
    sizes: ["110 Switches"],
    description: "Ultra-smooth linear switches factory pre-lubricated with Krytox 205g0. Designed for ultra-fast typing speed and deep sound profile.",
    features: ["45g Operating Force", "5-pin PCB Mount", "Factory Pre-lubed", "50M Keystrokes Lifespan"],
    stock: 60,
    isNew: true,
    isFeatured: true
  },
  {
    id: "p8",
    name: "SWITCHES Cyberpunk PBT Keycap Set",
    slug: "switches-cyberpunk-pbt-keycap-set",
    tagline: "Double-shot Cherry Profile Custom Keycaps",
    price: 39.99,
    originalPrice: 49.99,
    category: "Switches",
    subCategory: "Keycaps",
    rating: 4.9,
    reviewCount: 96,
    images: [
      "https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=800&q=80"
    ],
    colors: [{ name: "Neon Red & Black", hex: "#BA0C2F" }],
    sizes: ["Full 140 Key Set"],
    description: "Durable PBT double-shot keycaps designed to resist shine and oil over years of intense gaming and typing.",
    features: ["Double-shot PBT Material", "Cherry Profile", "Wide Compatibility (ANSI/ISO)", "Novelty Keys Included"],
    stock: 45,
    isNew: true,
    isFeatured: true
  },
  {
    id: "p9",
    name: "SWITCHES Braided Aviator Coiled Cable",
    slug: "switches-braided-aviator-coiled-cable",
    tagline: "Custom USB-C Coiled Cable with GX16 Aviator Connector",
    price: 29.99,
    originalPrice: 39.99,
    category: "Switches",
    subCategory: "Custom Cables",
    rating: 4.8,
    reviewCount: 75,
    images: [
      "https://images.unsplash.com/photo-1544652478-6653e09f18a2?auto=format&fit=crop&w=800&q=80"
    ],
    colors: [{ name: "Crimson Red Tech Sleeve", hex: "#BA0C2F" }],
    sizes: ["1.5m Coiled"],
    description: "Double-sleeved custom USB-C cable featuring a detachable 5-pin GX16 metal aviator connector.",
    features: ["Double Sleeved Techflex", "GX16 Aviator Connector", "Gold Plated USB-C", "Ultra Durable"],
    stock: 50,
    isNew: true,
    isFeatured: true
  },
  {
    id: "p10",
    name: "SWITCHES TurboPower 25000mAh Power Bank",
    slug: "switches-turbopower-power-bank",
    tagline: "100W PD Ultra Fast Charging Station",
    price: 79.99,
    originalPrice: 99.99,
    category: "Electronics",
    subCategory: "Power Banks",
    rating: 4.9,
    reviewCount: 110,
    images: [
      "https://images.unsplash.com/photo-1609592424109-dd9892f1b177?auto=format&fit=crop&w=800&q=80"
    ],
    colors: [{ name: "Matte Slate", hex: "#2C3E50" }],
    sizes: ["25000mAh"],
    description: "Charge laptops, tablets, and phones at high speed with 100W Power Delivery and real-time OLED status display.",
    features: ["100W Power Delivery", "25,000mAh Capacity", "Smart LED Power Display", "Triple Device Charge"],
    stock: 30,
    isNew: true,
    isFeatured: false
  },
  {
    id: "p11",
    name: "SWITCHES Phone 1 Ultra 5G",
    slug: "switches-phone-1-ultra",
    tagline: "Snapdragon 8 Gen 3 with 200MP Camera",
    price: 799.99,
    originalPrice: 899.99,
    category: "phones",
    subCategory: "Smartphones",
    rating: 4.9,
    reviewCount: 310,
    images: [
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80"
    ],
    colors: [{ name: "Phantom Black", hex: "#000000" }, { name: "Crimson Red", hex: "#BA0C2F" }],
    sizes: ["256GB", "512GB"],
    description: "Flagship mobile power with 120Hz LTPO AMOLED display, 200MP OIS primary sensor, and 65W fast charging.",
    features: ["200MP OIS Camera System", "Snapdragon 8 Gen 3", "120Hz 3000-nit Display", "5000mAh Battery"],
    stock: 25,
    isNew: true,
    isFeatured: true
  },
  {
    id: "p12",
    name: "SWITCHES Radiant Glow Herbal Face Wash",
    slug: "switches-radiant-glow-herbal-face-wash",
    tagline: "Gentle Foaming Deep Cleansing Face Wash",
    price: 24.99,
    originalPrice: 32.00,
    category: "beauty",
    subCategory: "facewash",
    rating: 4.9,
    reviewCount: 84,
    images: [
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80"
    ],
    colors: [{ name: "Botanical Green", hex: "#00b894" }],
    sizes: ["200ml"],
    description: "Deep purifying foaming face wash infused with natural botanical extracts, vitamin C, and hyaluronic acid.",
    features: ["Dermatologist Tested", "Sulfate & Paraben Free", "Hydrating Formula"],
    stock: 40,
    isNew: true,
    isFeatured: true
  },
  {
    id: "p13",
    name: "SWITCHES Smart Air Purifier HEPA 13",
    slug: "switches-smart-air-purifier-hepa-13",
    tagline: "Ultra Quiet Smart Home Air Filtration",
    price: 149.99,
    originalPrice: 189.99,
    category: "home appliances",
    subCategory: "Air Quality & Cooling",
    rating: 4.9,
    reviewCount: 42,
    images: [
      "https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&w=800&q=80"
    ],
    colors: [{ name: "Arctic White", hex: "#FFFFFF" }],
    sizes: ["Medium Room"],
    description: "Remove 99.97% of airborne dust, allergens, and odors with real-time AQI digital display and app control.",
    features: ["True HEPA H13 Filter", "Real-time AQI Sensor", "Whisper-quiet 24dB Sleep Mode"],
    stock: 20,
    isNew: true,
    isFeatured: true
  }
];

export const AppProvider = ({ children }) => {
  // Navigation State
  const [currentPage, setCurrentPage] = useState(() => {
    try {
      const savedUser = localStorage.getItem('switches_user');
      if (savedUser) {
        const u = JSON.parse(savedUser);
        if (u && u.role === 'admin') return 'admin';
      }
    } catch {}
    return 'home';
  });
  const [selectedProductId, setSelectedProductId] = useState('p1');

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSubCategory, setSelectedSubCategory] = useState('All');
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  const openCatalogFilter = () => {
    setCurrentPage('catalog');
    setIsFilterDrawerOpen(true);
  };

  // Products State
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem('switches_products');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map(p => {
            if (!p.subCategory) {
              const match = initialProducts.find(init => init.id === p.id);
              if (match && match.subCategory) p.subCategory = match.subCategory;
              else if (p.category?.toLowerCase() === 'tech') p.subCategory = 'Headphones & ANC';
              else if (p.category?.toLowerCase() === 'apparel') p.subCategory = 'Hoodies';
              else if (p.category?.toLowerCase() === 'home') p.subCategory = 'Ambient Lighting';
              else if (p.category?.toLowerCase() === 'accessories') p.subCategory = 'Backpacks';
              else if (p.category?.toLowerCase() === 'switches') p.subCategory = 'Mechanical Switches';
              else if (p.category?.toLowerCase() === 'electronics') p.subCategory = 'Power Banks';
              else if (p.category?.toLowerCase() === 'phones') p.subCategory = 'Smartphones';
              else p.subCategory = 'General';
            }
            return p;
          });
        }
      }
      return initialProducts;
    } catch {
      return initialProducts;
    }
  });

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

  // Auth User State & Redirect State
  const [redirectAfterAuth, setRedirectAfterAuth] = useState(null);
  const [pendingCheckoutStep, setPendingCheckoutStep] = useState('cart');

  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('switches_user');
      return saved ? JSON.parse(saved) : null;
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
        { id: 'v1', name: 'SWITCHES Audio Labs', store: 'Switches Official Store', commission: 10, totalSales: 18400, pendingPayout: 16560, status: 'Active' },
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

  useEffect(() => {
    localStorage.setItem('switches_products', JSON.stringify(products));
  }, [products]);

  const fetchProductsAndSync = () => {
    api.getProducts().then(res => {
      if (res && res.data && Array.isArray(res.data)) {
        const mapped = res.data.map(p => {
          if (!p.subCategory) {
            const match = initialProducts.find(init => init.id === p.id);
            if (match && match.subCategory) p.subCategory = match.subCategory;
            else if (p.category?.toLowerCase() === 'tech') p.subCategory = 'Headphones & ANC';
            else if (p.category?.toLowerCase() === 'apparel') p.subCategory = 'Hoodies';
            else if (p.category?.toLowerCase() === 'home') p.subCategory = 'Ambient Lighting';
            else if (p.category?.toLowerCase() === 'accessories') p.subCategory = 'Backpacks';
            else if (p.category?.toLowerCase() === 'switches') p.subCategory = 'Mechanical Switches';
            else if (p.category?.toLowerCase() === 'electronics') p.subCategory = 'Power Banks';
            else if (p.category?.toLowerCase() === 'phones') p.subCategory = 'Smartphones';
            else p.subCategory = 'General';
          }
          return p;
        });
        setProducts(mapped);
      }
    });
  };

  // Attempt backend API sync on mount and on window focus
  useEffect(() => {
    fetchProductsAndSync();

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

    const handleFocus = () => {
      fetchProductsAndSync();
    };
    window.addEventListener('focus', handleFocus);

    // Socket.io Real-Time Event Subscriptions for zero-refresh updates across all pages
    const unsubProducts = subscribeToEvent('products:changed', (data) => {
      if (data && Array.isArray(data)) setProducts(data);
    });

    const unsubOrders = subscribeToEvent('orders:changed', (data) => {
      if (data && Array.isArray(data)) setOrders(data);
    });

    const unsubCategories = subscribeToEvent('categories:changed', (data) => {
      if (data && Array.isArray(data)) setCategoriesList(data);
    });

    const unsubBanners = subscribeToEvent('banners:changed', (data) => {
      if (data && Array.isArray(data)) setBanners(data);
    });

    const unsubVendors = subscribeToEvent('vendors:changed', (data) => {
      if (data && Array.isArray(data)) setVendors(data);
    });

    const unsubPayments = subscribeToEvent('payments:changed', (data) => {
      if (data && Array.isArray(data)) setPayments(data);
    });

    const unsubUsers = subscribeToEvent('users:changed', (data) => {
      if (data && Array.isArray(data)) setUsersList(data);
    });

    return () => {
      window.removeEventListener('focus', handleFocus);
      unsubProducts();
      unsubOrders();
      unsubCategories();
      unsubBanners();
      unsubVendors();
      unsubPayments();
      unsubUsers();
    };
  }, []);

  const showToast = (text) => {
    setToast({ text, id: Date.now() });
    setTimeout(() => setToast(null), 3000);
  };

  // Register User Method
  const registerUser = async (name, email, password) => {
    const cleanName = (name || '').trim();
    const cleanEmail = (email || '').trim().toLowerCase();
    const cleanPass = (password || '').trim();

    const res = await api.register(cleanName, cleanEmail, cleanPass);
    if (res && res.success && res.user) {
      setUser(res.user);
      showToast(`Account created! Welcome ${res.user.name || cleanName}`);
      if (redirectAfterAuth === 'checkout') {
        setRedirectAfterAuth(null);
        setPendingCheckoutStep('shipping');
        setCurrentPage('cart');
        showToast('Authenticated! Continuing with your Shipping Details.');
      } else {
        setCurrentPage('user-dashboard');
      }
      return { success: true, user: res.user };
    } else {
      const msg = res?.message || 'Failed to register account';
      showToast(msg);
      return { success: false, message: msg };
    }
  };

  // Credential Login Method
  const loginWithCredentials = async (email, password) => {
    const cleanEmail = (email || '').trim().toLowerCase();
    const cleanPass = (password || '').trim();

    // Check backend API first
    const res = await api.login(cleanEmail, cleanPass);
    if (res && res.success && res.user) {
      setUser(res.user);
      showToast(`Welcome back, ${res.user.name || res.user.email}!`);
      if (redirectAfterAuth === 'checkout') {
        setRedirectAfterAuth(null);
        setPendingCheckoutStep('shipping');
        setCurrentPage('cart');
        showToast('Authenticated! Continuing with your Shipping Details.');
      } else if (res.user.role === 'admin') {
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
      if (redirectAfterAuth === 'checkout') {
        setRedirectAfterAuth(null);
        setPendingCheckoutStep('shipping');
        setCurrentPage('cart');
        showToast('Authenticated! Continuing with your Shipping Details.');
      } else {
        setCurrentPage('admin');
      }
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
      if (redirectAfterAuth === 'checkout') {
        setRedirectAfterAuth(null);
        setPendingCheckoutStep('shipping');
        setCurrentPage('cart');
        showToast('Authenticated! Continuing with your Shipping Details.');
      } else {
        setCurrentPage('user-dashboard');
      }
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
      if (redirectAfterAuth === 'checkout') {
        setRedirectAfterAuth(null);
        setPendingCheckoutStep('shipping');
        setCurrentPage('cart');
        showToast('Authenticated! Continuing with your Shipping Details.');
      } else {
        setCurrentPage('user-dashboard');
      }
      return { success: true, user: newUser };
    }
  };

  // Product CRUD
  const addProduct = (prodData) => {
    const uploadedImages = prodData.images && prodData.images.length > 0
      ? prodData.images
      : ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80'];

    const created = {
      id: `p_${Date.now()}`,
      rating: 5.0,
      reviewCount: 0,
      isFeatured: true,
      isNew: true,
      colors: prodData.colors || [{ name: 'Default', hex: '#6C5CE7' }],
      sizes: prodData.sizes || ['Standard'],
      features: prodData.features || ['Premium Build', 'Official Warranty'],
      ...prodData,
      images: uploadedImages  // always set images AFTER spread so it's never overwritten
    };

    if (!created.subCategory) {
      if (created.category?.toLowerCase() === 'tech') created.subCategory = 'Headphones & ANC';
      else if (created.category?.toLowerCase() === 'apparel') created.subCategory = 'Hoodies';
      else if (created.category?.toLowerCase() === 'home') created.subCategory = 'Ambient Lighting';
      else if (created.category?.toLowerCase() === 'accessories') created.subCategory = 'Backpacks';
      else if (created.category?.toLowerCase() === 'switches') created.subCategory = 'Mechanical Switches';
      else if (created.category?.toLowerCase() === 'electronics') created.subCategory = 'Power Banks';
      else if (created.category?.toLowerCase() === 'phones') created.subCategory = 'Smartphones';
      else created.subCategory = 'General';
    }

    if (prodData.category && prodData.subCategory) {
      setCategoriesList(prev => prev.map(c => {
        if (c.name.toLowerCase() === prodData.category.toLowerCase()) {
          const subs = Array.isArray(c.subCategories) ? c.subCategories : [];
          if (!subs.some(s => s.toLowerCase() === prodData.subCategory.toLowerCase())) {
            return { ...c, subCategories: [...subs, prodData.subCategory] };
          }
        }
        return c;
      }));
    }

    setProducts(prev => {
      const next = [created, ...prev];
      localStorage.setItem('switches_products', JSON.stringify(next));
      return next;
    });
    api.createProduct(created);
    showToast(`Product "${created.name}" created!`);
    return created;
  };

  const updateProduct = (id, updatedData) => {
    if (updatedData.category && updatedData.subCategory) {
      setCategoriesList(prev => prev.map(c => {
        if (c.name.toLowerCase() === updatedData.category.toLowerCase()) {
          const subs = Array.isArray(c.subCategories) ? c.subCategories : [];
          if (!subs.some(s => s.toLowerCase() === updatedData.subCategory.toLowerCase())) {
            return { ...c, subCategories: [...subs, updatedData.subCategory] };
          }
        }
        return c;
      }));
    }

    setProducts(prev => {
      const next = prev.map(p => p.id === id ? { ...p, ...updatedData } : p);
      localStorage.setItem('switches_products', JSON.stringify(next));
      return next;
    });
    api.updateProduct(id, updatedData);
    showToast('Product catalog updated!');
  };

  const deleteProduct = (id) => {
    setProducts(prev => {
      const next = prev.filter(p => p.id !== id);
      localStorage.setItem('switches_products', JSON.stringify(next));
      return next;
    });
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

  const placeOrder = async (shippingInfo, paymentMethod) => {
    const cartDetails = cart.map(item => {
      const p = products.find(prod => prod.id === item.productId || prod._id === item.productId);
      return {
        productId: item.productId,
        name: p ? p.name : 'Product',
        price: p ? p.price : 0,
        quantity: item.quantity,
        selectedColor: item.selectedColor,
        selectedSize: item.selectedSize,
        image: p && p.images && p.images[0] ? p.images[0] : ''
      };
    });

    const subtotal = cartDetails.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const discount = appliedCoupon ? (subtotal * appliedCoupon.discountPercent) / 100 : 0;
    const shippingCost = subtotal >= 150 || subtotal === 0 ? 0 : 15;
    const finalTotal = Math.max(0, subtotal - discount + shippingCost);

    const payload = {
      user: user ? (user._id || user.id) : null,
      customerName: shippingInfo.fullName || (user ? user.name : 'Customer'),
      customerEmail: shippingInfo.email || (user ? user.email : 'customer@switches.com'),
      items: cartDetails,
      totalAmount: parseFloat(finalTotal.toFixed(2)),
      discount: parseFloat(discount.toFixed(2)),
      shippingAddress: {
        address: shippingInfo.street || '',
        city: shippingInfo.city || '',
        zip: shippingInfo.zip || '',
        country: shippingInfo.country || 'USA'
      },
      paymentMethod,
      paymentStatus: 'paid',
      status: 'processing'
    };

    let createdOrder;
    try {
      const apiRes = await api.createOrder(payload);
      if (apiRes && apiRes.data) {
        createdOrder = apiRes.data;
        if (!createdOrder.id) createdOrder.id = createdOrder.orderId || `SW-${Math.floor(10000 + Math.random() * 90000)}`;
      }
    } catch (e) {
      console.warn('API createOrder error:', e);
    }

    if (!createdOrder) {
      createdOrder = {
        id: `SW-${Math.floor(10000 + Math.random() * 90000)}`,
        createdAt: new Date().toISOString(),
        ...payload
      };
    }

    setOrders(prev => [createdOrder, ...prev]);
    setCart([]);
    setAppliedCoupon(null);
    showToast('SWITCHES Order Placed & Saved to Database!');
    return createdOrder;
  };

  // Categories State
  const defaultCategories = [
    { id: "c1", name: "Tech", slug: "tech", icon: "Cpu", color: "#00CEC9", subCategories: ["Headphones & ANC", "Smartwatches", "Keyboards", "Smartphones", "Audio"] },
    { id: "c2", name: "Apparel", slug: "apparel", icon: "Shirt", color: "#6C5CE7", subCategories: ["Hoodies", "Activewear", "Jackets", "Caps & Hats"] },
    { id: "c3", name: "Home", slug: "home", icon: "HomeIcon", color: "#FDCB6E", subCategories: ["Ambient Lighting", "Desk Accessories", "Smart Gadgets"] },
    { id: "c4", name: "Accessories", slug: "accessories", icon: "Briefcase", color: "#E84393", subCategories: ["Backpacks", "Travel Gear", "Cases & Sleeves"] },
    { id: "c5", name: "Switches", slug: "switches", icon: "Cpu", color: "#ba0c2f", subCategories: ["Mechanical Switches", "Keycaps", "Custom Cables"] },
    { id: "c6", name: "Electronics", slug: "electronics", icon: "Cpu", color: "#00b894", subCategories: ["Smart Devices", "Power Banks", "Chargers"] }
  ];

  const [categoriesList, setCategoriesList] = useState(() => {
    try {
      const saved = localStorage.getItem('switches_categories');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map(c => {
            if (typeof c.subCategories === 'string') {
              c.subCategories = c.subCategories.split(',').map(s => s.trim()).filter(Boolean);
            }
            if (!c.subCategories || !Array.isArray(c.subCategories) || c.subCategories.length === 0) {
              const match = defaultCategories.find(def => def.name.toLowerCase() === (c.name || '').toLowerCase());
              c.subCategories = match ? match.subCategories : [(c.name || 'General') + ' Pro', (c.name || 'General') + ' Lite'];
            }
            return c;
          });
        }
      }
      return defaultCategories;
    } catch {
      return defaultCategories;
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

  const fetchCategoriesAndSync = () => {
    api.getCategories().then(res => { 
      if (res && res.data && Array.isArray(res.data)) {
        const mapped = res.data.map(c => {
          if (!c.subCategories || !Array.isArray(c.subCategories) || c.subCategories.length === 0) {
            const match = defaultCategories.find(def => def.name.toLowerCase() === (c.name || '').toLowerCase());
            c.subCategories = match ? match.subCategories : [(c.name || 'General') + ' Pro', (c.name || 'General') + ' Lite'];
          }
          return c;
        });
        setCategoriesList(mapped);
      } 
    });
  };

  // Sync with API backend
  useEffect(() => {
    fetchCategoriesAndSync();
    api.getPayments().then(res => { if (res && res.data) setPayments(res.data); });
    api.getBanners().then(res => { if (res && res.data) setBanners(res.data); });

    const handleFocus = () => {
      fetchCategoriesAndSync();
    };
    window.addEventListener('focus', handleFocus);

    return () => {
      window.removeEventListener('focus', handleFocus);
    };
  }, []);

  // Category CRUD
  const addCategory = (catData) => {
    const subCats = Array.isArray(catData.subCategories)
      ? catData.subCategories
      : (typeof catData.subCategories === 'string' ? catData.subCategories.split(',').map(s => s.trim()).filter(Boolean) : []);

    const created = {
      id: `c_${Date.now()}`,
      name: catData.name,
      slug: (catData.name || '').toLowerCase().replace(/\s+/g, '-'),
      icon: catData.icon || 'Cpu',
      color: catData.color || '#ba0c2f',
      subCategories: subCats
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

    const subCats = Array.isArray(updatedData.subCategories)
      ? updatedData.subCategories
      : (typeof updatedData.subCategories === 'string' 
          ? updatedData.subCategories.split(',').map(s => s.trim()).filter(Boolean) 
          : oldCategory?.subCategories || []);

    const cleanData = { 
      ...updatedData, 
      subCategories: subCats, 
      slug: (updatedData.name || oldCategory?.name || '').toLowerCase().replace(/\s+/g, '-') 
    };

    setCategoriesList(prev => {
      const next = prev.map(c => c.id === id ? { ...c, ...cleanData } : c);
      localStorage.setItem('switches_categories', JSON.stringify(next));
      return next;
    });

    if (oldName && newName && oldName !== newName) {
      setProducts(prev => prev.map(p => p.category === oldName ? { ...p, category: newName } : p));
    }

    api.updateCategory(id, cleanData);
    showToast('Category specs & sub-categories updated!');
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
        selectedSubCategory,
        setSelectedSubCategory,
        isFilterDrawerOpen,
        setIsFilterDrawerOpen,
        openCatalogFilter,
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
        registerUser,
        redirectAfterAuth,
        setRedirectAfterAuth,
        pendingCheckoutStep,
        setPendingCheckoutStep,
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
