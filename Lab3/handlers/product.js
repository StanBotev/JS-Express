const url = require('url')
// const database = require('../config/database')
const fs = require('fs')
const path = require('path')
const qs = require('querystring')
const multiparty = require('multiparty')
const shortid = require('shortid')
const Category = require('../models/Category')

const Product = require('../models/Product')

module.exports = (req, res) => {
  req.pathname = req.pathname || url.parse(req.url).pathname

  if (req.pathname === '/product/add' && req.method === 'GET') {
    let filePath = path.normalize(path.join(__dirname, '../views/products/add.html'))
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(404, {
          'Content-Type': 'text/plain'
        })
        res.write('Resource not found')
        res.end()
        return
      }
      Category.find().then((categories) => {
        let replacement = '<select class="input-field" name="category">'
        for (let category of categories) {
          replacement += `$<option value="${category._id}">${category.name}</option>`

        }
        replacement += '</select>'

        let html = data.toString().replace('{categories}', replacement)
        res.writeHead(200, {
        'Content-Type': 'text/html'
      })
      res.write(html)
      res.end()
      })

    })
  } else if (req.pathname === '/product/add' && req.method === 'POST') {
    let form = new multiparty.Form()
    let product = {}

    form.on('part', (part) => {
      if (part.filename) {
        let dataString = ''

        part.setEncoding('binary')
        part.on('data', (data) => {
          dataString += data
        })

        part.on('end', () => {
          let fileName = shortid.generate()
          let filePath = path.normalize(path.join('./content/images', fileName + part.filename))

          product.image = filePath
          fs.writeFile(filePath, dataString, {encoding: 'ascii'}, (err) => {
            if (err) {
              console.log(err)
              return
            }
          })
        })
      } else {
        part.setEncoding('utf-8')
        let field = ''
        part.on('data', (data) => {
          field += data
        })

        part.on('end', () => {
          product[part.name] = field
        })
      }
    })

    form.on('close', () => {
        Product.create(product).then((insertedProduct) => {
          Category.findById(product.category).then(category => {
            category.products.push(insertedProduct._id)
            category.save()
             res.writeHead(302, {
        Location: '/'
      })
      res.end()
    })
 })
      
     
    })

    form.parse(req)
  } else {
    return true
  }
}