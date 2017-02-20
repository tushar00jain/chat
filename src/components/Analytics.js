import React, { Component } from 'react'
import { Link } from 'react-router'

export default class Analytics extends Component {
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
