import React from "react";
import { Redirect, Route } from "react-router-dom";

const PrivateRoute = ({ authorized, ...props }) => {
  console.log("Auth", authorized);
  return authorized ? <Route {...props} /> : <Redirect to="/register" />;
};

export default PrivateRoute;
