import express from 'express';
import { db } from '../data/db.js';

const router = express.Router();

// GET /api/cart
router.get('/', (req, res) => {
  res.json({ success: true, data: db.cart });
});

// POST /api/cart - Sync or Add item
router.post('/', (req, res) => {
  db.cart = req.body.cart || [];
  res.json({ success: true, data: db.cart });
});

export default router;
