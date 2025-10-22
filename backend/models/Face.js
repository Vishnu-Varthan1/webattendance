const mongoose = require('mongoose');

const faceSchema = new mongoose.Schema({
  student_id: { type: String, required: true, unique: true },
  image: { type: String, required: true }, // base64 or URL
  // add other necessary fields here
});

module.exports = mongoose.model('Face', faceSchema);
