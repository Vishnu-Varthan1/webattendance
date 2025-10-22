const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const app = express();

const SECRET_KEY = 'your-secret-key';
const Attendance = require('./models/attendance');

// Use Attendance model to save or query data

app.use(cors());
app.use(express.json());

const attendanceRecords = []; // In-memory storage

// Login route
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  if (username === 'admin' && password === 'admin') {
    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
    return res.json({ token });
  }

  res.status(401).json({ message: 'Invalid credentials' });
});

// Middleware to verify token
function verifyToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ message: 'Unauthorized' });

  const token = authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
    jwt.verify(token, SECRET_KEY);
    next();
  } catch (err) {
    res.status(401).json({ message: 'Unauthorized' });
  }
}

// Protected route example
app.get('/api/protected', verifyToken, (req, res) => {
  res.json({ message: 'This is protected data' });
});

// Attendance POST route - saves attendance in memory
app.post('/api/attendance', verifyToken, (req, res) => {
  attendanceRecords.push(req.body);
  res.json({ message: 'Attendance marked successfully' });
});

// Attendance GET route - returns all attendance records
app.get('/api/attendance', verifyToken, (req, res) => {
  res.json(attendanceRecords);
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
