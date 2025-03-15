const mongoose = require('mongoose')
const validator = require('validator')


const message = mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("invalid email")
            }
        }
    },
    subject:{
        type:String,
        require:true
    },
    message:{
        type:String,
        require:true
    }
})

module.exports = mongoose.model("Message",message)