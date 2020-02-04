const mongoose = require('mongoose')

// ! Creating a new model object that will be used as a blueprint for each data item in my database 
const monsterSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  origin: { type: String, required: true },
  period: { type: String, required: true },
  alignment: { type: String, required: true },
  iconography: { type: Array, required: true },
  weaknesses: { type: Array, required: true },
  dangerRating: { type: Number, required: true },
  description: { type: String, required: true, maxlength: 500 }
}, {
  timestamps: true
})

// ! Exporting as a mongoose model 
module.exports = mongoose.model('Monster', monsterSchema)