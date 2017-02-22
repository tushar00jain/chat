import React, { Component } from 'react'

export default class User extends Component {
  constructor (props) {
		super(props)
    this.state = {
      value: ''
    }
    this.handleUser = this.handleUser.bind(this)
    this.handleChange = this.handleChange.bind(this)
	}

  handleUser (e) {
    e.preventDefault()
    this.props.handleUser(this.state.value)
  }

  handleChange (e) {
    this.setState({value: e.target.value})
  }

  render () {
    return (
    <div>
      <form onSubmit={this.handleUser}>
        <input type="text"
          value={this.state.value}
          onChange={this.handleChange}
          placeholder="Type a username ..." required />
      </form>
    </div>
    )
  }
}
