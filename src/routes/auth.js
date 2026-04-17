const express = require("express");
const {validateSignUpData} = require("../utils/validation");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const authRouter = express.Router();

authRouter.post("/signup", async(req, res) => {
 try {
   // validation of data
   validateSignUpData(req);

   const { firstName,lastName,emailId, password} = req.body;
   // Encrypt the password
   const passwordHash = await bcrypt.hash(password,10)
   console.log(passwordHash);

   // creating a new instance of the user
   const user = new User({
      firstName,
      lastName,
      emailId,
      password:passwordHash
   });
   

   await user.save();
   res.send("user added successfully");
} catch (err) {
   res.send("ERROR :" + err.message);
   console.log(err);
}
});

authRouter.post("/login", async(req,res) =>{
   try{

      const {emailId, password} = req.body;

      const user = await User.findOne({emailId: emailId});

      if(!user){
         throw new Error("Invalid credentials");
      }

      const isPasswordValid = await user.validatePassword(password);
      if(isPasswordValid){

         // create a JWT token

         const token = await user.getJWT();

         
         // add the token to cookie and send the response back to user

         res.cookie("token", token, {
            expires: new Date(Date.now() + 8 * 3600000)
         });

         res.send("Login Successful!");
      }else{
         throw new Error("Invalid credentials");
      }

   }catch(err){
      res.status(400).send("ERROR:" + err.message);
   }
});

authRouter.post("/logout", async(req,res) =>{
   res.cookie("token", null , {
      expires: new Date (Date.now()),
   });

   res.send("Logout Successful");
})


module.exports = authRouter;