const express = require('express');
const router = express.Router();
const Contact = require('../models/contacts');

router.post('/update', async (req, res) => {
  try {
    const updateData = {
      address: req.body.address,
      phone: req.body.phone,
      email: req.body.email
    };

    const contact = await Contact.findOneAndUpdate({ id: "xyz123" }, updateData, { new: true });

    if (contact) {
      res.status(200).send({message:"Successfully updated"});
    } else {
      res.status(404).send({ error: "Please try again" });
    }
  } catch (error) {
    res.status(404).send({ error: 'Failed: ' + error.message });
  }
});

router.get('/get',async (req,res)=>{
  try{
    const contact = await Contact.findOne({id:"xyz123"})
    if(contact){
      res.status(200).send(contact)
    }
    else{
      res.status(404).send({error: "Nothing Found"})
    }
  }
  catch(error){
    res.status(404).send({error: "Failed : "+error.message})
  }
})

module.exports = router;
