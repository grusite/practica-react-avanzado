import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import Register from "./Register";
import { userLogin } from "../../actions/actions";

const mapDispatchToProps = dispatch => ({
  userLogin: (name, surname, tag, remindMe) =>
    dispatch(userLogin(name, surname, tag, remindMe))
});

const mapStateToProps = state => ({
  ...state
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Register));
