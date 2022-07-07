const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Router = require('./routes/routes');
const authRoutes = require('./routes/auth');
const cookieParser = require('cookie-parser');
const cors = require('cors');


//DB Connection
mongoose.connect("mongodb://localhost:27017/mynew", {useNewUrlParser: true, useUnifiedTopology: true}, () => {
    console.log("DB connected successfully...")
})


//Middleware Setup
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}))
app.use(cookieParser())    //<----- This middleware is needed to read Cookie from request. Without it, we'll get no req.cookie...
app.use(express.json())    //<----- this middleware is needed to read JSON from request. Without it, we'll get req.body == undefined.
//app.use("/", Router);
//app.use("/api", require("./routes/adduser"));
const manageStudentsRoutes = require('./routes/manageStudents');
app.use(manageStudentsRoutes);

const manageUsersRoutes = require('./routes/manageUsers');
app.use(manageUsersRoutes);
app.use("/", Router);
//app.use("/routes/auth", authRoutes);
//const register = require('./routes/routes');
//const { Router } = require('express');
//const { Router } = require('express');
//app.use(register);

app.listen("5000", () =>{
    console.log("Server listening at port 5000")
})