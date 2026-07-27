import { User } from '../models/User.js';
import { Product } from '../models/Product.js';
import { Vendor } from '../models/Vendor.js';
import { Category } from '../models/Category.js';
import { Banner } from '../models/Banner.js';

export const seedDatabase = async () => {
  try {
    const userCount = await User.countDocuments();
    if (userCount === 0) {
      console.log('🌱 [MongoDB Seed] Initializing default users...');
      await User.create([
        {
          name: 'SWITCHES Admin',
          email: 'admin@switches.com',
          password: 'adminpassword123',
          role: 'admin',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
        },
        {
          name: 'Alex Johnson',
          email: 'alex@switches.com',
          password: 'userpassword123',
          role: 'customer',
          avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'
        }
      ]);
    }

    const productCount = await Product.countDocuments();
    if (productCount === 0) {
      console.log('🌱 [MongoDB Seed] Initializing default products catalog...');
      await Product.create([
        {
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
          isNewProduct: true,
          isFeatured: true
        },
        {
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
          isNewProduct: true,
          isFeatured: true
        },
        {
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
          isNewProduct: false,
          isFeatured: true
        },
        {
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
          isNewProduct: false,
          isFeatured: true
        },
        {
          name: "SWITCHES Crimson V2 Linear Switch Pack (110 Pcs)",
          slug: "switches-crimson-v2-linear-switch-pack",
          tagline: "Pre-lubed Ultra-smooth Linear Mechanical Keyboard Switches",
          price: 49.99,
          originalPrice: 64.99,
          category: "Switches",
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
          isNewProduct: true,
          isFeatured: true
        },
        {
          name: "SWITCHES Sapphire Tactile Switch Pack (110 Pcs)",
          slug: "switches-sapphire-tactile-switch-pack",
          tagline: "Crisp Tactile Bump with PC Housing & POM Stem",
          price: 54.99,
          originalPrice: 69.99,
          category: "Switches",
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
          isNewProduct: true,
          isFeatured: true
        },
        {
          name: "SWITCHES Phantom Silent Linear Switch Pack (110 Pcs)",
          slug: "switches-phantom-silent-linear-switch-pack",
          tagline: "Whisper-Quiet Mechanical Switches for Office & Night Gaming",
          price: 52.99,
          originalPrice: 64.99,
          category: "Switches",
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
          isNewProduct: true,
          isFeatured: true
        },
        {
          name: "SWITCHES Apex Magnetic Hall Effect Switches (110 Pcs)",
          slug: "switches-apex-magnetic-hall-effect-switches",
          tagline: "Rapid Trigger & Dynamic Actuation 0.1mm - 4.0mm",
          price: 69.99,
          originalPrice: 84.99,
          category: "Switches",
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
          isNewProduct: true,
          isFeatured: true
        },
        {
          name: "SWITCHES Pro Lube Station & Switch Opener Kit",
          slug: "switches-pro-lube-station-kit",
          tagline: "CNC Aluminum Opener, Krytox 205g0 Lube & Acrylic Deck",
          price: 34.99,
          originalPrice: 44.99,
          category: "Switches",
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
          isNewProduct: true,
          isFeatured: true
        },
        {
          name: "SWITCHES CyberDeck Pro Split Hot-Swap Keyboard",
          slug: "switches-cyberdeck-pro-split-keyboard",
          tagline: "Split Ergonomic Keyboard with Dual OLED Screens & Gasket Mount",
          price: 219.99,
          originalPrice: 259.99,
          category: "Switches",
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
          isNewProduct: true,
          isFeatured: true
        }
      ]);
    }

    const categoryCount = await Category.countDocuments();
    if (categoryCount === 0) {
      console.log('🌱 [MongoDB Seed] Initializing default categories...');
      await Category.create([
        { name: 'Tech', slug: 'tech', itemCount: 14, icon: 'Cpu', status: 'Active' },
        { name: 'Apparel', slug: 'apparel', itemCount: 8, icon: 'Shirt', status: 'Active' },
        { name: 'Home', slug: 'home', itemCount: 6, icon: 'Zap', status: 'Active' }
      ]);
    }

    const vendorCount = await Vendor.countDocuments();
    if (vendorCount === 0) {
      console.log('🌱 [MongoDB Seed] Initializing default vendors...');
      await Vendor.create([
        { name: 'Aura Soundworks', email: 'partner@aurasound.com', storeName: 'Aura Official', sales: 412, revenue: 82390, status: 'Active' },
        { name: 'Apex Gear Co', email: 'sales@apexgear.com', storeName: 'Apex Tech Labs', sales: 289, revenue: 54100, status: 'Active' }
      ]);
    }

    const bannerCount = await Banner.countDocuments();
    if (bannerCount === 0) {
      console.log('🌱 [MongoDB Seed] Initializing default promotional banners...');
      await Banner.create([
        { title: 'Cyber Pulse Audio Sale', subtitle: 'Save up to 35% on ANC Headphones', tag: 'LIMITED TIME', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=80', status: 'Active', link: '/catalog' }
      ]);
    }

    console.log('⚡ [MongoDB Seed] Cloud Seed complete!');
  } catch (err) {
    console.error('Error during database seed:', err.message);
  }
};
