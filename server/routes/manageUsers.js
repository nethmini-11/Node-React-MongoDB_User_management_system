//import express from "express";
const ManageUsers = require("../models/user_model");
const router = require("express").Router();
const bcrypt = require('bcrypt');

//ADD NEW ManageUsers
router.post('/ManageUsers/add', (req,res)=>{
    let newManageUsers = new ManageUsers(req.body);

    newManageUsers.save((err) => {

        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:"ManageUsers saved successfully🆗"
        });
    });
});


//get ManageUserss
router.get('/ManageUsers', (req,res) => {
    ManageUsers.find().exec((err,ManageUsers) => {
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:true,
            existingManageUsers:ManageUsers
        });
    });
});


//get specific ManageUsers
router.get("/ManageUsers/:id", (req,res) => {
    let ManageUsersId = req.params.id;

    ManageUsers.findById(ManageUsersId,(err,ManageUsers) => {
        if(err){
            return res.status(400).json({success:false, err});
        }

        return res.status(200).json({
            success:true,
            ManageUsers
        });
    });
});


//update ManageUsers
router.put('/ManageUsers/update/:id',(req,res) => {
    
    ManageUsers.findByIdAndUpdate(
        req.params.id,
        {
            $set:req.body
        },
        (err,ManageUsers) => {
            if(err){
                return res.status(400).json({error:err});
            }
            return res.status(200).json({
                
                success:"ManageUsers Updated Successfully!🆗"
            });
        }
    );
});


//delete ManageUsers
router.delete('/ManageUsers/delete/:id', (req,res) => {
    ManageUsers.findByIdAndRemove(req.params.id).exec((err,deletedManageUsers) => {
        if(err) return res.status(400).json({
            message:"ManageUsers Delete Unsuccessful!👎",err
        });
        return res.json({
            message:"ManageUsers Delete Successful!🆗",deletedManageUsers
        });
    });
});


module.exports = router;