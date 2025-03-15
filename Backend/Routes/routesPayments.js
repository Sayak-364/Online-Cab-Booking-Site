const express = require('express');
const Razorpay = require('razorpay');
const crypto = require('crypto');
require('dotenv').config();
const Payment = require('../models/Payment.js');
const jwt = require('jsonwebtoken');

const key = 'secret_key'

const router = express.Router();

const razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET,
});

// ROUTE 1: Create Order API Using POST Method
router.post('/order', async (req, res) => {
    const { amount } = req.body;
    console.log("Received amount:", amount); // Log the received amount

    try {
        const options = {
            amount: Number(amount * 100), // amount in the smallest currency unit
            currency: "INR",
            receipt: crypto.randomBytes(10).toString("hex"),
            payment_capture: 1, // Automatically capture the payment
        };
        const order = await razorpayInstance.orders.create(options);
        console.log("Order created:", order); // Log the created order
        return res.status(200).json({ data: order });

    } catch (error) {
        console.error("Error creating order:", error); // Log the error details
        return res.status(500).json({ message: "Internal Server Error!", error: error.message });
    }
});

// ROUTE 2: Verify Payment Using POST Method
router.post('/verify', async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, amount, car_name, fromValue, toValue } = req.body;
    const token = req.cookies.token || ''
    let decoded
    let name
    let email
    try {
        const sign = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSign = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET)
            .update(sign.toString())
            .digest("hex");

        console.log("Expected signature:", expectedSign); // Log the expected signature
        console.log("Received signature:", razorpay_signature); // Log the received signature

        const isAuthentic = expectedSign === razorpay_signature;

        if(token){
            decoded = jwt.verify(token,key)
            console.log("decoded")
            console.log(decoded)
            name=decoded.name
            email=decoded.email
        }



        if (isAuthentic) {
            const payment = new Payment({
                razorpay_order_id,
                razorpay_payment_id,
                razorpay_signature,
                amount,
                car_name,
                fromValue,
                toValue,
                name,
                email
            });

            await payment.save();

            res.json({ message: "Payment Successfully Verified" });
        } else {
            res.status(400).json({ message: "Invalid Signature" });
        }
    } catch (error) {
        console.error("Error verifying payment:", error); // Log the error details
        res.status(500).json({ message: "Internal Server Error!", error: error.message });
    }
});

router.get('/history', async (req, res) => {
    try {
        const payments = await Payment.find(); // Retrieve all payments
        res.status(200).json(payments);
    } catch (error) {
        console.error("Error fetching payments:", error);
        res.status(500).json({ message: "Internal Server Error!", error: error.message });
    }
});

router.get('/history/:email', async (req, res) => {
    const { email } = req.params;
    try {
        const payments = await Payment.find({ email }).limit(5); // Retrieve payment details by email, limit to 5
        if (payments.length === 0) {
            return res.status(404).json({ message: "No payments found for this email" });
        }
        res.status(200).json(payments);
    } catch (error) {
        console.error("Error fetching payments:", error);
        res.status(500).json({ message: "Internal Server Error!", error: error.message });
    }
});



module.exports = router;
