  const Post = require('../Models/postModel');

  exports.createPost = async (req,res)=>{
   try {
    const {title,description} = req.body;

    const post = new Post({title,description});
    const savedPost = await post.save();

    res.status(201).json({
        success: true,
        data: savedPost,
        message: "Post comment updated successfully"
    });
   } catch (error) {
     res.status(500).json({
        message:error.message,
     })
   }
  }

  //fetching all post     we will use find option

  exports.fetchAllPost = async(req,res)=>{
    try {
     
        //all post ayega but
        //what you want? you want only id in like and comment array or 
        //whats written inside like and comment array also (if yes use populate and execute)

        const allPost = await Post.find().populate('comments').populate('likes').exec();
        res.status(201).json({
            success: true,
            data: allPost,
            message: "Post fetched"
        })
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "An error occurred while creating the comment",
            error: error.message // Optionally include the error message
        });
    }
  }