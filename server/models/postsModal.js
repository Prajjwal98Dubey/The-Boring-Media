const mongoose = require("mongoose");
const postSchema = mongoose.Schema({
  post: {
    type: String,
    required: true,
  },
  time: {
    type: Date,
    default: Date.now(),
  },
  likeCount: {
    type: Number,
    default: 0,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  comments: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Comment",
    default: [],
  },
});
module.exports = mongoose.model("Post", postSchema);
