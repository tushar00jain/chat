import React, { Component } from 'react'

export default class Input extends Component {
  constructor (props) {
		super(props)
    // input value
    this.state = {
      value: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
	}

  // input changed
  handleChange (e) {
    this.setState({value: e.target.value})
  }

  // after user pressed enter
  handleSubmit (e) {
    e.preventDefault()
    this.props.handleSubmit(this.state.value)
    this.setState({ value: '' })
  }

  render () {
    return (
    <div>
      <form className="chat-input" onSubmit={this.handleSubmit}>
        <input type="text"
          value={this.state.value}
          onChange={this.handleChange}
          placeholder="Type a message ..." required />
      </form>
    </div>
    )
  }
}
