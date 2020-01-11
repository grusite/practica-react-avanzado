import { combineReducers, compose } from "redux";
import user from "./user";
import adverts from "./adverts";

const lastActionReducerEnhancer = reducer => (
  { lastAction, ...state },
  action
) => ({
  ...reducer(state, action),
  lastAction: action
});

const createRootReducer = compose(lastActionReducerEnhancer, combineReducers);

export default createRootReducer({
  user,
  adverts
});
