import { connect } from 'react-redux'

import Home from './Home'
import { login, fetchAdverts } from '../../actions/actions'

const mapDispatchToProps = dispatch => ({
  //   loadAdverts: fetchAdverts,
  login: (name, surname, tag) => dispatch(login(name, surname, tag)),
  fetchAdverts: adverts => fetchAdverts()(dispatch, adverts),
})

const mapStateToProps = state => ({
  ...state,
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
