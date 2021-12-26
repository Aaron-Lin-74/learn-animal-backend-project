const express = require('express')
const router = express.Router()
const Animal = require('../../models/animal')
const authenticateToken = require('../../middleware/authenticateToken')

// @route   GET api/animals?type=type&limit=3
// @desc    Get limit number of animals of certain type using query string
// @access  Public
router.get('/', async (req, res) => {
  // data transmited over the network is in string type
  const limitNum = Number(req.query.limit) || 3
  let animals
  try {
    animals = await Animal.find({ type: req.query.type }).limit(limitNum)

    res.json(animals)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// @route GET api/animals/mammal?limit=3
// @desc Get limit number of mammal animals
// @access Public
router.get('/mammal', async (req, res) => {
  const limitNum = Number(req.query.limit) || 3
  let animals
  try {
    animals = await Animal.find({ type: 'mammal' }).limit(limitNum)
    res.json(animals)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// @route GET api/animals/bird?limit=3
// @desc Get limit number of bird animals
// @access Public
router.get('/bird', async (req, res) => {
  const limitNum = Number(req.query.limit) || 3
  let animals
  try {
    animals = await Animal.find({ type: 'bird' }).limit(limitNum)
    res.json(animals)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// @route GET api/animals/reptile?limit=3
// @desc Get limit number of reptile animals
// @access Private
router.get('/reptile', authenticateToken, async (req, res) => {
  const limitNum = Number(req.query.limit) || 3
  let animals
  try {
    animals = await Animal.find({ type: 'reptile' }).limit(limitNum)
    res.json(animals)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// @route GET api/animals/fish?limit=3
// @desc Get limit number of fish animals
// @access Private
router.get('/fish', authenticateToken, async (req, res) => {
  const limitNum = Number(req.query.limit) || 3
  let animals
  try {
    animals = await Animal.find({ type: 'fish' }).limit(limitNum)
    res.json(animals)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// @route GET api/animals/amphibian?limit=3
// @desc Get limit number of amphibian animals
// @access Private
router.get('/amphibian', authenticateToken, async (req, res) => {
  const limitNum = Number(req.query.limit) || 3
  let animals
  try {
    animals = await Animal.find({ type: 'amphibian' }).limit(limitNum)
    res.json(animals)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// @route GET api/animals/invertebrate?limit=3
// @desc Get limit number of invertebrate animals
// @access Private
router.get('/invertebrate', authenticateToken, async (req, res) => {
  const limitNum = Number(req.query.limit) || 3
  let animals
  try {
    animals = await Animal.find({ type: 'invertebrate' }).limit(limitNum)
    res.json(animals)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

module.exports = router
