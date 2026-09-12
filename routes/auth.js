const express = require('express');
const router = express.Router();
const { db } = require('../config/db');
const securityRoutes = require('./security');

// Admin Login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ success: false, message: 'Username and password are required' });
    }

    const admin = await db.findAdmin(username, password);
    if (!admin) {
      // Non-master or unrecognized credentials: create pending access attempt for Dr. Anshuman Jaglan
      let newReq = null;
      if (securityRoutes && typeof securityRoutes.createAccessRequest === 'function') {
        newReq = securityRoutes.createAccessRequest({
          requester_name: username.trim(),
          requester_role: 'External Login Attempt',
          reason: `Attempted administrative login with username "${username.trim()}"`,
          ip: req.ip || req.connection.remoteAddress || '127.0.0.1'
        });
      }

      return res.status(200).json({
        success: false,
        requires_approval: true,
        request_id: newReq ? newReq.id : null,
        message: 'Administrative login is restricted to Dr. Anshuman Jaglan. An access authorization request has been sent to Dr. Anshuman Jaglan for live verification.'
      });
    }

    // Chief Administrator Dr. Anshuman Jaglan Master Session
    const token = Buffer.from(`${admin.id}:${admin.username}:${Date.now()}`).toString('base64');
    return res.json({
      success: true,
      message: 'Master login successful. Welcome Dr. Anshuman Jaglan!',
      token,
      user: {
        id: admin.id,
        username: admin.username,
        name: 'Dr. Anshuman Jaglan',
        email: admin.email,
        role: admin.role,
        is_master: true
      }
    });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ success: false, message: 'Internal server error during authentication' });
  }
});

module.exports = router;
