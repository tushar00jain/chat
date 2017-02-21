import React, { Component } from 'react'
import { Link } from 'react-router'

import io from 'socket.io-client'

export default class Analytics extends Component {
  constructor (props) {
    super(props)
    this.socket = io('http://localhost:3000', { path: '/api/chat' }) 

    this.state = {
      messages: [],
      cloud: []
    }
  }

  componentDidMount() {
    this.socket.emit('client:analytics:connection')

    this.socket.on('server:message', message => {
      let messages = this.state.messages
      messages.push(message)
      this.setState({ messages })
      console.log(this.state.messages)
    })

    this.socket.on('server:cloud', data => {
      console.log(data)
    })

  }

  render () {
    return (
      <div>
        <Link to="/">
          <h3>
            Chat
          </h3>
        </Link>

        <div>
          <h2>Analytics</h2>
        </div>
      </div>
    )
  }
}
