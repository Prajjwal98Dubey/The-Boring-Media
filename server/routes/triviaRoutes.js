const { likesTrivia } = require('../controllers/triviaController')

const triviaRouter = require('express').Router()


triviaRouter.route('/like').get(likesTrivia)


module.exports = triviaRouter