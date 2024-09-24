const Like = require("../models/likeSchema");
const client = require("../helpers/redis-client");
const Post = require("../models/postsModal");
const mongoose = require("mongoose");
// const {Ob} = require('mongoose')
const {ObjectId} = require('mongodb')

/*
not considering comments here.
*/

// with each click on the like button two APIs will be called, one is the handleLikes api and the other is likesTravia (very bad way to implement the top 3 most liked posts.)

const likesTrivia = async (req, res) => {
  const id = req.query.id;
  const objectId = mongoose.Types.ObjectId(id);
//   let objId = new ObjectId(id)
  try {
    let isPostExists = await Post.findOne({ _id: objectId });
    console.log(isPostExists);
    if (isPostExists) {
      let totalLikes = await Like.find({ postId: id });
      let prevRankedPosts = [];
      await Promise.all([
        await client.get("0_rank_post"),
        await client.get("1_rank_post"),
        await client.get("2_rank_post"),
      ])
        .then((vals) => {
          for (let val of vals) {
            prevRankedPosts.push(val);
          }
        })
        .catch((err) => console.log("error in promise.all", err));
      let currPost = id + "-" + totalLikes.length.toString();
      prevRankedPosts.push(currPost);
      prevRankedPosts.sort((a, b) => b.split("-")[1] - a.split("-")[1]);
      let rankMap = new Map();
      for (let post of prevRankedPosts) {
        if (rankMap.has(post.split("-")[0])) continue;
        else rankMap.set(post.split("-")[0], post);
      }
      let index = 0;
      for (let key of rankMap) {
        await client.set(`${index}_rank_post`, key[1]);
        index += 1;
        if (index > 2) break;
      }
      console.log(index, rankMap);
      return res.status(201).json({ msg: "success." });
    } else {
      return res.status(201).json({ msg: "not post exists with this id." });
    }
  } catch (error) {
    console.log("some error occured during the likes Trivia", error);
  }
};

module.exports = { likesTrivia };
