import express from 'express';
import { db } from '../data/db.js';

const router = express.Router();

// GET /api/admin/metrics
router.get('/metrics', (req, res) => {
  const totalRevenue = db.orders.reduce((acc, order) => acc + (order.totalAmount || 0), 0);
  const totalOrders = db.orders.length;
  const totalProducts = db.products.length;
  const lowStockCount = db.products.filter(p => p.stock <= 15).length;

  res.json({
    success: true,
    data: {
      totalRevenue,
      totalOrders,
      totalProducts,
      lowStockCount
    }
  });
});

// GET /api/admin/inventory
router.get('/inventory', (req, res) => {
  res.json({ success: true, data: db.products });
});

// GET /api/admin/vendors
router.get('/vendors', (req, res) => {
  res.json({ success: true, data: db.vendors || [] });
});

// POST /api/admin/vendors
router.post('/vendors', (req, res) => {
  const newVendor = {
    id: `v_${Date.now()}`,
    name: req.body.name,
    store: req.body.store,
    commission: Number(req.body.commission) || 10,
    totalSales: 0,
    pendingPayout: 0,
    status: 'Active'
  };
  if (!db.vendors) db.vendors = [];
  db.vendors.push(newVendor);
  res.status(201).json({ success: true, data: newVendor });
});

// POST /api/admin/vendors/:id/payout
router.post('/vendors/:id/payout', (req, res) => {
  const vendor = (db.vendors || []).find(v => v.id === req.params.id);
  if (!vendor) return res.status(404).json({ success: false, message: 'Vendor not found' });
  vendor.pendingPayout = 0;
  res.json({ success: true, data: vendor });
});

// DELETE /api/admin/vendors/:id
router.delete('/vendors/:id', (req, res) => {
  const index = (db.vendors || []).findIndex(v => v.id === req.params.id);
  if (index === -1) return res.status(404).json({ success: false, message: 'Vendor not found' });
  const deleted = db.vendors.splice(index, 1);
  res.json({ success: true, data: deleted[0] });
});

// GET /api/admin/users
router.get('/users', (req, res) => {
  const sanitizedUsers = db.users.map(({ password, ...u }) => u);
  res.json({ success: true, data: sanitizedUsers });
});

// PUT /api/admin/users/:id/role
router.put('/users/:id/role', (req, res) => {
  const user = db.users.find(u => u.id === req.params.id);
  if (!user) return res.status(404).json({ success: false, message: 'User not found' });
  user.role = req.body.role || user.role;
  const { password, ...userWithoutPass } = user;
  res.json({ success: true, data: userWithoutPass });
});

// DELETE /api/admin/users/:id
router.delete('/users/:id', (req, res) => {
  const index = db.users.findIndex(u => u.id === req.params.id);
  if (index === -1) return res.status(404).json({ success: false, message: 'User not found' });
  const deleted = db.users.splice(index, 1);
  const { password, ...sanitized } = deleted[0];
  res.json({ success: true, data: sanitized });
});

// CATEGORIES CRUD
router.get('/categories', (req, res) => {
  res.json({ success: true, data: db.categories || [] });
});

router.post('/categories', (req, res) => {
  const newCat = {
    id: `c_${Date.now()}`,
    name: req.body.name,
    slug: (req.body.name || '').toLowerCase().replace(/\s+/g, '-'),
    icon: req.body.icon || 'Cpu',
    color: req.body.color || '#ba0c2f'
  };
  if (!db.categories) db.categories = [];
  db.categories.push(newCat);
  res.status(201).json({ success: true, data: newCat });
});

router.put('/categories/:id', (req, res) => {
  const cat = (db.categories || []).find(c => c.id === req.params.id);
  if (!cat) return res.status(404).json({ success: false, message: 'Category not found' });
  if (req.body.name) {
    cat.name = req.body.name;
    cat.slug = req.body.name.toLowerCase().replace(/\s+/g, '-');
  }
  if (req.body.icon) cat.icon = req.body.icon;
  if (req.body.color) cat.color = req.body.color;
  res.json({ success: true, data: cat });
});

