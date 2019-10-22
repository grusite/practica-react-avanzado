/* eslint-disable no-undef*/
const lStorage = {
  setItem: (key, value) => localStorage.setItem(key, value),
  getItem: key => localStorage.getItem(key),
}

const sessionStorage = {
  setItem: (key, value) => sessionStorage.setItem(key, value),
  getItem: key => sessionStorage.getItem(key),
}

const storage = (type = 'lStorage') => {
  const types = {
    lStorage,
    sessionStorage,
  }
  if (typeof Storage !== 'undefined') {
    // Se acepta localStorage
    return types[type]
  }
}

export default storage
