const BookMark = require("../models/bookmarkModal");
const User = require("../models/userModel");
const Post = require("../models/postsModal");

const allBookMarks = async (req, res) => {
  // for a user.
  const user = req.user;
  try {
    const allBookMarks = await BookMark.find({ user: user });
    // console.log(allBookMarks)
    let allDetails = [];
    for (let i = 0; i < allBookMarks.length; i++) {
      const postDetails = await Post.findOne({ _id: allBookMarks[i].post });
      //   console.log(postDetails)
      const userDetails = await User.findOne({ _id: postDetails.user });
      allDetails.push({
        postId: postDetails._id,
        postContent: postDetails.post,
        username: userDetails.name,
        userPhoto: userDetails.photo,
      });
    }
    return res.status(201).json(allDetails);
  } catch (error) {
    console.log("some error occured during getting all bookmarks", error);
  }
};

const handleBookMark = async (req, res) => {
  const { postId } = req.body;
  const user = req.user;
  try {
    let isPostPresent = await Post.findOne({ _id: postId });
    if (isPostPresent === null)
      return res
        .status(404)
        .json({ msg: "invalid request => invalid post id." });
    const isPostAlreadyBookMarked = await BookMark.findOne({
      $and: [{ post: postId }, { user: user }],
    });
    if (isPostAlreadyBookMarked != null) {
      await BookMark.findByIdAndDelete({ _id: isPostAlreadyBookMarked._id });
      return res.status(200).json({ msg: "bookmark removed." });
    }
    await BookMark.create({
      post: postId,
      user: user,
    });
    return res.status(201).json({ msg: "bookmark added successfully." });
  } catch (error) {
    console.log("some error occured during addBookmark", error);
  }
};
const countPostBookMarks = async (req, res) => {
  const postId = req.query.postId;
  try {
    const countBookMarks = await BookMark.find({ post: postId });
    return res.status(200).json({ count: countBookMarks.length });
  } catch (error) {
    console.log("some error occured during count post bookmarks", error);
  }
};

module.exports = { allBookMarks, handleBookMark, countPostBookMarks };
