//import express from "express";
const StudentNote = require("../models/student_model");
const router = require("express").Router();

//ADD NEW StudentNote
router.post('/StudentNote/add', (req,res)=>{
    let newStudentNote = new StudentNote(req.body);

    newStudentNote.save((err) => {
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:"Note saved successfully🆗"
        });
    });
});


//get StudentNotes
router.get('/StudentNote', (req,res) => {
    StudentNote.find().exec((err,StudentNote) => {
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:true,
            existingStudentNote:StudentNote
        });
    });
});


//get specific StudentNote
router.get("/StudentNote/:id", (req,res) => {
    let StudentNoteId = req.params.id;

    StudentNote.findById(StudentNoteId,(err,StudentNote) => {
        if(err){
            return res.status(400).json({success:false, err});
        }

        return res.status(200).json({
            success:true,
            StudentNote
        });
    });
});


//update StudentNote
router.put('/StudentNote/update/:id',(req,res) => {
    StudentNote.findByIdAndUpdate(
        req.params.id,
        {
            $set:req.body
        },
        (err,StudentNote) => {
            if(err){
                return res.status(400).json({error:err});
            }
            return res.status(200).json({
                success:"Note Updated Successfully!🆗"
            });
        }
    );
});


//delete StudentNote
router.delete('/StudentNote/delete/:id', (req,res) => {
    StudentNote.findByIdAndRemove(req.params.id).exec((err,deletedStudentNote) => {
        if(err) return res.status(400).json({
            message:"StudentNote Delete Unsuccessful!👎",err
        });
        return res.json({
            message:"Note Delete Successful!🆗",deletedStudentNote
        });
    });
});


module.exports = router;