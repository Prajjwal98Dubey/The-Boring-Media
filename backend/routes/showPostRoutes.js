const { displayPostsForLoggedInUser } = require('../controllers/showPostController')
const { authMiddleWare } = require('../middlewares/authMiddleware')

const showPostRouter = require('express').Router()

showPostRouter.route('/l').get(authMiddleWare,displayPostsForLoggedInUser) // loggedin user
showPostRouter.route('/nl') // not loggedin user

module.exports = {showPostRouter}