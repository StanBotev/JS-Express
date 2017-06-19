const homeHandler = require('./home')
const filesHander = require('./static-files')
const addProductsHandler = require('./product')

module.exports = [ homeHandler, filesHander, addProductsHandler ]
