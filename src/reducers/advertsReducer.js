import {
  FETCH_ADVERTS_REQUEST,
  FETCH_ADVERTS_SUCCESS,
  FETCH_ADVERTS_FAILURE,
} from '../utils/actionTypes'

const defaultState = {
  adverts: [],
  ui: {
    isFetching: false,
    error: null,
  },
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case FETCH_ADVERTS_REQUEST:
      return Object.assign({}, state, {
        ui: {
          isFetching: true,
          error: null,
        },
      })
    case FETCH_ADVERTS_SUCCESS:
      return Object.assign({}, state, {
        adverts: action.adverts,
        ui: {
          isFetching: false,
          error: null,
        },
      })
    case FETCH_ADVERTS_FAILURE:
      return Object.assign({}, state, {
        ui: {
          isFetching: false,
          error: action.error,
        },
      })
    default:
      return state
  }
}

// export const adverts = (state = defaultState.adverts, action) => {
//   switch (action.type) {
//     case types.FETCH_ADVERTS_SUCCESS:
//       return Object.assign({}, state, {
//         adverts: action.adverts,
//       })

//     default:
//       return state
//   }
// }
