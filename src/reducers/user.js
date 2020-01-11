import { LOGIN, LOGOUT } from "../utils/actionTypes";

const defaultState = {
  isLoggedIn: false,
  name: "",
  surname: "",
  tag: ""
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case LOGIN:
      return Object.assign({}, state, {
        isLoggedIn: true,
        name: action.name,
        surname: action.surname,
        tag: action.tag
      });
    case LOGOUT:
      return Object.assign({}, state, {
        isLoggedIn: false,
        name: "",
        surname: ""
      });
    default:
      return state;
  }
};
