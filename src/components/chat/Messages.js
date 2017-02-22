import React, { Component } from 'react'
import Message from './Message'

export default class Messages extends Component {
  constructor (props) {
		super(props)
	}

  componentDidUpdate() {
    const messages = document.getElementById('messages')
    messages.scrollTop = messages.scrollHeight
  }

  render () {
    const { user } = this.props
    const messages = this.props.messages.map((message, i) => {
      return (
        <Message key={i}
          message={message}
          user={this.props.user} 
        />
      )
    })

    return (
      <div className='messages' id='messages'>
        { messages }
      </div>
    )
  }
}
