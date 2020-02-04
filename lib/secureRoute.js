const jwt = require('jsonwebtoken')
const { secret } = require('../config/environment')
const User = require('../models/user')

function secureRoute(req, res, next) {
  // ! Check if the request has a header with authorisation to begin with
  if (!req.headers.authorization) return res.status(401).json({ message: 'Unauthorised' })
  // ! Get Token from the auth header
  const token = req.headers.authorization.replace('Bearer ', '')


  // ! Creates a new Promise, an object that returns something when it's functinoality is complete, depending on sucess or not
  new Promise((resolve, reject) => {
    // ! Verify token (check is a valid token) using secret. Attach a callback function that resolves promise and returns payload if sucessful
    jwt.verify(token, secret, (err, payload) => {
      if (err) return reject(err)
      resolve(payload)
    })
  })
  // ! Use payload to find user
    .then(payload => User.findById(payload.sub))
    .then(user => {
      // ! If the user doesnt exist, stop request and send response back
      if (!user) return res.status(401).json({ message: 'Unauthorised' })
      // ! Set new current user key on req to the user found by the auth token (request sender)
      req.currentUser = user 
      // ! Mext middleware
      next()
    })
    .catch(err => res.json(err))
}

module.exports = secureRoute