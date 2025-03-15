const express = require('express')
const router = express.Router()
const Message = require('../models/messages')

router.post('/create',async (req,res)=>{
    
    try{
        const {name,email,subject,message} = req.body
        
        const m = await new Message({name,email,subject,message})
        await m.save()
        if(m){
            res.status(200).send({message:"Message is send",id:m._id})
        }
        else{
            res.status(404).send({error:"Try again"})
        }
    }
    catch(error){
        res.status(200).send({error: "Failed : "+error.message})
    }


})

router.get('/get',async (req,res)=>{
    try{
        const messages = await Message.find()
        if(messages){
            res.status(200).send(messages)
        }
        else{
            res.status(404).send({error : "No Messages"})
        }
    }
    catch(error){
        res.status(404).send({error: "Failed : "+error.message})
    }
})

router.post('/delete', async (req, res) => {
    try {
      const id = req.body.id; // Assuming the id is sent in the request body
      console.log(id)
      const m = await Message.findByIdAndDelete(id);
  
      if (m) {
        res.status(200).send({ message: "Delete successful" });
      } else {
        res.status(404).send({ error: "No document found with the provided ID" });
      }
    } catch (error) {
      res.status(500).send({ error: "Failed: " + error.message });
    }
  });

module.exports = router
