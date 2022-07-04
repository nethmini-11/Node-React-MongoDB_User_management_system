const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const markingSchema = new Schema({
    markingSchemaName : {
        type : String,
        required: [true, "Marking Schema Name required⚠️"],
    },
    markingSchemaNumber : {
        type : String,
        required: [true, "Marking Schema ID required⚠️"],
    },
    addedDate : {
        type : Date,
        required: [true, "Date required⚠️"],
    },
    evaluateArea : {
        type : String,
        required: [true, "Evaluate Area required⚠️"],
    },
    marks : {
        type : String,
        required: [false, "Marks required⚠️"],
    }
});


module.exports = mongoose.model("MarkingSchema", markingSchema);