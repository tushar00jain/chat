module.exports = (function () {
  'use strict'
  var mongoose = require('mongoose')
  mongoose.Promise = require('bluebird')

  var Schema = mongoose.Schema

  const MessageSchema = new Schema({
    user: { type: String },
    message: { type: String },
  })

  mongoose.model('Message', MessageSchema)
  const Message = mongoose.model('Message')

  return {
    Message: Message
  }
})()
