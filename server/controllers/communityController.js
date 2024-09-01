const Community = require("../models/communityModal");
const JoinCommunity = require("../models/joinCommunityModal");
const CommunityPost = require("../models/communityPostModal");
const createCommunity = async (req, res) => {
  const { title, description, communityPhoto, communityCoverPhoto } = req.body;
  const user = req.user;
  try {
    await Community.create({
      title,
      description,
      communityPhoto,
      communityCoverPhoto,
      host: user._id,
    });
    return res.status(201).json({ msg: "community created success." });
  } catch (error) {
    console.log("some error occured during creating community", error);
  }
};

const joinCommunity = async (req, res) => {
  const user = req.user;
  const { community } = req.body;
  try {
    await JoinCommunity.create({
      community,
      user: user._id,
    });
    return res.status(201).json({ msg: "community joined success." });
  } catch (error) {
    console.log("some error occured during joining.", error);
  }
};
const createCommunityPost = async (req, res) => {
  const user = req.user;
  const {
    communityPostTitle,
    communityPostDescription,
    community,
    communityPostPhoto,
  } = req.body;
  try {
    await CommunityPost.create({
      communityPostTitle,
      communityPostDescription,
      communityPostPhoto,
      community,
      user: user._id,
    });
    return res.status(201).json({ msg: "community post success." });
  } catch (error) {
    console.log("some error occured during creating post for community", error);
  }
};
const allMyCommunities = async(req,res)=>{
  const user = req.user
  try {
    let response=[];
    const allCommunities = await JoinCommunity.find({user:user._id})
    for (let index = 0; index < allCommunities.length; index++) {
      const community = await Community.findOne({_id:allCommunities[index].community})
      response.push(community)
      
    }
    return res.status(201).json(response)
  } catch (error) {
    console.log('some error occured during fetching all my communities',error)
  }
}
module.exports = { createCommunity, joinCommunity, createCommunityPost ,allMyCommunities};
