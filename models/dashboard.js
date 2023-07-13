const mongoose = require("mongoose")

const dashboardschema = mongoose.Schema({
    
    
    email: String,
    FirstName:String, LastName:String, Department:String,Salary:String

})
const dashboardmodel = mongoose.model("dashboard", dashboardschema)


module.exports = {dashboardmodel}
