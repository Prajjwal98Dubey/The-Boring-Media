const mongoose = require("mongoose");

const communityPostSchema = mongoose.Schema({
  communityPostTitle: {
    type: String,
    required: true,
  },
  communityPostDescription: {
    type: String,
    required: true,
  },
  community: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Community",
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  communityPostPhoto: {
    type: String,
    default: "",
  },
  timeStamp: {
    type: Date,
    default: Date.now(),
  },
  upvote: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("CommunityPost", communityPostSchema);
