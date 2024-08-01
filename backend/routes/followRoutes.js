const { handleFollowFollowing } = require('../controllers/followController')
const { authMiddleWare } = require('../middlewares/authMiddleware')

const followRouter = require('express').Router()

followRouter.route('/').post(authMiddleWare,handleFollowFollowing)

module.exports = followRouter