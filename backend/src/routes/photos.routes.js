const express = require('express')
const photoController = require('../controller/photos.controller')

const routes = express.Router()

routes.get('/:id', photoController.getInfobyId)

module.exports = routes