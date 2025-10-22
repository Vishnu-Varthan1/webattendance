const express = require('express');
const router = express.Router();
const StudentModel = require('../models/Student');

router.get('/', async (req, res) => {
  try {
    // Fetch all students with student_id and name fields
    const students = await StudentModel.find({}, 'student_id name');
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching students' });
  }
});

module.exports = router;
