// Backend/server.js

const express = require('express');
const cors = require('cors');
const path = require('path'); // Make sure to import path
const app = express();
const port = process.env.PORT || 5000;
const productRoutes = require('./routes/productRoutes');
const orderControl = require('./routes/orderControl');
const addressRoutes = require('./routes/addressRoutes.js'); 
const blogRoutes = require('./routes/blogRoutes');

// Import the database connection
const db = require('./routes/dbconnect');

// Middleware
app.use(cors()); // Allow CORS
app.use(express.json()); // Parse JSON request bodies

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

  // TODO: Hash the password before storing it
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

// Route to handle orders
app.post('/orders', async (req, res) => {
  const { orders, paymentMethod, userEmail } = req.body;

  if (!orders || !paymentMethod || !userEmail) {
    return res.status(400).json({ message: 'Missing orders, payment method, or user email.' });
  }

  const insertOrderQuery = `
    INSERT INTO orders (productID, frontImg, backImg, productName, productPrice, productReviews, quantity, paymentMethod, userEmail, status) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const dbPromises = orders.map(order => {
    const { productID, frontImg, backImg, productName, productPrice, productReviews, quantity } = order;
    const status = order.status || 'Pending'; // Default status to "Pending"

    return db.query(insertOrderQuery, [
      productID, frontImg, backImg, productName, productPrice, productReviews, quantity, paymentMethod, userEmail, status
    ]);
  });

  try {
    await Promise.all(dbPromises);
    res.status(201).json({ message: 'Orders saved successfully.' });
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ message: 'Server error.' });
  }
});

// Route to retrieve orders
app.get('/orders', async (req, res) => {
  const { userEmail } = req.query;

  const query = userEmail
    ? 'SELECT * FROM orders WHERE userEmail = ? ORDER BY createdDate DESC'
    : 'SELECT * FROM orders ORDER BY createdDate DESC';

  try {
    const [results] = userEmail
      ? await db.query(query, [userEmail])  // Filter by userEmail if provided
      : await db.query(query);  // Fetch all orders if no userEmail is provided

    // Group orders by createdDate and userEmail
    const groupedOrders = {};
    results.forEach(order => {
      const key = `${order.createdDate}_${order.userEmail}`;
      if (!groupedOrders[key]) {
        groupedOrders[key] = {
          createdDate: order.createdDate,
          userEmail: order.userEmail,
          totalItem: 0,
          totalPrice: 0,
          orders: []
        };
      }
      
      // Add to the totalItem and totalPrice
      groupedOrders[key].totalItem += order.quantity;
      groupedOrders[key].totalPrice += parseFloat(order.productPrice) * order.quantity;
      groupedOrders[key].orders.push(order);
    });

    // Convert groupedOrders object into an array
    const groupedOrdersArray = Object.values(groupedOrders);
    res.json({ orders: groupedOrdersArray });
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ message: 'Server error.' });
  }
});

// API route to get orders
app.get("/view-orders", (req, res) => {
  const query = "SELECT * FROM orders";
  db.query(query, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});


// For Admin Panel
app.use(productRoutes);

//View and Update order
app.use(orderControl);

// Serve static files from the 'files/images' directory
app.use('/files/images', express.static(path.join(__dirname, 'files', 'images')));

app.use('/addresses', addressRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

//blog

app.use('/blogs', blogRoutes); // Mounts the blog routes under '/blogs'

app.use('/files/blogs', express.static(path.join(__dirname, 'files', 'blogs')));
