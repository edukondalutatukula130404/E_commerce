// Database mock store for AURA E-Commerce REST API
export const db = {
  products: [
    {
      id: "p1",
      name: "AURA SoundPulse Wireless Pro",
      slug: "aura-soundpulse-wireless-pro",
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
      name: "AURA Horizon Smartwatch Ultra",
      slug: "aura-horizon-smartwatch-ultra",
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
      name: "AURA Lumina Smart Ambient Light",
      slug: "aura-lumina-ambient-light",
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
    }
  ],

  users: [
    {
      id: "u1",
      email: "alex@aura.io",
      name: "Alex Mercer",
      role: "customer",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80"
    },
    {
      id: "u2",
      email: "admin@aura.io",
      name: "Elena Rostova (Admin)",
      role: "admin",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80"
    }
  ],

  cart: [
    {
      productId: "p1",
      selectedColor: "Electric Indigo",
      selectedSize: "Standard",
      quantity: 1
    }
  ],

  orders: [
    {
      id: "ORD-92810",
      createdAt: "2026-07-20T14:30:00Z",
      items: [
        {
          productId: "p1",
          name: "AURA SoundPulse Wireless Pro",
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
        email: "alex@aura.io",
        street: "742 Evergreen Terrace",
        city: "San Francisco",
        zip: "94107"
      },
      paymentMethod: "card",
      status: "shipped"
    }
  ]
};
