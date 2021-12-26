const User = require('../models/user')

// Get the user after the token authentication
const getUser = async (req, res, next) => {
  let user
  try {
    user = await User.findById(req.user.id)
    if (user == null) {
      return res.status(404).json({ message: 'Could not find the user' })
    }
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
  res.user = user
  next()
}

module.exports = getUser
