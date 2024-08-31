const express  = require('express')
const { authMiddleWare } = require('../middlewares/authMiddleware')
const { createCommunity, joinCommunity, createCommunityPost } = require('../controllers/communityController')

const communityRouter = express.Router()

communityRouter.route('/create_community').post(authMiddleWare,createCommunity)
communityRouter.route('/join_community').post(authMiddleWare,joinCommunity)
communityRouter.route('/create_comm_post').post(authMiddleWare,createCommunityPost)

module.exports = communityRouter