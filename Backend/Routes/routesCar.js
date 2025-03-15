const express = require('express');
const router = express.Router();
const Car = require('../models/cars');
// const cloudinary= require('../utils/cloudinary');
const upload = require('../middleware/multer')



// Route to create a new car
router.post('/create', upload.single('image'), async (req, res) => {
  try {
    const carData = {
      company: req.body.company,
      model: req.body.model,
      mileage: req.body.mileage,
      transmission: req.body.transmission,
      seats: req.body.seats,
      luggage: req.body.luggage,
      fuel: req.body.fuel,
      description: req.body.description,
      features: JSON.parse(req.body.features || '[]'),
      price: JSON.parse(req.body.price || '0'),
      carImage: req.file ? req.file.path : null // Store the URL of the uploaded image
    };

    const car = new Car(carData);
    await car.save();
    res.status(201).send({ message: "Car is created successfully" });
  } catch (error) {
    console.error('Error creating car:', error); // Log error details for debugging
    res.status(500).send({ error: "Failed: " + error.message });
  }
});


// Route to get all cars
router.get('/get', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Current page
    const limit = parseInt(req.query.limit) || 10; // Number of cars per page
    const skip = (page - 1) * limit;

    // Get total count of cars
    const totalCars = await Car.countDocuments();

    // Fetch paginated cars
    const cars = await Car.find().skip(skip).limit(limit);

    res.status(200).json({
      cars,
      totalPages: Math.ceil(totalCars / limit),
      currentPage: page
    });
  } catch (error) {
    res.status(500).json({ error: "Failed: " + error.message });
  }
});

router.get('/getall', async (req, res) => {  // Use GET instead of POST
  try {
    const cars = await Car.find();
    if (cars.length > 0) {
      res.status(200).send(cars);
    } else {
      res.status(404).send({ error: "No cars to show" });
    }
  } catch (error) {
    res.status(500).send({ error: "Failed: " + error.message });
  }
});



// Route to get a car by model
router.post('/getbymodel', async (req, res) => {
  try {
    console.log(req.body);
    const car = await Car.findOne({ model: req.body.model });  // Await the promise
    if (car) {
      res.status(200).send(car);
    } else {
      res.status(404).send({ error: "Car not found" });
    }
  } catch (error) {
    res.status(500).send({ error: "Failed: " + error.message });
  }
});
router.post('/getbyid/:id', async (req, res) => {
  try {
    // Get the car ID from the URL parameters
    const { id } = req.params;

    // Find the car by ID
    const car = await Car.findById(id);  // Use findById to query by the _id field

    if (car) {
      res.status(200).json(car);
    } else {
      res.status(404).json({ error: "Car not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed: " + error.message });
  }
});


router.put('/update/:id', async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id)
    const updateData = req.body;
    const car = await Car.findByIdAndUpdate( id , updateData, { new: true });

    if (car) {
      res.status(200).send({ message: "Car is updated successfully" });
    } else {
      res.status(404).send({ error: "Car not found" });
    }
  } catch (error) {
    res.status(400).send({ error: "Failed: " + error.message });
  }
});

router.delete('/deletebymodel', async (req, res) => {
  try {
    const { model } = req.query;

    const result = await Car.deleteOne({ model });
    console.log(result);
    if (result.deletedCount > 0) {
      res.status(200).send({ message: "Car successfully deleted" });
    } else {
      res.status(404).send({ error: "Car not found" });
    }
  } catch (error) {
    res.status(500).send({ error: "Failed: " + error.message });
  }
});

module.exports = router;