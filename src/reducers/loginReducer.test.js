import { LOGIN, LOGOUT } from '../utils/actionTypes'

import loginReducer from './loginReducer'

describe('Login reducer', () => {
  it('should return the initial state', () => {
    expect(loginReducer(undefined, {})).toEqual({
      isLoggedIn: false,
      name: '',
      surname: '',
      tag: '',
    })
  })

  it('should handle LOGIN', () => {
    expect(
      loginReducer([], {
        type: LOGIN,
        name: 'Jorge',
        surname: 'Martín',
        tag: 'lifestyle',
      })
    ).toEqual({
      isLoggedIn: true,
      name: 'Jorge',
      surname: 'Martín',
      tag: 'lifestyle',
    })
  })

  it('should handle LOGOUT', () => {
    expect(
      loginReducer([], {
        type: LOGOUT,
      })
    ).toEqual({
      isLoggedIn: false,
      name: '',
      surname: '',
    })
  })
})
