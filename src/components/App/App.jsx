import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Home from '../Home/Home'
import Register from '../Register/Register'
import AdvertDetail from '../AdvertDetail/AdvertDetail'
import CreateUpdateAdvert from '../CreateUpdateAdvert/CreateUpdateAdvert'
import Error404 from '../Error404/Error404'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { error: null }
  }

  componentDidCatch(error, errorInfo) {
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
            <Route path="/register" component={Register} />
            <Route exact path="/advert" component={Home} />
            <Route path="/advert/:id" component={AdvertDetail} />
            <Route path="/create" component={CreateUpdateAdvert} />
            <Route path="/update" component={CreateUpdateAdvert} />
            <Route exact path="/" component={Register} />
            <Route component={Error404} />
          </Switch>
        </Router>
      </ErrorBoundary>
    )
  }
}

export default App
