import React from "react";

import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import NavBar from "../Navbar";
import Advert from "../Advert";

import "../Advert/advert.css";

class AdvertDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      advert: {},
      ui: {
        isFetching: true,
        error: ""
      }
    };
  }

  async componentDidMount() {
    const advertId = this.props.match.params.id;
    await this.props.fetchAdvertById(advertId);
    this.setState({
      advert: this.props.advert,
      ui: this.props.ui
    });
  }

  goBack = () => {
    this.props.history.push("/");
  };

  render() {
    const { advert, ui } = this.state;
    let body;

    if (ui.isFetching) {
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
