
const mongoose = require('mongoose')
const followSchema = mongoose.Schema({
    followingId: {                              // user who is following
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    followerId: {                              // user who is being followed
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    followAt: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('Follow', followSchema)