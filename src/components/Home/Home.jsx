import React, { useEffect } from 'react'
import { withRouter } from 'react-router-dom'

import { connect } from 'react-redux'
import { login } from '../../actions/actions'
import { fetchAdverts } from '../../actions/actions'

import NavBar from '../Navbar/Navbar'
import AdvertList from '../AdvertList/AdvertList'
import Filter from '../Filter/Filter'
import CircularProgress from '@material-ui/core/CircularProgress'
import Grid from '@material-ui/core/Grid'
import './home.css'

import { filterAdverts } from '../../services/AdsAPIService'

import storage from '../../utils/storage'

const { getItem } = storage()

const mapDispatchToProps = dispatch => ({
  login: (name, surname, tag) => dispatch(login(name, surname, tag)),
  fetchAdverts: adverts => fetchAdverts()(dispatch, adverts),
})

const mapStateToProps = state => ({
  ...state,
})

let paramTag = ''

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {
        isLoggedIn: false,
        name: '',
        surname: '',
        tags: [],
      },
      adverts: [],
      params: '',
      loading: true,
    }
  }

  async componentDidMount() {
    // Si no está logado le llevo a registro
    const userReminded = JSON.parse(getItem('NodePop-User'))
    const userStored = this.props.loginReducer.isLoggedIn
    if (!userReminded && !userStored) {
      this.props.history.push('/register')
      return
    }

    // Si lo está y recarga la pagina, le vuelvo a guardar en el estado el usuario
    if (!userStored) {
      await this.props.login(
        JSON.parse(getItem('NodePop-User')).name,
        JSON.parse(getItem('NodePop-User')).surname,
        JSON.parse(getItem('NodePop-User')).tag
      )
    }

    let paramTagfromState = this.props.loginReducer.tag
    paramTag = paramTagfromState ? paramTagfromState : ''
    let params = paramTag ? `tag=${paramTag}` : ''

    // adverts => this.setState({ ...this.state, adverts, loading: false })
    filterAdverts(params).then(adverts => this.props.fetchAdverts(adverts))
  }

  onFilterChange = state => {
    // Activo el loader
    // this.setState(prevState => ({
    //   ...prevState,
    //   loading: true,
    // }))

    let newParam = ''
    for (let param in state) {
      if (state[param] && state[param].length !== 0 && param !== 'tags') {
        if (param === 'tagSelected') {
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
    // adverts => this.setState({ ...this.state, adverts, loading: false })
    filterAdverts(newParam).then(adverts => this.props.fetchAdverts(adverts))
  }

  render() {
    const { adverts, ui } = this.props.advertsReducer
    console.log('ads', adverts, 'ui', ui)
    console.log('isfetch', ui.isFetching)

    let bodyHome

    if (ui.isFetching) {
      bodyHome = (
        <Grid container justify="center" alignItems="center" className="card-container">
          <CircularProgress size={80} thickness={3.7} disableShrink className="circular-progress" />
        </Grid>
      )
    } else {
      bodyHome = (
        <>
          <Filter onFilterChange={this.onFilterChange} tagSelected={paramTag} />
          <AdvertList adverts={adverts} />
        </>
      )
    }

    console.log(bodyHome)

    return (
      <>
        <NavBar />
        {bodyHome}
      </>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Home))
