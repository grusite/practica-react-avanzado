import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import Register from "./Register";
import { login } from "../../actions/actions";

const mapDispatchToProps = dispatch => ({
  login: (name, surname, tag) => dispatch(login(name, surname, tag))
});

const mapStateToProps = state => ({
  ...state
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Register));
