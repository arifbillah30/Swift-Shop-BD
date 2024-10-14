// Backend/routes/orderControl.js

const express = require('express');
const router = express.Router();
const db = require('./dbconnect'); // Adjust the path to your database connection

// Get all orders
router.get('/all-orders', async (req, res) => {
  try {
    const [orders] = await db.query('SELECT * FROM orders'); // Query the "orders" table
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Get a single order by ID
router.get('/get-orders/:id', async (req, res) => {
  const orderId = req.params.id;
  try {
    const [order] = await db.query('SELECT * FROM orders WHERE id = ?', [orderId]);
    if (order.length === 0) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json(order[0]);
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Update an existing order
router.put('/update-orders/:id', async (req, res) => {
  const orderId = req.params.id;
  const { productName, productPrice, quantity, paymentMethod, status } = req.body;

  try {
    const [result] = await db.query(
      'UPDATE orders SET productName = ?, productPrice = ?, quantity = ?, paymentMethod = ?, status = ? WHERE id = ?',
      [productName, productPrice, quantity, paymentMethod, status, orderId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json({ message: 'Order updated successfully' });
  } catch (error) {
    console.error('Error updating order:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;