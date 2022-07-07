/*const dotenv =require('dotenv');
const fs=require('fs');
const color=require('colors');
const db= require("./server");
const { options } = require('joi');

dotenv.config({path:'./.env'});

//load models
const User = require('./models/user_model');
const path = require('path');

//conect to mongo
db().then();

//read json
const users=fs.readFileSync(`${__dirname}`)*/

// seedDatabase.js
const seedr = require('mongoose-seedr');
const path = require('path');
const mongoose=require('mongoose');
const User = require('./models/user_model');

mongoose
    .connect('mongodb://localhost:27017/mynew',{
        useNewUrlParser:true,useUnifiedTopology:true
    })
    .then(()=>{
        console.log('MONGO CONNECTION OPEN !!!!');
    })
    .catch((err)=>{
        console.log(err);
    });

    const seedUsers=[
        {
                uid:12,
                firstName:'admin',
                lastName:'Admin',
                email:'admin@gmail.com',
                dateOfBirth:'07/03/2021',
                mobile:0986543,
                status:'ok',
                password:'123456',
                password1:'123456',
                role:'admin'
        },

        {
            uid:2,
            firstName:'user',
            lastName:'User',
            email:'User@gmail.com',
            dateOfBirth:'07/03/2021',
            mobile:0986543,
            status:'ok',
            password:'123456',
            password1:'123456',
            role:'user'
    }
    ];

    const seedDB=async()=>{
        await User.create(seedUsers); //use create to hash password 
    };

    seedDB().then(()=>{
        mongoose.connection.close();
    });