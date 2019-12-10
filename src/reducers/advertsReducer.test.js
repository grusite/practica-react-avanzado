import {
  FETCH_ADVERTS_REQUEST,
  FETCH_ADVERTS_SUCCESS,
  FETCH_ADVERTS_FAILURE,
} from '../utils/actionTypes'

import advertsReducer from './advertsReducer'

describe('Login reducer', () => {
  it('should return the initial state', () => {
    expect(advertsReducer(undefined, {})).toEqual({
      adverts: [],
      ui: {
        isFetching: false,
        error: null,
      },
    })
  })

  it('should handle FETCH_ADVERTS_REQUEST', () => {
    expect(
      advertsReducer([], {
        type: FETCH_ADVERTS_REQUEST,
      })
    ).toEqual({
      ui: {
        isFetching: true,
        error: null,
      },
    })
  })

  it('should handle FETCH_ADVERTS_SUCCESS', () => {
    expect(
      advertsReducer([], {
        type: FETCH_ADVERTS_SUCCESS,
        adverts: [1, 2, 3],
      })
    ).toEqual({
      adverts: [1, 2, 3],
      ui: {
        isFetching: false,
        error: null,
      },
    })
  })

  it('should handle FETCH_ADVERTS_FAILURE', () => {
    expect(
      advertsReducer([], {
        type: FETCH_ADVERTS_FAILURE,
        error: 'Error fetching ads',
      })
    ).toEqual({
      ui: {
        isFetching: false,
        error: 'Error fetching ads',
      },
    })
  })
})
