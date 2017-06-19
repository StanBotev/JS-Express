const fs = require('fs')

const faviconPath = '/favicon.ico'
module.exports = (req, res) => {
  if (req.path === faviconPath) {
    fs.readFile('.' + faviconPath, (err, data) => {
      if (err) {
        console.log(err)
        return
      }
      console.log('.' + faviconPath)
      res.writeHead(200, {
        'Content-Type': 'image/x-icon'
      })
      console.log('Favicon Loaded')
      res.write(data)
      res.end()
    })
  }
}
