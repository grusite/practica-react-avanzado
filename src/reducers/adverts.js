import {
  FETCH_ADVERTS_SUCCESS,
  TAGS_LOAD_SUCCESFULL
} from "../utils/actionTypes";

const defaultState = {
  adverts: [],
  tags: [],
  ui: {
    isFetching: false,
    error: null
  }
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case (action.type.match(/_REQUEST$/) || {}).input:
      return Object.assign({}, state, {
        ui: {
          isFetching: true,
          error: null
        }
      });
    case FETCH_ADVERTS_SUCCESS:
      return Object.assign({}, state, {
        adverts: action.adverts,
        ui: {
          isFetching: false,
          error: null
        }
      });
    case TAGS_LOAD_SUCCESFULL:
      return Object.assign({}, state, {
        tags: action.tags,
        ui: {
          isFetching: false,
          error: null
        }
      });
    case (action.type.match(/_FAILURE$/) || {}).input:
      return Object.assign({}, state, {
        ui: {
          isFetching: false,
          error: action.error
        }
      });
    default:
      return state;
  }
};
