const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const authMiddleWare = async (req, res, next) => {
    let token = req.headers.authorization && req.headers.authorization.split(" ")[1]
    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const user = await User.findOne({ _id: decodedToken.id  })
        if (!user) {
            return res.status(400).json({ msg: "user not validated..." })
        }
        req.user = user
        next()
    }
    catch (err) {
        console.log("Token not valid.")
        res.status(400).json({msg:"user not valid."})
    }
}


module.exports = { authMiddleWare }

/*
1. put the condition if the cookies is not there then the token can be extracted from the authorization bearer token.
2. use the try and catch concept for the jwt verify method.
*/