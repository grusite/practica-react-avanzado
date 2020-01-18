import React, { useState } from "react";

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

import Form, { Input } from "../Form";

import "./register.css";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "} {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function Register({ tags, userLogin }) {
  const [statusMessage, setStatusMessage] = useState("");

  const handleSubmit = event => {
    const { name, surname, tag, remindMe } = event;
    if (name && surname && tag) {
      userLogin(name, surname, tag, remindMe);
    } else {
      setStatusMessage(
        <MySnackbarContentWrapper
          onClose={handleClose}
          variant="warning"
          className="margin"
          message="Por favor, rellene todos los campos"
        />
      );
    }
  };

  const handleClose = () => {
    setStatusMessage("");
  };

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
        <Form
          className="form"
          noValidate
          initialValue={{
            name: "",
            surname: "",
            tag: "",
            remindMe: false
          }}
          onSubmit={handleSubmit}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Input
                name="name"
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Nombre"
                autoFocus
                component={TextField}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Input
                variant="outlined"
                required
                fullWidth
                id="surname"
                label="Apellido"
                name="surname"
                autoComplete="lname"
                component={TextField}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl variant="outlined" className="formControl">
                <InputLabel htmlFor="outlined-tag-native-simple">
                  Tag
                </InputLabel>
                <Input
                  native
                  name="tag"
                  id="outlined-tag-native-simple"
                  component={Select}
                >
                  <option value="" />
                  {tags.map((tag, index) => (
                    <option key={index} value={tag}>
                      {tag}
                    </option>
                  ))}
                </Input>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              {statusMessage}
            </Grid>
            <Grid item xs={12}>
              <Input
                type="checkbox"
                name="remindMe"
                control={<Checkbox value="remindMe" color="primary" />}
                label="Quiero mantener mi sesión activa"
                component={FormControlLabel}
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
            Registrate
          </Button>
        </Form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}

// export default Register;
