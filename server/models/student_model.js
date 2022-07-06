const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const StudentSchema = new mongoose.Schema({
    title : {
        type : String,
        required: [true, "Required⚠️"],
    },
    description : {
        type : String,
        required: [true, "Required⚠️"],
    },
    
    
})

module.exports = mongoose.model("Student", StudentSchema);