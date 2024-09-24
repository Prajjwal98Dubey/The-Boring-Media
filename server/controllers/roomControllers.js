const Room = require("../models/roomModel");
/*
tags => "cricket_✌️_lovers_mahi" => not in MVP
*/
const createRoom = async (req, res) => {
  const user = req.user._id;
  const { topic, pinned, roomId } = req.body;
  try {
    const newRoom = await Room.create({
      topic,
      host: user,
      pinned,
      roomId,
    });
    return res.status(201).json(newRoom);
  } catch (error) {
    console.log("error while creating a room", error);
  }
};
const getOnRooms = async (_, res) => {
  try {
    const rooms = await Room.find({ isRoomOn: true }).select(
      "_id roomId topic"
    );
    return res.status(201).json(rooms);
  } catch (error) {
    console.log("error while getting on rooms", error);
  }
};
const getRoomDetails = async(req,res)=>{
    const roomId = req.query.roomId
    try {
        const room = await Room.findOne({_id:roomId})
        return res.status(201).json(room)
    } catch (error) {
        console.log('error occured while getting room details',error)
    }
}

module.exports = { createRoom, getOnRooms,getRoomDetails };
