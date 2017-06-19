const mongoose = require('mongoose')
mongoose.Promise = global.Promise
let stringDB = 'mongodb://localhost:27017/ShopStopDatabase'
module.exports = (config) => {
    mongoose.connect(config.connectionString)

    let database = mongoose.connection

    database.once('open', (err) => {
        if (err) {
            console.log(err)
            return
        }
        console.log('Connected!')
    })
    require('../models/Product')
    require('../models/Category')
    // database.on('error', (err) => {
    //     console.log(err)
    // })
}