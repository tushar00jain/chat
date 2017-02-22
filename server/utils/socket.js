module.exports = (function () {
  'use strict'
  var _ = require('lodash')
  var models = require('../models/Chat')
  

  var methods = {}
  var data = {
    messages: [],
    messageString: ''
  }

  methods.addMessage = function (message) {
    data.messages.push(message.message)
    data.messageString += (message.message + " ")
    const newMessage = new models.Message(message)
    newMessage.save(err => {
      if (err) return console.log(err)
    })
  }

  methods.getMessages = function (req, res, next) {
    models.Message.find({}, {'_id': 0, '__v': 0}).exec((err, messages) => {
      res.json(messages)
      return next()
    })
  }

  methods.getCounts = function () {
    let frequency = {}
    const words = data.messageString
                 .replace(/[.,?!;()"'-]/g, " ")
                 .replace(/\s+/g, " ")
                 .toLowerCase()
                 .split(" ")
                 
    words.forEach(function (word) {
        if (!(frequency.hasOwnProperty(word))) {
            frequency[word] = 0
        }
        frequency[word]++
    })

    let result = Object.keys(frequency).map(k => {
      return {
        text: k,
        size: frequency[k]
      }
    })

    return result
  }

  return methods
})()
