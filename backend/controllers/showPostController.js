const Follow = require('../models/FollowModal')
const Post = require('../models/postsModal')
/*
const displayPostsForLoggedInUser = async (req, res) => {
    const user = req.user
    let allPosts = []
    try {
        const allTheFollowing = await Follow.find({ followingId: user._id })
        for (let i = 0; i < allTheFollowing.length; i++) {
            const currFollowing = allTheFollowing[i].followerId
            const currUserAllPosts = await Post.find({ user: currFollowing })
            allPosts = [...allPosts, ...currUserAllPosts]
        }
        allPosts.sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime())
        res.status(201).json(allPosts)
    }
    catch (err) {
        console.log(err)
        console.log("some error occured in displayPostsForLoggedInUser")
    }
}
    */
const displayPostsForLoggedInUser = async (req, res) => {
    const user = req.user
    const allFollowing = await Follow.find({ followingId: user._id })
    let allPosts = []
    try {
        for (let i = 0; i < allFollowing.length; i++) {
            let currFollowing = allFollowing[i].followerId
            const currPost = await Post.find({ user: currFollowing })
            allPosts = [...allPosts, ...currPost]
        }
        allPosts.sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime())
        res.status(201).json(allPosts)
    }
    catch (err) {
        console.log("show post controller", err)
    }
}


module.exports = { displayPostsForLoggedInUser }