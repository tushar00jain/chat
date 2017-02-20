import React, { Component } from 'react'

export default class Messages extends Component {
  constructor (props) {
		super(props)
	}

  render () {
    const me = this.props.me ? 'me' : '';

    return (
      <div className={'message ' + me}>
        <div className='message-content'>
          { this.props.message }
        </div>
      </div>
    )
  }
}
