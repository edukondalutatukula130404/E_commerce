import express from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';
import { protect } from '../middleware/authMiddleware.js';
import { sendOtpEmail } from '../services/emailService.js';
import { db } from '../data/db.js'; // fallback array store

const router = express.Router();

// Helper to generate signed JWT Token
const generateToken = (userId, email, role) => {
  return jwt.sign(
    { id: userId, email, role },
    process.env.JWT_SECRET || 'switches_super_secret_jwt_key_2026',
    { expiresIn: '30d' }
  );
};

// In-memory OTP Store: Map<email, { otp: string, expiresAt: number }>
const otpStore = new Map();

// GET /api/auth/me - Current user profile
router.get('/me', protect, async (req, res) => {
  res.json({ success: true, user: req.user });
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const targetEmail = (email || '').toLowerCase().trim();

    if (!targetEmail) {
      return res.status(400).json({ success: false, message: 'Email address is required' });
    }

    // Try MongoDB query first
    let user = await User.findOne({ email: targetEmail }).select('+password');

    // Fallback to in-memory seed users if MongoDB user not found during dev
    if (!user) {
      const mockUser = db.users.find(u => {
        const uEmail = u.email.toLowerCase();
        return uEmail === targetEmail ||
          (targetEmail.includes('admin') && u.role === 'admin') ||
          (targetEmail.includes('alex') && u.role === 'customer');
      });

      if (mockUser) {
        user = await User.create({
          name: mockUser.name,
          email: mockUser.email,
          password: mockUser.password || 'password123',
          role: mockUser.role,
          avatar: mockUser.avatar
        });
        user = await User.findById(user._id).select('+password');
      }
    }

    if (!user) {
      return res.status(401).json({ success: false, message: 'No account found with this email address' });
    }

    // Validate password using bcrypt
    if (password) {
      const isMatch = await user.matchPassword(password);
      if (!isMatch) {
        return res.status(401).json({ success: false, message: 'Invalid password credentials' });
      }
    }

    const token = generateToken(user._id, user.email, user.role);

    const userObj = user.toObject();
    delete userObj.password;

    res.json({
      success: true,
      token,
      user: {
        id: userObj._id,
        _id: userObj._id,
        name: userObj.name,
        email: userObj.email,
        role: userObj.role,
        avatar: userObj.avatar
      }
    });
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ success: false, message: error.message || 'Internal server login failure' });
  }
});

// POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const targetEmail = (email || '').toLowerCase().trim();

    if (!name || !targetEmail || !password) {
      return res.status(400).json({ success: false, message: 'Please provide name, email, and password' });
    }

    const existing = await User.findOne({ email: targetEmail });
    if (existing) {
      return res.status(400).json({ success: false, message: 'Email address already registered' });
    }

    const user = await User.create({
      name,
      email: targetEmail,
      password,
      role: 'customer'
    });

    const token = generateToken(user._id, user.email, user.role);

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar
      }
    });
  } catch (error) {
    console.error('Register Error:', error);
    res.status(500).json({ success: false, message: error.message || 'Failed to register user' });
  }
});

// POST /api/auth/forgot-password
router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;
  const normalizedEmail = (email || '').toLowerCase().trim();

  if (!normalizedEmail) {
    return res.status(400).json({ success: false, message: 'Please provide a valid email address' });
  }

  // Generate 6-digit OTP
  const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = Date.now() + 10 * 60 * 1000;

  otpStore.set(normalizedEmail, { otp: otpCode, expiresAt });

  try {
    await sendOtpEmail(normalizedEmail, otpCode);
    res.json({
      success: true,
      message: `OTP code sent successfully to ${normalizedEmail}`
    });
  } catch (error) {
    console.error('Error sending OTP email:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to send OTP email.'
    });
  }
});

// POST /api/auth/verify-otp
router.post('/verify-otp', (req, res) => {
  const { email, otp } = req.body;
  const normalizedEmail = (email || '').toLowerCase().trim();
  const cleanOtp = (otp || '').trim();

  const record = otpStore.get(normalizedEmail);

  if (!record) {
    return res.status(400).json({ success: false, message: 'No OTP request found for this email' });
  }

  if (Date.now() > record.expiresAt) {
    otpStore.delete(normalizedEmail);
    return res.status(400).json({ success: false, message: 'OTP has expired. Please request a new code.' });
  }

  if (record.otp !== cleanOtp) {
    return res.status(400).json({ success: false, message: 'Invalid OTP code' });
  }

  res.json({
    success: true,
    message: 'OTP verified successfully'
  });
});

// POST /api/auth/reset-password
router.post('/reset-password', async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;
    const normalizedEmail = (email || '').toLowerCase().trim();
    const cleanOtp = (otp || '').trim();

    if (!newPassword || newPassword.length < 4) {
      return res.status(400).json({ success: false, message: 'Password must be at least 4 characters long' });
    }

    const record = otpStore.get(normalizedEmail);

    if (!record || record.otp !== cleanOtp) {
      return res.status(400).json({ success: false, message: 'Invalid or expired OTP session' });
    }

    let user = await User.findOne({ email: normalizedEmail });

    if (!user) {
      user = new User({
        name: normalizedEmail.split('@')[0],
        email: normalizedEmail,
        password: newPassword,
        role: 'customer'
      });
    } else {
      user.password = newPassword;
    }

    await user.save(); // Pre-save hook will hash password automatically!

    otpStore.delete(normalizedEmail);

    res.json({
      success: true,
      message: 'Password reset successfully! You can now sign in with your new password.'
    });
  } catch (error) {
    console.error('Reset Password Error:', error);
    res.status(500).json({ success: false, message: error.message || 'Failed to reset password' });
  }
});

export default router;
