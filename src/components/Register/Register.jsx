import React from "react";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MySnackbarContentWrapper from "../StatusMessages/StatusMessages";
import CircularProgress from "@material-ui/core/CircularProgress";

import "./register.css";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "} {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        isLoggedIn: false,
        name: "",
        surname: "",
        tag: ""
      },
      tags: this.props.adverts.tags,
      remindMe: false,
      success: false,
      infoMessage: false
    };
  }

  handleChange = event => {
    const { name, value } = event.target;

    this.setState(prevState => ({
      user: {
        ...prevState.user,
        [name]: value
      }
    }));
  };

  handleCheckbox = name => event => {
    this.setState({ ...this.state, [name]: event.target.checked });
  };

  handleSubmit = event => {
    const { user, remindMe } = this.state;
    event.preventDefault();
    if (user.name && user.surname && user.tag) {
      this.setState({ ...this.state, success: true });
      this.props.userLogin(user.name, user.surname, user.tag, remindMe);
    } else {
      this.setState({ ...this.state, infoMessage: true });
    }
  };

  handleClose = () => {
    this.setState({ ...this.state, infoMessage: false, success: false });
  };

  render() {
    const { user, tags } = this.state;
    let statusMessage = "";
    let loadingButton = "";

    if (this.state.success) {
      statusMessage = (
        <MySnackbarContentWrapper
          onClose={this.handleClose}
          variant="success"
          className="margin"
          message="¡Registro correcto!"
        />
      );

      loadingButton = (
        <Button
          id="submit-no-material"
          type="submit"
          className="submit"
          fullWidth
          variant="contained"
          color="primary"
          disabled
        >
          <CircularProgress />
        </Button>
      );
    } else if (this.state.infoMessage) {
      statusMessage = (
        <MySnackbarContentWrapper
          onClose={this.handleClose}
          variant="warning"
          className="margin"
          message="Por favor, rellene todos los campos"
        />
      );
    }

    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className="paper">
          <Avatar id="avatar-no-material" className="avatar">
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Registro
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
                  value={user.name}
                  onChange={this.handleChange}
                  label="Nombre"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="surname"
                  label="Apellido"
                  name="surname"
                  value={user.surname}
                  onChange={this.handleChange}
                  autoComplete="lname"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl variant="outlined" className="formControl">
                  <InputLabel htmlFor="outlined-tag-native-simple">
                    Tag
                  </InputLabel>
                  <Select
                    native
                    onChange={this.handleChange}
                    inputProps={{
                      name: "tag",
                      id: "outlined-tag-native-simple"
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
                {statusMessage}
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      value="remindMe"
                      onChange={this.handleCheckbox("remindMe")}
                      color="primary"
                    />
                  }
                  label="Quiero mantener mi sesión activa"
                />
              </Grid>
            </Grid>
            {loadingButton || (
              <Button
                id="submit-no-material"
                type="submit"
                className="submit"
                fullWidth
                variant="contained"
                color="primary"
              >
                Registrate
              </Button>
            )}
          </form>
        </div>
        <Box mt={5}>
          <Copyright />
        </Box>
      </Container>
    );
  }
}

export default Register;
