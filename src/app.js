const express = require("express");

const connectDB =require("./config/database")

const app = express();

const User = require("./models/user");

const {validateSignUpData} = require("./utils/validation")

const bcrypt = require("bcrypt");

const cookieParser = require("cookie-parser");

const jwt = require("jsonwebtoken");   



app.use(express.json());
app.use(cookieParser());

app.post("/signup", async(req, res) => {
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




app.post("/login", async(req,res) =>{
   try{

      const {emailId, password} = req.body;

      const user = await User.findOne({emailId: emailId});

      if(!user){
         throw new Error("Invalid credentials");
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if(isPasswordValid){

         // create a JWT token

         const token = await jwt.sign({_id: user._id}, "Dev@Tinder$6554");

         console.log(token)

         // add the token to cookie and send the response back to user

         res.cookie("token", token);

         res.send("Login Successful!");
      }else{
         throw new Error("Invalid credentials");
      }

   }catch(err){
      res.status(400).send("ERROR:" + err.message);
   }
});

app.get("/profile", async(req,res)=>{
   try{
      const cookies = req.cookies;

      const {token} = cookies;

      // validate my token
      if(!token){
         throw new Error("Invalid Token");
      };

      const decodedMessage = await jwt.verify(token, "Dev@Tinder$6554");

      const {_id} = decodedMessage;
      console.log("Logged In user is: " + _id);

      const user = await User.findById(_id);
      if(!user){
         throw new Error("user not found");
      };



      
      res.send(user);
   }catch{
      res.status(400).send("ERROR" + err.message)
   }
})

// get user by email

app.get("/user", async(req,res) =>{
   const userEmail = req.body.emailId;

   try{
      const users = await User.find({emailId : userEmail});

      if(users.length == 0){
         res.status(400).send("User not found");
      }
      else{
         res.send(users);
      }

   } catch(err){
      res.status(400).send("Something went wrong");
   }
});

// Feed API - GET /feed - get all the users from the datbase

app.get("/feed", async(req,res) => {

   try{
      const users = await User.find({});
      res.send(users);
   } catch(err){
      res.status(400).send("Something went wrong");
   }
});


// Delete a user

app.delete("/user", async(req,res) =>{
   const userId = req.body.userId;

   try{
      const user =  await User.findOneAndDelete({ _id: userId });
      console.log(user);
      res.send("User Deleted Successfully");
      
   }catch(err){
      res.status(400).send("Something went wrong");
   }
})

// update the user

app.patch("/user/:userId", async(req,res) =>{
   const userId = req.params?.userId;
   const data = req.body;

   try{

      const ALLOWED_UPDATES = [ "photoUrl", "about", "gender", "skills"];
      const isUpdatedAllowed = Object.keys(data).every((k) =>
         ALLOWED_UPDATES.includes(k)
      );
      if(!isUpdatedAllowed) {
         throw new Error("update not allowed");
      }
      if(data?.skills.length > 10){
         throw new Error("Skills cannot be more than 10");
      }
      const user = await User.findByIdAndUpdate(userId,data,{
         runValidators : true
      });
      res.send("user data updated successfully");
   } catch(err){
      res.status(400).send("User not found"+ err.message);
   }
})

connectDB()
    .then(() => {
         console.log("Database connection established...");
         app.listen(7777, () => {
         console.log("Server is running successfully on port 7777");
   });
    })
    .catch((err) => {
        console.log("Database cannot be connected!!",err)
    });




