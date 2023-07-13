const express = require("express")
const dashboard=express.Router()
const { dashboardmodel } = require("../models/dashboard")

dashboard.post("/employees", async (req, res) => {
  const { FirstName, LastName, Department, Salary, email } = req.body;

  try {
    const datatodb = new dashboardmodel({ FirstName, LastName, Department, Salary, email });
    await datatodb.save();
    res.status(201).json({ msg: "Data saved" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to save data" });
  }
});
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
dashboard.post("/delete/:id", async (req, res) => {
  const { id} = req.query

  try {
  const data= await dashboard.findByIdAndDelete(id)
    res.status(201).json({ msg: "Data Deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to save data" });
  }
});
 module.exports=dashboard