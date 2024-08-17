const Like = require("../models/likeSchema");
const Comment = require("../models/commentModal");
const Post = require("../models/postsModal");

const handleLikesCount = async (req, res) => {
  const postId = req.query.postId;
  const user = req.user;
  try {
    let isUserAlreadyLiked = await Like.findOne({
      $and: [{ postId: postId }, { user: user._id }],
    });
    let isComment;
    let isPost = await Post.findOne({ _id: postId });
    if (!isPost) {
      isComment = await Comment.findOne({ _id: postId });
    }
    if (isUserAlreadyLiked) {
      await Like.deleteOne({ _id: isUserAlreadyLiked._id });
      if (isPost) {
        await Post.findByIdAndUpdate(
          { _id: isPost._id },
          {
            $inc: { likeCount: -1 },
          }
        );
      } else {
        await Comment.findByIdAndUpdate(
          { _id: isComment._id },
          {
            $inc: { likeCount: -1 },
          }
        );
      }
    } else {
      await Like.create({
        postId: postId,
        user: user._id,
      });
      if (isPost) {
        await Post.findByIdAndUpdate(
          { _id: isPost._id },
          {
            $inc: { likeCount: 1 },
          }
        );
      } else {
        await Comment.findByIdAndUpdate(
          { _id: isComment._id },
          {
            $inc: { likeCount: 1 },
          }
        );
      }
    }
    return res.status(201).json({ msg: "likes updated." });
  } catch (error) {
    return res.status(401).json(error);
  }
};

module.exports = { handleLikesCount };
