const mongoose = require('mongoose')

const SubscriptionSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    maxlength: [50, 'An email address should be less than 50 characters'],
  },
})

module.exports = mongoose.model('Subscription', SubscriptionSchema)
