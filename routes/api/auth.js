require('dotenv').config()
const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../../models/user')
const logger = require('../../middleware/logger')
const authenticateToken = require('../../middleware/authenticateToken')

// router.use(logger)

// @route     POST api/auth
// @desc      Authenticate a  user with email, and password
// @access    Public
router.post('/', async (req, res) => {
  try {
    const { email, password } = req.body

    // Simple validation
    if (!email || !password) {
      res.status(400).json({ message: 'Please enter all fields' })
    }

    // Check the user exits or not
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({
        message: 'User does not exist',
      })
    }

    // Validate password
    if (await bcrypt.compare(password, user.password)) {
      // Assign access token
      const accessToken = jwt.sign(
        { id: user.id },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '1h' }
      )
      res.status(200).json({
        accessToken,
        user: { id: user.id, name: user.name, email: user.email },
      })
    } else {
      return res.status(400).json({ message: 'Invalid credentials' })
    }
  } catch (e) {
    console.log(e)
    res.status(500).send(e)
  }
})

// @route     GET api/auth/user
// @desc      Get user data
// @access    Private
router.get('/user', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password')
    res.json(user)
  } catch (e) {
    res.status(500).send(e)
  }
})
module.exports = router
