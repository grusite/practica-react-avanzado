import { LOGIN, LOGOUT } from "../utils/actionTypes";

const defaultState = {
  isLoggedIn: false,
  name: "",
  surname: "",
  tag: "",
  remindMe: false
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case LOGIN:
      return Object.assign({}, state, {
        isLoggedIn: true,
        name: action.name,
        surname: action.surname,
        tag: action.tag,
        remindMe: action.remindMe
      });
    case LOGOUT:
      return defaultState;
    default:
      return state;
  }
};
