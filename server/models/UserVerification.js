const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const UserVerificationSchema = new mongoose.Schema({
   userID:String,
   uniqueString:String,
   createAt:Date,
   expireAt:Date,
})


module.exports = mongoose.model("UserVerification", UserVerificationSchema);