const mongoose = require('mongoose')

const communitySchema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    communityPhoto:{
        type:String,
        default:""
    },
    communityCoverPhoto:{
        type:String,
        default:""
    },
    host:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    createdAt:{
        type:Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('Community',communitySchema)