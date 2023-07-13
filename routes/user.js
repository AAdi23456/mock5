const express = require("express")

const bcrypt = require("bcrypt")
const { reg_model } = require("../models/user")

const jwt = require("jsonwebtoken")
const register=express.Router()
const login=express.Router()
register.post("/", async (req, res) => {
  const { name, email, password,address } = req.body
  console.log(req.body);
  try {
    const userr = await reg_model.findOne({ email })
    console.log(userr);
    if (userr) {
      return res.status(200).json({ msg: "user already exist" })
    }
    bcrypt.hash(password, 8, async (err, hash) => {
      const datatodb = new reg_model({ name, email, password: hash,address })
      await datatodb.save()
      res.status(201).json({ msg: "regestration success" })
      console.log(err);
    })

  } catch (error) {
    console.log(error)
    res.json("failed")
  }
})
  ;
login.post("/", async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await reg_model.findOne({ email })
    console.log(user);
    if (!user) {
      return res.status(400).json({ msg: "Please regeister first" })
    }

    bcrypt.compare(password, user.password, (err, result) => {
      console.log(err);
      console.log(password);

      if (!result) {
        return res.status(400).json({ "msg": "Wrong Credentials" })

      }
      return res.status(201).json({ "msg": "Login successfull!", token: jwt.sign({ id: user._id }, "masai") })
    });


  } catch (err) {
    res.status(400).json({ msg: err.message })

  }
})


module.exports = {register,login}


