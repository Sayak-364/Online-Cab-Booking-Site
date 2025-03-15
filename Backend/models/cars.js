const mongoose = require('mongoose');
const validator = require('validator');

const carSchema = mongoose.Schema({
    company: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    mileage: {
        type: Number,
    },
    transmission: {
        type: String,
    },
    seats: {
        type: Number,
    },
    luggage: {
        type: Number,
    },
    fuel: {
        type: String,
    },
    features: {
        airConditioning: {
            type: Boolean,
            default: false
        },
        childSeat: {
            type: Boolean,
            default: false
        },
        gps: {
            type: Boolean,
            default: false
        },
        luggage: {
            type: Boolean,
            default: false
        },
        music: {
            type: Boolean,
            default: false
        },
        seatBelt: {
            type: Boolean,
            default: false
        },
        sleepingBed: {
            type: Boolean,
            default: false
        },
        water: {
            type: Boolean,
            default: false
        },
        bluetooth: {
            type: Boolean,
            default: false
        },
        onboardComputer: {
            type: Boolean,
            default: false
        },
        audioInput: {
            type: Boolean,
            default: false
        },
        longTermTrips: {
            type: Boolean,
            default: false
        },
        carKit: {
            type: Boolean,
            default: false
        },
        remoteCentralLocking: {
            type: Boolean,
            default: false
        },
        climateControl: {
            type: Boolean,
            default: false
        }
    },
    description: {
        type: String
    },
     carImage:{
           type:String,
     },
    price: {
        hour: {
            type: Number,
            required: true,
        },
        day: {
            type: Number,
            required: true
        },
        month: {
            type: Number,
            required: true
        }
    },
    
});

module.exports = mongoose.model('Car', carSchema);