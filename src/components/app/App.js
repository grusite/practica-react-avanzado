import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Home from '../home/Home'
import Advert from './advert/Advert'
import Register from '../register/Register'

import storage from '../../utils/storage'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { error: null }
  }

  componentDidCatch(error, errorInfo) {
    console.log(error.message)
    console.log(error.stack)
    console.log(errorInfo)
    this.setState({ error })
  }

  render() {
    if (this.state.error) {
      return (
        <div className="snap">
          <div className="snap-message">
            <p>We're sorry - something's gone wrong.</p>
            <p>
              Our team has been notified, but click <button>here</button> to fill out a report.
            </p>
          </div>
        </div>
      )
    } else {
      return this.props.children
    }
  }
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  // <Route component={Error404} />

  render() {
    return (
      <ErrorBoundary>
        <Router>
          <Switch>
            <Route exact path="/register" component={Register} />
            <Route exact path="/advert" component={Home} />
          </Switch>
        </Router>
      </ErrorBoundary>
    )
  }
}

export default App
