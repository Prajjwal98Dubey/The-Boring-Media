const mongoose = require('mongoose')
const commentSchema = mongoose.Schema({
    comment: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    time: {
        type: Date,
        default: Date.now()
    },
    likeCount: {
        type: Number,
        default: 0
    }
})
module.exports = mongoose.model('Comment', commentSchema)