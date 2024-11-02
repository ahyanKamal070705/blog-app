//import models
const Post = require('../Models/postModel');
const Comment = require('../Models/CommentModel');

// two models will be imported

// 1)The Motive of this function is to create comment and add it in the Post schema comment array
exports.createComment = async (req,res) =>{
    try{
     const {post,user,body} = req.body;


     //creates a new instance of the Comment model using the data from req.body. The fields post, user, and body should match the schema of Comment.
     const comments = new Comment({post,user,body});
     
     //in same method we have to create objects
     const savedComment = await comments.save();


     //Adding the comment id in the Post Model

     //kaunsa post mein comment aaya nikalo uska comment wala array mein jaaoo aur yeh wla comment ka id daal do

     const updatedPost =  await Post.findByIdAndUpdate(post,{$push:{comments:savedComment._id}},{new:true})
     .populate('comments').exec(); //populate krne se post ke schema mein comment array ke andar actual comment schema aayega bs id nahi
  


     //agar upar sahi se chal gaya toh success do
     res.status(201).json({
        success: true,
        data: updatedPost,
        message: "Post comment updated successfully"
    });
    }catch(e){
        res.status(500).json({
            success: false,
            message: "An error occurred while creating the comment",
            error: e.message // Optionally include the error message
        });
    }
}


//h/w
// 2) ADD Edit comment and sub-comment function



