
const mongoose = require("mongoose")
require("dotenv").config()
const connection = async () => {
    await mongoose.connect("mongodb+srv://aaditya:aaditya@cluster0.lfdbumj.mongodb.net/mock5?retryWrites=true&w=majority")

}
module.exports = {
    connection
}