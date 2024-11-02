const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema({
  post: {
    // kisi pe point krke id lane ka tareeka
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post", // reference to post modal
  },

  user: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Like", likeSchema);
