const { handleLikesCount } = require('../controllers/LikesController')
const { authMiddleWare } = require('../middlewares/authMiddleware')

const likeRouter = require('express').Router()


likeRouter.route('/update').get(authMiddleWare,handleLikesCount)

module.exports = likeRouter