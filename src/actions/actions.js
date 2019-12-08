import * as TYPES from '../utils/actionTypes'

export const login = (name, surname, tag) => ({
  type: TYPES.LOGIN,
  name,
  surname,
  tag,
})

export const logout = () => ({
  type: TYPES.LOGOUT,
})

export const fetchAdverts = () => {
  return async function(dispatch, adverts) {
    dispatch(fetchAdvertsRequest())
    try {
      setTimeout(() => {
        dispatch(fetchAdvertsSuccess(adverts))
      }, 1000)
    } catch (error) {
      dispatch(fetchAdvertsFailure(error))
    }
  }
}

export const fetchAdvertsRequest = () => ({
  type: TYPES.FETCH_ADVERTS_REQUEST,
})

export const fetchAdvertsSuccess = adverts => ({
  type: TYPES.FETCH_ADVERTS_SUCCESS,
  adverts,
})

export const fetchAdvertsFailure = error => ({
  type: TYPES.FETCH_ADVERTS_FAILURE,
  error,
})
