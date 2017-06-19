const mongoose = require('mongoose')
const errorHandler = require('../utilities/error-handler')
const Image = mongoose.model('Image')

let parseHashtag = function (string) {
  let patern = /(?:^|[ ])#([a-zA-Z]+)/gm
  let result = string.match(patern)
  return result
}

module.exports = {
  addGet: (req, res) => {
    res.render('images/add')
  },

  addPost: (req, res) => {
    let imgBody = req.body

    if (imgBody.urlText.length === 0 || imgBody.urlText.length > 500) {
      res.locals.globalError = 'Message cannot be empty or more than 500 symbols!'
      res.render('images/add', imgBody)
      return
    }
    let tags = []
    let arrayTags = (parseHashtag(imgBody.description.toString()))

    if (arrayTags) {
      for (let i = 0; i < arrayTags.length; i++) {
        let tag = arrayTags[i].replace('#', '')
        tags.push(tag.trim().toLowerCase())
      }
    }

    Image
        .create({
          urlText: imgBody.urlText,
          description: imgBody.description,
          tags: tags,
          creator: req.user._id
        })
        .then(
          res.redirect('/images/list')
        )
        .catch(err => {
          let errorMsg = errorHandler.handleMongooseError(err)
          res.locals.globalError = errorMsg
          res.render('images/add', imgBody)
        })
  },
  list: (req, res) => {
    Image
        .find({})
        .sort('-dateCreated')
        .limit(100)
        .then(images => {
          res.render('images/list', {
            images: images
          })
        })
  },
  tag: (req, res) => {
    let search = req.query.search.toLowerCase()

    let query = Image.find({ tags: search })

    // List all images with current tag
    query
      .sort('-dateCreated')
      .limit(100)
      .then(images => {
        res.render('images/tag', {
          images: images
        })
      })
  },
  editGet: (req, res) => {
    let imageId = req.params.id
    console.log(imageId)

    Image
      .findById(imageId)
      .then(image => {
        if (!image) {
          res.sendStatus(404)
          return
        }
        res.render('/images/edit', {
          image: image
        })
      })
  },
  editPost: (req, res) => {
    let imageId = req.params.id
    let editReq = req.body

    Image
      .findById(imageId)
      .then(image => {
        image.urlText = editReq.urlText

        image
          .save()
          .then(() => {
            res.redirect('/')
          })
      })
  }
}
