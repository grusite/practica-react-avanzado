import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import Advert from "./Advert";
import { login } from "../../actions/actions";

const mapDispatchToProps = dispatch => ({
  login: (name, surname, tag) => dispatch(login(name, surname, tag))
});

const mapStateToProps = state => ({
  login: state.user,
  isLoggedIn: state.user.isLoggedIn,
  name: state.user.name
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Advert));
