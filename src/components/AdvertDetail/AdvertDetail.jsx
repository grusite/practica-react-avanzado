import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { login } from '../../actions/actions'

import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

import NavBar from '../Navbar/Navbar'
import Advert from '../Advert/Advert'
import { getAdvertById } from '../../services/AdsAPIService'

import storage from '../../utils/storage'

import '../Advert/advert.css'

const { getItem } = storage()

const mapDispatchToProps = dispatch => ({
  login: (name, surname, tag) => dispatch(login(name, surname, tag)),
})

const mapStateToProps = state => ({
  ...state,
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
      advert: this.props.location.state.advert,
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

    const advertId = this.props.match.params.id
    getAdvertById(advertId).then(advert => this.setState({ advert }))
  }

  goBack = () => {
    this.props.history.goBack()
  }

  render() {
    const { advert } = this.state
    return (
      <>
        <NavBar />
        <Grid container justify="center" alignItems="center" className="card-container">
          <Typography variant="h5" component="h5">
            A continuación puede ver el detalle del anuncio seleccionado
          </Typography>
        </Grid>
        <Grid container justify="space-around" alignItems="center" className="card-container">
          <Advert advert={advert} />
        </Grid>
        <Grid container justify="space-around" alignItems="center" className="card-container">
          <Button variant="contained" color="primary" className="button" onClick={this.goBack}>
            Go Back
          </Button>
        </Grid>
      </>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AdvertDetail))
