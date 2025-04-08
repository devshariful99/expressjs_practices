const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('./models/userModel');

const app = express();
app.use(express.json());

// Signup route
app.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists.' });

    const user = await User.create({ name, email, password });

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      'secretkeyappearshere',
      { expiresIn: '1h' }
    );

    res.status(201).json({
      success: true,
      data: {
        userId: user._id,
        email: user.email,
        token,
      },
    });
  } catch (err) {
    console.error('Signup Error:', err.message);
    res.status(500).json({ message: 'Signup failed. Please try again.' });
  }
});

// Login route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid email or password.' });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid email or password.' });

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      'secretkeyappearshere',
      { expiresIn: '1h' }
    );

    res.status(200).json({
      success: true,
      data: {
        userId: user._id,
        email: user.email,
        token,
      },
    });
  } catch (err) {
    console.error('Login Error:', err.message);
    res.status(500).json({ message: 'Login failed. Please try again.' });
  }
});


// Me route
app.get('/me', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Authorization token is required.' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, 'secretkeyappearshere');
    
    // Fetch user from DB
    const user = await User.findById(decoded.userId).select('-password'); // exclude password

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (err) {
    console.error('Me Route Error:', err.message);
    res.status(401).json({ message: 'Invalid or expired token.' });
  }
});

// Connect to MongoDB and start server
mongoose.connect('mongodb://localhost:27017/testDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  app.listen(3000, () => {
    console.log('✅ Server is running on http://localhost:3000');
  });
})
.catch((err) => {
  console.error('❌ MongoDB connection failed:', err.message);
});
