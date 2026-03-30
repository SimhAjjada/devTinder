 const express = require("express");

 const app = express();

 

 app.use("/hello",(req,res) => {
    res.send("Hello from the server");
 });

 app.use("/test",(req,res) =>{
    res.send("Hello , you can test the server");
 });

 app.use("/", (req,res)=>{
    res.send("Hello from dashboard");
 });

 app.listen(7777, () => {
    console.log("Server is running successfully on port 7777");
 });