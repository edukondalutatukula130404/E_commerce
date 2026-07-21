import express from 'express';
import { db } from '../data/db.js';

const router = express.Router();

// GET /api/products - Get all products with filtering & search
router.get('/products', (req, res) => {
  const { q, category, sort } = req.query;
  let result = [...db.products];

  // Search filter
  if (q) {
    const query = q.toLowerCase();
    result = result.filter(p => 
      p.name.toLowerCase().includes(query) || 
      p.description.toLowerCase().includes(query) ||
      p.category.toLowerCase().includes(query)
    );
  }

  // Category filter
  if (category && category !== 'All') {
    result = result.filter(p => p.category.toLowerCase() === category.toLowerCase());
  }

  // Sorting
  if (sort === 'price-low') {
    result.sort((a, b) => a.price - b.price);
  } else if (sort === 'price-high') {
    result.sort((a, b) => b.price - a.price);
  } else if (sort === 'rating') {
    result.sort((a, b) => b.rating - a.rating);
  }

  res.json({ success: true, count: result.length, data: result });
});

// GET /api/products/:id - Get single product
router.get('/products/:id', (req, res) => {
  const product = db.products.find(p => p.id === req.params.id || p.slug === req.params.id);
  if (!product) {
    return res.status(404).json({ success: false, message: 'Product not found' });
  }
  res.json({ success: true, data: product });
});

// POST /api/products - Create product (Admin)
router.post('/products', (req, res) => {
  const newProduct = {
    id: `p${db.products.length + 1}`,
    ...req.body,
    rating: 5.0,
    reviewCount: 0
  };
  db.products.push(newProduct);
  res.status(201).json({ success: true, data: newProduct });
});

// PUT /api/products/:id - Update product (Admin)
router.put('/products/:id', (req, res) => {
  const index = db.products.findIndex(p => p.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Product not found' });
  }
  db.products[index] = { ...db.products[index], ...req.body };
  res.json({ success: true, data: db.products[index] });
});

// DELETE /api/products/:id - Delete product (Admin)
router.delete('/products/:id', (req, res) => {
  const index = db.products.findIndex(p => p.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Product not found' });
  }
  const deleted = db.products.splice(index, 1);
  res.json({ success: true, data: deleted[0] });
});

export default router;
