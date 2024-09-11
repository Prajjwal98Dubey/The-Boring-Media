const Chat = require('../models/chatModel')
const User = require('../models/userModel')
const createChat = async(req,res)=>{
    const sender = req.user
    const{message,reciever,roomId} = req.body
    try {
        await Chat.create({
            message,
            sender:sender.name,
            reciever,
            roomId
        })
        return res.status(201).json({msg:'chat success'})
    } catch (error) {
        console.log('some error occured during creating chats',error)
    }
}

const allChatsOfRoomId = async(req,res)=>{
    const roomId = req.query.roomId
    const sender = req.user
    try {
        const allChats = await Chat.find({roomId:roomId})
        return res.status(201).json(allChats)
    } catch (error) {
        console.log('some error occured during fetching all the chats of a roomId',error)
    }
}


module.exports = {createChat,allChatsOfRoomId}