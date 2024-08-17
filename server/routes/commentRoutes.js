const { getAllComments, createComment } = require('../controllers/commentController')
const { authMiddleWare } = require('../middlewares/authMiddleware')

const commentRouter = require('express').Router()


commentRouter.route('/all').get(getAllComments)
commentRouter.route('/create').post(authMiddleWare,createComment)


module.exports = commentRouter