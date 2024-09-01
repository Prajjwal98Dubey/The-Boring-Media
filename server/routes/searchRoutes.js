const express = require('express')
const { searchResult } = require('../controllers/searchController')

const searchRouter = express.Router()

searchRouter.route('/').get(searchResult)

module.exports = searchRouter