import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import AdvertList from "./AdvertList";
import { login } from "../../actions/actions";

const mapDispatchToProps = dispatch => ({
  login: (name, surname, tag) => dispatch(login(name, surname, tag))
});

const mapStateToProps = state => ({
  isLoggedIn: state.user.isLoggedIn
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AdvertList));
