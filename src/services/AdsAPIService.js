const API = 'http://localhost:8080/apiv1'

export const getAdverts = () => {
  return fetch(`${API}/anuncios/`, {
    method: 'GET',
  })
    .then(res => res.json())
    .then(res => res.results)
}

export const getAdvertById = id => {
  return fetch(`${API}/anuncios/${id}`, {
    method: 'GET',
  })
    .then(res => res.json())
    .then(res => res.result)
}

export const filterAdverts = params => {
  return fetch(`${API}/anuncios?${params}`, {
    method: 'GET',
  })
    .then(res => res.json())
    .then(res => res.results)
}

export const getTags = () => {
  return fetch(`${API}/tags`, {
    method: 'GET',
  })
    .then(res => res.json())
    .then(res => res.results)
}

export const createAd = data => {
  return fetch(`${API}/anuncios`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then(res => res.json())
    .catch(error => console.error('Error:', error))
}

export const updateAd = (data, id) => {
  return fetch(`${API}/anuncios/${id}`, {
    method: 'PUT',
    // data can be `string` or {object}
    body: JSON.stringify(data),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then(res => res.json())
    .catch(error => console.error('Error:', error))
}
