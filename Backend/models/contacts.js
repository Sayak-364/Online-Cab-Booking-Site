const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  address: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  }
});

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;
