import React, { Component } from 'react'
import { render } from 'react-dom'
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router'
import io from 'socket.io-client'

class Chat extends Component {
  constructor(props) {
		super(props)
    this.state = {
      socket: io('http://localhost:3000', { path: '/api/chat' })
    }
	}

	componentDidMount() {
		this.state.socket.emit('test')
	}

  render () {
    return (
    <div>
    <Link to="/analytics">Analytics</Link>
      Chat
    </div>
    )
  }
}

class Analytics extends Component {
  render () {
    return (
      <div>
        <Link to="/">Chat</Link>
        Analytics
      </div>
    )
  }
}

render(
  <Router history={browserHistory}>
    <Route path="/">  
      <IndexRoute component={Chat}/>
      <Route path="analytics" component={Analytics}/>
    </Route>
  </Router>,
  document.getElementById('root')
)
