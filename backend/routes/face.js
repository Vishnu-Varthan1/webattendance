const express = require('express');
const router = express.Router();
const axios = require('axios');
const FaceModel = require('../models/Face'); // Mongo model for face data


// Register face endpoint
router.post('/register', async (req, res) => {
  const { student_id, image } = req.body;
  try {
    // Call AI microservice to register face
    const aiResponse = await axios.post('http://localhost:5001/register', { student_id, image });

    if (aiResponse.data.success) {
      // Save or update face data in MongoDB
      await FaceModel.findOneAndUpdate(
        { student_id },
        { image },
        { upsert: true }
      );
      res.json({ message: 'Face registered successfully' });
    } else {
      res.status(500).json({ message: 'AI face registration failed' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error during face registration' });
  }
});


// Recognize face endpoint
router.post('/recognize', async (req, res) => {
  const { image } = req.body;
  try {
    // Call AI microservice to recognize faces
    const aiResponse = await axios.post('http://localhost:5001/recognize', { image });

    if (aiResponse.data.recognized_students) {
      res.json({ recognized_students: aiResponse.data.recognized_students });
    } else {
      res.json({ recognized_students: [] });
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error during face recognition' });
  }
});

module.exports = router;
