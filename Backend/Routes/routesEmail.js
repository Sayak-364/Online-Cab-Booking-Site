const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const handlebars = require('handlebars');
const nodemailer = require('nodemailer');
const jwt = require("jsonwebtoken")
// Load and compile the Handlebars template
const templateSource = fs.readFileSync(path.join(__dirname, '..', 'Mail', 'passwordChange.hbs'), 'utf-8'); // Adjust path if necessary
const template = handlebars.compile(templateSource);

router.post('/send', async (req, res) => {
    try {
        const user = jwt.verify(req.cookies.token || '',"secret_key")
        console.log( user);

        // Render the HTML with dynamic data
        const htmlContent = template({
            headerText: 'Thank You for Choosing Us',
            recipientName: `${user.name}`,
            bodyText: `We have received a request to change your password. If you initiated this request, please follow the instructions below to reset your password.<br><br>
                        If you did not request a password change, please ignore this email. We take your account security seriously and recommend that you update your password regularly to keep your account safe.`,
            buttonLink: `http://localhost:5173/reset-password?email=${encodeURIComponent(user.email)}`,
            buttonText: 'Change Password'
        });

        // Create a transporter using your email service
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'bsayak50@gmail.com', // Your Gmail address
                pass: 'ueyp gxfe apar vgfr', // Your generated app password
            }
        });

        // Define email options
        const mailOptions = {
            from: {
                name: 'CAR BOOK',
                address: 'bsayak50@gmail.com', // Your Gmail address
            },
            to: 'bhattacharyas364@gmail.com', // List of receivers
            subject: 'Change Password Request',
            html: htmlContent, // HTML body
        };

        // Send mail
        await transporter.sendMail(mailOptions);
        res.status(200).send({ message: "Email sent successfully" });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message:error.message });
    }
});


module.exports = router;
