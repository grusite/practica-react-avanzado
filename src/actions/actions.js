export const simpleAction = () => ({
  type: 'SIMPLE_ACTION',
  payload: 'result_of_simple_action',
})

export const login = (name, surname) => ({
  type: 'LOGIN',
  name,
  surname,
})

export const logout = () => ({
  type: 'LOGOUT',
})
