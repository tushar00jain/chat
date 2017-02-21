import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router'
import d3 from 'd3'
import cloud from 'd3-cloud'

import io from 'socket.io-client'

class Cloud extends Component {
  constructor (props) {
    super(props)
    this.update = this.update.bind(this)
    this.draw = this.draw.bind(this)
  }

  componentWillMount () {
    this.color = d3.scale.category20()
    this.layout = cloud()
  }

  componentDidMount () {
    this.update()
  }
  
  componentDidUpdate () {
    this.update()
  }

  update () {
    this.layout
        .size([800, 300])
        .words(this.props.data)
        .rotate(0)
        .fontSize(d => d.size)
        .on("end", this.draw)
        .start()
  }

  draw () {
    d3.select(ReactDOM.findDOMNode(this))
      .selectAll("text")
      .data(this.props.data)
      .enter().append("text")
      .style("font-size", d => d.size + "px")
      .style("fill", (d, i) => this.color(i))
      .attr("transform", d => {
        return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")"
      })
      .text(d => d.text )
  }

  render () {
    return (
        <g transform="translate(320,200)">
        </g>
    )
  }
}

export default class Analytics extends Component {
  constructor (props) {
    super(props)
    this.socket = io('http://localhost:3000', { path: '/api/chat' }) 

    this.state = {
      messages: [],
      cloud: []
    }

    this.loadData = this.loadData.bind(this)
  }

  loadData () {
    d3
    .json('http://localhost:3000/static/data/words.json', (err, data) => {
      if (err) return console.log(err)
      this.setState({
        cloud: data
      })
    })
  }

  componentDidMount () {
    this.socket.emit('client:analytics:connection')

    this.socket.on('server:message', message => {
      let messages = this.state.messages
      messages.push(message)
      this.setState({ messages })
      console.log(this.state.messages)
    })

    this.socket.on('server:cloud', data => {
      console.log(data)
    })
    this.loadData()
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
