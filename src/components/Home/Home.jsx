import React from 'react'
import { withRouter } from 'react-router-dom'

import { connect } from 'react-redux'
import { login } from '../../actions/actions'

import NavBar from '../Navbar/Navbar'
import AdvertList from '../AdvertList/AdvertList'
import Filter from '../Filter/Filter'

import { filterAdverts } from '../../services/AdsAPIService'

import storage from '../../utils/storage'

const { getItem } = storage()

const mapDispatchToProps = dispatch => ({
  login: (name, surname, tag) => dispatch(login(name, surname, tag)),
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
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location !== this.props.location) {
      console.log('nextProps.location')
      console.log(nextProps.location)
      console.log('this.props.location')
      console.log(this.props.location)
    }
  }

  async componentDidMount() {
    // Si no está logado le llevo a registro
    const user = JSON.parse(getItem('NodePop-User'))
    if (!user || !user.isLoggedIn) {
      this.props.history.push('/register')
      return
    }

    // Si lo está y recarga la pagina, le vuelvo a guardar en el estado el usuario
    await this.props.login(
      JSON.parse(getItem('NodePop-User')).name,
      JSON.parse(getItem('NodePop-User')).surname,
      JSON.parse(getItem('NodePop-User')).tag
    )

    paramTag = this.props.loginReducer.tag
    let params = paramTag ? `tag=${paramTag}` : ''
    filterAdverts(params).then(adverts => this.setState({ adverts }))
  }

  onFilterChange = state => {
    // let newParam = this.state.params + `&${name}=${value}`
    // this.setState(prevState => ({
    //   ...prevState,
    //   params: newParam,
    // }))
    let newParam = ''
    for (let param in state) {
      console.log('param')
      console.log(param)
      console.log('state[param]')
      console.log(state[param])
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
        console.log(newParam)
      }
    }
    console.log('newParam')
    console.log(newParam)
    filterAdverts(newParam).then(adverts => this.setState({ adverts }))
  }

  render() {
    const { adverts } = this.state
    return (
      <>
        <NavBar />
        {paramTag && <Filter onFilterChange={this.onFilterChange} tagSelected={paramTag} />}
        <AdvertList adverts={adverts} />
      </>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Home))
