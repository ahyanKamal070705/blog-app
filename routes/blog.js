//EXPRESS KA INSTANCE
const express = require("express");

//ROUTER KA INSTANCE
const router = express.Router();


//import controller
const {createComment} = require('../Controllers/commentController');
const {createPost,fetchAllPost} = require("../Controllers/PostController");
const {LikeIt,UnlikeIt} = require('../Controllers/LikeController');

   
//maping the controlller  
router.post('/comments/create',createComment);
router.post('/posts/create',createPost);
router.get('/posts/get',fetchAllPost);
router.post('/likes/like',LikeIt);
router.post('/likes/unlike',UnlikeIt);
module.exports = router;     
