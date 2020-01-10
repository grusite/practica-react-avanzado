import { combineReducers } from "redux";
import user from "./user";
import adverts from "./adverts";

export default combineReducers({
  user,
  adverts
});
