const { displayPostsForLoggedInUser, showSinglePost, handleLike } = require('../controllers/showPostController')
const { authMiddleWare } = require('../middlewares/authMiddleware')

const showPostRouter = require('express').Router()

showPostRouter.route('/l').get(authMiddleWare,displayPostsForLoggedInUser) // loggedin user
showPostRouter.route('/nl') // not loggedin user
showPostRouter.route('/single-post').get(showSinglePost)
showPostRouter.route('/like').get(authMiddleWare,handleLike)
module.exports = {showPostRouter}