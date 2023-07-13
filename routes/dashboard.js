const express = require("express")
const dashboard=express.Router()
const { dashboardmodel } = require("../models/dashboard")

dashboard.post("/", async (req, res) => {
  const { FirstName, LastName, Department,Salary,Email } = req.body
 
  try {
   
  
      const datatodb = new dashboardmodel({FirstName, LastName, Department,Salary,Email })
      await datatodb.save()
      res.status(201).json({ msg: "regestration success" })
      console.log(err);
  

  } catch (error) {
    console.log(error)
    res.json("failed")
  }
})
 module.exports=dashboard