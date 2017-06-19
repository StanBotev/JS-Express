const mongoose = require('mongoose')

let tweetSchema = new mongoose.Schema({
  message: { type: String, required: 'Tweet message must be max 140 symbols', maxlength: 140 },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  creationDate: { type: Date, default: Date.now() }
})

let Tweet = mongoose.model('Tweet', tweetSchema)

module.exports = Tweet
