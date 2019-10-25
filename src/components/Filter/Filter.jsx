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

import { getTags } from '../../services/AdsAPIService'

import './filter.css'

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
  tags: [],
  tagsSelected: [],
}

class createUpdateAdvert extends React.Component {
  constructor(props) {
    super(props)
    this.state = initialState

    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    console.log('tagSelectedFilter')
    console.log(this.props)
    getTags().then(tags => {
      this.setState(prevState => ({
        ...prevState,
        tags,
        tagsSelected: [this.props.tagSelected],
      }))
    })
  }

  resetForm = () => {
    this.setState({})
  }

  handleChange(event) {
    const { name, value } = event.target

    this.setState(prevState => ({
      ...prevState,
      [name]: value,
    }))
  }

  resetForm = () => {
    this.setState(initialState)
  }

  handleSubmit = () => {
    console.log('Filtrado!')
    this.props.onFilterChange(this.state)
  }

  render() {
    const { type, name, description, price, tags, tagsSelected } = this.state

    return (
      <>
        <div className="bodyContainer">
          <Typography className="text" variant="h6" component="h6">
            FIlter Ads
          </Typography>
          <div className="paperFilter">
            <Grid item xs={12}>
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
                autoComplete="desc"
                value={description}
                onChange={this.handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl>
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
              <FormControl>
                <InputLabel htmlFor="select-multiple-checkbox">Tag</InputLabel>
                <Select
                  multiple
                  value={tagsSelected}
                  name="tagsSelected"
                  onChange={this.handleChange}
                  input={<Input id="select-multiple-checkbox" />}
                  renderValue={selected => selected.join(', ')}
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
          </div>
          <Grid item xs={12} container justify="space-around">
            <Button
              id="submit-no-material"
              type="submit"
              className="submit"
              variant="contained"
              color="primary"
              onClick={this.handleSubmit}
            >
              Filtrar
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
      </>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(createUpdateAdvert))
