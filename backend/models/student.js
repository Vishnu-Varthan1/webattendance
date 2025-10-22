const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  student_id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  // Add other fields if needed (e.g., email, class)
});

module.exports = mongoose.model('Student', studentSchema);
