export const login = (name, surname, tag) => ({
  type: 'LOGIN',
  name,
  surname,
  tag,
})

export const logout = () => ({
  type: 'LOGOUT',
})
