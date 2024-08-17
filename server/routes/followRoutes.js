const { handleFollowFollowing, countFollowerAndFollowing, checkFollowing } = require('../controllers/followController')
const { authMiddleWare } = require('../middlewares/authMiddleware')

const followRouter = require('express').Router()

followRouter.route('/').post(authMiddleWare,handleFollowFollowing)
followRouter.route('/count').get(countFollowerAndFollowing)
followRouter.route('/check').get(authMiddleWare,checkFollowing)

module.exports = followRouter