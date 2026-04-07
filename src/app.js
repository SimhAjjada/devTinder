const express = require("express");

const connectDB =require("./config/database")

const app = express();

const User = require("./models/user");

app.use(express.json());

app.post("/signup", async(req, res) => {
   const user = new User(req.body);
   console.log(user);
try {
   await user.save();
   res.send("user added successfully");
} catch (err) {
   res.send("Error in adding user!!",err);
}
});


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




