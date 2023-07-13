
const express = require("express")
const app = express()
const cors = require("cors");
app.use(express.json())
const {register,login} = require("./routes/user")
const { connection } = require("./database/mongodb")
const dashboard = require("./routes/dashboard")

app.use(cors())
app.use("/signup",register)
app.use("/login",login)

app.use("/employees", dashboard)


app.listen(8080, () => {
    try {
        connection()
    } catch (error) {
        console.log(error);
    }
});
