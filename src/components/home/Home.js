import React from 'react'
import { connect } from 'react-redux'

const mapStateToProps = state => ({
  isLoggedIn: state.loginReducer.isLoggedIn,
})

class Home extends React.Component {
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

  render() {
    return (
      <>
        <NavBar />
        <AdsDetail />
        <Footer />
      </>
    )
  }
}

export default connect(mapStateToProps)(Home)
