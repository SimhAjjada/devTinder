 const express = require("express");

 const app = express();

 

 app.get("/user", (req,res) => {
      res.send({ firstname: "Simha" , lastname: "A"})
 });

 app.post("/user", (req,res) =>{
      res.send("Data Successfully saved to database")
 });

 app.delete("/user", (req,res) =>{
   res.send("Deleted Successfully")
 });

 app.use("/test",(req,res) =>{
    res.send("Hello , you can test the server");
 });

 

 app.listen(7777, () => {
    console.log("Server is running successfully on port 7777");
 });