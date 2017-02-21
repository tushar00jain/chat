var config = require('./webpack.config.dev')
  , express = require('express')
  , path = require('path')
  , utilSocket = require('./utils/socket.js')
  , webpack = require('webpack')

  , compiler = webpack(config)

  , app = express()
  , server = require('http').Server(app)
  , io = require('socket.io').listen(server, { path: '/api/chat'})
  
  , mongoose = require('mongoose')

// mongodb
mongoose.Promise = require('bluebird')
mongoose.connect('mongodb://db:27017/test')
var db = mongoose.connection
db.on('error', console.error.bind(console, 'Connection Error : '))

// webpack
app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}))

// middleware
app.use(require('webpack-hot-middleware')(compiler))
app.use('/static', express.static(__dirname + '/public'))


// api
app.get('/api/test', (req, res) => {
  res.send('api')
})

app.get(/^(?!\/api).*$/, (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'))
})

// socket io
io.on('connection', socket => {
  socket.on('client:message', message => {
    socket.broadcast.emit('server:message', message)
    io.emit('server:cloud', 'test')
    utilSocket.addMessage(message)
  })

  socket.on('client:connection', () => {
    console.log('connect')
    utilSocket.addClient(socket.id)
  })

  socket.on('client:disconnect', () => {
    console.log('disconnect')
  })
})

// start mongo and server
if (!module.parent) {
  db.once('open', () => {
    console.log('Mongo connection ok!')
    server.listen(3000, (err) => {
      if (err) {
        console.log(err)
        return
      }
      console.log('Listening at http://localhost:3000')
    })
  })
}
