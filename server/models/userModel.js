const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const userModel = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  bio:{
    type:String,
    default:""
  },
  password: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    default:
      "https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671142.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1722038400&semt=ais_user",
  },
  refreshToken: {
    type: String,
  },
});
userModel.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      id: this._id,
    },
    process.env.JWT_SECRET_KEY
  );
};
userModel.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      id: this._id,
    },
    process.env.JWT_SECRET_KEY
  );
};
module.exports = mongoose.model("User", userModel);
