const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  text: { type: String, required: true },
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
}, {
  timestamps: true
})

const destinationSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  nameId: { type: String, required: true, unique: true },
  region: { type: String, required: true },
  imageURL: { type: String },
  rating: { type: Number, required: true, min: 1, max: 5 },
  description: { type: String, required: true },
  maxStay: { type: Number, required: true, min: 1, max: 7 },
  popularity: { type: String, enam: ['Golden Route', 'Off the Beaten Track', 'Way off Road'] },
  tags: { type: Array, required: true },
  access: [{ type: mongoose.Schema.ObjectId, ref: 'Destination' }],
  comments: [commentSchema]
})

module.exports = mongoose.model('Destination', destinationSchema)