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
app.post('/api/v1/c/community-cover-photo',authMiddleWare,upload.single('community-cover-image'),async(req,res)=>{
  try {
    const {url} = await uploadOnCloudinary(req.file.path,"TBM_COMM_COVER_PHOTO")
    fs.unlink(req.file.path,()=>{})
    return res.status(201).json({url})
  } catch (error) {
    console.log('some error occured during uploading on the cloudinary community cover photo',error)
  }
})

app.use("/api/v1/u", userRouter);
app.use("/api/v1/f", followRouter);
app.use("/api/v1/show-post", showPostRouter);
app.use("/api/v1/comment", commentRouter);
app.use("/api/v1/like", likeRouter);
app.use("/api/v1/bookmark", bookmarkRouter);
app.use("/api/v1/c", communityRouter);
app.use('/api/v1/s',searchRouter)
const start = async () => {
  await connectDB();
  app.listen(process.env.PORT, () =>
    console.log(`App Started at ${process.env.PORT}`)
  );
  // await startRedisClient()
};
start();
