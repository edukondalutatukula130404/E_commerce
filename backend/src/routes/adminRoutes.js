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

export default router;
