import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import ErrorBoundary from "../ErrorBoundary";
import PrivateRoute from "../PrivateRoute";
import Home from "../Home";
import Register from "../Register";
import AdvertDetail from "../AdvertDetail";
import CreateUpdateAdvert from "../CreateUpdateAdvert";
import Error404 from "../Error404";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <ErrorBoundary>
        <Router>
          <Switch>
            <Route path="/register" component={Register} />
            <PrivateRoute exact path="/advert" component={Home} />
            <PrivateRoute path="/advert/:id" component={AdvertDetail} />
            <PrivateRoute path="/create" component={CreateUpdateAdvert} />
            <PrivateRoute path="/update" component={CreateUpdateAdvert} />
            <PrivateRoute exact path="/" component={Register} />
            <PrivateRoute component={Error404} />
          </Switch>
        </Router>
      </ErrorBoundary>
    );
  }
}

export default App;
