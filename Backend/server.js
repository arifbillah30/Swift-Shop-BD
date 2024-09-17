const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

// Import the database connection
const db = require('./dbconnect');

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true // Ensures cookies are sent with requests
}));
app.use(express.json());

// Route to test if the server is working
app.get('/', (req, res) => {
  res.json({ message: 'Hello from the backend!' });
});

// Route to handle user registration
app.post('/register', async (req, res) => {
  const { displayName, email, password } = req.body;

  if (!displayName || !email || !password) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  const query = 'INSERT INTO userdata (displayName, email, password) VALUES (?, ?, ?)';
  try {
    await db.query(query, [displayName, email, password]);
    res.status(201).json({ message: 'User registered successfully.' });
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ message: 'Server error.' });
  }
});

// Route to handle user login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  const query = 'SELECT firstName, lastName, displayName, email FROM userdata WHERE email = ? AND password = ?';
  try {
    const [results] = await db.query(query, [email, password]);

    if (results.length > 0) {
      res.json({ message: 'Login successful.', user: results[0] });
    } else {
      res.status(401).json({ message: 'Invalid email or password.' });
    }
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ message: 'Server error.' });
  }
});

// Route to update user details (firstName, lastName, displayName)
app.put('/update-account', async (req, res) => {
  const { email, firstName, lastName, displayName, currentPassword, newPassword } = req.body;

  if (!email || !firstName || !lastName || !displayName) {
    return res.status(400).json({ message: 'Email, first name, last name, and display name are required.' });
  }

  try {
    // Check if currentPassword and newPassword are provided for password change
    if (currentPassword && newPassword) {
      const verifyQuery = 'SELECT password FROM userdata WHERE email = ?';
      const [results] = await db.query(verifyQuery, [email]);

      if (results.length === 0 || results[0].password !== currentPassword) {
        return res.status(401).json({ message: 'Current password is incorrect.' });
      }

      const updatePasswordQuery = 'UPDATE userdata SET password = ? WHERE email = ?';
      await db.query(updatePasswordQuery, [newPassword, email]);
    }

    const updateQuery = 'UPDATE userdata SET firstName = ?, lastName = ?, displayName = ? WHERE email = ?';
    await db.query(updateQuery, [firstName, lastName, displayName, email]);

    console.log(email);
    res.json({ message: 'Account details updated successfully.' });
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ message: 'Server error.' });
  }
});

// Route to update user password
app.put('/update-password', async (req, res) => {
  const { email, currentPassword, newPassword } = req.body;

  if (!email || !currentPassword || !newPassword) {
    return res.status(400).json({ message: 'Email, current password, and new password are required.' });
  }

  const verifyQuery = 'SELECT password FROM userdata WHERE email = ?';
  try {
    const [results] = await db.query(verifyQuery, [email]);

    if (results.length === 0 || results[0].password !== currentPassword) {
      return res.status(401).json({ message: 'Current password is incorrect.' });
    }

    const updateQuery = 'UPDATE userdata SET password = ? WHERE email = ?';
    await db.query(updateQuery, [newPassword, email]);
    res.json({ message: 'Password updated successfully.' });
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ message: 'Server error.' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
