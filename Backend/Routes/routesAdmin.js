const express = require('express')
const router = express.Router()
const User = require('../models/user')

router.post('/create', async (req,res)=>{
    try{
        let {name,email,password} = req.body
        name = name.trim()
        email = email.trim()
        password = password.trim()

        console.log(name,email,password)
        const user = new User({name,email,password,role:"admin"})
        if(user){
            await user.save()
            res.status(200).send({message:'Admin is created successfully'})
        }
        else{
            res.status(400).send({error:'email used'})
        }
    }
    catch(error){
        res.status(400).send({error:error.message})
    }
})

router.get('/getadmin',async (req,res)=>{
    try{
        const response = await User.find({ role: "admin" }).select("-password")
        if(response){
            res.status(202).send(response)
        }
        else{
            res.status(300).send({error:'no admin found'})
        }
    }
    catch(error){
        res.status(400).send({error:error.message})
    }
})

router.post('/delete',async (req,res)=>{
    try{
        const response = await User.findByIdAndDelete(req.body.id)
        if(response){
            res.status(200).send({message:'Delete successfull'})
        }
        else{
            res.status(400).send({error:'Delete failed'})
        }
    }
    catch(error){
        res.status(200).send({error:error.message})
    }
})

module.exports = router