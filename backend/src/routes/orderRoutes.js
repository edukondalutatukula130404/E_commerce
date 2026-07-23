import express from 'express';
import { Order } from '../models/Order.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

// GET /api/orders - Get user or all orders
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find({}).sort({ createdAt: -1 });
    const mapped = orders.map(o => {
      const doc = o.toObject();
      doc.id = doc.orderId || doc._id.toString();
      return doc;
    });
    res.json({ success: true, data: mapped });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/orders - Create new order
router.post('/', async (req, res) => {
  try {
    const orderId = `ORD-${Math.floor(10000 + Math.random() * 90000)}`;
    const newOrder = await Order.create({
      orderId,
      ...req.body
    });

    const doc = newOrder.toObject();
    doc.id = doc.orderId;

    if (req.io) {
      const allOrders = await Order.find({}).sort({ createdAt: -1 });
      req.io.emit('orders:changed', allOrders);
      req.io.emit('order:created', doc);
    }

    res.status(201).json({ success: true, data: doc });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// PUT /api/orders/:id/status - Update order status (Protected, Admin Only)
router.put('/:id/status', protect, adminOnly, async (req, res) => {
  try {
    const { id } = req.params;
    let order = await Order.findOne({ $or: [{ orderId: id }, { _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null }] });

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    order.status = req.body.status || order.status;
    await order.save();

    const doc = order.toObject();
    doc.id = doc.orderId;

    if (req.io) {
      const allOrders = await Order.find({}).sort({ createdAt: -1 });
      req.io.emit('orders:changed', allOrders);
      req.io.emit('order:status_updated', { id: doc.id, status: doc.status });
    }

    res.json({ success: true, data: doc });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// DELETE /api/orders/:id - Delete order (Protected, Admin Only)
router.delete('/:id', protect, adminOnly, async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findOneAndDelete({ $or: [{ orderId: id }, { _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null }] });

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    if (req.io) {
      const allOrders = await Order.find({}).sort({ createdAt: -1 });
      req.io.emit('orders:changed', allOrders);
      req.io.emit('order:deleted', id);
    }

    res.json({ success: true, data: order });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

export default router;
