import { createStore } from "redux";
import { devToolsEnhancer } from "redux-devtools-extension";
import root from "./reducers/root";

export default function configureStore(initialState = {}) {
  return createStore(root, initialState, devToolsEnhancer());
}
