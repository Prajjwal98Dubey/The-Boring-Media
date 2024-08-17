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
    },
    originalPost:{    // it will track if this post is the reply on some original post
        type:mongoose.Schema.Types.ObjectId,
        ref:'Post',
        default:null   // this means this post is not reply of any other post.

    }
})
module.exports = mongoose.model('Comment', commentSchema)