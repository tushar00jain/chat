module.exports = (function () {
  'use strict'

  var methods = {}
  var data = {
    messages: [],
    clients: [],
    messageString: ''
  }

  methods.addClient = function (clientId) {
    data.clients.push(clientId)
  }

  methods.addMessage = function (message) {
    data.messages.push(message)
    data.messageString += (message + " ")
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
