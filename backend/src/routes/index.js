const express = require('express')
const photos = require('./photos.routes')

const routes = express.Router();

routes.use('/photos', photos)

module.exports = routes;