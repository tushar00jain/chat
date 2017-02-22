import React, { Component } from 'react'
import { Link } from 'react-router'

import io from 'socket.io-client'

import Input from './Input' 
import Message from './Message' 
import Messages from './Messages' 

const socket = io('http://localhost:3000', { path: '/api/chat' }) 

export default class Chat extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // sent and recieved messages
      messages: []
    }

    // socket connection for getting messages from other people
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    // new client connected to the chat application
    console.log('mount')
    socket.emit('client:connection')

    // addd messages from other clients
    socket.on('server:message', message => {
      let messages = this.state.messages
      messages.push({
        message,
        me: false
      })
      this.setState({ messages })
    })
  }

  componentWillUnmount () {
    // remove soket connection when component unmounts
    socket.emit('client:disconnect')
    socket.removeAllListeners('server:message')
  }

  // client sends new message
  handleSubmit (message) {
    // update the message state
    let messages = this.state.messages
    messages.push({
      message,
      me: true
    })
    // send the message to other clients
    socket.emit('client:message', message)
    this.setState({ messages })
  }

  render () {
    return (
    <div>
      <Link to="/analytics">
          <h3>
            Analytics
          </h3>
      </Link>

      <div className="container">
        <h2>Chat</h2>
        <Messages messages={this.state.messages}></Messages>
        <Input handleSubmit={this.handleSubmit}></Input>
      </div>
    </div>
    )
  }
}
