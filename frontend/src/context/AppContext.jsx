import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

const AppContext = createContext();

export const initialProducts = [
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
  // Theme State
  const [theme, setTheme] = useState(() => localStorage.getItem('switches_theme') || 'dark');
  
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

  // Toast State
  const [toast, setToast] = useState(null);

  // Theme effect
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('switches_theme', theme);
  }, [theme]);

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

  // Attempt backend API sync on mount
  useEffect(() => {
    api.getProducts().then(res => {
      if (res && res.data) {
        setProducts(res.data);
      }
    });
  }, []);

  const showToast = (text) => {
    setToast({ text, id: Date.now() });
    setTimeout(() => setToast(null), 3000);
  };

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
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

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        currentPage,
        setCurrentPage,
        selectedProductId,
        navigateToProduct,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        products,
        setProducts,
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
        orders,
        setOrders,
        placeOrder,
        toast,
        showToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
