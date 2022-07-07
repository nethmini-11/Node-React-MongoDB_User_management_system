# Node-React-MongoDB_User_management_system

This project is mainly based on two user types.  One is admin and the other is student.  Here, each has different functionalities, and they are protected by        protected routes based on the user's type.  Here, the login functionality has been configured with an unprotected route so that both can have common access. Authentication is done by using JWT token based  authentication.

Admin:

      Create Login for users

      Edit User Details
      
      Delete Users
      
      Search Users
      
      Login to the system
      
      
 Student:
 
         Login to the System
 
         Create Notes
         
         Edit Notes
         
         Search Notes
         
         Delete Notes
         
         
## Tools Used:
    Vs Code
    
    Postman For API Testing
    
    MongoDB Compass
    
## Technologies:

    FrontEnd:React JS
   
    Backend:Node JS
   
    Database:MongoDB

## Front End:

    ==Step 1 :==

    >> npm install


    ==Step 2 :==

    >> npm start

## Back End End:

    ==Step 1 :==

    >> npm install


    ==Step 2 :==

    >> npm run dev
    
## Database Connection:
     server.js in backend ,
     
     mongoose.connect("mongodb://localhost:27017/<Enter Here Your Database Name>", {useNewUrlParser: true, useUnifiedTopology: true}, () => {
     console.log("DB connected successfully...")
      })
      
      seedData.js in backend ,
      
      .connect('mongodb://localhost:27017/<Enter Here Your Database Name>',{
        useNewUrlParser:true,useUnifiedTopology:true
      })

## Seed the Data to Mongo DB

    >> node seedData.js

***Please note that if you cannot successfully run this I added the json file here .Just import it through the mongo db directly***
