import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../db.js';
import { JWT_SECRET, authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// B2B User Registration
router.post('/register', (req, res) => {
  try {
    const { email, password, full_name, business_name, phone, business_type, gst_number, pan_number, address, city, state, pincode } = req.body;

    if (!email || !password || !full_name || !phone) {
      return res.status(400).json({ error: 'Please provide Email, Password, Name, and Mobile Number.' });
    }

    const existingUser = db.prepare('SELECT id FROM users WHERE email = ?').get(email);
    if (existingUser) {
      return res.status(400).json({ error: 'An account with this email address already exists.' });
    }

    const salt = bcrypt.genSaltSync(10);
    const password_hash = bcrypt.hashSync(password, salt);

    const result = db.prepare(`
      INSERT INTO users (email, password_hash, full_name, business_name, phone, role, business_type, gst_number, pan_number, address, city, state, pincode)
      VALUES (?, ?, ?, ?, ?, 'RETAILER', ?, ?, ?, ?, ?, ?, ?)
    `).run(
      email.toLowerCase().trim(),
      password_hash,
      full_name,
      business_name || null,
      phone,
      business_type || 'Clothing Retailer',
      gst_number || null,
      pan_number || null,
      address || null,
      city || null,
      state || null,
      pincode || null
    );

    const user = db.prepare('SELECT id, email, full_name, business_name, phone, role FROM users WHERE id = ?').get(result.lastInsertRowid);
    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '7d' });

    res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', maxAge: 7 * 24 * 3600 * 1000 });

    return res.status(201).json({
      message: 'Registration successful!',
      token,
      user
    });
  } catch (err) {
    console.error('Registration Error:', err);
    return res.status(500).json({ error: 'Server error during registration.' });
  }
});

// Login
router.post('/login', (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Please enter both Email and Password.' });
    }

    const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email.toLowerCase().trim());
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    const isMatch = bcrypt.compareSync(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '7d' });

    res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', maxAge: 7 * 24 * 3600 * 1000 });

    delete user.password_hash;

    return res.json({
      message: 'Login successful!',
      token,
      user
    });
  } catch (err) {
    console.error('Login Error:', err);
    return res.status(500).json({ error: 'Server error during login.' });
  }
});

// Current Authenticated User Profile
router.get('/me', authenticateToken, (req, res) => {
  try {
    const user = db.prepare('SELECT id, email, full_name, business_name, phone, role, business_type, gst_number, pan_number, address, city, state, pincode, created_at FROM users WHERE id = ?').get(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }
    return res.json({ user });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to fetch user profile.' });
  }
});

// Logout
router.post('/logout', (req, res) => {
  res.clearCookie('token');
  return res.json({ message: 'Logged out successfully.' });
});

export default router;
