const mongoose = require("mongoose");

const roomSchema = mongoose.Schema({
  topic: {
    type: String,
    required: true,
  },
  host: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  isRoomOn:{
    type:Boolean,
    default:true
  },
  tags: {
    type: [String],
  },
  pinned: {
    type: String,
    required: true,
  },
  roomId: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Room", roomSchema);
