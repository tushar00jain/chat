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
app.use(express.static('public'))

// api
app.get('/api/test', function(req, res) {
  res.send('api')
})

app.get(/^(?!\/api).*$/, function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'))
})

// socket io
io.on('connection', socket => {
  console.log('connction')

  socket.on('new-message', message => {
    console.log(message)
    io.emmit('receive-message', message)
  })

  socket.on('test', data => {
    console.log(data)
  })
})

if (!module.parent) {
  db.once('open', () => {
    console.log('Connection ok!')
    server.listen(3000, (err) => {
      if (err) {
        console.log(err)
        return
      }
      console.log('Listening at http://localhost:3000')
    })
  })
}
