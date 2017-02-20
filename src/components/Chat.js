import React, { Component } from 'react'
import { Link } from 'react-router'

import io from 'socket.io-client'

import Input from './Input' 
import Message from './Message' 
import Messages from './Messages' 

export default class Chat extends Component {
  constructor(props) {
    super(props)
    this.state = {
      messages: []
    }
    this.socket = io('http://localhost:3000', { path: '/api/chat' }) 
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.socket.emit('client:connection')

    this.socket.on('server:message', message => {
      let messages = this.state.messages
      messages.push({
        message,
        me: false
      })
      this.setState({ messages })
    })
  }

  handleSubmit (message) {
    let messages = this.state.messages
    messages.push({
      message,
      me: true
    })
    this.socket.emit('client:message', message)
    this.setState({ messages })
    console.log(this.state.messages)
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
