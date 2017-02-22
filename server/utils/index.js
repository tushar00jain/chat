module.exports = (function () {
  'use strict'
  var _ = require('lodash')
  var promise = require('bluebird')
  var models = require('../models/Message')
  
  // methods to be returned from this file
  var methods = {}
  // mongoose map reduce object to calculate word count
  var frequency = {}

  // mongoose map for word count
  frequency.map = function () {
    const words = this.message.replace(/[.,?!;()"'-]/g, " ").replace(/\s+/g, " ").toLowerCase().split(" ")
    words.forEach(function (word) {
      emit(word, 1)
    })
  }
  
  // mongoose reduce for word count
  frequency.reduce = function (key, values) {
    return values.reduce(function(acc, curr) {
      return acc + curr
    }, 0)
  }

  // // add new message to mongo
  methods.addMessage = function (message) {
    return new promise((resolve, reject) => {
      const newMessage = new models.Message(message)
      newMessage.save(err => {
        if (err) reject(err)
        else resolve()
      })
    })
  }

  // get all message data from mongo
  methods.getMessages = function (req, res, next) {
    models.Message.find({}, {'_id': 0, '__v': 0}).exec((err, messages) => {
      if (err) {
        console.log(err.message)
        return next(err)
      }
      res.json(messages)
      return next()
    })
  }

  // map reduce mongo and get the word counts
  methods.getCounts = function (req, res, next) {
    models.Message.mapReduce(frequency, (err, counts) => {
      if (err) {
        console.log(err.message)
        return next(err)
      }
      res.json(counts.map(d => { 
        return { text: d._id, size: d.value } 
        })
      )
      return next()
    })
  }

  return methods
})()
