import React from 'react'

import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'

import { connect } from 'react-redux'
import { login } from '../../actions/actions'

import { getTags } from '../../services/AdsAPIService'

import './register.css'

const mapDispatchToProps = dispatch => ({
  login: (name, surname) => dispatch(login(name, surname)),
})

const mapStateToProps = state => ({
  ...state,
})

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="#">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

class Register extends React.Component {
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

  componentDidMount() {
    getTags().then(tags => {
      this.setState(prevState => ({
        user: {
          ...prevState.user,
          tags,
        },
      }))
    })
  }

  handleChange = event => {
    const { name, value } = event.target

    this.setState(prevState => ({
      user: {
        ...prevState.user,
        [name]: value,
      },
    }))
  }

  handleSubmit = event => {
    event.preventDefault()
    this.props.login(this.state.user.name, this.state.user.surname)
    // this.props.history.push('/home')
  }

  render() {
    const { name, surname, tags } = this.state.user
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className="paper">
          <Avatar id="avatar-no-material" className="avatar">
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form className="form" noValidate onSubmit={this.handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  name="name"
                  variant="outlined"
                  required
                  fullWidth
                  id="name"
                  value={name}
                  onChange={this.handleChange}
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="surname"
                  label="Last Name"
                  name="surname"
                  value={surname}
                  onChange={this.handleChange}
                  autoComplete="lname"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl variant="outlined" className="formControl">
                  <InputLabel htmlFor="outlined-tag-native-simple">Tag</InputLabel>
                  <Select
                    native
                    required
                    onChange={this.handleChange}
                    inputProps={{
                      name: 'tag',
                      id: 'outlined-tag-native-simple',
                    }}
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
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="remaindMe" color="primary" />}
                  label="I want to stay signed on"
                />
              </Grid>
            </Grid>
            <Button
              id="submit-no-material"
              type="submit"
              className="submit"
              fullWidth
              variant="contained"
              color="primary"
            >
              Sign Up
            </Button>
          </form>
        </div>
        <Box mt={5}>
          <Copyright />
        </Box>
        <pre>{JSON.stringify(this.props.loginReducer)}</pre>
      </Container>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register)
