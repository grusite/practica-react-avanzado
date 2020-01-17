import React from "react";

import Grid from "@material-ui/core/Grid";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import ShoppingBasketOutlinedIcon from "@material-ui/icons/ShoppingBasketOutlined";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import AttachMoneyOutlinedIcon from "@material-ui/icons/AttachMoneyOutlined";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import ListItemText from "@material-ui/core/ListItemText";
import Select from "@material-ui/core/Select";
import InputAdornment from "@material-ui/core/InputAdornment";

import NavBar from "../Navbar";
import MySnackbarContentWrapper from "../StatusMessages";

import "./createUpdateAdvert.css";

const initialState = {
  advert: {
    type: "buy",
    name: "",
    description: "",
    price: 0,
    photo: "",
    tags: []
  },
  ui: {
    isFetching: true,
    error: ""
  },
  allTags: [],
  success: false,
  error: false,
  infoMessage: false
};

class createUpdateAdvert extends React.Component {
  constructor(props) {
    super(props);
    initialState.allTags = this.props.tags;
    this.state = initialState;
  }

  async componentDidMount() {
    // Si estoy editando un anuncio, edito los valores con lo que tenía el anuncio
    // Y si no recupero del store los tags y dejo los valores vacíos
    if (this.comeFromUpdate()) {
      const advertId = this.props.match.params.id;
      await this.props.fetchAdvertById(advertId);
      this.setState({
        advert: this.props.advert,
        ui: this.props.ui
      });
    }
  }

  comeFromUpdate = () => {
    return this.props.match.url.match(/^(\/update\/)(\w+$)/g);
  };

  resetForm = () => {
    this.setState(initialState);
  };

  handleClose = () => {
    this.setState({
      ...this.state,
      error: false,
      success: false,
      infoMessage: false
    });
  };

  handleChange = event => {
    const { name, value } = event.target;

    this.setState(prevState => ({
      advert: {
        ...prevState.advert,
        [name]: value
      }
    }));
  };

  handleSubmit = async () => {
    const { type, name, description, price, photo, tags } = this.state.advert;

    if (!name || !price || !photo || !tags) {
      this.setState(prevState => ({
        ...prevState,
        infoMessage: true
      }));
      return;
    }

    const ad = {
      type,
      name,
      description,
      price,
      photo,
      tags
    };

    if (this.comeFromUpdate()) {
      const id = this.props.match.params.id;
      await this.props.updateAdvert(ad, id);
      if (this.props.advertUpdated.success) {
        this.setState(prevState => ({
          ...prevState,
          success: true
        }));
      } else {
        this.setState(prevState => ({
          ...prevState,
          error: true
        }));
      }
    } else {
      await this.props.createAdvert(ad);
      if (this.props.advertCreated.success) {
        this.setState(prevState => ({
          ...prevState,
          success: true
        }));
      } else {
        this.setState(prevState => ({
          ...prevState,
          error: true
        }));
      }
    }
  };

  render() {
    const { type, name, description, price, photo, tags } = this.state.advert;
    const { allTags } = this.state;

    let title = (
      <Typography variant="h6" gutterBottom>
        Crea tu nuevo anuncio
      </Typography>
    );

    let buttonText = "Crear";

    if (this.comeFromUpdate()) {
      title = (
        <Typography variant="h6" gutterBottom>
          Edita el anuncio seleccionado
        </Typography>
      );
      buttonText = "Actualizar";
    }

    let statusMessage = "";

    if (this.state.success) {
      statusMessage = (
        <MySnackbarContentWrapper
          onClose={this.handleClose}
          variant="success"
          className="margin"
          message="¡Todo correcto!"
        />
      );
    } else if (this.state.infoMessage) {
      statusMessage = (
        <MySnackbarContentWrapper
          onClose={this.handleClose}
          variant="warning"
          className="margin"
          message="Debe rellenar los marcados con asterisco"
        />
      );
    } else if (this.state.error) {
      statusMessage = (
        <MySnackbarContentWrapper
          onClose={this.handleClose}
          variant="error"
          className="margin"
          message="Ha ocurrido un error, intentelo más tarde"
        />
      );
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
                        checked={type === "buy"}
                      />
                    }
                    label="Comprar"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        icon={<AttachMoneyOutlinedIcon />}
                        checkedIcon={<AttachMoneyOutlinedIcon />}
                        value="sell"
                        name="type"
                        onChange={this.handleChange}
                        checked={type === "sell"}
                      />
                    }
                    label="Vender"
                  />
                </FormGroup>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  id="name"
                  name="name"
                  label="Nombre"
                  fullWidth
                  autoComplete="name"
                  value={name}
                  onChange={this.handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="description"
                  name="description"
                  label="Descripción"
                  fullWidth
                  autoComplete="desc"
                  value={description}
                  onChange={this.handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel required htmlFor="adornment-amount">
                    Precio
                  </InputLabel>
                  <Input
                    id="adornment-amount"
                    value={price}
                    name="price"
                    onChange={this.handleChange}
                    startAdornment={
                      <InputAdornment position="start">€</InputAdornment>
                    }
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  id="photo"
                  name="photo"
                  label="Inserte la url de la imagen"
                  fullWidth
                  autoComplete="url picture"
                  value={photo}
                  onChange={this.handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel required htmlFor="select-multiple-checkbox">
                    Tags
                  </InputLabel>
                  <Select
                    multiple
                    value={tags}
                    name="tags"
                    onChange={this.handleChange}
                    input={<Input id="select-multiple-checkbox" />}
                    renderValue={selected => selected.join(", ")}
                  >
                    {allTags.map(tag => (
                      <MenuItem key={tag} value={tag}>
                        <Checkbox checked={tags.indexOf(tag) > -1} />
                        <ListItemText primary={tag} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                {statusMessage}
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
                Restaurar
              </Button>
            </Grid>
          </div>
        </Container>
      </>
    );
  }
}

export default createUpdateAdvert;
