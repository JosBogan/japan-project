const router = require('express').Router()
const destinations = require('../controllers/destinations')
const comments = require('../controllers/comments')
const auth = require('../controllers/auth')
const secureRoute = require('../lib/secureRoute')

// ! Routes for collection -- Checks the endpoint and reroutes depending on verb keyword
router.route('/destinations')
  .get(destinations.index)

// ! Routes for individual -- Checks the endpoint and reroutes depending on verb keyword
router.route('/destinations/:id')
  .get(destinations.show)

// ! Routes for individual and then comments
router.route('/destinations/:id/comments')
  .post(secureRoute, comments.createComment)

// ! Routes for individual and then individual comment
router.route('/destinations/:id/comments/:commentId')
  .delete(secureRoute, comments.deleteComment)
  .put(secureRoute, comments.editComment)

// ! Route for register
router.route('/register')
  .post(auth.register)

// ! Route for Login
router.route('/login')
  .post(auth.login)


module.exports = router