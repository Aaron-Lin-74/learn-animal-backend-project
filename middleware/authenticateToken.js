require('dotenv').config()
const jwt = require('jsonwebtoken')

// Validate the access token
const authenticateToken = (req, res, next) => {
  // The token is in the headers with Bearer
  const authHeader = req.headers.authorization
  const token = authHeader && authHeader.split(' ')[1]

  // Check the existance of the token
  if (token == null) {
    return res.status(401).json({ message: 'No token, authorization denied' })
  }

  // Verify the token
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      // The user has the token but it is no longer valid
      return res.status(403).json({ message: 'Forbidden' })
    }

    // Add user to payload
    req.user = user
    next()
  })
}

module.exports = authenticateToken
