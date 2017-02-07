import React from "react";
import {Router, Route} from "dva/router";
import IndexPage from "./routes/IndexPage/IndexPage";
import App from "./routes/app";


function RouterConfig({history}) {
  return (
    <Router history={history}>
      <Route path="/" component={IndexPage}/>
      <Route path="/app" component={App}/>

    </Router>
  );
}

export default RouterConfig;
