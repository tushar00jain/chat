import React, { Component } from 'react'
import Message from './Message'

export default class Messages extends Component {
  constructor (props) {
		super(props)
	}

  render () {
    const messages = this.props.messages.map((message, i) => {
    return (
      <Message key={i}
        message={message.message}
        me={message.me} />
      )
    })

    return (
      <div className='messages' id='messages'>
        { messages }
      </div>
    )
  }
}
