const { v2: cloudinary } = require("cloudinary");
async function uploadOnCloudinary(file) {
  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
  });
  const uploadResult = await cloudinary.uploader
    .upload(file, { folder: "TBM_USERS_PIC" })
    .catch((error) => {
      console.log(error);
    });
    return uploadResult
}

module.exports = uploadOnCloudinary;
