import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { login } from '../../actions/actions'

import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import ShoppingBasketOutlinedIcon from '@material-ui/icons/ShoppingBasketOutlined'
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket'
import AttachMoneyOutlinedIcon from '@material-ui/icons/AttachMoneyOutlined'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import InputAdornment from '@material-ui/core/InputAdornment'
import FormHelperText from '@material-ui/core/FormHelperText'

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
  tagSelected: '',
}

class createUpdateAdvert extends React.Component {
  constructor(props) {
    super(props)
    this.state = initialState

    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    getTags().then(tags => {
      this.setState(prevState => ({
        ...prevState,
        tags,
        tagSelected: [this.props.tagSelected],
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
    initialState.tags = this.state.tags
    this.setState(initialState)
  }

  handleSubmit = () => {
    this.props.onFilterChange(this.state)
  }

  render() {
    const { type, name, description, price, tags, tagSelected } = this.state

    return (
      <>
        <div className="bodyContainer">
          <Typography className="text" variant="h6" component="h6">
            FIlter Ads
          </Typography>
          <Grid container id="paper-no-material" className="paperFilter">
            <div className="adType">
              <FormGroup>
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
            </div>
            <Grid container className="inputs">
              <Grid item xs={6} sm={6} className="priceItem">
                <TextField
                  id="name"
                  name="name"
                  label="Name"
                  autoComplete="name"
                  value={name}
                  onChange={this.handleChange}
                />
              </Grid>
              <Grid item xs={6} sm={6} className="priceItem">
                <TextField
                  id="description"
                  name="description"
                  label="Description"
                  autoComplete="desc"
                  value={description}
                  onChange={this.handleChange}
                />
              </Grid>
            </Grid>
            <Grid container id="input-no-material" className="inputs">
              <Grid item xs={6} sm={6} className="priceItem">
                <FormControl fullWidth>
                  <InputLabel htmlFor="adornment-amount">Price</InputLabel>
                  <Input
                    id="adornment-amount"
                    value={price}
                    name="price"
                    onChange={this.handleChange}
                    startAdornment={<InputAdornment position="start">€</InputAdornment>}
                  />
                  <FormHelperText>min-max | -max | min- </FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={6} sm={6} className="tagItem">
                <FormControl fullWidth>
                  <InputLabel htmlFor="tag-native-simple">Tags</InputLabel>
                  <Select
                    native
                    value={tagSelected}
                    onChange={this.handleChange}
                    name="tagSelected"
                  >
                    <option value="" />
                    {tags.map((tag, index) => (
                      <option key={index} value={tag}>
                        {tag}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
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
