import express from 'express';
import { Product } from '../models/Product.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

// GET /api/products - Get all products with filtering, search & sorting
router.get('/products', async (req, res) => {
  try {
    const { q, category, sort } = req.query;
    let queryFilter = {};

    if (q) {
      const regex = new RegExp(q, 'i');
      queryFilter.$or = [
        { name: regex },
        { description: regex },
        { category: regex }
      ];
    }

    if (category && category !== 'All') {
      queryFilter.category = new RegExp(`^${category}$`, 'i');
    }

    let query = Product.find(queryFilter);

    if (sort === 'price-low') {
      query = query.sort({ price: 1 });
    } else if (sort === 'price-high') {
      query = query.sort({ price: -1 });
    } else if (sort === 'rating') {
      query = query.sort({ rating: -1 });
    } else {
      query = query.sort({ createdAt: -1 });
    }

    const products = await query;

    // Transform products to include fallback `id` field for frontend compatibility
    const mapped = products.map(p => {
      const doc = p.toObject();
      doc.id = doc._id.toString();
      return doc;
    });

    res.json({ success: true, count: mapped.length, data: mapped });
  } catch (error) {
    console.error('Fetch Products Error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch products' });
  }
});

// GET /api/products/:id - Get single product by Mongo _id or slug
router.get('/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    let product;

    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      product = await Product.findById(id);
    }

    if (!product) {
      product = await Product.findOne({ $or: [{ slug: id }, { name: id }] });
    }

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    const doc = product.toObject();
    doc.id = doc._id.toString();

    res.json({ success: true, data: doc });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/products - Create product (Protected, Admin Only)
router.post('/products', protect, adminOnly, async (req, res) => {
  try {
    const product = await Product.create(req.body);
    const doc = product.toObject();
    doc.id = doc._id.toString();

    if (req.io) {
      const allProducts = await Product.find({});
      req.io.emit('products:changed', allProducts);
      req.io.emit('product:created', doc);
    }

    res.status(201).json({ success: true, data: doc });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// PUT /api/products/:id - Update product (Protected, Admin Only)
router.put('/products/:id', protect, adminOnly, async (req, res) => {
  try {
    const { id } = req.params;
    let product = await Product.findById(id);

    if (!product) {
      product = await Product.findOne({ slug: id });
    }

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    Object.assign(product, req.body);
    await product.save();

    const doc = product.toObject();
    doc.id = doc._id.toString();

    if (req.io) {
      const allProducts = await Product.find({});
      req.io.emit('products:changed', allProducts);
      req.io.emit('product:updated', doc);
    }

    res.json({ success: true, data: doc });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// DELETE /api/products/:id - Delete product (Protected, Admin Only)
router.delete('/products/:id', protect, adminOnly, async (req, res) => {
  try {
    const { id } = req.params;
    let product = await Product.findByIdAndDelete(id);

    if (!product) {
      product = await Product.findOneAndDelete({ slug: id });
    }

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    if (req.io) {
      const allProducts = await Product.find({});
      req.io.emit('products:changed', allProducts);
      req.io.emit('product:deleted', id);
    }

    res.json({ success: true, data: product });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

export default router;
