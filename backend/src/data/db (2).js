// Database mock store for NEXORA E-Commerce REST API
export const db = {
  products: [
    {
      id: "p1",
      name: "SoundPulse Wireless Pro",
      slug: "nexora-soundpulse-wireless-pro",
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
        { name: "Obsidian Black", hex: "#121212" },
        { name: "Cyber Silver", hex: "#E0E0E0" },
        { name: "Electric Indigo", hex: "#6C5CE7" }
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
      name: "Horizon Smartwatch Ultra",
      slug: "nexora-horizon-smartwatch-ultra",
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
        { name: "Ocean Teal", hex: "#008080" }
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
      name: "NeoMatte Seamless Tech Hoodie",
      slug: "neomatte-seamless-tech-hoodie",
      tagline: "Water-repellent 4-way stretch activewear",
      price: 89.99,
      originalPrice: 110.00,
      category: "Apparel",
      rating: 4.7,
      reviewCount: 64,
      images: [
        "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=800&q=80"
      ],
      colors: [
        { name: "Charcoal Dark", hex: "#222222" },
        { name: "Alpine Olive", hex: "#3B4D3C" }
      ],
      sizes: ["S", "M", "L", "XL"],
      description: "Engineered for urban commuters and athletes, featuring thermoregulating fabric, hidden zip pockets, and ergonomic articulation.",
      features: [
        "DWR water-resistant finish",
        "Bonded seamless construction",
        "Concealed media pocket with headphone port",
        "Anti-microbial odor resistant fabric"
      ],
      stock: 50,
      isNew: false,
      isFeatured: true
    },
    {
      id: "p4",
      name: "CyberGlow Ergonomic Mechanical Keyboard",
      slug: "cyberglow-mechanical-keyboard",
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
        { name: "Midnight Cyan", hex: "#00A8FF" }
      ],
      sizes: ["75% Compact"],
      description: "Silky tactile typing experience with sound-dampening gasket mounts, customizable RGB key lighting, and Tri-mode wireless connectivity.",
      features: [
        "Hot-swappable mechanical switches",
        "Tri-mode: 2.4G Wireless, Bluetooth 5.0, USB-C",
        "PBT double-shot keycaps",
        "Per-key RGB lighting with software macros"
      ],
      stock: 12,
      isNew: false,
      isFeatured: true
    },
    {
      id: "p5",
      name: "Lumina Smart Ambient Light",
      slug: "nexora-lumina-ambient-light",
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
      description: "Transform your desk setup or living room with 16 million colors, reactive sound sync, and voice app control.",
      features: [
        "16 Million RGBIC gradients",
        "Built-in mic music synchronization",
        "Alexa & Google Assistant compatibility",
        "Zero-flicker eye protection LED"
      ],
      stock: 40,
      isNew: true,
      isFeatured: false
    },
    {
      id: "p6",
      name: "Vanguard Commuter Modular Backpack",
      slug: "vanguard-commuter-backpack",
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
        { name: "Navy Blue", hex: "#1B2A4A" }
      ],
      sizes: ["25 Liters"],
      description: "Crafted with Cordura 1000D waterproof nylon, a dedicated 16-inch TSA laptop sleeve, and integrated USB charging port.",
      features: [
        "TSA-friendly 180° flat opening",
        "Waterproof YKK weather-sealed zippers",
        "RFID blocking security pocket",
        "Ergonomic airflow back padding"
      ],
      stock: 22,
      isNew: false,
      isFeatured: false
    },
    {
      id: "p7",
      name: "Crimson Mechanical Switch Pack (110 Pcs)",
      slug: "nexora-crimson-mechanical-switch-pack",
      tagline: "Pre-lubed Smooth Linear Mechanical Keyboard Switches",
      price: 49.99,
      originalPrice: 65.00,
      category: "Keyboards & Gear",
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
      name: "Cyberpunk PBT Keycap Set",
      slug: "nexora-cyberpunk-pbt-keycap-set",
      tagline: "Double-shot Cherry Profile Custom Keycaps",
      price: 39.99,
      originalPrice: 49.99,
      category: "Keyboards & Gear",
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
      name: "Braided Aviator Coiled Cable",
      slug: "nexora-braided-aviator-coiled-cable",
      tagline: "Custom USB-C Coiled Cable with GX16 Aviator Connector",
      price: 29.99,
      originalPrice: 39.99,
      category: "Keyboards & Gear",
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
      name: "TurboPower 25000mAh Power Bank",
      slug: "nexora-turbopower-power-bank",
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
      name: "Phone 1 Ultra 5G",
      slug: "nexora-phone-1-ultra",
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
      name: "Radiant Glow Herbal Face Wash",
      slug: "nexora-radiant-glow-herbal-face-wash",
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
      name: "Smart Air Purifier HEPA 13",
      slug: "nexora-smart-air-purifier-hepa-13",
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
    },
    {
      id: "p14",
      name: "Crimson V2 Linear Switch Pack (110 Pcs)",
      slug: "nexora-crimson-v2-linear-switch-pack",
      tagline: "Pre-lubed Ultra-smooth Linear Mechanical Keyboard Switches",
      price: 49.99,
      originalPrice: 64.99,
      category: "Keyboards & Gear",
      subCategory: "Mechanical Switches",
      rating: 5.0,
      reviewCount: 174,
      images: [
        "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=800&q=80"
      ],
      colors: [{ name: "Crimson Red", hex: "#BA0C2F" }],
      sizes: ["110 Switches"],
      description: "Factory pre-lubricated Krytox 205g0 linear switches with polycarbonate top housing and POM stem for deep thock acoustic profile.",
      features: ["45g Operating Force", "5-pin PCB Mount", "Factory Pre-lubed", "50M Keystrokes Lifespan"],
      stock: 55,
      isNew: true,
      isFeatured: true
    },
    {
      id: "p15",
      name: "Sapphire Tactile Switch Pack (110 Pcs)",
      slug: "nexora-sapphire-tactile-switch-pack",
      tagline: "Crisp Tactile Bump with PC Housing & POM Stem",
      price: 54.99,
      originalPrice: 69.99,
      category: "Keyboards & Gear",
      subCategory: "Mechanical Switches",
      rating: 4.9,
      reviewCount: 148,
      images: [
        "https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=800&q=80"
      ],
      colors: [{ name: "Sapphire Blue", hex: "#0984e3" }],
      sizes: ["110 Switches"],
      description: "Satisfying tactile bump at top of keystroke with zero wobble, high precision leaf, and factory lubed gold-plated dual-stage springs.",
      features: ["67g Bottom-out Force", "Crisp Tactile Feedback", "Dual-stage Long Spring", "Gold Plated Contacts"],
      stock: 40,
      isNew: true,
      isFeatured: true
    },
    {
      id: "p16",
      name: "Phantom Silent Linear Switch Pack (110 Pcs)",
      slug: "nexora-phantom-silent-linear-switch-pack",
      tagline: "Whisper-Quiet Mechanical Switches for Office & Night Gaming",
      price: 52.99,
      originalPrice: 64.99,
      category: "Keyboards & Gear",
      subCategory: "Mechanical Switches",
      rating: 4.9,
      reviewCount: 112,
      images: [
        "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80"
      ],
      colors: [{ name: "Stealth Gray", hex: "#636e72" }],
      sizes: ["110 Switches"],
      description: "Silicone dampener inserts provide whisper-quiet keystrokes without mushy actuation, ideal for office work and midnight gaming sessions.",
      features: ["42g Actuation Force", "Built-in Silent Dampeners", "Dustproof Box Stem", "Krytox Pre-lubed"],
      stock: 30,
      isNew: true,
      isFeatured: true
    },
    {
      id: "p17",
      name: "Apex Magnetic Hall Effect Switches (110 Pcs)",
      slug: "switches-apex-magnetic-hall-effect-switches",
      tagline: "Rapid Trigger & Dynamic Actuation 0.1mm - 4.0mm",
      price: 69.99,
      originalPrice: 84.99,
      category: "Keyboards & Gear",
      subCategory: "Magnetic Switches",
      rating: 5.0,
      reviewCount: 215,
      images: [
        "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&w=800&q=80"
      ],
      colors: [{ name: "Crystal Amber", hex: "#e17055" }],
      sizes: ["110 Switches"],
      description: "Next-gen Hall Effect magnetic switches enabling instantaneous rapid trigger reset and custom actuation points down to 0.1mm.",
      features: ["Hall Effect Magnetic Sensor", "0.1mm Rapid Trigger", "Custom Actuation Point", "100 Million Keystroke Lifespan"],
      stock: 45,
      isNew: true,
      isFeatured: true
    },
    {
      id: "p18",
      name: "Pro Lube Station & Switch Opener Kit",
      slug: "switches-pro-lube-station-kit",
      tagline: "CNC Aluminum Opener, Krytox 205g0 Lube & Acrylic Deck",
      price: 34.99,
      originalPrice: 44.99,
      category: "Keyboards & Gear",
      subCategory: "Switch Accessories",
      rating: 4.8,
      reviewCount: 96,
      images: [
        "https://images.unsplash.com/photo-1544652478-6653e09f18a2?auto=format&fit=crop&w=800&q=80"
      ],
      colors: [{ name: "Anodized Red", hex: "#BA0C2F" }],
      sizes: ["Full Kit"],
      description: "Complete modding station for custom keyboard enthusiasts. Includes CNC 2-in-1 switch opener, Krytox 205g0 lube, stem holder, and brushes.",
      features: ["CNC Anodized 2-in-1 Opener", "Krytox 205g0 Lube (5g)", "36-Switch Acrylic Lube Deck", "Precision Stem Holder & Brushes"],
      stock: 60,
      isNew: true,
      isFeatured: true
    },
    {
      id: "p19",
      name: "CyberDeck Pro Split Hot-Swap Keyboard",
      slug: "nexora-cyberdeck-pro-split-keyboard",
      tagline: "Split Ergonomic Keyboard with Dual OLED Screens & Gasket Mount",
      price: 219.99,
      originalPrice: 259.99,
      category: "Keyboards & Gear",
      subCategory: "Keyboards",
      rating: 5.0,
      reviewCount: 88,
      images: [
        "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80"
      ],
      colors: [{ name: "Obsidian Black", hex: "#121212" }],
      sizes: ["Split Ergonomic"],
      description: "Ergonomic split design with hot-swappable socket support, dual high-contrast OLED status displays, per-key RGB, and aluminum body.",
      features: ["Split Ergonomic Layout", "Dual OLED Displays", "Hot-swappable 5-Pin Sockets", "QMK/VIA Programmable"],
      stock: 15,
      isNew: true,
      isFeatured: true
    }
  ],

  users: [
    {
      id: "u1",
      email: "alex@nexora.io",
      password: "user123",
      name: "Alex Mercer",
      role: "customer",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80"
    },
    {
      id: "u2",
      email: "admin@nexora.io",
      password: "admin123",
      name: "Elena Rostova (Admin)",
      role: "admin",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80"
    }
  ],

  vendors: [
    { id: 'v1', name: "Audio Labs", store: 'Switches Official Store', commission: 10, totalSales: 18400, pendingPayout: 16560, status: 'Active' },
    { id: 'v2', name: "Apparel Ltd", store: 'Switches Wearables', commission: 12, totalSales: 9200, pendingPayout: 8096, status: 'Active' },
    { id: 'v3', name: 'SmartHome Ambient', store: 'Ambient Tech Store', commission: 8, totalSales: 7100, pendingPayout: 6532, status: 'Active' }
  ],

  cart: [
    {
      productId: "p1",
      selectedColor: "Electric Indigo",
      selectedSize: "Standard",
      quantity: 1
    }
  ],

  categories: [
    { id: "c1", name: "Tech", slug: "tech", icon: "Cpu", color: "#00CEC9", subCategories: ["Headphones & ANC", "Smartwatches", "Keyboards", "Smartphones", "Audio"] },
    { id: "c2", name: "Apparel", slug: "apparel", icon: "Shirt", color: "#6C5CE7", subCategories: ["Hoodies", "Activewear", "Jackets", "Caps & Hats"] },
    { id: "c3", name: "Home", slug: "home", icon: "HomeIcon", color: "#FDCB6E", subCategories: ["Ambient Lighting", "Desk Accessories", "Smart Gadgets"] },
    { id: "c4", name: "Accessories", slug: "accessories", icon: "Briefcase", color: "#E84393", subCategories: ["Backpacks", "Travel Gear", "Cases & Sleeves"] },
    { id: "c5", name: "Keyboards & Gear", slug: "keyboards-gear", icon: "Cpu", color: "#ba0c2f", subCategories: ["Mechanical Switches", "Keycaps", "Custom Cables"] },
  ],

  users: [
    {
      id: "u1",
      name: "Elena Rostova (Admin)",
      email: "admin@nexora.io",
      password: "admin123",
      role: "admin",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80"
    },
    {
      id: "u2",
      name: "Alex Mercer",
      email: "alex@nexora.io",
      password: "user123",
      role: "customer",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80"
    }
  ],

  payments: [
    { id: "TXN-90182", orderId: "ORD-92810", customerName: "Alex Mercer", amount: 199.99, paymentMethod: "card", status: "Paid", date: "2026-07-20T14:30:00Z" },
    { id: "TXN-90183", orderId: "ORD-92811", customerName: "Sophia Chen", amount: 299.99, paymentMethod: "upi", status: "Paid", date: "2026-07-21T09:15:00Z" },
    { id: "TXN-90184", orderId: "ORD-92812", customerName: "Marcus Vance", amount: 89.99, paymentMethod: "cod", status: "Pending", date: "2026-07-22T11:00:00Z" }
  ],

  banners: [
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
  ],

  orders: [
    {
      id: "ORD-92810",
      createdAt: "2026-07-20T14:30:00Z",
      items: [
        {
          productId: "p1",
          name: "SoundPulse Wireless Pro",
          price: 199.99,
          quantity: 1,
          selectedColor: "Electric Indigo",
          selectedSize: "Standard"
        }
      ],
      totalAmount: 199.99,
      discount: 0,
      shippingAddress: {
        fullName: "Alex Mercer",
        email: "alex@nexora.io",
        street: "742 Evergreen Terrace",
        city: "San Francisco",
        zip: "94107"
      },
      paymentMethod: "card",
      status: "shipped"
    }
  ]
};
