const express = require("express");

const connectDB =require("./config/database")

const app = express();

const User = require("./models/user");


app.post("/signup", async(req, res) => {
   const user = new User({
      firstName : "Virat",
      lastName : "Kohli",
      emailId : "virat@gmail.com",
      password :"virat@123"
   });
try {
   await user.save();
   res.send("user added successfully");
} catch (err) {
   res.send("Error in adding user!!",err);
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




