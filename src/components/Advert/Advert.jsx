import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { login } from '../../actions/actions'

import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import FavoriteIcon from '@material-ui/icons/Favorite'
import ShareIcon from '@material-ui/icons/Share'
import ShoppingBasketOutlinedIcon from '@material-ui/icons/ShoppingBasketOutlined'
import AttachMoneyOutlinedIcon from '@material-ui/icons/AttachMoneyOutlined'
import Grid from '@material-ui/core/Grid'
import EditIcon from '@material-ui/icons/Edit'

import './advert.css'

const mapDispatchToProps = dispatch => ({
  login: (name, surname) => dispatch(login(name, surname)),
})

const mapStateToProps = state => ({
  loginReducer: state.loginReducer,
  isLoggedIn: state.loginReducer.isLoggedIn,
  name: state.loginReducer.name,
})

class Advert extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {
        isLoggedIn: false,
        name: '',
        surname: '',
        tags: [],
      },
      advert: this.props.advert,
    }
  }

  goToDetail = () => {
    this.props.history.push({
      pathname: `/advert/${this.state.advert._id}`,
      state: { advert: this.props.advert },
    })
  }

  goToUpdate = () => {
    this.props.history.push({
      pathname: `/update/${this.state.advert._id}`,
      state: { advert: this.props.advert },
    })
  }

  render() {
    const { advert } = this.state
    let avatar

    if (advert.type === 'buy') {
      avatar = (
        <Avatar id="avatar-green-no-material" aria-label="adv" className="avatar">
          <ShoppingBasketOutlinedIcon />
        </Avatar>
      )
    } else if (advert.type === 'sell') {
      avatar = (
        <Avatar id="avatar-no-material" aria-label="adv" className="avatar">
          <AttachMoneyOutlinedIcon />
        </Avatar>
      )
    }

    return (
      <>
        <Grid item id="item-no-material" className="card-item">
          <Card className="card">
            <CardHeader
              avatar={avatar}
              title={advert.name}
              action={
                <IconButton onClick={this.goToUpdate} aria-label="settings">
                  <EditIcon />
                </IconButton>
              }
              subheader="October 13, 2019"
            />
            <CardMedia
              className="media"
              image={`http://localhost:3001${advert.photo}`}
              title={advert.name}
              onClick={this.goToDetail}
            />
            <CardContent onClick={this.goToDetail}>
              <Typography id="card-description" variant="body2" color="textSecondary" component="p">
                {advert.description}
              </Typography>
            </CardContent>
            <CardActions disableSpacing onClick={this.goToDetail}>
              <IconButton aria-label="add to favorites">
                <FavoriteIcon />
              </IconButton>
              <IconButton aria-label="share">
                <ShareIcon />
              </IconButton>
            </CardActions>
          </Card>
        </Grid>
      </>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Advert))
