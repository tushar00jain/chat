import React, { Component } from 'react'

export default class Messages extends Component {
  constructor (props) {
		super(props)
	}

  render () {
    const me = this.props.me ? 'me' : '';

    return (
      <div className={me}>
        <div className='message'>
          { this.props.message }
        </div>
      </div>
    )
  }
}
