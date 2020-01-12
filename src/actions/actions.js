import * as TYPES from "../utils/actionTypes";
import { getTags, filterAdverts } from "../services/AdsAPIService";

export const login = (name, surname, tag, remindMe) => ({
  type: TYPES.LOGIN,
  name,
  surname,
  tag,
  remindMe
});

export const logout = () => ({
  type: TYPES.LOGOUT
});

export const userLogin = (...args) => (dispatch, _getState, { history }) => {
  dispatch(login(...args));
  history.push("/");
};

export const userLogout = (...args) => (dispatch, _getState, { history }) => {
  dispatch(logout(...args));
  history.push("/register");
};

export const loadTagsRequest = () => ({
  type: TYPES.TAGS_LOAD_REQUEST
});

export const loadTagsSuccesfull = tags => ({
  type: TYPES.TAGS_LOAD_SUCCESFULL,
  tags
});

export const loadTagsFailure = error => ({
  type: TYPES.TAGS_LOAD_FAILURE,
  error
});

export const loadTags = () => async dispatch => {
  dispatch(loadTagsRequest());
  try {
    const tags = await getTags();
    dispatch(loadTagsSuccesfull(tags));
  } catch (error) {
    dispatch(loadTagsFailure(error));
  }
};

export const fetchAdvertsRequest = () => ({
  type: TYPES.FETCH_ADVERTS_REQUEST
});

export const fetchAdvertsSuccess = adverts => ({
  type: TYPES.FETCH_ADVERTS_SUCCESS,
  adverts
});

export const fetchAdvertsFailure = error => ({
  type: TYPES.FETCH_ADVERTS_FAILURE,
  error
});

export const fetchAdverts = () => {
  return async function(dispatch, params) {
    dispatch(fetchAdvertsRequest());
    try {
      const adverts = await filterAdverts(params);
      dispatch(fetchAdvertsSuccess(adverts));
    } catch (error) {
      dispatch(fetchAdvertsFailure(error));
    }
  };
};
