const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true, 
        minlength: 3,
    },
    email: {
        type: String,
        required: true, 
        unique: [true, "Email already exists"], 
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Invalid email");
            }
        },
    },
    password: {
        type: String, 
        validate(value) {
            if (value && value.length < 5) {
                throw new Error("Password must be at least 5 characters long");
            }
        },
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
});

module.exports = mongoose.model("User", userSchema);
