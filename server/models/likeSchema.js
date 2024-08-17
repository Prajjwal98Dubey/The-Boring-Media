const mongoose = require('mongoose')

const likeSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    postId: {   // it will take account of both post like and comment like as well.
        type: String,
        required: true
    }
})


module.exports = mongoose.model('Like', likeSchema)