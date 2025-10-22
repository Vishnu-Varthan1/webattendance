const express = require('express');
const router = express.Router();
const Attendance = require('../models/Attendance');

// Create attendance record
router.post('/', async (req, res) => {
  try {
    const { student_id, date, status } = req.body;

    const newAttendance = new Attendance({
      student_id,
      date,
      status,
    });

    await newAttendance.save();

    res.status(201).json({ message: 'Attendance recorded' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to record attendance' });
  }
});

// Get attendance for a specific student (by studentId route param)
router.get('/:studentId', async (req, res) => {
  try {
    const attendanceRecords = await Attendance.find({ student_id: req.params.studentId });
    res.json(attendanceRecords);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch attendance' });
  }
});

// Get attendance by date or student_id using query parameters ?date=...&student_id=...
router.get('/', async (req, res) => {
  try {
    const { date, student_id } = req.query;

    const filter = {};
    if (date) filter.date = new Date(date);
    if (student_id) filter.student_id = student_id;

    const records = await Attendance.find(filter);
    res.json(records);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch attendance records' });
  }
});

module.exports = router;
