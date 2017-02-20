import React, { Component } from 'react'
import { render } from 'react-dom'
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router'

import Chat from './components/Chat'
import Analytics from './components/Analytics'

render(
  <Router history={browserHistory}>
    <Route path="/">  
      <IndexRoute component={Chat}/>
      <Route path="analytics" component={Analytics}/>
    </Route>
  </Router>,
  document.getElementById('root')
)
