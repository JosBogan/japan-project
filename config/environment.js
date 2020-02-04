// ! Port and dbURI var to control across whole project
const port = process.env.PORT || 4000
const dbURI = process.env.MONGODB_URI || 'mongodb://localhost/monsters-api'
const secret = process.env.SECRET || 'Best kept secret in North London'

module.exports = { port, dbURI, secret }