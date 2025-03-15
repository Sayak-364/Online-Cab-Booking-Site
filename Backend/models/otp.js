const mongoose = require('mongoose')

const otpSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    otp:{
        type:Number,
        requires:true,
        
    },
    createdAt:{
        type:Date,
        default:Date.now,
        expires:10
    }
})

const OTP = new mongoose.model('OTP',otpSchema)

module.exports=OTP