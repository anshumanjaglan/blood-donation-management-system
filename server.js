const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const { initDatabase } = require('./config/db');
const apiRoutes = require('./routes/api');
const authRoutes = require('./routes/auth');
const securityRoutes = require('./routes/security');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static frontend files
app.use(express.static(path.join(__dirname, 'public')));

// Mount API routes
app.use('/api/auth', authRoutes);
app.use('/api/security', securityRoutes);
app.use('/api', apiRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    service: 'Blood Donation Management System'
  });
});

// Start Server & Database
async function start() {
  await initDatabase();
  app.listen(PORT, () => {
    console.log(`====================================================`);
    console.log(` Blood Donation Management System is Running!`);
    console.log(` Local URL: http://localhost:${PORT}`);
    console.log(` Admin Portal: http://localhost:${PORT}/admin-login.html`);
    console.log(` Default Admin: username 'admin', password 'password123'`);
    console.log(`====================================================`);
  });
}

start().catch(err => {
  console.error('Fatal startup error:', err);
});
