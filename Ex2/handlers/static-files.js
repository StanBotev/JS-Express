const fs = require('fs')

let getContentType = (url) => {
  let contentType = 'text/plain'
  if (url.endsWith('.css')) {
    contentType = 'text/css'
  } else if (url.endsWith('.js')) {
    contentType = 'application/javascript'
  }
  return contentType
}

module.exports = (req, res) => {
  console.log('static')
  fs.readFile('.' + req.path, (err, data) => {
    if (err) {
      res.writeHead(404)
      res.write('Page not found')
      res.end()
      return
    }

    res.writeHead(200, {
      'Content-Type': getContentType(req.path)
    })
    res.write(data)
    res.end()
  })
}
