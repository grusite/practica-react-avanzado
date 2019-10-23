export const simpleAction = () => ({
  type: 'SIMPLE_ACTION',
  payload: 'result_of_simple_action',
})

export const login = (name, surname, tag) => ({
  type: 'LOGIN',
  name,
  surname,
  tag,
})

export const logout = () => ({
  type: 'LOGOUT',
})
