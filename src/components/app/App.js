import React from 'react'
import { connect } from 'react-redux'
import { simpleAction } from '../../actions/actions'

import logo from '../../assets/img/logo.svg'
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
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
        <button onClick={this.handlerSimpleAction}>Test redux action</button>
        <pre>{JSON.stringify(this.props)}</pre>
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
