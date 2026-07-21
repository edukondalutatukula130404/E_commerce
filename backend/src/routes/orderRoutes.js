import express from 'express';
import { db } from '../data/db.js';

const router = express.Router();

// GET /api/orders - Get user or all orders
router.get('/', (req, res) => {
  res.json({ success: true, data: db.orders });
});

// POST /api/orders - Create new order
router.post('/', (req, res) => {
  const newOrder = {
    id: `ORD-${Math.floor(10000 + Math.random() * 90000)}`,
    createdAt: new Date().toISOString(),
    status: 'processing',
    ...req.body
  };
  db.orders.unshift(newOrder);
  db.cart = []; // clear server cart on order place
  res.status(201).json({ success: true, data: newOrder });
});

// PUT /api/orders/:id/status - Update order status (Admin)
router.put('/:id/status', (req, res) => {
  const order = db.orders.find(o => o.id === req.params.id);
  if (!order) {
    return res.status(404).json({ success: false, message: 'Order not found' });
  }
  order.status = req.body.status || order.status;
  res.json({ success: true, data: order });
});

export default router;
