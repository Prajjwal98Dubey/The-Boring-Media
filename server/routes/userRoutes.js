const express = require("express");
const {
  registerUser,
  loginUser,
  createPost,
  deletePost,
  getAllMyPosts,
  myDetails,
  getUserDetail,
  editProfileBio,
  hostDetails,
  userSuggestions,
} = require("../controllers/userController");
const { authMiddleWare } = require("../middlewares/authMiddleware");
const userRouter = express.Router();

userRouter.route("/register").post(registerUser);
userRouter.route("/login").post(loginUser);
// userRouter.route('/logout').get(authMiddleWare,handleLogout)
userRouter.route("/post").post(authMiddleWare, createPost);
userRouter.route("/delete-post").delete(authMiddleWare, deletePost);
userRouter.route("/all-post").get(authMiddleWare, getAllMyPosts);
userRouter.route("/my-details").get(authMiddleWare, myDetails);
userRouter.route("/user-detail").get(getUserDetail);
userRouter.route("/edit-bio").put(authMiddleWare, editProfileBio);
userRouter.route('/host-details').get(hostDetails)
userRouter.route('/user-suggest').get(userSuggestions)

// userRouter.route('/decode-token').get(decodeToken)

module.exports = userRouter;
