const mongoose = require("mongoose")

const reg_schema = mongoose.Schema({
    
    
    email: String,
    password: String,
    ConfirmPassword:String

})
const reg_model = mongoose.model("signupdetails", reg_schema)


module.exports = {reg_model}
