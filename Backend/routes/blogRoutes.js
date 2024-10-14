const express = require('express');
const multer = require('multer');
const fs = require('fs/promises');
const path = require('path');
const mysql = require('mysql2/promise');

const router = express.Router();
const upload = multer({ dest: 'files/blogs/' }); // Set up multer for blog image uploads

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

// Route to handle adding a blog post
router.post('/add', upload.single('blogThumbnail'), async (req, res) => {
  const { blogHeading, blogDate, blogContent } = req.body;
  const blogThumbnail = req.file; // Assuming 'blogThumbnail' is the name of the file field

  if (!blogThumbnail) {
    return res.status(400).json({ error: 'Blog thumbnail image is required.' });
  }

  try {
    const imageDirectory = path.join(__dirname, '..', 'files', 'blogs'); // Directory to save blog images

    // Ensure the directory exists asynchronously
    await fs.mkdir(imageDirectory, { recursive: true });

    // Get the file extension (default to jpg if no extension)
    const extension = path.extname(blogThumbnail.originalname).slice(1) || 'jpg';
    const newFilename = await getNextFilename(imageDirectory, extension); // Get the next available filename
    const newPath = path.join(imageDirectory, newFilename); // Correct path to new image location

    // Rename the file to the new path
    await fs.rename(blogThumbnail.path, newPath);

    // Construct the relative path to store in the database
    const relativePath = path.join('files', 'blogs', newFilename).replace(/\\/g, '/');

    // Insert blog details into the 'blog' table
    await db.query(
      'INSERT INTO blog (blogThumbnail, blogDate, blogHeading, blogContent) VALUES (?, ?, ?, ?)',
      [relativePath, blogDate, blogHeading, blogContent]
    );

    res.status(201).json({ message: 'Blog added successfully.' });
  } catch (error) {
    console.error('Error adding blog post:', error);
    res.status(500).json({ error: 'Internal server error while adding blog post.' });
  }
});

// Fetch all blog posts
router.get('/all', async (req, res) => {
  try {
    // Fetch blog posts from the database
    const [blogs] = await db.query('SELECT * FROM blog ORDER BY createdAt DESC');

    res.json(blogs);
  } catch (error) {
    console.error('Error fetching blogs:', error);
    res.status(500).json({ error: 'Internal server error while fetching blogs.' });
  }
});

module.exports = router;