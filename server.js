const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use('/uploads', express.static('uploads'));

// Database Connection
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/commerce-helper', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

connectDB();

// Routes - Auth & Users
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));

// Routes - Products & Orders
app.use('/api/products', require('./routes/products'));
app.use('/api/orders', require('./routes/orders'));

// Routes - Analytics & Reports
app.use('/api/analytics', require('./routes/analytics'));
app.use('/api/payments', require('./routes/payments'));

// Routes - Revenue Systems (NEW)
app.use('/api/subscriptions', require('./routes/subscriptions'));
app.use('/api/commissions', require('./routes/commissions'));
app.use('/api/reviews', require('./routes/reviews'));
app.use('/api/coupons', require('./routes/coupons'));
app.use('/api/advertisements', require('./routes/advertisements'));
app.use('/api/revenue', require('./routes/revenue'));

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'Server is running ✅',
    timestamp: new Date(),
    environment: process.env.NODE_ENV
  });
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: 'Something went wrong!', 
    error: process.env.NODE_ENV === 'development' ? err.message : {} 
  });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`
🚀 ===================================
   منصة التجارة الإلكترونية
   Commerce Helper Platform
🚀 ===================================
   🔗 Server running on port ${PORT}
   📍 Environment: ${process.env.NODE_ENV}
   📊 Database: Connected
🚀 ===================================
  `);
});
