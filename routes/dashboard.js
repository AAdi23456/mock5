const express = require("express")
const dashboard=express.Router()
const { dashboardmodel } = require("../models/dashboard")

dashboard.post("/employees", async (req, res) => {
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
dashboard.get("/employees", async (req, res) => {
  try {
    const { page = 1, limit = 5, department, sortBy, search } = req.query;

    
    const conditions = {};

    if (department) {
      conditions.department = department;
    }

    if (search) {
      conditions.firstName = { $regex: search, $options: "i" };
    }

   
    const sortOptions = {};

    if (sortBy) {
      sortOptions.salary = sortBy === "asc" ? 1 : -1;
    }

    
    const data = await dashboardmodel
      .find(conditions)
      .sort(sortOptions)
      .limit(parseInt(limit))
      .skip((page - 1) * limit);

    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

 module.exports=dashboard