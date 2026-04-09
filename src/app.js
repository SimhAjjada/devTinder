const express = require("express");

const connectDB =require("./config/database")

const app = express();

const User = require("./models/user");

app.use(express.json());

app.post("/signup", async(req, res) => {
   const user = new User(req.body);
   
try {
   await user.save();
   res.send("user added successfully");
} catch (err) {
   res.send("Error in adding user!!",err);
   console.log(err);
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

app.patch("/user", async(req,res) =>{
   const userId = req.body.userId;
   const data = req.body;

   try{
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




