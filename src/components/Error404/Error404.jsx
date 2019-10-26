import React from 'react'
import NavBar from '../Navbar/Navbar'
import Grid from '@material-ui/core/Grid'

const style = {
  width: 'inherit',
}

function Error() {
  return (
    <>
      <Grid container justify="center" alignItems="center" className="card-container">
        <img
          style={style}
          src="https://freefrontend.com/assets/img/html-funny-404-pages/HTML-404-Crying-Baby-Page.png"
          alt="Not Found"
        />
      </Grid>
    </>
  )
}

class Error404 extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <>
        <NavBar />
        <Error />
      </>
    )
  }
}

export default Error404
