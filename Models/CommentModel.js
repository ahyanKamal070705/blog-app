const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  
    post:{
        // kisi pe point krke id lane ka tareeka
        type:mongoose.Schema.Types.ObjectId,
        ref:"Post",  // reference to post modal
    },

     user:{
        type:String,
        required: true,
     },
 
     // kya comment aaya hai
    body:{
        type:String,
        required: true,
    }



})

module.exports = mongoose.model("Comment",commentSchema);