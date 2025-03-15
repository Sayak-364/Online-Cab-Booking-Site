const express = require('express');
const router = express.Router();
const Review = require('../models/review'); // Make sure the path is correct


// Route to create a new review
router.post('/create', async (req, res) => {
    const { carId, comment, rating,date } = req.body;
    try {
      const newReview = new Review({ carId, comment, rating,date});
      await newReview.save();
      res.status(201).send(newReview);
    } catch (error) {
      res.status(500).send({ error: "Failed to create review: " + error.message });
    }
  });
  

// Endpoint to get reviews with pagination
router.get('/get', async (req, res) => {
    const { carId, page = 1, limit = 10 } = req.query;
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);
  
    try {
      // Get total number of reviews for the car
      const totalReviews = await Review.countDocuments({ carId });
  
      // Fetch reviews with pagination
      const reviews = await Review.find({ carId })
        .skip((pageNumber - 1) * limitNumber)
        .limit(limitNumber)
        .sort({ date: -1 }); // Sort by date descending
  
      // Calculate total pages
      const totalPages = Math.ceil(totalReviews / limitNumber);
  
      // Send the response
      res.json({
        reviews,
        totalPages,
        totalReviews
      });
    } catch (error) {
      console.error('Error fetching reviews:', error);
      res.status(500).send({ error: 'Internal Server Error' });
    }
  });
  
  
  

// Route to delete a review by ID
router.delete('/delete', async (req, res) => {
    try {
        const id = req.body.id; // Assuming the id is sent in the request body
        const review = await Review.findByIdAndDelete(id);

        if (review) {
            res.status(200).send({ message: "Delete successful" });
        } else {
            res.status(404).send({ error: "No document found with the provided ID" });
        }
    } catch (error) {
        res.status(500).send({ error: "Failed: " + error.message });
    }
});

module.exports = router;