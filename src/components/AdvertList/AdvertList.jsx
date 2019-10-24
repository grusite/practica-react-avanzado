import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { login } from '../../actions/actions'

import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

import Advert from '../Advert/Advert'

import '../Advert/advert.css'

const mapDispatchToProps = dispatch => ({
  login: (name, surname) => dispatch(login(name, surname)),
})

const mapStateToProps = state => ({
  isLoggedIn: state.loginReducer.isLoggedIn,
})

class AdvertList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {
        isLoggedIn: false,
        name: '',
        surname: '',
        tags: [],
      },
    }
  }

  renderAdverts = adverts => {
    return (
      <>
        <Grid container justify="center" alignItems="center" className="card-container">
          <Typography variant="h5" component="h5">
            A continuación puede ver todos los anuncios disponibles
          </Typography>
        </Grid>
        <Grid container justify="space-around" alignItems="center" className="card-container">
          {adverts.map(advert => (
            <Advert key={advert._id} advert={advert} />
          ))}
        </Grid>
      </>
    )
  }

  render() {
    const { adverts } = this.props
    return (
      <>
        {adverts && this.renderAdverts(adverts)}

        {(!adverts || adverts.length === 0) && (
          <Typography variant="h2" component="h2">
            No hay anuncios
          </Typography>
        )}
      </>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AdvertList))
