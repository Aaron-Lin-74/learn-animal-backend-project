const express = require('express')
const router = express.Router()
const Subscription = require('../../models/subscription')

// @route   POST api/subscribe
// @desc    Add a new email record to subscribe list
// @access  Public
router.post('/', async (req, res) => {
  try {
    const { email } = req.body

    // Simple validation
    if (!email) {
      res.status(400).json({ message: 'Please enter your email.' })
    }

    // Check the email is in subscription list or not
    const result = await Subscription.findOne({ email })
    if (result) {
      res.status(409).json({ message: 'You have already subscribed' })
    }

    const subscription = new Subscription({ email })
    await subscription.save()
    res.status(201).json({ message: 'Successfully subscribed' })
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: err.message })
  }
})

module.exports = router
