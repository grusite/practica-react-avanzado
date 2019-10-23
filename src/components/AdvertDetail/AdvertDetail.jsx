import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { login } from '../../actions/actions'

import Advert from '../Advert/Advert'
import { getAdvertById } from '../../services/AdsAPIService'

import storage from '../../utils/storage'

const { getItem } = storage()

const mapDispatchToProps = dispatch => ({
  login: (name, surname) => dispatch(login(name, surname)),
})

const mapStateToProps = state => ({
  loginReducer: state.loginReducer,
  isLoggedIn: state.loginReducer.isLoggedIn,
  name: state.loginReducer.name,
})

class AdvertDetail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {
        isLoggedIn: false,
        name: '',
        surname: '',
        tags: [],
      },
      advert: '',
    }
  }

  componentDidMount() {
    // Si no está logado le llevo a registro
    if (!JSON.parse(getItem('NodePop-User')).isLoggedIn) this.props.history.push('/register')

    // Si lo está y recarga la pagina, le vuelvo a guardar en el estado el usuario
    this.props.login(
      JSON.parse(getItem('NodePop-User')).name,
      JSON.parse(getItem('NodePop-User')).surname
    )

    const advertId = this.props.match.params.id
    console.log(advertId)
    getAdvertById(advertId).then(advert => this.setState({ advert }))
  }

  render() {
    const { advert } = this.state
    return <>{<Advert advert={advert} />}</>
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AdvertDetail))
