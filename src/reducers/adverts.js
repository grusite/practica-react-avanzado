import {
  FETCH_ADVERTS_SUCCESS,
  FETCH_ADVERT_SUCCESS,
  TAGS_LOAD_SUCCESFULL,
  ADVERTS_UPDATE_SUCCESFULL,
  ADVERTS_CREATE_SUCCESFULL
} from "../actions/actionTypes";

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
    case FETCH_ADVERT_SUCCESS:
      return Object.assign({}, state, {
        advertById: action.advert,
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
    case ADVERTS_CREATE_SUCCESFULL:
      return Object.assign({}, state, {
        advertCreated: action.advert,
        ui: {
          isFetching: false,
          error: null
        }
      });
    case ADVERTS_UPDATE_SUCCESFULL:
      return Object.assign({}, state, {
        advertUpdated: action.advert,
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
