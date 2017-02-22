import React, { Component } from 'react'

export default class Messages extends Component {
  constructor (props) {
		super(props)
	}

  render () {
    const { message, user } = this.props
    const me = user === message.user ? 'me' : ''

    return (
      <div className={'message ' + me}>
        <div className='message-content'>
          { message.message }
        </div>
      </div>
    )
  }
}
