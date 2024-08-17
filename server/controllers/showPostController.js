const Follow = require("../models/FollowModal");
const Post = require("../models/postsModal");
const Like = require("../models/likeSchema");
const Comment = require("../models/commentModal");
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

const showSinglePost = async (req, res) => {
  const postId = req.query.id;
  try {
    const post = await Post.findOne({ _id: postId });
    res.status(201).json(post);
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
