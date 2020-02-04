// ! No need to import the mongoose because monster is alread a mongoose schema (../models/monster) so it has all the funcs needed
const Destination = require('../models/japan/destination')

// ! Show index page (Collection) -- blank .find() func returns the collection but can take an obj param to search ({ 'name': 'vampire' })
function index(req, res) {
  Destination
    .find()
    .then(destinations => res.status(200).json(destinations))
    .catch(err => res.json(err))
}

// ! Show Item (Individual)  -- .findById() is the shorthand version of .find({ _id: req.params.id })
function show(req, res) {
  Destination
    .findById(req.params.id)
    .populate({ path: 'comments.user', model: 'User' })
    .then(destination => {
      if (!destination) return res.status(404).json({ message: 'Nowhere Found' })
      res.status(202).json(destination)
    })
    .catch(err => res.json(err))
}

// ! Export Functions
module.exports = { index, show }