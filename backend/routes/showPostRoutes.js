const { displayPostsForLoggedInUser, showSinglePost } = require('../controllers/showPostController')
const { authMiddleWare } = require('../middlewares/authMiddleware')

const showPostRouter = require('express').Router()

showPostRouter.route('/l').get(authMiddleWare,displayPostsForLoggedInUser) // loggedin user
showPostRouter.route('/nl') // not loggedin user
showPostRouter.route('/single-post').get(showSinglePost)
module.exports = {showPostRouter}