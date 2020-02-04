// ! No need to import the mongoose because monster is alread a mongoose schema (../models/monster) so it has all the funcs needed
const Monster = require('../models/monster')

// ! Show index page (Collection) -- blank .find() func returns the collection but can take an obj param to search ({ 'name': 'vampire' })
function index(req, res) {
  Monster
    .find()
    .then(monsterList => res.status(200).json(monsterList))
    .catch(err => res.json(err))
}

// ! Create new item (Collection) -- .create() takes the request body and creates new document using monster model
function create(req, res) {
  Monster
    .create(req.body)
    .then(createdMonster => res.status(201).json(createdMonster))
    .catch(err => res.json(err))
}

// ! Show Item (Individual)  -- .findById() is the shorthand version of .find({ _id: req.params.id })
function show(req, res) {
  Monster
    .findById(req.params.id)
    .then(foundMonster => {
      if (!foundMonster) return res.status(404).json({ message: 'No Monster Found' })
      res.status(202).json(foundMonster)
    })
    .catch(err => res.json(err))
}

// ! Update Item (Individual) -- .findByIdAndUpdate() requires an id, the request body to update and an optional object to return new object
function update(req, res) {
  Monster
    .findById(req.params.id)
    .then(foundMonster => {
      if (!foundMonster) return res.status(404).json({ message: 'No Monster Found' })
      const newMonster = Object.assign(foundMonster, req.body)
      return newMonster.save()
    })
    .then(updatedMonster => res.status(200).json(updatedMonster))
    .catch(err => res.json(err))
}

// ! Delete Item (Individual) -- .findByIdAndDelete() does what it says on the tin
function del(req, res) {
  Monster
    .findByIdAndDelete(req.params.id)
    .then(foundMonster => {
      if (!foundMonster) return res.status(404).json({ message: 'No Monster Found' })
      res.sendStatus(204)
    })
    .catch(err => res.json(err))
}

// ! Export Functions
module.exports = { index, create, show, update, del }