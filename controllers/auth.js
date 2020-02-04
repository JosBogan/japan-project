const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { secret } = require('../config/environment')


// ! Register, uses the User model to create a new user document in the db -- at this point the pre hooks and passconf validation in user.js run
function register(req, res) {
  User
    .create(req.body)
    .then(user => res.status(201).json({ message: `Thank you for registering with us ${user.username}` }))
    .catch(err => {
      if (err.errors.username) err.errors.username = 'Username is required'
      if (err.errors.email) err.errors.email = 'Email is required'
      if (err.errors.password) err.errors.password = 'Password is required'
      if (err.errors.errmsg) {
        if (err.errors.keyValue.username) err.errors.username = 'Username has been taken'
        if (err.errors.keyValue.email) err.errors.emaul = 'Email has been taken'
      }
      res.status(400).json(err)
    })
}

// ! Log in, finds the document in the db by email, runs validatepassword with the request password as an arguement to compare
function login(req, res) {
  User
    .findOne({ email: req.body.email })
    .then(user => {
      if (!user || !user.validatePassword(req.body.password)) {
        return res.status(400).json({ message: 'Incorrect email or password' })
      }
      // ! If above goes all well, create a token using secret and the user id as the sub. Send response back  
      const token = jwt.sign({ sub: user._id }, secret, { expiresIn: '6h' })
      res.status(202).json({ 
        message: 'Welcome Back!',
        token
      })
    })
    .catch(err => res.status(400).json(err))
}

module.exports = { register, login }