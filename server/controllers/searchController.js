const User = require("../models/userModel");
const Community = require("../models/communityModal");

const searchResult = async (req, res) => {
  const text = req.query.text;
  try {
    const users = await User.find().select("-password -refreshToken");
    const communities = await Community.find().select("-communityCoverPhoto -host -createdAt");
    let filterUsers = users.filter(
      (user) =>
        user.name.toLowerCase().includes(text.toLowerCase()) ||
        user.email.toLowerCase().includes(text.toLowerCase())
    );
    let filterCommunity = communities.filter(
      (comm) =>
        comm.title.toLowerCase().includes(text.toLowerCase()) ||
        comm.description.toLowerCase().includes(text.toLowerCase())
    );
    function fxUser(u) {
      return { ...u._doc, category: "people" };
    }
    function fxCommunity(c) {
      return { ...c._doc, category: "community" };
    }
    let updatedUsers = filterUsers.map(fxUser);
    let updatedCommunity = filterCommunity.map(fxCommunity);
    let searchResult = [];
    updatedUsers.forEach((u) => searchResult.push(u));
    updatedCommunity.forEach((c) => searchResult.push(c));
    return res.status(201).json(searchResult);
  } catch (error) {
    console.log("some error occured during searching..", error);
  }
};

module.exports = { searchResult };
