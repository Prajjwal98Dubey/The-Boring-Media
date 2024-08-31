const Follow = require("../models/FollowModal");
const Post = require("../models/postsModal");
const Like = require("../models/likeSchema");
const Comment = require("../models/commentModal");
const User = require("../models/userModel");
const client = require("../helpers/redis-client");
// const { client } = require("../helpers/redis-client");

/*
const displayPostsForLoggedInUser = async (req, res) => {
    const user = req.user
    let allPosts = []
    try {
        const allTheFollowing = await Follow.find({ followingId: user._id })
        for (let i = 0; i < allTheFollowing.length; i++) {
            const currFollowing = allTheFollowing[i].followerId
            const currUserAllPosts = await Post.find({ user: currFollowing })
            allPosts = [...allPosts, ...currUserAllPosts]
        }
        allPosts.sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime())
        res.status(201).json(allPosts)
    }
    catch (err) {
        console.log(err)
        console.log("some error occured in displayPostsForLoggedInUser")
    }
}
    */

/*
const displayPostsForLoggedInUser = async (req, res) => {
  const user = req.user;
  const allFollowing = await Follow.find({ followingId: user._id });
  let allPosts = [];
  try {
    for (let i = 0; i < allFollowing.length; i++) {
      let currFollowing = allFollowing[i].followerId;
      const currPost = await Post.find({ user: currFollowing });
      allPosts = [...allPosts, ...currPost];
    }
    allPosts.sort(
      (a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()
    );
    res.status(201).json(allPosts);
  } catch (err) {
    console.log("show post controller", err);
  }
};

get => key => show_all_loggedin_user_posts
*/

const displayPostsForLoggedInUser = async (req, res) => {
  // console.log("client =>",client)
  const user = req.user;
  let cachedDisplayPostsForLoggedInUser = await client.get(
    `show_all_loggedin_user_post:${user.name}`
  );
  if (cachedDisplayPostsForLoggedInUser) {
    let response = JSON.parse(cachedDisplayPostsForLoggedInUser);
    return res.status(201).json(response);
  }
  const allFollowing = await Follow.find({ followingId: user._id });
  let allPostsDetails = [];
  try {
    for (let i = 0; i < allFollowing.length; i++) {
      let currFollowing = allFollowing[i].followerId;
      const currPost = await Post.find({ user: currFollowing });
      const currUser = await User.findOne({ _id: currFollowing }).select(
        "-password -refreshToken -_id"
      );
      for (let j = 0; j < currPost.length; j++) {
        tmp = { ...currPost[j]._doc, ...currUser._doc };
        allPostsDetails.push(tmp);
      }
    }
    allPostsDetails.sort(
      (a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()
    );
    await client.SETEX(
      `show_all_loggedin_user_post:${user.name}`,600,
      JSON.stringify(allPostsDetails)
    );
    return res.status(201).json(allPostsDetails);
  } catch (error) {
    console.log("some error occured in the show post controller", error);
  }
};

const showSinglePost = async (req, res) => {
  const postId = req.query.id;
  try {
    const post = await Post.findOne({ _id: postId });
    const user = await User.findOne({ _id: post.user }).select(
      "-password -refreshToken -_id"
    );
    let postDetails = { ...post._doc, ...user._doc };
    res.status(201).json(postDetails);
  } catch (error) {
    console.log(error);
  }
};

const handleLike = async (req, res) => {
  let user = req.user;
  const postId = req.query.postId;
  const postType = req.query.postType;
  try {
    const isPostLikedAlready = await Like.findOne({
      user: user._id,
      postId: postId,
    });
    if (isPostLikedAlready) {
      const currLikedId = isPostLikedAlready._id;
      await Like.findByIdAndDelete({ _id: currLikedId });
      if (postType === "post") {
        /*
                const currPost = await Post.findOne({ _id: postId })
                const currLikeCount = currPost.likeCount
                await Post.updateOne({ _id: postId }, { likeCount: currLikeCount - 1 })
                */
        const like = await Post.findByIdAndUpdate(
          postId,
          { $inc: { likeCount: -1 } },
          { new: true }
        ).select("likeCount");
        return res.status(201).json(like);
      } else {
        /*
                const currComment = await Comment.findOne({ _id: postId })
                const currLikeCount = currComment.likeCount
                await Comment.updateOne({ _id: postId }, { likeCount: currLikeCount - 1 })
                */
        const like = await Comment.findByIdAndUpdate(
          postId,
          { $inc: { likeCount: -1 } },
          { new: true }
        ).select("likeCount");

        return res.status(201).json(like);
      }
    } else {
      await Like.create({ user: user._id, postId: postId });
      if (postType === "post") {
        const like = await Post.findByIdAndUpdate(
          postId,
          { $inc: { likeCount: 1 } },
          { new: true }
        ).select("likeCount");
        return res.status(201).json(like);
      } else {
        const like = await Comment.findByIdAndUpdate(
          postId,
          { $inc: { likeCount: 1 } },
          { new: true }
        ).select("likeCount");
        return res.status(201).json(like);
      }
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = { displayPostsForLoggedInUser, showSinglePost, handleLike };
