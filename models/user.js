const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: [30, 'User name should be less than 30 characters'],
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    maxlength: [50, 'An email address should be less than 50 characters'],
  },
  password: {
    type: String,
    required: true,
  },
  register_date: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model('User', UserSchema)
