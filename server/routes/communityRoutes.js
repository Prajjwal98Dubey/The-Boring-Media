const express  = require('express')
const { authMiddleWare } = require('../middlewares/authMiddleware')
const { createCommunity, joinCommunity, createCommunityPost, allMyCommunities, getSingleCommunity } = require('../controllers/communityController')

const communityRouter = express.Router()

communityRouter.route('/create_community').post(authMiddleWare,createCommunity)
communityRouter.route('/join_community').post(authMiddleWare,joinCommunity)
communityRouter.route('/create_comm_post').post(authMiddleWare,createCommunityPost)
communityRouter.route('/my_all').get(authMiddleWare,allMyCommunities)
communityRouter.route('/single').get(getSingleCommunity)
module.exports = communityRouter