const mongoose = require('mongoose');

async function connectDB() {
  try {
    const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/attendance_system';

    await mongoose.connect(mongoURI);
    // Removed deprecated options to avoid warnings

    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection failed:', error);
    process.exit(1); // Exit on failure
  }
}

module.exports = connectDB;
