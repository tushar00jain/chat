var path = require('path')
  , express = require('express')
  , utils = require(path.join(__dirname, 'utils'))
  , bodyParser = require('body-parser')

  , app = express()
  , server = require('http').Server(app)
  , io = require('socket.io').listen(server, { path: '/api/chat'})
  
  , mongoose = require('mongoose')

// mongodb
mongoose.Promise = require('bluebird')
mongoose.connect('mongodb://db:27017/test')
var db = mongoose.connection
db.on('error', console.error.bind(console, 'Connection Error : '))

// middleware
app.use( bodyParser.json() )       
app.use(bodyParser.urlencoded({     
  extended: true
})) 
app.use('/static', express.static(path.join(__dirname, '../public')))
app.use('/static', express.static(path.join(__dirname, '../build')))

// api
app.get('/api/counts', utils.getCounts)
app.get('/api/messages', utils.getMessages)

// send html file to the client at all routes except `/api/*`
// client side routing handled by react router
app.get(/^(?!\/api).*$/, (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'))
})

// socket io
io.on('connection', socket => {
  socket.on('client:message', message => {
    // broadcast message too clients excluding the sender
    utils.addMessage(message)
    .then(() => {
      // emit the message if it was successfully saved to mongo
      socket.broadcast.emit('server:message', message)
    })
    .catch(err => {
      console.log(err.message)
    })
  })

  socket.on('client:connection', () => {
  })

  socket.on('client:disconnect', () => {
  })
})

// start mongo and server
if (!module.parent) {
  db.once('open', () => {
    console.log('Mongo connection ok!')
    server.listen(3000, (err) => {
      if (err) return console.log(err.message)
      console.log('Listening at http://localhost:3000')
    })
  })
}
