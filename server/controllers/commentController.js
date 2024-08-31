const Comment = require('../models/commentModal')
const User = require('../models/userModel')
const getAllComments = async (req, res) => {
  const postId = req.query.postId;
  try {
    let allCommentsDetails=[];
    const allComments = await Comment.find({ originalPost: postId });
    for(let i = 0;i<allComments.length;i++){
      let user = await User.findOne({_id:allComments[i].user}).select("-password -refreshToken -_id -bio")
      allCommentsDetails.push({...allComments[i]._doc,...user._doc})
    }
    res.status(201).json(allCommentsDetails);
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
