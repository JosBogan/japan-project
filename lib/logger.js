// ! Logger middleware for reference to make sure things are running smoothly
function logger(req, res, next) {
  console.log(`Recieving a ${req.method} request to ${req.url}`)
  next()
}

module.exports = logger