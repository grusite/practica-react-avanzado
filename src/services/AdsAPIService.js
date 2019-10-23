const API = 'http://localhost:3001/apiv1'

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
    // data can be `string` or {object}
    body: JSON.stringify(data),
  })
    .then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => console.log('Success:', response))
}

export const updateAd = (data, id) => {
  return fetch(`${API}/anuncios/${id}`, {
    method: 'PUT',
    // data can be `string` or {object}
    body: JSON.stringify(data),
  })
    .then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => console.log('Success:', response))
}
