const Post = require("../Models/postModel");

const Like = require("../Models/LikeModel");

//THE GOAL OF THIS FUNCTION IS TO ADD LIKE IN THE POST SCHEMA AND IN THE LIKE SCHEMA ITSELF
exports.LikeIt = async (req, res) => {
  try {
    //FETCH THE OBJECTS AS PER LIKE SCHEMA
    const { post, user } = req.body; //post stores id of post on which like is added

    //MAKE A OBJECT TO UPDATE LIKE SCHEMA AS SAVE FUNCTION TAKES OBJECT
    const like = new Like({ post, user });

    //SAVE THE RESPONSE IN DB
    const savedLike = await like.save();

    //NOW WE WILL ADD ID OF THE LIKE IN THE CONCERNED POST

    const updatedPost =await  Post.findByIdAndUpdate(
      post,
      { $push: { likes: savedLike._id } },
      { new: true }
    )
      .populate("likes")
      .exec(); //likes will be same as defined in postmodel

    res.status(201).json({
      data: updatedPost,
      message: "like added",
    });
  } catch (e) {
    res.status(500).json({
        success: false,
        message: "An error occurred while adding the like",
        error: e.message // Optionally include the error message
    });
  }
};


//THE OBJECTIVE OF THIS FUNCTION IS TO REMOVE LIKE FROM THE POST CONCERNED WHEN THE USER UNLIKES IT

//2 jagh se update hoga ek post se aur ek like se
exports.UnlikeIt = async (req, res) => {
    try {
      //FETCH THE OBJECTS AS PER LIKE SCHEMA
      const { post, like } = req.body; //post stores id of post on which like is added
     
  
      //NOW WE WILL ADD ID OF THE LIKE IN THE CONCERNED POST
      
      //this will delete entire collection
     const updatedLike = await Like.findOneAndDelete({_id:like}); // like ka id passed haii toh Like(db) ke collection mein jaoo _id:like match krke delete
      
     //this will delete entire post but we have to delete only like id inside array
    //  const updatedPost = await Post.findOneAndDelete({_id:post.likes._id});  



    //we will use pulll operator
    const updatePost = await Post.findByIdAndUpdate(post,{$pull: {likes:like} } , {new:true}) //Post(db) ke andar jao post id ke basis pe woh particular post nikalo usme pull karo likes(schema):wala array based on like id which is fetched from req,

  
      res.status(201).json({
        data: updatePost,
        message: "like deleted",
      });
    } catch (e) {
      res.status(500).json({
          success: false,
          message: "An error occurred while deleting the like",
          error: e.message // Optionally include the error message
      });
    }
  };