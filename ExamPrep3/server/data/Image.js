const mongoose = require('mongoose')

let imageSchema = new mongoose.Schema({
  urlText: ({ type: String, required: 'You must put url in here' }),
  description: ({ type: String, max: 500 }),
  dateCreated: ({ type: Date, default: Date.now() }),
  tags: [{ type: String }],
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
})

let Image = mongoose.model('Image', imageSchema)

module.exports = Image
