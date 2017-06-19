const mongoose = require('mongoose')
const Thread = mongoose.model('Thread')
const Comment = mongoose.model('Comment')
const errorHandler = require('../utilities/error-handler')

module.exports = {
  addGet: (req, res) => {
    res.render('threads/add')
  },
  addPost: (req, res) => {
    let threadReq = req.body

    if (threadReq.title.length === 0) {
      res.locals.globalError = 'Title cannot be empty!'
      res.render('threads/add', threadReq)
      return
    }

    Thread
     .create({
       title: threadReq.title,
       description: threadReq.description,
       comment: {}
     })
     .then(thread => {
       res.redirect('/threads/list')
     })
     .catch(err => {
       let errorMsg = errorHandler.handleMongooseError(err)
       res.locals.globalError = errorMsg
       res.render('threads/add', threadReq)
     })
  },
  list: (req, res) => {
    Thread
        .find({})
        .then(threads => {
          res.render('threads/list', {
            threads: threads
          })
        })
  },
  addCommentGet: (req, res) => {
    res.render('threads/addComment')
  },
  addCommentPost: (req, res) => {
    let commentReq = req.body
    console.log(commentReq)

    if (commentReq.text.length === 0) {
      res.locals.globalError = 'You should write something :)'
      res.render('threads/add', commentReq)
      return
    }

    Thread
        .findOne({ title: req.body.title })
        .populate('comment', {
          text: commentReq.text,
          author: req.user._id,
          createDate: Date.now()
        })
        .then(comment => {
          res.redirect('/threads/list')
        })
        .catch(err => {
          let errorMsg = errorHandler.handleMongooseError(err)
          res.locals.globalError = errorMsg
          res.render('threads/addComment', commentReq)
        })
  }
}
