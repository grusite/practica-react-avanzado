import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { login } from '../../actions/actions'

import Grid from '@material-ui/core/Grid'
import CssBaseline from '@material-ui/core/CssBaseline'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import ShoppingBasketOutlinedIcon from '@material-ui/icons/ShoppingBasketOutlined'
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket'
import AttachMoneyOutlinedIcon from '@material-ui/icons/AttachMoneyOutlined'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import ListItemText from '@material-ui/core/ListItemText'
import Select from '@material-ui/core/Select'
import InputAdornment from '@material-ui/core/InputAdornment'

import NavBar from '../Navbar/Navbar'
import SelectTag from './SelectTag'
import SelectTag2 from './SelectTag2'

import { getTags, createAd, updateAd } from '../../services/AdsAPIService'

import storage from '../../utils/storage'

import './createUpdateAdvert.css'

const { getItem } = storage()

const mapDispatchToProps = dispatch => ({
  login: (name, surname, tag) => dispatch(login(name, surname, tag)),
})

const mapStateToProps = state => ({
  ...state,
})

const initialState = {
  type: 'buy',
  name: '',
  description: '',
  price: 0,
  photo: '',
  tags: [],
  tagsSelected: [],
}

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
}

class createUpdateAdvert extends React.Component {
  constructor(props) {
    super(props)
    this.state = initialState

    this.handleChange = this.handleChange.bind(this)
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

    // Si estoy editando un anuncio, edito los valores con lo que tenía el anuncio
    // Y si no me descargo los tags y dejo los valores vacíos
    // const update = this.props.match.path === '/update'
    if (this.comeFromUpdate()) {
      const advert = this.props.location.state.advert
      this.setState({
        type: advert.type,
        name: advert.name,
        description: advert.description,
        price: advert.price,
        photo: advert.photo,
        tagsSelected: advert.tags,
      })
    }

    getTags().then(tags => {
      this.setState(prevState => ({
        ...prevState,
        tags,
      }))
    })
  }

  comeFromUpdate = () => {
    return this.props.match.path === '/update'
  }

  resetForm = () => {
    this.setState(initialState)
  }

  handleChange(event) {
    const { name, value } = event.target

    this.setState(prevState => ({
      ...prevState,
      [name]: value,
    }))
  }

  handleSubmit = () => {
    const body = this.state
    const id = this.props.location.state.advert._id
    if (this.comeFromUpdate()) {
      updateAd(body, id).then(this.props.history.push('/advert'))
    } else {
      createAd(body).then(this.props.history.push('/advert'))
    }
  }

  render() {
    const { type, name, description, price, photo, tags, tagsSelected } = this.state

    let title = (
      <Typography variant="h6" gutterBottom>
        New advertisement
      </Typography>
    )

    let buttonText = 'Create'

    if (this.comeFromUpdate()) {
      title = (
        <Typography variant="h6" gutterBottom>
          Edit advertisement
        </Typography>
      )
      buttonText = 'Update'
    }

    return (
      <>
        <NavBar />
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className="paper">
            {title}
            <Grid container spacing={3}>
              <Grid item xs={12} container justify="space-around">
                <FormGroup row>
                  <FormControlLabel
                    control={
                      <Checkbox
                        icon={<ShoppingBasketOutlinedIcon />}
                        checkedIcon={<ShoppingBasketIcon />}
                        value="buy"
                        name="type"
                        onChange={this.handleChange}
                        checked={type === 'buy'}
                      />
                    }
                    label="Buy"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        icon={<AttachMoneyOutlinedIcon />}
                        checkedIcon={<AttachMoneyOutlinedIcon />}
                        value="sell"
                        name="type"
                        onChange={this.handleChange}
                        checked={type === 'sell'}
                      />
                    }
                    label="Sell"
                  />
                </FormGroup>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  id="name"
                  name="name"
                  label="Name"
                  fullWidth
                  autoComplete="name"
                  value={name}
                  onChange={this.handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  id="description"
                  name="description"
                  label="Description"
                  fullWidth
                  autoComplete="desc"
                  value={description}
                  onChange={this.handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel htmlFor="adornment-amount">Price</InputLabel>
                  <Input
                    id="adornment-amount"
                    value={price}
                    name="price"
                    onChange={this.handleChange}
                    startAdornment={<InputAdornment position="start">€</InputAdornment>}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  id="photo"
                  name="photo"
                  label="Paste the url of the picture"
                  fullWidth
                  autoComplete="url picture"
                  value={photo}
                  onChange={this.handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel htmlFor="select-multiple-checkbox">Tag</InputLabel>
                  <Select
                    multiple
                    value={tagsSelected}
                    name="tagsSelected"
                    onChange={this.handleChange}
                    input={<Input id="select-multiple-checkbox" />}
                    renderValue={selected => selected.join(', ')}
                    MenuProps={MenuProps}
                  >
                    {tags.map(tag => (
                      <MenuItem key={tag} value={tag}>
                        <Checkbox checked={tagsSelected.indexOf(tag) > -1} />
                        <ListItemText primary={tag} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Grid item xs={12} container justify="space-around">
              <Button
                id="submit-no-material"
                type="submit"
                className="submit"
                variant="contained"
                color="primary"
                onClick={this.handleSubmit}
              >
                {buttonText}
              </Button>
              <Button
                variant="contained"
                id="submit-no-material"
                color="primary"
                onClick={this.resetForm}
              >
                Reset
              </Button>
            </Grid>
          </div>
        </Container>
      </>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(createUpdateAdvert))
