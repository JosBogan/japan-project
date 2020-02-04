const Destination = require('../models/japan/destination')

function createComment(req, res) {
  req.body.user = req.currentUser
  Destination
    .findById(req.params.id)
    .populate({ path: 'comments.user', model: 'User' })
    .then(destination => {
      if (!destination) return res.status(401).json({ message: 'Nothing Here' })
      destination.comments.unshift(req.body)
      return destination.save()
    })
    .then(destination => {
      return res.status(201).json(destination)
    })
    .catch(err => res.status(400).json(err))
}

function deleteComment(req, res) {
  Destination
    .findById(req.params.id)
    .populate({ path: 'comments.user', model: 'User' })
    .then(destination => {
      if (!destination) return res.status(401).json({ message: 'Nothing Here' })
      const comment = destination.comments.id(req.params.commentId)
      if (!comment) return res.status(401).json({ message: 'No Comment Found' })
      if (!comment.user.equals(req.currentUser._id)) return res.status(401).json({ message: 'Unauthorised' }) 
      comment.remove()
      return destination.save()
    })
    .then(destination => res.status(200).json(destination))
    .catch(err => res.status(400).json(err))
}

function editComment(req, res) {
  Destination
    .findById(req.params.id)
    .populate({ path: 'comments.user', model: 'User' })
    .then(destination => {
      if (!destination) return res.status(401).json({ message: 'Nothing Here' })
      const comment = destination.comments.id(req.params.commentId)
      if (!comment) return res.status(401).json({ message: 'No Comment Found' })
      if (!comment.user.equals(req.currentUser._id)) return res.status(401).json({ message: 'Unauthorised' })
      Object.assign(comment, req.body)
      return destination.save()
    })
    .then(destination => res.status(200).json(destination))
    .catch(err => res.status(400).json(err))
}


module.exports = { createComment, deleteComment, editComment }