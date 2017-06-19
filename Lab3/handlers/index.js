const homeHandler = require('./home')
const filesHandler = require('./static-files')
const products = require('./product')
const category = require('./category')

module.exports = [homeHandler, filesHandler, products, category]