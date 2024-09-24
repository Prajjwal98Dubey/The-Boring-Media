const { createRoom, getOnRooms, getRoomDetails } = require('../controllers/roomControllers')
const { authMiddleWare } = require('../middlewares/authMiddleware')

const roomRouter = require('express').Router()

roomRouter.route('/create').post(authMiddleWare,createRoom)
roomRouter.route('/get_rooms').get(getOnRooms)
roomRouter.route('/room_details').get(getRoomDetails)




module.exports = roomRouter