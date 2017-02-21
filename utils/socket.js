module.exports = (function () {
  'use strict'

  var methods = {}
  var messages = []
  var clients = []

  methods.addMessage = function (message) {
    messages.push(message)
    console.log(messages)
  }

  methods.addClient = function (clientId) {
    clients.push(clientId)
    console.log(clients)
  }

  return methods
})()
