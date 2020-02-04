// ! Dependancies 
const express = require('express') // ! Helps run the server, set up the endpoints and requests
const mongoose = require('mongoose') // ! Helps communicate with and use mongoDB database functionality
const bodyParser = require('body-parser')

// ! Env variables
const { port, dbURI } = require('./config/environment')

// ! Importing components
const logger = require('./lib/logger')
const router = require('./config/router')

// ! Setting express server
const app = express()

// ! Using Mongoose to connect to MongoDB server
mongoose.connect(
  dbURI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) return console.log(err)
    console.log('MongoDB is connected')
  }
)

app.use(express.static(`${__dirname}/dist`))

// ! Parses/Compiles incoming request packages into request body object
app.use(bodyParser.json())

// ! Logger component middleware
app.use(logger)

// ! Routing to different functions depending on request end point and verb
app.use('/api', router)

app.use('/*', (req, res) => res.sendFile(`${__dirname}/dist/index.html`))

// ! Tell the server to start listening for requests
app.listen(port, () => `Server is running and listening to requests on port ${port}`)