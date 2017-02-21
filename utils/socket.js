module.exports = (function () {
  'use strict'

  var methods = {}
  var data = {
    messages: [],
    clients: []
  }

  methods.addMessage = function (message) {
    data.messages.push(message)
    console.log(data.messages)
  }

  methods.addClient = function (clientId) {
    data.clients.push(clientId)
    console.log(data.clients)
  }

  return methods
})()
