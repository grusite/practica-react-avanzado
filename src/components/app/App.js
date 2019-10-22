import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

// import Home from './components/Home'
// import Advert from './components/Advert'
import Register from '../register/Register'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  // <Route exact path="/" component={Home} />
  // <Route component={Error404} />

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/register" component={Register} />
        </Switch>
      </Router>
    )
  }
}

export default App
