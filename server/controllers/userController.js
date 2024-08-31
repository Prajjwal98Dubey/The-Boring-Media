const User = require("../models/userModel");
const Post = require("../models/postsModal");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const client = require("../helpers/redis-client");

const generateAccessAndRefreshToken = async (userId) => {
  const user = await User.findById({ _id: userId });
  let accessToken = await user.generateRefreshToken();
  let refreshToken = await user.generateAccessToken();
  return { accessToken, refreshToken };
};
const registerUser = async (req, res) => {
  const { name, email, password, photo } = req.body;
  try {
    if (!name || !email || !password) {
      return res.status(400).json({ msg: "Enter all Mandatory Fields." });
    }
    const isUserNamePresent = await User.findOne({ name: name });
    const isUserEmailPresent = await User.findOne({ email: email });
    if (isUserEmailPresent || isUserNamePresent)
      return res.status(200).json({ msg: "user already present." });
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      photo,
    });
    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
      user._id
    );
    return res.status(200).json({
      _id: user._id,
      email: user.email,
      photo: user.photo,
      refreshToken: refreshToken,
      name: user.name,
    });
  } catch (err) {
    console.log(err);
  }
};
const loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    if (!username || !password)
      return res.status(400).json({ msg: "enter all mandatory fields." });
    let enteredUser;
    enteredUser = await User.findOne({
      $or: [{ name: username }, { email: username }],
    });
    const options = {
      httpOnly: true,
      sameSite: "None",
    };
    if (enteredUser != null) {
      if (await bcrypt.compare(password, enteredUser.password)) {
        const userLogFilePath = path.join(
          __dirname,
          "..",
          "logs",
          "userlogs.txt"
        );
        fs.appendFile(
          userLogFilePath,
          `${new Date()}, username => ${enteredUser.name}, userid => ${
            enteredUser._id
          } \n`,
          function () {}
        );
        let { accessToken, refreshToken } = await generateAccessAndRefreshToken(
          enteredUser._id
        );
        enteredUser.refreshToken = refreshToken;
        await User.findByIdAndUpdate(
          { _id: enteredUser._id },
          {
            $set: { refreshToken: refreshToken },
          }
        );
        const loggedInUser = await User.findById({
          _id: enteredUser._id,
        }).select("-password ");
        res.cookie("accesstoken", accessToken, options);
        res.cookie("refreshtoken", refreshToken, options);
        return res.status(200).json(loggedInUser);
      } else return res.status(200).json({ msg: "Invalid Credential." });
    } else {
      return res.status(404).json({ msg: "No User Exists." });
    }
  } catch (error) {
    console.log(error);
  }
};
const createPost = async (req, res) => {
  const { post, postPhoto } = req.body;
  const user = req.user;
  try {
    const newPost = await Post.create({
      post,
      user: user._id,
      postPhoto,
    });
    res.status(200).json(newPost);
  } catch (error) {
    console.log("some error occured!!!");
  }
};
const deletePost = async (req, res) => {
  const postId = req.query.postId;
  try {
    const isPost = await Post.findOneAndDelete({ _id: postId });
    if (isPost != null) return res.status(201).json({ post: isPost });
    else return res.status(404).json({ msg: "post does not exist." });
  } catch (err) {
    console.log("some error occured during db call on the Post Modal");
    res.status(404).json({ msg: "postId does not exists." });
  }
};
const getAllMyPosts = async (req, res) => {
  const user = req.user;
  let cachedAllMyPosts = await client.get(`all_my_posts:${user.name}`);
  if (cachedAllMyPosts)
    return res.status(201).json({ allPosts: JSON.parse(cachedAllMyPosts) });
  try {
    const allPosts = await Post.find({ user: user._id });
    const newOrderOfPosts = allPosts.reverse();
    await client.SETEX(
      `all_my_posts:${user.name}`,
      600,
      JSON.stringify(newOrderOfPosts)
    );
    return res.status(201).json({ allPosts: newOrderOfPosts });
  } catch (error) {
    console.log(
      "some error occured during fetcing all the posts of a specific user."
    );
    return res.status(400).json({
      msg: "some error occured during fetcing all the posts of a specific user.",
    });
  }
};
const myDetails = async (req, res) => {
  const user = req.user;
  const cachedUserDetails = await client.get(`my_details:${user.name}`);
  if (cachedUserDetails) {
    let response = JSON.parse(cachedUserDetails);
    return res.status(201).json(response);
  }
  try {
    const userDetails = await User.findOne({ _id: user._id }).select(
      "-password -refreshToken"
    );
    await client.SETEX(
      `my_details:${user.name}`,
      600,
      JSON.stringify(userDetails)
    );
    return res.status(201).json(userDetails);
  } catch (error) {
    console.log("some error occured during fetching the user details.");
    return res
      .status(400)
      .json({ msg: "some error occured during fetching the user details." });
  }
};
const getUserDetail = async (req, res) => {
  const userName = req.query.user;
  const { ObjectId } = mongoose.Types;
  try {
    const isUser = ObjectId.isValid(userName)
      ? await User.findOne({ _id: userName }).select("-password -refreshToken")
      : await User.findOne({ name: userName }).select(
          "-password -refreshToken"
        );

    if (isUser) {
      const userPosts = await Post.find({ user: isUser._id }); // check for error on this piece of code.
      const allUserPosts = userPosts.reverse();
      res.status(201).json({ user: isUser, allPosts: allUserPosts });
    } else {
      res.status(401).json({ msg: "user does not exists." });
    }
  } catch (error) {
    console.log("User Detail Error", error);
    console.log("User Controller,some error occured while fetching the user.");
  }
};
const editProfileBio = async (req, res) => {
  const user = req.user;
  const { bio } = req.body;
  try {
    await User.findByIdAndUpdate({ _id: user._id }, { bio: bio });
    await client.DEL(`my_details:${user.name}`)
    return res.status(201).json({ msg: "edit success." });
  } catch (error) {
    console.log("some error occured during edit profile.", error);
  }
};

module.exports = {
  registerUser,
  loginUser,
  createPost,
  deletePost,
  getAllMyPosts,
  myDetails,
  getUserDetail,
  editProfileBio,
};
