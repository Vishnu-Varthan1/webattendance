const mongoose = require('mongoose');
const Student = require('./models/Student');

const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/attendance_system';

const students = [
  { student_id: 'S101', name: 'Alice Johnson' },
  { student_id: 'S102', name: 'Bob Smith' },
  { student_id: 'S103', name: 'Charlie Brown' },
  { student_id: 'S104', name: 'Diana Prince' },
];

async function seed() {
  try {
    await mongoose.connect(mongoURI);
    console.log('MongoDB connected for seeding');

    // Clear existing students
    await Student.deleteMany({});
    console.log('Cleared existing students');

    // Insert sample students
    await Student.insertMany(students);
    console.log('Sample students inserted');

    process.exit(0);
  } catch (err) {
    console.error('Error seeding students:', err);
    process.exit(1);
  }
}

seed();
