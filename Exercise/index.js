const express = require('express')
const config = require('./config/config')

let environment = process.env.NODE_ENV || 'development'

const port = 2312
let app = express()



require('./config/database.config')(config[environment])
require('./config/express')(app, config[environment])
require('./config/routes')(app)

app.listen(port)