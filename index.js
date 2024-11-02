const express = require('express');
const app =express();


require('dotenv').config();


const dbConnect = require('./config/database');
dbConnect();

const PORT = process.env.PORT || 5000



//middlware
app.use(express.json());

//importing routes
const blog = require('./routes/blog')

//mounting the routes
app.use('/api/v1', blog)
 

app.listen(PORT,()=>{
    console.log("db ka connection succesfull");
})

    

 
//default routes
app.get('/',(req,res)=>{
    res.send("this is home page");
})


  
