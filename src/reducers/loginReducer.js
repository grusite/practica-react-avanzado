const defaultState = {
  isLoggedIn: false,
  name: '',
  surname: '',
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return Object.assign({}, state, {
        isLoggedIn: true,
        name: action.name,
        surname: action.surname,
      })
    case 'LOGOUT':
      return Object.assign({}, state, {
        isLoggedIn: false,
        name: '',
        surname: '',
      })
    default:
      return state
  }
}
