const { allBookMarks, handleBookMark } = require('../controllers/bookmarkController')
const { authMiddleWare } = require('../middlewares/authMiddleware')

const bookmarkRouter = require('express').Router()

bookmarkRouter.route('/all').get(authMiddleWare,allBookMarks)
bookmarkRouter.route('/handle').post(authMiddleWare,handleBookMark)

module.exports = bookmarkRouter