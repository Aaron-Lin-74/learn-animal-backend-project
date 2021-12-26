require('dotenv').config()
const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../../models/user')
const logger = require('../../middleware/logger')
const authenticateToken = require('../../middleware/authenticateToken')
const getUser = require('../../middleware/getUser')

// router.use(logger)

// It is good for testing, not for production as the data is not persistent
// const users = []
// router.get('/', (req, res) => {
//   res.json(users)
// })
// router.post('/', (req, res) => {
//   // the problem with this simple implementation is the password is not encrypted
//   const newUser = {
//     name: req.body.name,
//     password: req.body.password,
//     email: req.body.email,
//   }
//   users.push(newUser)
//   res.status(201).json({ message: 'success create' })
// })

// @route     POST api/users
// @desc      Create a new user with name, email, and password
// @access    Public
router.post('/', async (req, res) => {
  try {
    const { name, email, password } = req.body

    // Simple validation
    if (!name || !email || !password) {
      res.status(400).json({ message: 'Please enter all fields' })
    }

    // Check the user exits or not, if yes it is a conflict
    const result = await User.findOne({ email })
    // if (users.find((user) => user.email === req.body.email)) {
    if (result) {
      return res.status(409).json({
        message:
          'The user with this email address already exits, you can sign in',
      })
    }

    // Add the salt so that the same passwords could result in different hash to increase security
    // const salt = await bcrypt.genSalt()
    // const hashedPassword = await bcrypt.hash(req.body.password, salt)

    // We can also combine the genSalt with hash
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = new User({
      name,
      password: hashedPassword,
      email,
    })
    // users.push(newUser)
    const newUser = await user.save()

    // Assign access token
    const accessToken = jwt.sign(
      { id: newUser.id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '1h' }
    )
    res.status(201).json({
      accessToken,
      user: { id: newUser.id, name: newUser.name, email: newUser.email },
    })
  } catch (e) {
    console.log(e)
    res.status(500).send(e)
  }
})

// @route   Patch api/users
// @desc    Update a user's profile
// @access  Private
router.patch('/', authenticateToken, getUser, async (req, res) => {
  if (req.body.name != null) {
    res.user.name = req.body.name
  }
  if (req.body.email != null) {
    res.user.email = req.body.email
  }
  if (req.body.password != null) {
    res.user.password = req.body.password
  }
  try {
    const updatedUser = await res.user.save()
    res.status(200).json({
      message: 'User profile is successfully updated',
      user: {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
      },
    })
  } catch (e) {
    res.status(400).json({ message: e.message })
  }
})

// @route   DELETE api/users
// @desc    Delete a user account
// @access  Private
router.delete('/', authenticateToken, getUser, async (req, res) => {
  try {
    await res.user.remove()
    res.status(200).json({ message: 'User account deleted!' })
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
})

module.exports = router
