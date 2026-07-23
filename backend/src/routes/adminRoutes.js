import express from 'express';
import crypto from 'crypto';
import { User } from '../models/User.js';
import { Product } from '../models/Product.js';
import { Order } from '../models/Order.js';
import { Vendor } from '../models/Vendor.js';
import { Category } from '../models/Category.js';
import { Banner } from '../models/Banner.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

// GET /api/admin/metrics (Protected, Admin Only)
router.get('/metrics', protect, adminOnly, async (req, res) => {
  try {
    const orders = await Order.find({});
    const products = await Product.find({});

    const totalRevenue = orders.reduce((acc, order) => acc + (order.totalAmount || 0), 0);
    const totalOrders = orders.length;
    const totalProducts = products.length;
    const lowStockCount = products.filter(p => p.stock <= 15).length;

    res.json({
      success: true,
      data: {
        totalRevenue,
        totalOrders,
        totalProducts,
        lowStockCount
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/admin/inventory
router.get('/inventory', async (req, res) => {
  try {
    const products = await Product.find({});
    res.json({ success: true, data: products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// VENDORS CRUD
router.get('/vendors', async (req, res) => {
  try {
    const vendors = await Vendor.find({});
    res.json({ success: true, data: vendors });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.post('/vendors', protect, adminOnly, async (req, res) => {
  try {
    const vendor = await Vendor.create(req.body);
    if (req.io) req.io.emit('vendors:changed', await Vendor.find({}));
    res.status(201).json({ success: true, data: vendor });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

router.post('/vendors/:id/payout', protect, adminOnly, async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.params.id);
    if (!vendor) return res.status(404).json({ success: false, message: 'Vendor not found' });
    vendor.pendingPayout = 0;
    await vendor.save();
    if (req.io) req.io.emit('vendors:changed', await Vendor.find({}));
    res.json({ success: true, data: vendor });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

router.delete('/vendors/:id', protect, adminOnly, async (req, res) => {
  try {
    const deleted = await Vendor.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ success: false, message: 'Vendor not found' });
    if (req.io) req.io.emit('vendors:changed', await Vendor.find({}));
    res.json({ success: true, data: deleted });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// USERS CRUD (Protected, Admin Only)
router.get('/users', protect, adminOnly, async (req, res) => {
  try {
    const users = await User.find({}).select('-password');
    res.json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.put('/users/:id/role', protect, adminOnly, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    user.role = req.body.role || user.role;
    await user.save();
    if (req.io) req.io.emit('users:changed', await User.find({}).select('-password'));
    res.json({ success: true, data: user });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

router.delete('/users/:id', protect, adminOnly, async (req, res) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ success: false, message: 'User not found' });
    if (req.io) req.io.emit('users:changed', await User.find({}).select('-password'));
    res.json({ success: true, data: deleted });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// CATEGORIES CRUD
router.get('/categories', async (req, res) => {
  try {
    const categories = await Category.find({});
    res.json({ success: true, data: categories });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.post('/categories', protect, adminOnly, async (req, res) => {
  try {
    const slug = (req.body.name || '').toLowerCase().replace(/\s+/g, '-');
    const category = await Category.create({ ...req.body, slug });
    if (req.io) req.io.emit('categories:changed', await Category.find({}));
    res.status(201).json({ success: true, data: category });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

router.put('/categories/:id', protect, adminOnly, async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!category) return res.status(404).json({ success: false, message: 'Category not found' });
    if (req.io) req.io.emit('categories:changed', await Category.find({}));
    res.json({ success: true, data: category });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

router.delete('/categories/:id', protect, adminOnly, async (req, res) => {
  try {
    const deleted = await Category.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ success: false, message: 'Category not found' });
    if (req.io) req.io.emit('categories:changed', await Category.find({}));
    res.json({ success: true, data: deleted });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// BANNERS CRUD
router.get('/banners', async (req, res) => {
  try {
    const banners = await Banner.find({});
    res.json({ success: true, data: banners });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.post('/banners', protect, adminOnly, async (req, res) => {
  try {
    const banner = await Banner.create(req.body);
    if (req.io) req.io.emit('banners:changed', await Banner.find({}));
    res.status(201).json({ success: true, data: banner });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

router.put('/banners/:id', protect, adminOnly, async (req, res) => {
  try {
    const banner = await Banner.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!banner) return res.status(404).json({ success: false, message: 'Banner not found' });
    if (req.io) req.io.emit('banners:changed', await Banner.find({}));
    res.json({ success: true, data: banner });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

router.delete('/banners/:id', protect, adminOnly, async (req, res) => {
  try {
    const deleted = await Banner.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ success: false, message: 'Banner not found' });
    if (req.io) req.io.emit('banners:changed', await Banner.find({}));
    res.json({ success: true, data: deleted });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// IMAGE UPLOAD TO CLOUDINARY
router.post('/upload', async (req, res) => {
  try {
    const { image } = req.body;
    if (!image) {
      return res.status(400).json({ success: false, message: 'No image data provided' });
    }

    const cloudName = 'ypbj1iiy';
    const apiKey = '228485191495714';
    const apiSecret = 'gQm7RgW11x_hLyu_LkZIkJ1xlvU';
    const timestamp = Math.round(Date.now() / 1000);

    const signature = crypto
      .createHash('sha1')
      .update(`timestamp=${timestamp}${apiSecret}`)
      .digest('hex');

    const formData = new URLSearchParams();
    formData.append('file', image);
    formData.append('api_key', apiKey);
    formData.append('timestamp', timestamp.toString());
    formData.append('signature', signature);

    const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

    const response = await fetch(cloudinaryUrl, {
      method: 'POST',
      body: formData
    });

    const result = await response.json();

    if (result.secure_url) {
      res.json({ success: true, url: result.secure_url });
    } else {
      res.status(500).json({
        success: false,
        message: result.error?.message || 'Cloudinary upload failed'
      });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message || 'Upload failed' });
  }
});

export default router;
