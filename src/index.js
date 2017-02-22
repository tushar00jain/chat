import React, { Component } from 'react'
import { render } from 'react-dom'
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router'

import Chat from './components/chat/Chat'
import Analytics from './components/analytics/Analytics'

render(
  <Router history={browserHistory}>
    <Route path="/">  
      <IndexRoute component={Chat}/>
      <Route path="analytics" component={Analytics}/>
    </Route>
  </Router>,
  document.getElementById('root')
)
