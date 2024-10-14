const express = require('express');
const router = express.Router();
const db = require('./dbconnect');
const Joi = require('joi'); // Import Joi for validation

// Middleware to check for authentication can be added here if needed

// Schema for validating address data
const addressSchema = Joi.object({
  userEmail: Joi.string().email().required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  companyName: Joi.string().allow(''),
  country: Joi.string().required(),
  city: Joi.string().required(),
  postcode: Joi.string().required(),
  phone: Joi.string().required(),
  addressLine: Joi.string().required(),
  addressType: Joi.string().valid('billing', 'shipping').required(), 
});

// Centralized error handler
const errorHandler = (err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Something went wrong' });
};

// Get all addresses for a user
router.get('/:email', async (req, res) => {
  const { email: userEmail } = req.params;

  if (!userEmail) {
    return res.status(400).json({ error: 'Email is required' });
  }

  const query = `SELECT * FROM address WHERE user_email = ?`;

  try {
    const [results] = await db.query(query, [userEmail]);
    // Always return an array even if there are no addresses
    res.json({ success: true, data: results }); 
  } catch (err) {
    console.error("Error fetching addresses:", err);
    res.status(500).json({ error: 'Database error' });
  }
});

// Get addresses for a user by type
router.get('/:email/:type', async (req, res) => {
  const { email: userEmail, type: addressType } = req.params;

  if (!userEmail || !addressType) {
    return res.status(400).json({ error: 'Email and address type are required' });
  }

  const query = `SELECT * FROM address WHERE user_email = ? AND address_type = ?`;

  try {
    const [results] = await db.query(query, [userEmail, addressType]);
    if (results.length === 0) {
      return res.status(404).json({ error: 'Address not found' });
    }
    res.json({ success: true, data: results[0] });
  } catch (err) {
    console.error("Error fetching address:", err);
    res.status(500).json({ error: 'Database error' });
  }
});

// Update address
router.put('/:email/:type', async (req, res) => {
  const { email: userEmail, type: addressType } = req.params;
  const { firstName, lastName, companyName, country, city, postcode, phone, addressLine } = req.body;

  // Validate request body
  const { error } = addressSchema.validate({ 
    ...req.body, 
    userEmail, 
    addressType 
  });
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const query = `UPDATE address 
                 SET first_name = ?, last_name = ?, company_name = ?, 
                     country = ?, city = ?, postcode = ?, phone = ?, address_line = ? 
                 WHERE user_email = ? AND address_type = ?`;

  try {
    const [result] = await db.query(query, [
      firstName, lastName, companyName, country, city, 
      postcode, phone, addressLine, userEmail, addressType
    ]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Address not found' });
    }
    res.json({ success: true, message: 'Address updated successfully' });
  } catch (err) {
    console.error("Error updating address:", err);
    res.status(500).json({ error: 'Database error' });
  }
});

// Add address
router.post('/', async (req, res) => {

  // Validate request body
  const { error } = addressSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const { userEmail, firstName, lastName, companyName, country, city, postcode, phone, addressLine, addressType } = req.body;

  const query = `INSERT INTO address (user_email, first_name, last_name, company_name, country, city, postcode, phone, address_line, address_type) 
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  try {
    await db.query(query, [
      userEmail, firstName, lastName, companyName, country, 
      city, postcode, phone, addressLine, addressType
    ]);
    res.status(201).json({ success: true, message: 'Address added successfully' });
  } catch (err) {
    console.error("Error adding address:", err);
    res.status(500).json({ error: 'Database error' });
  }
});

// Error handling middleware
router.use(errorHandler);

module.exports = router;