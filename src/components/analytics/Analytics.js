import React, { Component } from 'react'
import { Link } from 'react-router'

import io from 'socket.io-client'

import Cloud from './Cloud'

// socket connection for detecting new messages
const socket = io('http://localhost:3000', { path: '/api/chat' }) 

export default class Analytics extends Component {
  constructor (props) {
    super(props)

    this.state = {
      // data for the word cloud
      cloud: []
    }

    this.loadData = this.loadData.bind(this)
  }

  // load data for the application
  loadData () {
    // load data for the word cloud
    d3
    .json('http://localhost:3000/api/counts', (err, data) => {
      if (err) return console.log(err)
      this.setState({
        cloud: data
      })
    })
  }

  componentDidMount () {

    // load application data when someone sends a new message
    socket.on('server:message', message => {
      this.loadData()
    })

    // load initial data
    this.loadData()
  }

  componentWillUnmount () {
    // remove soket connection when component unmounts
    socket.removeAllListeners('server:message')
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

        <div>
          <svg width="850" height="350" className="wordcloud">
            <Cloud data={this.state.cloud}/>
          </svg>
        </div>
      </div>
    )
  }
}
