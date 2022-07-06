const Router = require('express').Router();
const User = require('../models/user_model');
const UserVerification = require('../models/UserVerification');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const nodemailer =require("nodemailer");
const{v4:uuidv4}=require ("uuid");
require("dotenv").config();
require('../config');

//To sign JWT token before sending in cookie to Client
function signToken(userID) {
    return jwt.sign({
        iss: 'moonServer',
        sub: userID
    }, 'secret', {expiresIn:'1h'})
}

//REGISTER
Router.post("/register", (req, res) => {
    const {uid,firstName,lastName,email,dateOfBirth,mobile,status, password,password1, role} = req.body;

    User.findOne({email}, function(err, user) {
        if(err)
            return res.status(500).json({msg: err.message, error: true})
        if(user)
            return res.status(400).json({msg: "User already exist", error: true})
        else {
            const newUser = new User({
                uid,
                firstName,
                lastName,
                email,
                dateOfBirth,
                mobile,
                status,
                password,
                password1,
                role
            })

            newUser.save((err, user) =>{
                if(err)
                    return res.status(500).json({msg: err.message, error: true})
                else{
                    const token = signToken(user.id);
                    //httpOnly prevents XSS (read in my authentication doc for more info)
                    res.cookie("access_token", token, {maxAge:3600*1000, httpOnly: true, sameSite: true});

                    return res.status(200).json({ isAuthenticated: true, user: {email, role}, error: false })
                }
            })
        }
    })
})

//LOGIN
Router.post("/login", passport.authenticate('local', {session: false}), (req, res) => {
    const {id, email, role} = req.user;
    const token = signToken(id);

    res.cookie("access_token", token, {maxAge:3600*1000, httpOnly: true, sameSite: true});
    
    return res.status(200).json({ isAuthenticated: true, user: {email, role} })
})


//Admin and normal user can access
Router.get("/protectedData", passport.authenticate('jwt', {session: false}), (req, res) => {
    return res.status(200).json({data: "Protected data...hehehe"})
})


//only Admin can access
Router.get("/admin/protectedData", passport.authenticate('jwt', {session: false}), (req, res) => {
    const {role} = req.user;
    if(role === "admin")
        return res.status(200).json({data: "Admin Protected data...hehehe"})

    return res.status(403).json({data: ""})
})


//Check auth status everytime front-end app refreshes
Router.get("/authenticated", passport.authenticate('jwt', {session: false}), (req, res) => {
    const {email, role} = req.user;
    return res.status(200).json({ isAuthenticated: true, user: {email, role} })
})

//Logout need authenticate first because only authenticated user that can log out.
Router.get("/logout", passport.authenticate('jwt', {session: false}), (req, res) => {
    res.clearCookie("access_token");
    return res.status(200).json({ success: true, user: {email:"", role: ""} })
})

//NODEMAILER TRANSPOTER
let transporter=nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:process.env.AUTH_EMAIL,
        pass:process.env.AUTH_PASSWORD,
    },
});
//testing success

transporter.verify((error,success) =>{
    if(error){
        console.log(error);
    }else{
        console.log("Ready for message");
        console.log(success);
    }
});
module.exports = Router;