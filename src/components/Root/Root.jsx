import React from "react";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import theme from "../../assets/theme";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/styles";

import App from "../App";

const Root = ({ store, history, ...props }) => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Provider store={store}>
      <Router history={history}>
        <App {...props} />
      </Router>
    </Provider>
  </ThemeProvider>
);

export default Root;
