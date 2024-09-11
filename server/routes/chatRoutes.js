const { createChat, allChatsOfRoomId } = require('../controllers/chatController')
const { authMiddleWare } = require('../middlewares/authMiddleware')

const chatRouter = require('express').Router()


chatRouter.route('/create').post(authMiddleWare,createChat)
chatRouter.route('/all').get(authMiddleWare,allChatsOfRoomId)

module.exports = chatRouter