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

app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: "*",
  })
);
dotenv.config();

app.use("/api/v1/u", userRouter);
app.use("/api/v1/f", followRouter);
app.use("/api/v1/show-post", showPostRouter);
app.use("/api/v1/comment", commentRouter);
app.use("/api/v1/like",likeRouter)
const start = async () => {
  await connectDB();
  app.listen(process.env.PORT, () =>
    console.log(`App Started at ${process.env.PORT}`)
  );
};
start();
