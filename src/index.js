import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Provider } from "react-redux";
import { configureStore } from "./store";
import storage from "./utils/storage";
import { loadTags } from "./actions/actions";
import * as TYPES from "./utils/actionTypes";

// import './index.css'
import App from "./components/App";
import * as serviceWorker from "./serviceWorker";

import theme from "./assets/theme";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/styles";

const renderApp = props => {
  ReactDOM.render(
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Provider {...props}>
        <App />
      </Provider>
    </ThemeProvider>,
    document.getElementById("root")
  );
};

// histórico del browser
const history = createBrowserHistory();

// cargamos la session que hubiese en localStorage
const { getItem } = storage();
const session = JSON.parse(getItem("NodePop-User")) || undefined;

// configuramos un store, pasando los datos de la sesion como estado inicial
const store = configureStore({
  history
})({
  user: session
});

// cuando haya un cambio en el store, sincronizamos localStorage
store.subscribe(() => {
  const { lastAction } = store.getState();
  // cuando tengamos las tags en el store, renderizamos la app
  console.log("lastAction", lastAction);
  if (lastAction.type === TYPES.TAGS_LOAD_SUCCESFULL) {
    renderApp({ store, history });
  }
});

// lanzamos una accion inicial para cargar las tags
store.dispatch(loadTags());

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
