const express = require('express')
const router = express.Router()
const User = require('../models/user')

const jwt = require('jsonwebtoken');
const messages = require('../models/messages');

const key = 'secret_key'

const verifyToken = (req,res,next) =>{
    const token = req.cookies.token || ''
    
    if(!token){
        return res.status(200).json({error:"Not Authenticated",access:false})
    }
    try{
        const decoded = jwt.verify(token,key)
        req.user = decoded
        console.log(`decoded = ${decoded}`)
        next()
    }
    catch(error){
        return res.status(404).json({error:error.message, access:false})
    }
}

router.get('/protected',verifyToken,(req,res)=>{
    res.status(200).json({access:true})
})

router.get('/admin',verifyToken,(req,res)=>{
    
    try{
        console.log(`res.user = ${req.user}`)
        if(req.user.role === 'admin'){
            res.status(200).json({access:true})
        }
        else{
            res.status(200).json({access:false})
        }
    }
    catch(error){
        return res.status(404).json({error:error.message, access:false})
    }

})

router.get('/get',(req,res,next)=>{
    const token = req.cookies.token || ''
    if(!token){
        res.status(200).send(null)    
    }
    try{
        const decoded = jwt.verify(token,key)
        console.log(decoded)
        res.status(200).send(decoded)
    }
    catch(error){
        res.status(400).send({error:error.message})
    }
})


router.post('/remove',async(req,res,next)=>{
    try{
    console.log("cookie remove")
    res.clearCookie('token', { httpOnly: true, secure: true });
    res.status(200).json({status:true})
    }
    catch(error){
        console.log(error.message)
        res.status(404).send({messages:error.message})
    }
})

module.exports = router
