const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  carId: { type: mongoose.Schema.Types.ObjectId, ref: 'Car', required: true },
  comment: { type: String, required: true },
  rating: { type: Number, required: true },
  date:{type:Date,default:Date.now}
  // Other fields like user info, timestamps, etc.
});

module.exports = mongoose.model('Review', reviewSchema);