router.delete('/categories/:id', (req, res) => {
  const index = (db.categories || []).findIndex(c => c.id === req.params.id);
  if (index === -1) return res.status(404).json({ success: false, message: 'Category not found' });
  const deleted = db.categories.splice(index, 1);
  res.json({ success: true, data: deleted[0] });
});

// PAYMENTS CRUD
router.get('/payments', (req, res) => {
  res.json({ success: true, data: db.payments || [] });
});

router.put('/payments/:id', (req, res) => {
  const p = (db.payments || []).find(pay => pay.id === req.params.id);
  if (!p) return res.status(404).json({ success: false, message: 'Payment not found' });
  p.status = req.body.status || p.status;
  res.json({ success: true, data: p });
});

// BANNERS CRUD
router.get('/banners', (req, res) => {
  res.json({ success: true, data: db.banners || [] });
});

router.post('/banners', (req, res) => {
  const newBanner = {
    id: `b_${Date.now()}`,
    title: req.body.title,
    subtitle: req.body.subtitle || '',
    ctaText: req.body.ctaText || 'Shop Now',
    imageUrl: req.body.imageUrl || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    tag: req.body.tag || 'PROMOTION',
    category: req.body.category || 'Tech',
    isActive: req.body.isActive !== undefined ? req.body.isActive : true
  };
  if (!db.banners) db.banners = [];
  db.banners.push(newBanner);
  res.status(201).json({ success: true, data: newBanner });
});

router.put('/banners/:id', (req, res) => {
  const banner = (db.banners || []).find(b => b.id === req.params.id);
  if (!banner) return res.status(404).json({ success: false, message: 'Banner not found' });
  Object.assign(banner, req.body);
  res.json({ success: true, data: banner });
});

import crypto from 'crypto';

// IMAGE UPLOAD TO CLOUDINARY
router.post('/upload', async (req, res) => {
  try {
    const { image } = req.body;
    if (!image) {
      return res.status(400).json({ success: false, message: 'No image data provided' });
    }

    console.log('[UPLOAD] Received image upload request, data length:', image.length);

    const cloudName = 'dypbj1iiy';  // Fixed typo: was 'ypbj1iiy'
    const apiKey = '228485191495714';
    const apiSecret = 'gQm7RgW11x_hLyu_LkZIkJ1xlvU';
    const timestamp = Math.round(Date.now() / 1000);
    
    // Generate signature: SHA1 of "timestamp=<value><apiSecret>"
    const signature = crypto
      .createHash('sha1')
      .update(`timestamp=${timestamp}${apiSecret}`)
      .digest('hex');

    console.log('[UPLOAD] Signature generated, timestamp:', timestamp);

    // Upload to Cloudinary
    const formData = new URLSearchParams();
    formData.append('file', image);
    formData.append('api_key', apiKey);
    formData.append('timestamp', timestamp.toString());
    formData.append('signature', signature);

    const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
    console.log('[UPLOAD] Posting to:', cloudinaryUrl);

    const response = await fetch(cloudinaryUrl, {
      method: 'POST',
      body: formData
    });

    const result = await response.json();
    console.log('[UPLOAD] Cloudinary response:', result);

    if (result.secure_url) {
      console.log('[UPLOAD] Success! URL:', result.secure_url);
      res.json({ success: true, url: result.secure_url });
    } else {
      console.error('[UPLOAD] Cloudinary error:', result.error);
      res.status(500).json({ 
        success: false, 
        message: result.error?.message || 'Cloudinary upload failed',
        error: result.error
      });
    }
  } catch (err) {
    console.error('[UPLOAD] Exception:', err);
    res.status(500).json({ success: false, message: err.message || 'Upload failed' });
  }
});

router.delete('/banners/:id', (req, res) => {
  const index = (db.banners || []).findIndex(b => b.id === req.params.id);
  if (index === -1) return res.status(404).json({ success: false, message: 'Banner not found' });
  const deleted = db.banners.splice(index, 1);
  res.json({ success: true, data: deleted[0] });
});

export default router;
