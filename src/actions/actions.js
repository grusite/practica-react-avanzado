import * as TYPES from "./actionTypes";
import {
  getTags,
  filterAdverts,
  getAdvertById,
  updateAd,
  createAd
} from "../services/AdsAPIService";

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

export const createAdvertsRequest = () => ({
  type: TYPES.ADVERTS_CREATE_REQUEST
});

export const createAdvertsSuccesfull = advert => ({
  type: TYPES.ADVERTS_CREATE_SUCCESFULL,
  advert
});

export const createAdvertsFailure = error => ({
  type: TYPES.ADVERTS_CREATE_FAILURE,
  error
});

export const updateAdvertsRequest = () => ({
  type: TYPES.ADVERTS_UPDATE_REQUEST
});

export const updateAdvertsSuccesfull = advert => ({
  type: TYPES.ADVERTS_UPDATE_SUCCESFULL,
  advert
});

export const updateAdvertsFailure = error => ({
  type: TYPES.ADVERTS_UPDATE_FAILURE,
  error
});

export const fetchAdvertsRequest = () => ({
  type: TYPES.FETCH_ADVERTS_REQUEST
});

export const fetchAdvertsSuccess = adverts => ({
  type: TYPES.FETCH_ADVERTS_SUCCESS,
  adverts
});

export const fetchAdvertSuccess = advert => ({
  type: TYPES.FETCH_ADVERT_SUCCESS,
  advert
});

export const fetchAdvertsFailure = error => ({
  type: TYPES.FETCH_ADVERTS_FAILURE,
  error
});

// export const fetchAdverts = () => {
//   return async function(dispatch, params) {
//     dispatch(fetchAdvertsRequest());
//     try {
//       const adverts = await filterAdverts(params);
//       dispatch(fetchAdvertsSuccess(adverts));
//     } catch (error) {
//       dispatch(fetchAdvertsFailure(error));
//     }
//   };
// };

export const fetchAdverts = params => async dispatch => {
  dispatch(fetchAdvertsRequest());
  try {
    const adverts = await filterAdverts(params);
    dispatch(fetchAdvertsSuccess(adverts));
  } catch (error) {
    dispatch(fetchAdvertsFailure(error));
  }
};

export const fetchAdvertById = advertId => async dispatch => {
  dispatch(fetchAdvertsRequest());
  try {
    const advert = await getAdvertById(advertId);
    dispatch(fetchAdvertSuccess(advert));
  } catch (error) {
    dispatch(fetchAdvertsFailure(error));
  }
};

export const updateAdvert = (advert, advertId) => async (
  dispatch,
  _getState,
  { history }
) => {
  dispatch(updateAdvertsRequest());
  try {
    const ad = await updateAd(advert, advertId);
    dispatch(updateAdvertsSuccesfull(ad));
    setTimeout(() => history.push("/"), 2000);
  } catch (error) {
    dispatch(updateAdvertsFailure(error));
  }
};

export const createAdvert = advert => async (
  dispatch,
  _getState,
  { history }
) => {
  dispatch(createAdvertsRequest());
  try {
    const ad = await createAd(advert);
    dispatch(createAdvertsSuccesfull(ad));
    setTimeout(() => history.push("/"), 2000);
  } catch (error) {
    dispatch(createAdvertsFailure(error));
  }
};

export const loadTags = () => async dispatch => {
  dispatch(loadTagsRequest());
  try {
    const tags = await getTags();
    dispatch(loadTagsSuccesfull(tags));
  } catch (error) {
    dispatch(loadTagsFailure(error));
  }
};
