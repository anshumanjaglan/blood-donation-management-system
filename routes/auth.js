const express = require('express');
const router = express.Router();
const { db } = require('../config/db');

// Admin Login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ success: false, message: 'Username and password are required' });
    }

    const admin = await db.findAdmin(username, password);
    if (!admin) {
      return res.status(401).json({ success: false, message: 'Invalid administrative credentials' });
    }

    // Set simple cookie/session flag or token
    const token = Buffer.from(`${admin.id}:${admin.username}:${Date.now()}`).toString('base64');
    return res.json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: admin.id,
        username: admin.username,
        name: admin.name,
        email: admin.email,
        role: admin.role
      }
    });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ success: false, message: 'Internal server error during authentication' });
  }
});

module.exports = router;
