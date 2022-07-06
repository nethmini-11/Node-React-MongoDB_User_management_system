const Router = require('express').Router();
const { User, validate }= require('../models/user_model');
const jwt = require('jsonwebtoken');
const passport = require('passport');
require('../config');
const Token = require("../models/token");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");
const bcrypt = require("bcrypt");

//To sign JWT token before sending in cookie to Client
function signToken(userID) {
    return jwt.sign({
        iss: 'moonServer',
        sub: userID
    }, 'secret', {expiresIn:'1h'})
}


Router.post("/", async (req, res) => {
	try {
		const { error } = validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		let user = await User.findOne({ email: req.body.email });
		if (user)
			return res
				.status(409)
				.send({ message: "User with given email already Exist!" });

		const salt = await bcrypt.genSalt(Number(process.env.SALT));
		const hashPassword = await bcrypt.hash(req.body.password, salt);

		user = await new User({ ...req.body, password: hashPassword }).save();

		const token = await new Token({
			userId: user._id,
			token: crypto.randomBytes(32).toString("hex"),
		}).save();
		const url = `${process.env.BASE_URL}users/${user.id}/verify/${token.token}`;
		await sendEmail(user.email, "Verify Email", url);

		res
			.status(201)
			.send({ message: "An Email sent to your account please verify" });
	} catch (error) {
		console.log(error);
		res.status(500).send({ message: "Internal Server Error" });
	}
});

Router.get("/:id/verify/:token/", async (req, res) => {
	try {
		const user = await User.findOne({ _id: req.params.id });
		if (!user) return res.status(400).send({ message: "Invalid link" });

		const token = await Token.findOne({
			userId: user._id,
			token: req.params.token,
		});
		if (!token) return res.status(400).send({ message: "Invalid link" });

		await User.updateOne({ _id: user._id, verified: true });
		await token.remove();

		res.status(200).send({ message: "Email verified successfully" });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});

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



module.exports = Router;