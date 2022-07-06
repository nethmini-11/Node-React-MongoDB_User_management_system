const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Joi = require("joi");


const UserSchema = new mongoose.Schema({
    uid : {
        type : Number,
        required: [true, "Required⚠️"],
    },
    firstName : {
        type : String,
        required: [true, "Required⚠️"],
    },
    lastName: {
        type : String,
        required: [true, "Required⚠️"],
    },
    
    email: {
        type: String,
        required: [true, "Required⚠️"],
    },
    dateOfBirth: {
        type : Date,
        required: [true, "Required⚠️"],
    },
    mobile: {
        type : Number,
        required: [true, "Required⚠️"],
    },
    status: {
        type : String,
        required: [true, "Required⚠️"],
    },
    password: {
        type: String,
        required: [true, "Required⚠️"],
    },
    password1: {
        type: String,
        required: [true, "Required⚠️"],
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        required: [true, "Required⚠️"],
    },
    verified:{type:Boolean,default:false}
})

/*const User = mongoose.model("User", UserSchema);*/
const validate = (data) => {
	const schema = Joi.object({
        uid: Joi.number().required().label("User ID"),
		firstName: Joi.string().required().label("First Name"),
		lastName: Joi.string().required().label("Last Name"),
		email: Joi.string().email().required().label("Email"),
        dateOfBirth: Joi.date().required().label("dob"),
		mobile: Joi.number().required().label("mobile"),
		status: Joi.string().required().label("status"),
		password: Joi.string().required().label("pw"),
        password1: Joi.number().required().label("pw1"),
		role: Joi.string().required().label("role"),
	
		//password: passwordComplexity().required().label("Password"),
	});
	return schema.validate(data);
};

//Presave middleware - NOTE: if use arrow function, this becomes empty object, and we can't use isModified()
UserSchema.pre("save", function(next) {
    //If there's no change to password field (no change, no add new), call next()
    if(!this.isModified('password')){
        next()
    }

    bcrypt.hash(this.password, 10, (err, hashedPassword) => {
        if(err)
            return next(err)
        this.password = hashedPassword;
        return next()
    })
})

//Custom method - if u wanna use 'this' as user document, don't use arrow function coz arrow function watch video 8 in my react document for more info

UserSchema.methods.comparePassword = function (password, cb) {
    bcrypt.compare(password, this.password, (err, isMatch) => {
        if(err)
            return cb(err)
        if(!isMatch)
            return cb(null, false)
        return cb(null, this)
    })
}

module.exports = { validate };
module.exports =mongoose.model("User", UserSchema);