const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require("body-parser")
const cookieParser = require('cookie-parser');
const express = require('express')
const app = express()
const routesUser = require('./Routes/routesUser')
const routesCar = require('./Routes/routesCar')
const routesContact = require('./Routes/routesContact')
const routesMessage = require('./Routes/routesMessage')
const routesBlog = require('./Routes/routesBlog')
const routesAdmin = require('./Routes/routesAdmin')
const routesPrivate = require('./Routes/routesPrivate')
const routesEmail = require('./Routes/routesEmail')
const routesOTP = require('./Routes/routesOTP')
const routesPayments = require('./Routes/routesPayments')
const path = require('path')
const routesReview = require('./Routes/routesReview')
const OTP = require('./models/otp')



mongoose.connect('mongodb://0.0.0.0:27017/cab-booking')
.then(() => {
    console.log('Connected to MongoDB');
}).catch(err => console.error('Error connecting to MongoDB:', err));

app.use(cors({ origin: true, credentials: true }))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }))

app.use("/user",routesUser)
app.use('/car',routesCar)
app.use('/contact',routesContact)
app.use('/message',routesMessage)
app.use('/blog',routesBlog)
app.use('/admin',routesAdmin)
app.use('/private',routesPrivate)
app.use('/email',routesEmail)
app.use('/otp',routesOTP)
app.set('view engine','hbs')
app.set('views',path.join(__dirname,'hbs'))
app.use('/review',routesReview)
app.use('/payment',routesPayments)



app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,'public','getByEmail.html'))
})

app.listen(3000,()=>{
    console.log("server is live ... ")
})
