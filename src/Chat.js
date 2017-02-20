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
      messages: [],
      socket: io('http://localhost:3000', { path: '/api/chat' })
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.state.socket.emit('test')
  }

  handleSubmit (message) {

    let messages = this.state.messages
    messages.push({
      message,
      me: true
    })
    this.setState({ messages })
    console.log(this.state.messages)

  }

  render () {
    return (
    <div>
      <Link to="/analytics">Analytics</Link>
        <div>
          <h2>Chat</h2>
          <Messages messages={this.state.messages}></Messages>
          <Input handleSubmit={this.handleSubmit}></Input>
          
        </div>
    </div>
    )
  }
}
