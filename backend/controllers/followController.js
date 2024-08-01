const User = require('../models/userModel')
const Follow = require('../models/FollowModal')
const handleFollowFollowing = async (req, res) => {
    const followingId = req.user._id
    const { followerName } = req.body   // followerName -> user who will be followed followingId -> user who will be following.
    try {
        const isFollowerUser = await User.findOne({ name: followerName })
        const response = await Follow.create({
            followingId,
            followerId: isFollowerUser._id
        })
        res.status(201).json(response)
    }
    catch (err) {
        console.log("some error occured.")
    }
}

module.exports = { handleFollowFollowing }