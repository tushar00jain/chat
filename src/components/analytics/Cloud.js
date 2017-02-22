import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import cloud from 'd3-cloud'
import d3 from 'd3'

export default class Cloud extends Component {
  constructor (props) {
    super(props)
    this.update = this.update.bind(this)
    this.draw = this.draw.bind(this)
  }

  componentWillMount () {
    // attach d3 bindings when the component is being loaded
    this.color = d3.scale.category20()
    this.layout = cloud()
  }

  componentDidMount () {
    // render initial d3 state
    this.update(this.props.data)
  }
  
  componentDidUpdate () {
    // update data for d3 to transition
    this.update(this.props.data)
  }

  update (data) {
    // start the layout for d3
    this.layout
        .size([800, 500])
        .words(data)
        .rotate(0)
        .fontSize(d => d.size * 15)
        .on("end", this.draw)
        .start()
  }

  draw (data) {
    let element = d3.select(ReactDOM.findDOMNode(this))
                    .selectAll("g text")
                    .data(data, d => d.text)

    // d3 enter transition for new data
    element
      .enter()
      .append("text")
      .style("fill", (d, i) => this.color(i))
      .attr('font-size', 1)
      .text(d => d.text )

    // animation
    element
      .transition()
      .duration(600)
      .style("font-size", d => d.size + "px")
      .attr("transform", d => {
        return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")"
      })
      .style("fill-opacity", 1)

      
    // d3 exit transition to remove old data
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


