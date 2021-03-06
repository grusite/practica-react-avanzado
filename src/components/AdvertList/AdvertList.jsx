import React from "react";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";

import Advert from "../Advert";

import "../Advert/advert.css";

class AdvertList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        isLoggedIn: false,
        name: "",
        surname: "",
        tags: []
      }
    };
  }

  renderAdverts = (adverts, isFetching) => {
    if (isFetching) {
      return (
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
    }
    if (!isFetching && (!adverts || adverts.length === 0)) {
      return (
        <Grid
          container
          justify="center"
          alignItems="center"
          className="card-container"
        >
          <Typography variant="h5" component="h5">
            No existen anuncios con esos criterios de búsqueda
          </Typography>
        </Grid>
      );
    }
    return (
      <>
        <Grid
          container
          justify="center"
          alignItems="center"
          className="card-container"
        >
          <Typography variant="h5" component="h5">
            A continuación puede ver todos los anuncios disponibles
          </Typography>
        </Grid>
        <Grid
          container
          justify="space-around"
          alignItems="center"
          className="card-container"
        >
          {adverts.map(advert => (
            <Advert key={advert._id} advert={advert} />
          ))}
        </Grid>
      </>
    );
  };

  render() {
    const { adverts, isFetching } = this.props;
    return <>{adverts && this.renderAdverts(adverts, isFetching)}</>;
  }
}

export default AdvertList;
