import React from "react";

import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import NavBar from "../Navbar";
import Advert from "../Advert";
import { getAdvertById } from "../../services/AdsAPIService";

import storage from "../../utils/storage";

import "../Advert/advert.css";

const { getItem } = storage();

class AdvertDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        isLoggedIn: false,
        name: "",
        surname: "",
        tags: []
      },
      advert: this.props.location.state.advert,
      loading: true
    };
  }

  async componentDidMount() {
    // Si no está logado le llevo a registro
    const userReminded = JSON.parse(getItem("NodePop-User"));
    const userStored = this.props.user.isLoggedIn;
    if (!userReminded && !userStored) {
      this.props.history.push("/register");
      return;
    }

    // Si lo está y recarga la pagina, le vuelvo a guardar en el estado el usuario
    if (!userStored) {
      await this.props.login(
        JSON.parse(getItem("NodePop-User")).name,
        JSON.parse(getItem("NodePop-User")).surname,
        JSON.parse(getItem("NodePop-User")).tag
      );
    }

    const advertId = this.props.match.params.id;
    getAdvertById(advertId).then(advert =>
      this.setState({ ...this.state, advert, loading: false })
    );
  }

  goBack = () => {
    this.props.history.push("/advert");
  };

  render() {
    const { advert } = this.state;

    let body;

    if (this.state.loading) {
      body = (
        <Grid
          container
          justify="center"
          alignItems="center"
          className="card-container"
        >
          <CircularProgress
            size={80}
            thickness={3.7}
            disableShrink
            className="circular-progress"
          />
        </Grid>
      );
    } else {
      body = (
        <>
          <Grid
            container
            justify="center"
            alignItems="center"
            className="card-container"
          >
            <Typography variant="h5" component="h5">
              A continuación puede ver el detalle del anuncio seleccionado
            </Typography>
          </Grid>
          <Grid
            container
            justify="space-around"
            alignItems="center"
            className="card-container"
          >
            <Advert advert={advert} />
          </Grid>
          <Grid
            container
            justify="space-around"
            alignItems="center"
            className="card-container"
          >
            <Button
              variant="contained"
              color="primary"
              className="button"
              onClick={this.goBack}
            >
              Atras
            </Button>
          </Grid>
        </>
      );
    }

    return (
      <>
        <NavBar />
        {body}
      </>
    );
  }
}

export default AdvertDetail;
