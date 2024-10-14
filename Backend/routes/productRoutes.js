const express = require('express');
const multer = require('multer');
const fs = require('fs/promises'); // Use promises version
const path = require('path');
const mysql = require('mysql2/promise');

const router = express.Router();
const upload = multer({ dest: 'files/images/' }); // Set up multer for file uploads

// MySQL connection setup
const db = require('./dbconnect');

// Function to get the next available filename
const getNextFilename = async (directory, extension) => {
  let index = 1;
  let filename;

  do {
    filename = `${String(index).padStart(2, '0')}.${extension}`; // Format the filename
    index++;
  } while (await fs.access(path.join(directory, filename)).then(() => true).catch(() => false)); // Check if the file exists

  return filename;
};

// Route to handle adding a product
router.post('/add-product', upload.array('images'), async (req, res) => {
  const {
    productname,
    color,
    brand,
    price,
    categories,
    productdesc,
    quantity,
    total_review = 0,
    tags,
  } = req.body;

  const images = req.files; // Assuming images is an array

  if (!images || images.length === 0) {
    return res.status(400).json({ error: 'No images uploaded.' });
  }

  // Array to hold uploaded image paths
  const uploadedImagePaths = [];

  try {
    const imageDirectory = path.join(__dirname, '..', 'files', 'images'); // Directory to save images

    // Ensure the directory exists asynchronously
    await fs.mkdir(imageDirectory, { recursive: true });

    // Process each uploaded image
    for (const image of images) {
      const extension = path.extname(image.originalname).slice(1) || 'jpg'; // Get file extension (default to jpg)
      const newFilename = await getNextFilename(imageDirectory, extension); // Get the next available filename
      const newPath = path.join(imageDirectory, newFilename); // Correct path to new image location

      // Rename the file to the new path
      await fs.rename(image.path, newPath);

      // Construct the relative path
      const relativePath = path.join('files', 'images', newFilename).replace(/\\/g, '/');
      uploadedImagePaths.push(relativePath); // Store the relative path
    }

    // Save product details and image paths to the database
    const [result] = await db.query(
      'INSERT INTO products (product_name, color, brand, price, categories, tags, description, quantity, total_review) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [productname, color, brand, price, categories, tags, productdesc, quantity, total_review] // Set total_review to 0
    );

    const productId = result.insertId;

    // Now save the image paths in the product_images table
    for (const imagePath of uploadedImagePaths) {
      await db.query(
        'INSERT INTO product_images (product_id, image_path) VALUES (?, ?)',
        [productId, imagePath]
      );
    }

    res.status(201).json({ message: 'Product added successfully.', productId });
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ error: 'Internal server error while adding product.' });
  }
});

// Fetch all products
router.get('/products', async (req, res) => {
  try {
    // Fetch product details along with their associated images, excluding those with quantity 0
    const [products] = await db.query(
      `SELECT p.product_id, p.product_name, p.color, p.brand, p.price, p.categories, p.description, p.quantity, p.total_review, pi.image_path
       FROM products p
       LEFT JOIN product_images pi ON p.product_id = pi.product_id
       WHERE p.quantity > 0` // Exclude products with quantity 0
    );

    // Group the products by their IDs to merge multiple images into one product object
    const groupedProducts = products.reduce((acc, product) => {
      const {
        product_id,
        product_name,
        color,
        brand,
        price,
        categories,
        description,
        quantity,
        total_review, // Include total_review in the product object
        image_path,
      } = product;

      if (!acc[product_id]) {
        acc[product_id] = {
          product_id,
          product_name,
          color,
          brand,
          price,
          categories,
          description,
          quantity,
          total_review, // Store total_review
          images: [],
        };
      }

      // Add image to the product's images array
      if (image_path) {
        acc[product_id].images.push(image_path);
      }

      return acc;
    }, {});

    res.json({ products: Object.values(groupedProducts) });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Internal server error while fetching products.' });
  }
});

// Export the router
module.exports = router;