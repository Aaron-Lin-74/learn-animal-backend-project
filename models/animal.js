const mongoose = require('mongoose')

const AnimalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: [30, 'Animal name should be less than 30 characters'],
  },
  type: String,
  imageUrl: String,
  desc: {
    type: String,
    required: true,
    trim: true,
    maxlength: [
      800,
      'An Animal description should be less than 800 characters',
    ],
  },
  population: String,
  life: String,
  weight: String,
  length: String,
  link: String,
  date: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model('Animal', AnimalSchema)
