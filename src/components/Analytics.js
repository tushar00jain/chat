import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
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
    this.update(this.props.data)
  }
  
  componentDidUpdate () {
    this.update(this.props.data)
  }

  update (data) {
    this.layout
        .size([800, 500])
        .words(data)
        .rotate(0)
        .fontSize(d => d.size * 10)
        .on("end", this.draw)
        .start()
  }

  draw (data) {
    let element = d3.select(ReactDOM.findDOMNode(this))
                    .selectAll("g text")
                    .data(data, d => d.text)
    element
      .enter()
      .append("text")
      .style("fill", (d, i) => this.color(i))
      .attr('font-size', 1)
      .text(d => d.text )

    element
      .transition()
      .duration(600)
      .style("font-size", d => d.size + "px")
      .attr("transform", d => {
        return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")"
      })
      .style("fill-opacity", 1)

    element
      .exit()
      .transition()
      .duration(200)
      .style('fill-opacity', 1e-6)
      .attr('font-size', 1)
      .remove()
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
      // messages: [],
      cloud: []
    }

    this.loadData = this.loadData.bind(this)
  }

  loadData () {
    d3
    .json('http://localhost:3000/api/counts', (err, data) => {
    // .json('http://localhost:3000/static/data/words.json', (err, data) => {
      if (err) return console.log(err)
      this.setState({
        cloud: data
      })
    })
  }

  componentDidMount () {
    this.socket.emit('client:analytics:connection')

    this.socket.on('server:message', message => {
      // let messages = this.state.messages
      // messages.push(message)
      // this.setState({ messages })
      this.loadData()
    })

    this.socket.on('server:cloud', data => {
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
