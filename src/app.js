 const express = require("express");

 const app = express();

 

 app.get("/user/:userId/:name/:password", (req,res) => {
      res.send({ firstname: "Simha" , lastname: "A"})
 });

 

 app.listen(7777, () => {
    console.log("Server is running successfully on port 7777");
 });