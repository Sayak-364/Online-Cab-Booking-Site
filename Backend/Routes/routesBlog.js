// routes/blog.js
const express = require('express');
const router = express.Router();
const Blog = require('../models/blog'); // Ensure the path is correct
const uploadblog = require('../middleware/blog.multer');

// Route to create a new blog
router.post('/create', uploadblog.single('blogImage'), async (req, res) => {
  try {
    const date = new Date();
    const { heading, text } = req.body;
    const blogImage = req.file ? req.file.path : null; // Cloudinary URL

    const blog = new Blog({ date, heading, text, blogImage });
    await blog.save();

    res.status(200).send({ message: "Blog is created", id: blog._id });
  } catch (error) {
    res.status(500).send({ error: "Failed: " + error.message });
  }
});




// Route to get all blogs
router.get('/get', async (req, res) => {
    try {
        const blogs = await Blog.find();
        blogs.reverse()
        if (blogs.length > 0) {
            res.status(200).send(blogs);
        } else {
            res.status(404).send({ error: "No blogs found" });
        }
    } catch (error) {
        res.status(500).send({ error: "Failed: " + error.message });
    }
});

// Route to delete a blog by ID
router.post('/delete', async (req, res) => {
    try {
        const id = req.body.id; // Assuming the id is sent in the request body
        const blog = await Blog.findByIdAndDelete(id);

        if (blog) {
            res.status(200).send({ message: "Delete successful" });
        } else {
            res.status(404).send({ error: "No document found with the provided ID" });
        }
    } catch (error) {
        res.status(500).send({ error: "Failed: " + error.message });
    }
});

module.exports = router;
