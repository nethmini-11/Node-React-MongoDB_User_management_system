![header](https://capsule-render.vercel.app/api?type=wave&color=gradient&height=280&section=header&text=Student%20Management%20System%20⚙️💻&fontSize=40&render&animation=fadeIn&fontAlignY=35)

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

## Sample screenshots
![Screenshot (143)](https://user-images.githubusercontent.com/83303587/177819966-9af6439b-5cfc-4400-97da-b6d605a12a81.png)
![Screenshot (144)](https://user-images.githubusercontent.com/83303587/177820006-7dc7f900-0622-4579-8082-de7b10bec0df.png)
![Screenshot (145)](https://user-images.githubusercontent.com/83303587/177820115-edabefa2-85a0-4923-9748-fe6443e00488.png)
![Screenshot (146)](https://user-images.githubusercontent.com/83303587/177820135-6d2c0246-de37-43d1-b8e2-86831abd17b0.png)
![Screenshot (147)](https://user-images.githubusercontent.com/83303587/177820166-eef0842d-55d6-49bc-8bf7-a52726b34403.png)

![header](https://capsule-render.vercel.app/api?type=wave&color=gradient&height=250&section=footer&text=Good%20Bye🙋‍♀️&fontSize=40&render&animation=fadeIn&fontAlignY=65)
