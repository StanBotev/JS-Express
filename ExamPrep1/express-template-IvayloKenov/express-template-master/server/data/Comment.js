const mongoose = require('mongoose')

let commentSchema = new mongoose.Schema({
  text: { type: String, required: true },
  author: { type: String },
  createDate: { type: Date, default: Date.now() }
})

let Comment = mongoose.model('Comment', commentSchema)

module.exports = Comment
