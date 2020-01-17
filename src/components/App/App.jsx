import React from "react";
import { Switch, Route } from "react-router-dom";

import ErrorBoundary from "../ErrorBoundary";
import PrivateRoute from "../PrivateRoute";
import Home from "../Home";
import Register from "../Register";
import AdvertDetail from "../AdvertDetail";
import CreateUpdateAdvert from "../CreateUpdateAdvert";
import Error404 from "../Error404";

const App = () => (
  <ErrorBoundary>
    <Switch>
      <Route path="/register" component={Register} />
      <PrivateRoute path="/advert/:id" component={AdvertDetail} />
      <PrivateRoute path="/create" component={CreateUpdateAdvert} />
      <PrivateRoute path="/update/:id" component={CreateUpdateAdvert} />
      <PrivateRoute exact path="/" component={Home} />
      <PrivateRoute component={Error404} />
    </Switch>
  </ErrorBoundary>
);

export default App;
