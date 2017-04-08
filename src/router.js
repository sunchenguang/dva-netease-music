import React from 'react'
import { Route, Router } from 'dva/router'
import App from './routes/app'
import IndexPage from './routes/IndexPage/IndexPage'
import PropDoc from './doc/index'

function RouterConfig ({history}) {
  return (
    <Router history={history}>
      <Route path="/" component={App}/>
      <Route path="/page" component={IndexPage}/>
      <Route path="/doc" component={PropDoc}/>
    </Router>
  )
}

export default RouterConfig
