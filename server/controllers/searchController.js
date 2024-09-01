const User = require('../models/userModel')
const Community = require('../models/communityModal')

const searchResult = async(req,res)=>{
    const text = req.query.text
    try {
        let response = [];
        const users = await User.find()
    } catch (error) {
        console.log('some error occured during searching..',error)
    }
}

module.exports = {searchResult}