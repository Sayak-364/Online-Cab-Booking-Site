const express = require('express')
const router = express.Router()
const User = require('../models/user')
const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');

const key="secret_key"
const client = new OAuth2Client('1081870502893-onb71taj1m6vqhme2e8q3q8q35fmhkd7.apps.googleusercontent.com');

const generateToken = (user) => {
    return jwt.sign({
            name:user.name,
            email:user.email,
            role:user.role
    }, key,{expiresIn:'7d'} )
}



router.post('/verifyinputs',async (req,res)=>{
    try{
        let input_error=0
        let {name,email,password} = req.body

        name = name.trim();
        email = email.trim();

        if( ! email.trim().endsWith(".com")){
            input_error=1
        }
        else if(password.length <5 ){
            input_error=2
        }
        else{
            input_error=0
        }

        if(input_error==1){
            res.status(201).send({error:"Enter a valid Email",result:false}) 
        } 
        else if(input_error==2) {
            res.status(201).send({error:"Password must be at least 5 characters long",result:false}) 
        }
        else{
            const user = await User.findOne({email:email}).select("-id -name -password -role")
            if(user){
                res.status(201).send({error:"Email already exist",result:false}) 
            }
            else{
                res.status(201).send({result:true}) 
            }
        }
    }
    catch(error){
        res.status(201).send({error:error.message,result:false})
    }
})


router.post('/create',async (req,res)=>{
    try{
        const {name,email,password} = req.body
        const user = new User({name,email,password})
        const response = await user.save()
        if(response){
            res.status(201).send({message:"User is created successfully"}) 
        }
        else{
            res.status(400).send({error:"Error try again"}) 
        }
    }
    catch(error){
        res.status(400).send({error:error.message}) 
    }
})

router.get('/get',async (req,res)=>{
   try{
        const users = await User.find({role:"user"}).select("-password")

        
            res.status(200).send(users)
        
       
    }
    catch(err){
        res.status(400).send({error:"faild"+err.message})
    }
})
router.post('/auth/google/register', async (req, res) => {
    const { token } = req.body;

    try {
        // Verify the Google ID token
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: '1081870502893-onb71taj1m6vqhme2e8q3q8q35fmhkd7.apps.googleusercontent.com',
        });
        const payload = ticket.getPayload();

        // Check if the user already exists
        let user = await User.findOne({ email: payload.email });
        if (user) {
            return res.status(400).json({ error: "User already registered" });
        }

        // Create and save the new user
        user = new User({
            name: payload.name,
            email: payload.email,
            password: '',  // Google users don't need a password
            role: 'user',
        });
        await user.save();

        // Generate authentication token
        const authToken = generateToken(user);

        // Send response indicating success
        return res.status(201).json({ token: authToken, message: `${user.name} is registered successfully` });
    } catch (err) {
        console.error("Google registration error:", err);
        if (!res.headersSent) { // Check if headers have already been sent
            return res.status(400).json({ error: "Google registration failed: " + err.message });
        }
    }
});




router.post('/auth/google/login', async (req, res) => {
    const { token } = req.body;
    
    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: '1081870502893-onb71taj1m6vqhme2e8q3q8q35fmhkd7.apps.googleusercontent.com',
        });
        const payload = ticket.getPayload();

        // Check if user exists
        let user = await User.findOne({ email: payload.email });
        if (!user) {
            return res.status(404).json({ error: "User not registered" });
        }

        const authToken = generateToken(user);

        // Set cookie
        res.cookie('token', authToken, { httpOnly: true, secure:false});
        return res.status(200).json({ token: authToken, message: `${user.name} is logged in successfully` });
    } catch (err) {
        console.error("Google login error:", err);
        return res.status(400).json({ error: "Login failed or You need Signup First " + err.message });
    }
});


router.post('/getbyemail',async (req,res)=>{
    try{
         let user = await User.findOne({email:req.body.email}).select("-password")
            if(user){
                /*res.render('getByEmail',{user}) */
                //* res.status(201).send({message:`${user.email} is logged in sucessfully  `})
                const query = {
                    email: req.body.email.trim(),
                    password: req.body.password
                };
                user = await User.findOne(query).select("-_id -password")
                if(user){
                    const token = generateToken(user)
                    res.cookie('token',token,{http:true,secure:false})
                    res.status(201).json({message:`${user.name} is logged in sucessfully  `})
                }
                else{
                    res.status(201).json({error:`password did not match `})
                }

            }
            else{
                // res.render('getByEmail',{user:null})
                res.status(201).json({error:"user not found"})
            }
     }
     catch(err){
         res.status(400).json({error:"faild"+err.message})
     }
 })


 router.put('/update',async(req,res)=>{
    try{
        const email = req.body.email
        const newPassword = req.body.password

        const data = await User.findOne({email}).select("name email role")
        const newData = {
            name:data.name, email:data.email ,password:newPassword , role:data.role
        }

        const user = await User.findOneAndUpdate({email},newData,{new:true})
        if(user){
            res.status(200).json({message:"Updated Successfully"})
        }
        else{
            res.status(404).json({error:"Failed"})
        }
    }
    catch(error){
        console.log(error.message)
        res.status(404).json({error:error.message})
    }

 })

 router.post('/delete', async (req, res) => {
    try {
      const { id } = req.body;
  
      const response = await User.findByIdAndDelete(id);
      if (response) {
        res.status(200).send(response);
      } else {
        res.status(404).send("User not found");
      }
    } catch (error) {
      res.status(500).send(error.message);
    }
  });



module.exports=router