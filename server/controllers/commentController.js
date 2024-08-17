const Comment = require('../models/commentModal')

const getAllComments = async (req, res) => {
  const postId = req.query.postId;
  try {
    const allComments = await Comment.find({ originalPost: postId });
    res.status(201).json(allComments);
  } catch (error) {
    console.log(error);
  }
};

const createComment = async (req, res) => {
  let user = req.user;
  const { comment, originalPost } = req.body;
  try {
    const newComment = await Comment.create({
      comment,
      originalPost,
      user,
    });
    newComment.save();
    res.status(201).json({ msg: "comment posted." });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getAllComments, createComment };
