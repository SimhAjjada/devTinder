 const express = require("express");

 const app = express();

 

 app.get("/user", (req, res, next) => {
      console.log("Handling the route user!!");
      next();
 },
 (req, res, next) => {
      console.log("Handling the route user 2!!");
      next(); 
 },
 (req, res,next) => {
   console.log("Handling the route user 3!!");
   next();
 },
 (req, res, next) => {
   console.log("Handling the route user 4!!");
   next();
 },
 (req, res) => {
   console.log("Handling the route user 5!!");
   res.send("5th response");
 }
);

 

 app.listen(7777, () => {
    console.log("Server is running successfully on port 7777");
 });