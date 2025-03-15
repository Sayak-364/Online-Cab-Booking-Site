const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({
    razorpay_order_id: {
        type: String,
        required: true,
    },
    razorpay_payment_id: {
        type: String,
        required: true,
    },
    razorpay_signature: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        require: true,
    },
    car_name: {
        type: String,
        require: true,
    },
    fromValue: {
        type: String,
        require: true,
    },
    toValue: {
        type: String,
        require: true,
    },
    name:{
        type:String,
        default:'',
    },
    email:{
        type:String,
        default:'',
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

const Payment = mongoose.model('Payment', PaymentSchema);
module.exports = Payment;
