const mongoose = require('mongoose')

let threadSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  comment: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}]
})

let Thread = mongoose.model('Thread', threadSchema)

module.exports = Thread
