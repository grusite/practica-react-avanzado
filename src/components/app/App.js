import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { simpleAction } from '../../actions/actions'

// import Home from './components/Home'
// import Advert from './components/Advert'
import Register from '../register/Register'

import './App.css'

const mapDispatchToProps = dispatch => ({
  simpleAction: () => dispatch(simpleAction()),
})

const mapStateToProps = state => ({
  ...state,
})

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}

    this.handlerSimpleAction = this.handlerSimpleAction.bind(this)
  }

  handlerSimpleAction(event) {
    this.props.simpleAction()
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" component={Register} />
          <Route path="/register" component={Register} />
        </Switch>
      </Router>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
