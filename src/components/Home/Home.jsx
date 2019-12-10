import React, { useState, useEffect } from 'react'

import NavBar from '../Navbar/Navbar'
import AdvertList from '../AdvertList/AdvertList'
import Filter from '../Filter/Filter'
import './home.css'

import storage from '../../utils/storage'
const { getItem } = storage()

export default function Home(props) {
  const { advertsReducer, login, loginReducer, fetchAdverts, history } = props
  const [params, setParams] = useState(loginReducer.tag ? `tag=${loginReducer.tag}` : '')
  const [tagSelected, setTagSelected] = useState(loginReducer.tag)

  // Si no está logado le llevo a registro
  const userReminded = JSON.parse(getItem('NodePop-User'))
  const userStored = loginReducer.isLoggedIn
  if (!userReminded && !userStored) {
    history.push('/register')
  }

  // Si lo está y recarga la pagina, le vuelvo a guardar en el estado el usuario
  if (!userStored) {
    login(
      JSON.parse(getItem('NodePop-User')).name,
      JSON.parse(getItem('NodePop-User')).surname,
      JSON.parse(getItem('NodePop-User')).tag
    )
  }

  /* eslint-disable*/
  useEffect(() => {
    // filterAdverts(params).then(adverts => fetchAdverts(adverts))
    fetchAdverts(params)
  }, [params])

  const onFilterChange = state => {
    let newParam = ''
    for (let param in state) {
      if (state[param] && state[param].length !== 0 && param !== 'tags') {
        if (param === 'tagSelected') {
          setTagSelected(state[param])
          newParam += `&tag=${state[param]}`
          continue
        }

        // triquiñuela para que pueda filtrar en la api por sell or buy
        if (param === 'type') {
          if (state[param] === 'sell') {
            newParam += `&venta=true`
            continue
          }
          newParam += `&venta=false`
          continue
        }
        newParam += `&${param}=${state[param]}`
      }
    }
    setParams(newParam)
  }

  return (
    <>
      <NavBar />
      <Filter onFilterChange={onFilterChange} tagSelected={tagSelected} />
      <AdvertList adverts={advertsReducer.adverts} isFetching={advertsReducer.ui.isFetching} />
    </>
  )
}
