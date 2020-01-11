import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import loggerMiddleware from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";
import root from "./reducers/root";

const configureMiddleware = config => {
  const middlewares = [thunkMiddleware.withExtraArgument(config)];
  if (process.env.NODE_ENV === "development") {
    middlewares.push(loggerMiddleware);
  }
  return middlewares;
};

export const configureStore = config => preloadedState => {
  const middlewares = configureMiddleware(config);
  const composeEnhancers = composeWithDevTools;

  return createStore(
    root,
    preloadedState,
    composeEnhancers(applyMiddleware(...middlewares))
  );
};
