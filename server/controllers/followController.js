const User = require("../models/userModel");
const Follow = require("../models/FollowModal");
const handleFollowFollowing = async (req, res) => {
  const followingId = req.user._id;
  const { followerName } = req.body; // followerName -> user who will be followed followingId -> user who will be following.
  try {
    const isFollowerUser = await User.findOne({ name: followerName });
    // add a validation, if the loggedIn user is already following the current user.
    const isRelationPresent = await Follow.findOne({
      followingId: followingId,
      followerId: isFollowerUser._id,
    });
    if (isRelationPresent) {
      await Follow.findByIdAndDelete({ _id: isRelationPresent._id });
      return res.status(200).json({ isFollowing: false });
    } else {
      const response = await Follow.create({
        followingId,
        followerId: isFollowerUser._id,
      });
      return res.status(201).json(response);
    }
  } catch (err) {
    console.log("some error occured.");
  }
};

const countFollowerAndFollowing = async (req, res) => {
  const user = req.query.user;
  const isUser = await User.findOne({ name: user });
  try {
    const following = await Follow.find({ followingId: isUser._id });
    const follower = await Follow.find({ followerId: isUser._id });
    const followingCnt = following.length;
    const followerCnt = follower.length;
    res.status(201).json({ followerCnt, followingCnt });
  } catch (error) {
    console.log("some error occured.");
  }
};

const checkFollowing = async (req, res) => {
  const loggedInUser = req.user._id;
  const user = req.query.user;
  try {
    const isUser = await User.findOne({ name: user });
    const isFollowing = await Follow.findOne({
      followingId: loggedInUser,
      followerId: isUser._id,
    });
    if (isFollowing) {
      return res.status(201).json({ isFollowing: true });
    }
    return res.status(201).json({ isFollowing: false });
  } catch (error) {
    console.log("some error occured!!!");
  }
};

module.exports = {
  handleFollowFollowing,
  countFollowerAndFollowing,
  checkFollowing,
};
