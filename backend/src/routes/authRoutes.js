import express from 'express';
import { db } from '../data/db.js';

const router = express.Router();

// POST /api/auth/login
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = db.users.find(u => u.email.toLowerCase() === email.toLowerCase());

  if (!user) {
    return res.status(401).json({ success: false, message: 'Invalid credentials' });
  }

  res.json({
    success: true,
    token: `token_${user.id}_${Date.now()}`,
    user
  });
});

// POST /api/auth/register
router.post('/register', (req, res) => {
  const { name, email, password } = req.body;
  const existing = db.users.find(u => u.email.toLowerCase() === email.toLowerCase());

  if (existing) {
    return res.status(400).json({ success: false, message: 'Email already registered' });
  }

  const newUser = {
    id: `u${db.users.length + 1}`,
    name,
    email,
    role: 'customer',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'
  };

  db.users.push(newUser);
  res.status(201).json({
    success: true,
    token: `token_${newUser.id}_${Date.now()}`,
    user: newUser
  });
});

export default router;
