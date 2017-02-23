import React, { Component } from 'react'
import { Link } from 'react-router'

import _ from 'lodash'
import io from 'socket.io-client'
import superagent from 'superagent'

import Input from './Input' 
import Message from './Message' 
import Messages from './Messages' 
import User from './User' 

import { SERVER } from '../../constants'

const socket = io(SERVER, { path: '/api/chat' }) 

export default class Chat extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // sent and recieved messages
      messages: []
      // username
    ,  user: ''
    }

    // socket connection for getting messages from other people
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleUser = this.handleUser.bind(this)
  }

  componentDidMount() {
    // new client connected to the chat application
    socket.emit('client:connection')

    // addd messages from other clients
    socket.on('server:message', message => {
      let { messages, user } = this.state
      messages.push(message)
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
    let { messages, user } = this.state
    messages.push({ message, user })
    // send the message to other clients
    socket.emit('client:message', { message, user })
    this.setState({ messages })
  }

  handleUser (user) {
    this.setState({ user })
    superagent
      .get(SERVER + '/api/messages')
      .then(res => {
        this.setState({
          messages: res.body
        })
      })
      .catch(err => console.log(err))
  }

  render () {
    // allow user to send message if they have a name
    const hasName = _.isEmpty(this.state.user)

    return (
    <div>
      <Link to="/analytics">
          <h4>
            Analytics
          </h4>
      </Link>

      <div>
        { 
          hasName ? 
            (<User handleUser={this.handleUser}/>) : 
            (<h4>{this.state.user}</h4>)
        }
      </div>


      <div className="container">
        <h2>Chat</h2>
        {
          hasName ?
          (<h4>Please enter a username first</h4>) :
          (
            <div>
              <Messages messages={this.state.messages} user={this.state.user}></Messages>
              <Input handleSubmit={this.handleSubmit}></Input>
            </div>
          )
        }
      </div>
    </div>
    )
  }
}
