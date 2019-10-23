import React from 'react'
import { withRouter } from 'react-router-dom'

import { connect } from 'react-redux'
import { login } from '../../actions/actions'

import NavBar from '../Navbar/Navbar'
import AdvertList from '../AdvertList/AdvertList'

import { filterAdverts } from '../../services/AdsAPIService'

import storage from '../../utils/storage'

const { getItem } = storage()

const mapDispatchToProps = dispatch => ({
  login: (name, surname, tag) => dispatch(login(name, surname, tag)),
})

const mapStateToProps = state => ({
  ...state,
})

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

    let paramTag = this.props.loginReducer.tag
    console.log('paramTag')
    console.log(paramTag)
    let params = paramTag ? `tag=${paramTag}` : ''
    console.log('params')
    console.log(params)
    filterAdverts(params).then(adverts => this.setState({ adverts }))
  }

  render() {
    const { adverts } = this.state
    return (
      <>
        <NavBar />
        <AdvertList adverts={adverts} />
      </>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Home))
