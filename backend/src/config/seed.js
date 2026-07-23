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
