import { connect } from 'react-redux'

import Home from './Home'
import { login, fetchAdverts } from '../../actions/actions'

const mapDispatchToProps = dispatch => ({
  login: (name, surname, tag) => dispatch(login(name, surname, tag)),
  fetchAdverts: params => fetchAdverts()(dispatch, params),
})

const mapStateToProps = state => ({
  ...state,
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
