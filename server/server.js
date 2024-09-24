const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./helpers/connectDB");
const userRouter = require("./routes/userRoutes");
const followRouter = require("./routes/followRoutes");
const { showPostRouter } = require("./routes/showPostRoutes");
const commentRouter = require("./routes/commentRoutes");
const likeRouter = require("./routes/likeRoutes");
const bookmarkRouter = require("./routes/bookmarkRoutes");
const upload = require("./helpers/multer");
const fs = require("fs");
const uploadOnCloudinary = require("./helpers/cloudinary");
const { authMiddleWare } = require("./middlewares/authMiddleware");
const User = require("./models/userModel");
const communityRouter = require("./routes/communityRoutes");
const searchRouter = require("./routes/searchRoutes");
const chatRouter = require("./routes/chatRoutes");
const Post = require("./models/postsModal");
const Like = require("./models/likeSchema");
const client = require("./helpers/redis-client");
const triviaRouter = require("./routes/triviaRoutes");
const roomRouter = require("./routes/roomRoutes");

app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: "*",
  })
);
dotenv.config();

app.post(
  "/api/v1/upload/user_pic",
  upload.single("user-image"),
  async (req, res) => {
    const filePath = req.file.path;
    try {
      const { url } = await uploadOnCloudinary(filePath, "TBM_USERS_PIC");
      fs.unlink(filePath, () => {});
      return res.status(201).json(url);
    } catch (err) {
      console.log("some error during uploading on cloud", err);
    }
  }
);
app.post(
  "/api/v1/edit-photo",
  authMiddleWare,
  upload.single("user-image"),
  async (req, res) => {
    const user = req.user;
    try {
      const { url } = await uploadOnCloudinary(req.file.path, "TBM_USERS_PIC");
      fs.unlink(req.file.path, () => {});
      await User.findByIdAndUpdate({ _id: user._id }, { photo: url });
      return res.status(201).json({ msg: "photo edit success." });
    } catch (error) {
      console.log("some error occured while editing the photo", error);
    }
  }
);
app.post(
  "/api/v1/upload-post",
  authMiddleWare,
  upload.single("post-image"),
  async (req, res) => {
    const file = req.file.path;
    try {
      const { url } = await uploadOnCloudinary(file, "TBM_POSTS");
      fs.unlink(file, (err) => {
        console.log(err);
      });
      return res.status(201).json(url);
    } catch (error) {
      console.log("some error occured in uploading post photo", error);
    }
  }
);
app.post(
  "/api/v1/c/community-photo",
  authMiddleWare,
  upload.single("community-photo"),
  async (req, res) => {
    try {
      const { url } = await uploadOnCloudinary(req.file.path, "TBM_COMM_PHOTO");
      fs.unlink(req.file.path, () => {});
      return res.status(201).json({ url });
    } catch (error) {
      console.log(
        "some error occured during uploading on cloudinary community photo",
        error
      );
    }
  }
);
app.post(
  "/api/v1/c/community-cover-photo",
  authMiddleWare,
  upload.single("community-cover-image"),
  async (req, res) => {
    try {
      const { url } = await uploadOnCloudinary(
        req.file.path,
        "TBM_COMM_COVER_PHOTO"
      );
      fs.unlink(req.file.path, () => {});
      return res.status(201).json({ url });
    } catch (error) {
      console.log(
        "some error occured during uploading on the cloudinary community cover photo",
        error
      );
    }
  }
);

app.use("/api/v1/u", userRouter);
app.use("/api/v1/f", followRouter);
app.use("/api/v1/show-post", showPostRouter);
app.use("/api/v1/comment", commentRouter);
app.use("/api/v1/like", likeRouter);
app.use("/api/v1/bookmark", bookmarkRouter);
app.use("/api/v1/c", communityRouter);
app.use("/api/v1/s", searchRouter);
app.use("/api/v1/c", chatRouter);
app.use('/api/v1/trivia',triviaRouter)
app.use('/api/v1/room',roomRouter)

app.use("/api/v1/most_liked_post", async (req, res) => {
  let postMap = new Map();
  try {
    let likeData = await Like.find({});
    for (let single of likeData) {
      if (postMap.has(single.postId)) {
        postMap.set(single.postId, postMap.get(single.postId) + 1);
      } else {
        postMap.set(single.postId, 1);
      }
    }
    console.log('Map',postMap)
    let index = 0;
    while (index < 3) {
      let maxi = 0;
      let post = "";
      for (let key of postMap) {
        if (key[1] > maxi) {
          maxi = key[1]
          post = key[0]
        }
      }
      await client.SET(`${index}_rank_post`, post+`-${maxi}`);
      console.log(post)
      postMap.delete(post);
      index += 1;
    }
    return res.status(201).json({msg:'success'})
  } catch (error) {
    console.log(error);
  }
});


const start = async () => {
  await connectDB();
  app.listen(process.env.PORT, () =>
    console.log(`App Started at ${process.env.PORT}`)
  );
  
};
start();
