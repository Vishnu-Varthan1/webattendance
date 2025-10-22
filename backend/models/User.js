const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  passwordHash: String, // store hashed password
  role: { type: String, enum: ['admin', 'teacher', 'student'], default: 'student' }
});

module.exports = mongoose.model('User', userSchema);
