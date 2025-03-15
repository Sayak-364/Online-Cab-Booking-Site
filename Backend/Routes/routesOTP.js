const express = require('express');
const router = express.Router();
const OTP = require('../models/otp');
const fs = require('fs');
const path = require('path');
const handlebars = require('handlebars');


const sendEmail = require('../Mail/email')

const createOTP = async (email) => {
    const otp = Math.floor(Math.random() * 900000 + 100000).toString();
    console.log(otp, email);
    const newOtp = new OTP({ email, otp });
    console.log(newOtp);
    return await newOtp.save();
};


const verify = async (email, otp) => {
    try {
        const result = await OTP.findOne({ email, otp });
        return !!result; // return true if OTP is found, otherwise false
    } catch (error) {
        return false;
    }
};

router.post('/create', async (req, res) => {
    try {
        const email = req.body.email;
        const result = await createOTP(email);
        if (result) {
            sendEmail(result.email,result.otp)
            console.log("OTP created successfully");
            res.status(200).json({ message: "OTP created successfully", result: true });
        } else {
            res.status(400).json({ message: "OTP creation failed", result: false });
        }
    } catch (error) {
        res.status(500).json({ message: error.message, result: false });
    }
});

router.post('/verify', async (req, res) => {
    try {
        const { name, email, password, otp } = req.body;
        console.log(email+" "+otp)
        const isVerified = await verify(email, otp.toString());
        if (isVerified) {
            await OTP.findOneAndDelete({ email: email });
            res.status(200).json({ message: "OTP verified successfully", result: true });
        } else {
            res.status(400).json({ error: "!! Wrong OTP !!", result: false });
        }
    } catch (error) {
        res.status(500).json({ error: error.message, result: false });
    }
});

router.post('/delete', async (req, res) => {
    try {
        const { email } = req.body;
        const result = await OTP.findOneAndDelete({ email: email });

        if (result) {
            res.status(200).json({ message: "OTP deleted successfully", result: true });
        } else {
            res.status(400).json({ message: "OTP deletion failed", result: false });
        }
    } catch (error) {
        res.status(500).json({ message: error.message, result: false });
    }
});

module.exports = router;
