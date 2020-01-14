import { connect } from "react-redux";

import Home from "./Home";
import { fetchAdverts } from "../../actions/actions";
import { getAdverts, getUi, getUser } from "../../selectors";

const mapDispatchToProps = dispatch => ({
  fetchAdverts: params => dispatch(fetchAdverts(params))
});

const mapStateToProps = state => ({
  adverts: getAdverts(state),
  user: getUser(state),
  ui: getUi(state)
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
